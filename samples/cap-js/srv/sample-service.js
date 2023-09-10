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
 * Directory: /samples
 *
 * Dependencies:
 * - @sap/cds
 * - sap-cloud-cmisjs
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

const { utils } = require('@sap/cds');
const {
  CmisClient,
  getDestinationFromSdmBinding,
} = require('sap-cloud-cmisjs');
const { uuid } = utils;
const { getExtension } = require('mime');

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

    // If a file ID is present in the request, fetch its corresponding CMIS document.
    // This ensures that subsequent event handlers can directly use the fetched CMIS document without re-fetching it.
    const fileId = req.data?.id;
    if (fileId) {
      const response = await cmisClient.cmisQuery(
        `select * from cmis:document where cmis:name = '${fileId}'`
      );
      req.data.cmisDocument = response.results?.[0];
    }
  });

  /**
   * Handles the "READ" request for the "Files" entity.
   * This function reads a file if an ID is provided or fetches all files otherwise.
   */
  srv.on('READ', 'Files', async req => {
    const { cmisDocument } = req.data;

    // Handling specific file request (e.g., GET /Files('id')).
    if (cmisDocument) {
      return mapCMISObjectToFiles(cmisDocument);
    }

    // Handling request to fetch all files (e.g., GET /Files).
    const query = 'select * from cmis:document';
    const response = await cmisClient.cmisQuery(query, {
      ...req.cmisQuery,
    });

    // Map the response results to the appropriate file format.
    return response.results.map(d => mapCMISObjectToFiles(d));
  });

  /**
   * Handles the "CREATE" request for the "Files" entity.
   * This function creates a new file without any content.
   */
  srv.on('CREATE', 'Files', async req => {
    // Generate a unique identifier for the new file, just to have a random key to work with.
    const id = uuid();

    // Create a new document in the CMIS repository with the generated ID.
    // Note: We're not sending any content yet because it will be provided in a subsequent PUT request.
    // @see(@link(https://cap.cloud.sap/docs/guides/media-data#creating-a-media-resource))
    const document = await cmisClient.createDocument(id);

    // Return the created document after mapping it to the Files format.
    return mapCMISObjectToFiles(document);
  });

  /**
   * Handles the "PUT" request for the "Files" entity.
   * This function is responsible for updating file properties or appending content to an existing file.
   */
  srv.on('PUT', 'Files', async req => {
    const { cmisDocument, ...data } = req.data;

    // The subsequent steps are relevant primarily for repositories that support versioning.
    // For repositories that don't, you could append the content stream directly to the document.

    // Step 1: Create a Private Working Copy (PWC) of the document.
    const pwcDocument = await cmisClient.checkOut(
      cmisDocument.succinctProperties['cmis:objectId']
    );

    const fileName = `${data.id}.${getExtension(data.contentType)}`;

    try {
      // Step 2: Append the content to this private working copy.
      await cmisClient.appendContentStream(
        pwcDocument.succinctProperties['cmis:objectId'],
        fileName,
        data.content
      );
    } catch (error) {
      // In case of an error, cancel the checkout to avoid leaving the document in a checked-out state.
      await cmisClient.cancelCheckOut(pwcDocument.id);
    }

    // Step 3: Check the document back in after the modifications.
    document = await cmisClient.checkIn(
      pwcDocument.succinctProperties['cmis:objectId']
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
      req.data.cmisDocument.succinctProperties['cmis:objectId']
    );
  });

  /**
   * Error handler for the service.
   * This function captures any errors during service operations and sends a corresponding HTTP response.
   */
  srv.on('error', (error, req) => {
    // Check if the error contains an HTTP response.
    // If so, use its status and message for the rejection.
    const httpResponse = error?.response;
    if (httpResponse) {
      req.reject(httpResponse.status, httpResponse.data.message);
    }
    // If no HTTP response is present, send a generic 500 error with the error message.
    else {
      req.reject(500, error.message);
    }
  });
};

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
