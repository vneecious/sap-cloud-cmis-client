sap.ui.define(
  ['sap/m/upload/Uploader', '../service/cmis'],

  function (Uploader, cmisService) {
    return Uploader.extend('sample.control.CustomUploader', {
      metadata: {},

      uploadItem: async function (oItem, aHeaders) {
        // First we have an empty document
        const oDocument = await cmisService.createDocument();

        // then we just change the default method to PUT, instead of POST
        this.setHttpRequestMethod('PUT');

        // and set the new URL based on our new document id
        this.setUploadUrl(`/odata/v4/sample/Files('${oDocument.id}')/content`);

        // after that we can just use the standard process to go on
        Uploader.prototype.uploadItem.call(this, oItem, aHeaders);
      },

      downloadItem: function (oItem, aHeaders, bAskForLocation) {
        Uploader.prototype.downloadItem.call(
          this,
          oItem,
          aHeaders,
          bAskForLocation,
        );
      },

      attachEventsFromUploadSet: function (oUploadSet) {
        Object.entries(oUploadSet.mEventRegistry).forEach(entry => {
          const sEventId = entry[0];
          const aEventRegistry = entry[1];

          aEventRegistry.forEach(oEventRegistry =>
            this.attachEvent(
              sEventId,
              oEventRegistry.oData,
              oEventRegistry.fnFunction,
              oEventRegistry.oListener,
            ),
          );
        });
      },
    });
  },
);
