sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/m/upload/UploadSetItem',
    '../control/CustomUploader',
    '../service/cmis',
  ],

  function (Controller, JSONModel, UploadSetItem, CustomUploader, cmisService) {
    return Controller.extend('sample.controller.App', {
      onInit: function () {
        this.oViewModel = new JSONModel({
          hasSelectedItems: false,
          busy: true,
        });

        this.getView().setModel(this.oViewModel, 'view');

        const oCustomUploader = new CustomUploader();
        const oUploadSet = this.byId('UploadSet');

        oUploadSet.setUploader(oCustomUploader);
        oUploadSet.registerUploaderEvents(oCustomUploader);

        oCustomUploader.attachEventsFromUploadSet(oUploadSet);
      },

      onSelectionChange: function (oEvent) {
        const aSelectedItems = oEvent.getSource().getSelectedItems();
        this.oViewModel.setProperty(
          '/hasSelectedItems',
          Boolean(aSelectedItems.length),
        );
      },

      onDataRequested: function () {
        this.oViewModel.setProperty('/busy', true);
      },

      onDataReceived: function () {
        this.oViewModel.setProperty('/busy', false);
      },

      onDownloadPress: async function () {
        const aItems = this.byId('UploadSet').getSelectedItems();
        let oItem;

        if (aItems.length > 1) {
          const aSelectedDocuments = aItems.map(oItem =>
            oItem.getBindingContext().getProperty('CMISObjectId'),
          );
          const { value: sZipObjectId } =
            await cmisService.createZipFile(aSelectedDocuments);
          oItem = new UploadSetItem();
          oItem.setFileName('download.zip');
          oItem.setMediaType('application/zip');
          oItem.setUrl(
            `/odata/v4/sample/Files/download/content?CMISObjectId=${sZipObjectId}`,
          );
          oItem.setParent(this.byId('UploadSet'));
        } else {
          oItem = aItems[0];
        }
        oItem.download(true);
      },
    });
  },
);
