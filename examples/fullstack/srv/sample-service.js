/**
 * Sample CMIS Client Integration with CAP Service
 *
 * This file demonstrates how to use the CmisClient library to integrate a CAP service
 * with a CMIS-compliant content repository. It showcases basic CRUD operations on 'Files'
 * entity leveraging the CMIS protocol.
 *
 * The CmisClient is initialized with the destination name, and then the available repositories
 * are fetched to ensure successful operations. The sample service handles operations like
 * creating, reading, and updating files, converting the responses from the CMIS repository
 * to the CAP entity format using utility functions.
 *
 * Directory: /examples
 *
 * Dependencies:
 * - @sap/cds
 * - sap-cloud-cmis-client
 * - mime
 *
 * Note: Always ensure that the necessary environment variables and configurations are
 * set up properly for the CmisClient to work as intended.
 *
 * @author Vinicius Barrionuevo
 * @version 1.0.0
 * @date 2023-09-08
 *
 */
const cds = require('@sap/cds');

const {
  CmisClient,
  getDestinationFromSdmBinding,
} = require('sap-cloud-cmis-client');
const { uuid } = cds.utils;
const { getExtension, getType } = require('mime');

module.exports = async srv => {
  // Create a CMIS client.
  // You can initialize it either from a predefined destination or by generating a local destination from your SDM Service.

  // Option 1: Initialize the CMIS client using a destination name from environment variables.
  const cmisClient = new CmisClient({
    destinationName: process.env.DESTINATION_NAME,
  });

  /*
   * Option 2: If you haven't set up a predefined destination, generate a local one.
   * Uncomment the following lines if you wish to use this approach.
   **/
  // const destination = await getDestinationFromSdmBinding('sdm'); // where 'sdm' is the name of VCAP_SERVICE
  // const cmisClient = new CmisClient(destination);

  // Fetch available repositories.
  // Ensure to call this after client initialization to guarantee access and operability over the repositories.
  await cmisClient.getRepositories();

  /**
   * Middleware function executed before any operation on the "Files" entity.
   * This function performs preliminary processing to avoid repetitive logic in subsequent event handlers.
   */
  srv.before('*', 'Files', async req => {
    // Convert the generic OData query parameters to CMIS specific ones.
    // This step ensures that pagination parameters are passed correctly to the CMIS client.
    if (req._query) {
      req.cmisQuery = {
        skipCount: req._query.$skip, // Mapping OData's $skip to CMIS's skipCount
        maxItems: req._query.$top, // Mapping OData's $top to CMIS's maxItems
      };
    }

    req.data.CMISObjectId = req._queryOptions?.CMISObjectId;
  });

  /**
   * Handles the "READ" request for the "Files" entity.
   * This function reads a file if an ID is provided or fetches all files otherwise.
   */
  srv.on('READ', 'Files', async req => {
    if (!req.data.id) {
      const query = 'select * from cmis:document';
      const response = await cmisClient.cmisQuery(query, {
        ...req.cmisQuery,
      });

      return response.results.map(d => mapCMISObjectToFiles(d));
    }

    const { CMISObjectId, id: filename } = req.data;
    if (req.query?._streaming) {
      const fn = filename == 'download' ? 'zipDownload' : 'downloadFile';
      const content = await cmisClient[fn](CMISObjectId, {
        download: 'inline',
        config: {
          customRequestConfiguration: {
            responseType: 'stream',
          },
          customHeaders: {
            Cookie: req.headers.cookie,
          },
        },
      });

      return {
        // https://cap.cloud.sap/docs/node.js/best-practices#custom-streaming-beta
        value: content,
        $mediaContentType: getType(filename),
        $mediaContentDispositionFilename: filename,
        $mediaContentDispositionType: 'inline',
      };
    }
  });
  /**
   * Handles the "CREATE" request for the "Files" entity.
   * This function creates a new file without any content.
   */
  srv.on('CREATE', 'Files', async () => {
    // Generate a unique identifier for the new file, just to have a random key to work with.
    const id = uuid();

    /*
     * Create a new document in the CMIS repository with the generated ID.
     * Note: We're not sending any content yet because it will be provided in a subsequent PUT request.
     * @see {@link(https://cap.cloud.sap/docs/guides/media-data#creating-a-media-resource)}
     */
    const document = await cmisClient.createDocument(id);

    // Return the created document after mapping it to the Files format.
    return mapCMISObjectToFiles(document);
  });

  /**
   * Handles the "PUT" request for the "Files" entity.
   * This function is responsible for updating file properties or appending content to an existing file.
   */
  srv.on('PUT', 'Files', async req => {
    const { CMISObjectId, ...data } = req.data;

    // The subsequent steps are relevant primarily for repositories that support versioning.
    // For repositories that don't, you could append the content stream directly to the document.

    // Step 1: Create a Private Working Copy (PWC) of the document.
    const pwcDocument = await cmisClient.checkOut(CMISObjectId);

    const fileName = `${data.id}.${getExtension(data.contentType)}`;

    try {
      // Step 2: Append the content to this private working copy.
      await cmisClient.appendContentStream(
        pwcDocument.succinctProperties['cmis:objectId'],
        fileName,
        data.content,
      );
    } catch (error) {
      // In case of an error, cancel the checkout to avoid leaving the document in a checked-out state.
      await cmisClient.cancelCheckOut(pwcDocument.id);
    }

    // Step 3: Check the document back in after the modifications.
    document = await cmisClient.checkIn(
      pwcDocument.succinctProperties['cmis:objectId'],
    );

    // Return the updated document after mapping it to the Files format.
    return mapCMISObjectToFiles(document);
  });

  /**
   * Handles the "DELETE" request for the "Files" entity.
   *
   * This function is responsible for deleting a specified file from the CMIS repository.
   */
  srv.on('DELETE', 'Files', async req => {
    await cmisClient.deleteObject(
      req.data.cmisDocument.succinctProperties['cmis:objectId'],
    );
  });

  srv.on('createZipFile', async req => {
    const { objectIds } = req.data;
    const response = await cmisClient.zipCreationForDownload(objectIds, {
      config: {
        raw: true,
      },
    });
    req.res.header('set-cookie', response.headers['set-cookie']);
    return response.data.succinctProperties['cmis:objectId'];
  });

  /**
   * Maps the CMIS object properties to the Entity "File" format.
   *
   * The CMIS (Content Management Interoperability Services) object often contains extensive metadata.
   * This function extracts the required properties to create a representative "File" entity object,
   * making it easier to manage and read.
   *
   * @param {Object} cmisObject - The CMIS object with all its metadata.
   * @returns {Object} - A mapped "File" entity object with relevant properties.
   */
  function mapCMISObjectToFiles(cmisObject) {
    return {
      id: cmisObject.succinctProperties['cmis:name'],
      name: cmisObject.succinctProperties['cmis:contentStreamFileName'],
      CMISObjectId: cmisObject.succinctProperties['cmis:objectId'],
      contentType: cmisObject.succinctProperties['cmis:contentStreamMimeType'],
    };
  }
};
