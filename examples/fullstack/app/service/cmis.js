sap.ui.define([], function () {
  return {
    createDocument: async (oData = {}) => {
      const response = await fetch('/odata/v4/sample/Files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(oData),
      });

      if (response.status < 200 || response.status > 299) {
        throw new Error(response.json());
      }
      return response.json();
    },

    createZipFile: async aDocumentIds => {
      const response = await fetch('/odata/v4/sample/createZipFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ objectIds: aDocumentIds }),
      });

      if (response.status < 200 || response.status > 299) {
        throw new Error(response.json());
      }
      return response.json();
    },
  };
});
