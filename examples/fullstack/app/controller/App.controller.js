sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/m/upload/UploadSetItem',
    '../control/CustomUploader',
  ],
  function (Controller, JSONModel, UploadSetItem, CustomUploader) {
    return Controller.extend('sample.controller.App', {
      /***************
       * HOOKS
       **************/

      onInit: function () {
        this._setupViewModel();
        this._initializeCustomUploader();
      },

      /***************
       * EVENT HANDLERS
       **************/

      onBeforeItemAdded: async function (oEvent) {
        const oContext = await this._createEntry('/Files');
        const oItem = oEvent.getParameter('item');
        oItem.bindContext(oContext.getPath(), oContext);
        oItem.setUploadUrl(
          `/odata/v4/sample/Files('${oContext.getProperty('id')}')/content`,
        );
        oEvent.getSource().uploadItem(oItem);
      },

      onSelectionChange: function (oEvent) {
        const hasSelectedItems =
          oEvent.getSource().getSelectedItems().length > 0;
        this.oViewModel.setProperty('/hasSelectedItems', hasSelectedItems);
      },

      onDataRequested: function () {
        this.oViewModel.setProperty('/busy', true);
      },

      onDataReceived: function () {
        this.oViewModel.setProperty('/busy', false);
      },

      onDownloadPress: async function () {
        const oItem = await this._getDownloadItem();
        oItem.download(true);
      },

      onUploadCompleted: function (oEvent) {

        const oItem = oEvent.getParameter('item');
        const oNewItem = this.byId(
          'UploadSetListBindingTemplate',
        ).clone();

        oNewItem.bindContext(oItem.getBindingContext().getPath(), oItem.getBindingContext());
        this.byId("UploadSet").removeItem(oItem)
        this.byId("UploadSet").insertItem(oNewItem);
        this.byId('UploadSet').updateBindings('items');
      },

      onRemovePressed: async function (oEvent) {
        oEvent.preventDefault();
        const oItem = oEvent.getParameter('item');
        await oItem.getBindingContext().delete();
      },

      /***************
       * PRIVATE
       **************/

      _setupViewModel: function () {
        this.oViewModel = new JSONModel({
          hasSelectedItems: false,
          busy: true,
        });
        this.getView().setModel(this.oViewModel, 'view');
      },

      _initializeCustomUploader: function () {
        const oCustomUploader = new CustomUploader();
        const oUploadSet = this.byId('UploadSet');

        oUploadSet.setUploader(oCustomUploader);
        oUploadSet.registerUploaderEvents(oCustomUploader);
      },

      _createEntry: async function (sEntity) {
        const oTempListBinding = this.getOwnerComponent()
          .getModel()
          .bindList(sEntity, null, [], [], { $$getKeepAliveContext: true });

        const oContext = oTempListBinding.create({});
        await oContext.created();

        return oContext;
      },

      _getDownloadItem: async function () {
        const aItems = this.byId('UploadSet').getSelectedItems();

        if (aItems.length > 1) {
          const aSelectedDocuments = aItems.map(oItem =>
            oItem.getBindingContext().getProperty('CMISObjectId'),
          );

          // Ask DMS to generate a `zi`p file
          const oContext = this.getView()
            .getModel()
            .bindContext('/createZipFile(...)', null);
          oContext.setParameter('objectIds', aSelectedDocuments);
          await oContext.execute();
          const { value: sZipUrl } = oContext
            .getBoundContext()
            .getObject();

          // Create a new UploadSetItem with the correctUrl
          const oZipItem = new UploadSetItem({
            fileName: 'download.zip',
            mediaType: 'application/zip',
            url: `sdm${sZipUrl}`,
            // parent: this.byId('UploadSet'),
          });
          return oZipItem;
        } else {
          return aItems[0];
        }
      },
    });
  },
);
