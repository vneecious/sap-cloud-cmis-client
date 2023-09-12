sap.ui.define(
  ['sap/ui/core/mvc/Controller', '../control/CustomUploader'],

  function (Controller, CustomUploader) {
    return Controller.extend('sample.controller.App', {
      onInit: function () {
        var oCustomUploader = new CustomUploader();
        var oUploadSet = this.byId('UploadSet');
        oUploadSet.setUploader(oCustomUploader);
        oUploadSet.registerUploaderEvents(oCustomUploader);
        oCustomUploader.attachEventsFromUploadSet(oUploadSet);
      },

      onOpenPressed: function (oEvent) {
        
      },

      onUploadCompleted: function (oEvent) {
        debugger;
      },
    });
  },
);
