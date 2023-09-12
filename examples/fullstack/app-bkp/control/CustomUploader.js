sap.ui.define(
  ['sap/m/upload/Uploader'],

  function (Uploader) {
    return Uploader.extend('sample.control.CustomUploader', {
      metadata: {},

      uploadItem: function (oItem, aHeaders) {
        // First we have an empty document
        this._createCMISDocument().then(
          function (oDocument) {
            // then we just change the default method to PUT, instead of POST
            this.setHttpRequestMethod('PUT');

            // and set the new URL based on our new document id
            this.setUploadUrl(
              `/odata/v4/sample/Files('${oDocument.id}')/content`,
            );

            // after that we can just use the standard process to go on
            Uploader.prototype.uploadItem.call(this, oItem, aHeaders);
          }.bind(this),
        );
      },

      downloadItem: function (oItem, oHeaders, bAskForLocation) {
        debugger;
        // Uploader.prototype.downloadItem.call(this, oHeaders, bAskForLocation);
      },

      attachEventsFromUploadSet: function (oUploadSet) {
        Object.entries(oUploadSet.mEventRegistry).forEach(
          function (entry) {
            var sEventId = entry[0];
            var aEventRegistry = entry[1];

            for (var oEventRegistry of aEventRegistry) {
              this.attachEvent(
                sEventId,
                oEventRegistry.oData,
                oEventRegistry.fnFunction,
                oEventRegistry.oListener,
              );
            }
          }.bind(this),
        );
      },

      _createCMISDocument: function (oData = {}) {
        return fetch('/odata/v4/sample/Files', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(oData),
        }).then(function (response) {
          if (response.status < 200 || response.status > 299) {
            throw new Error(response.json());
          }
          return response.json();
        });
      },
    });
  },
);
