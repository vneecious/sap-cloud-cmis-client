sap.ui.define(
  ['sap/m/upload/Uploader', 'sap/ui/core/Item'],

  function (Uploader, Item) {
    return Uploader.extend('sample.control.CustomUploader', {
      metadata: {},

      uploadItem: async function (oItem) {
        // Set the same headers from OData Model
        const headersItems = Object.entries(
          this.getModel().getHttpHeaders(),
        ).map(([key, value]) => new Item({ key, text: value }));

        this.setHttpRequestMethod('PUT');

        Uploader.prototype.uploadItem.call(this, oItem, headersItems);
      },
    });
  },
);
