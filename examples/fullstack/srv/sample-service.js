const cds = require('@sap/cds');
const { CmisClient } = require('sap-cloud-cmis-client');
const { uuid } = cds.utils;
const { getExtension, getType } = require('mime');
const { getDestination } = require('@sap-cloud-sdk/core');

const CMIS_DESTINATION_NAME = process.env.DESTINATION_NAME;
const CMIS_DOCUMENT_QUERY = 'select * from cmis:document';

module.exports = async srv => {
  let cmisClient;

  srv.before('*', 'Files', async req => {
    const destination = await getDestination(CMIS_DESTINATION_NAME, {
      userJwt: req.req.tokenInfo.getTokenValue(),
    });
    if (!cmisClient) {
      cmisClient = new CmisClient(destination);
      await cmisClient.getRepositories();
    }

    // /**
    // * @todo revisit once Issue #22 is fixed.
    // * @see {@link https://github.com/vneecious/sap-cloud-cmis-client/issues/22}
    // */
    cmisClient.destination = destination;

    if (req._query) {
      req.cmisQuery = {
        skipCount: req._query.$skip,
        maxItems: req._query.$top,
      };
    }

    req.data.CMISObjectId = req._queryOptions?.CMISObjectId;

    if (req.data.id && !req.data.CMISObjectId) {
      const [firstResult] = (
        await cmisClient.cmisQuery(
          `${CMIS_DOCUMENT_QUERY} where cmis:name = '${req.data.id}'`,
        )
      ).results;
      req.data.CMISObjectId = firstResult?.succinctProperties['cmis:objectId'];
    }
  });

  srv.on('READ', 'Files', async req => {
    if (!req.data.id) {
      const response = await cmisClient.cmisQuery(CMIS_DOCUMENT_QUERY, {
        ...req.cmisQuery,
      });
      return Promise.all(response.results.map(mapCMISObjectToFiles));
    }

    const { CMISObjectId, id: filename } = req.data;
    if (req.query?._streaming) {
      const fn = filename === 'download' ? 'zipDownload' : 'downloadFile';
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
        value: content,
        $mediaContentType: getType(filename),
        $mediaContentDispositionFilename: filename,
        $mediaContentDispositionType: 'inline',
      };
    }

    const result = await cmisClient.getObject(CMISObjectId);
    return mapCMISObjectToFiles(result);
  });

  srv.on('CREATE', 'Files', async () => {
    const id = uuid();
    const document = await cmisClient.createDocument(id);
    return mapCMISObjectToFiles(document);
  });

  srv.on('PUT', 'Files', async req => {
    const { CMISObjectId, ...data } = req.data;

    if (!data.content) {
      return;
    }

    // append content to document
    const fileName = `${data.id}.${getExtension(data.contentType)}`;
    await cmisClient.appendContentStream(
      CMISObjectId,
      fileName,
      data.content,
    );

    // generate thumbnail
    await cmisClient.generateThumbnail(CMISObjectId);

    // return document
    const document = await cmisClient.getObject(CMISObjectId);
    return mapCMISObjectToFiles(document);
  });

  srv.on('DELETE', 'Files', async req => {
    try {
      await cmisClient.deleteObject(req.data.CMISObjectId);
    } catch (err) {
      debugger;
    }
  });

  srv.on('createZipFile', async req => {
    const { objectIds } = req.data;
    const response = await cmisClient.zipCreationForDownload(objectIds, {
      config: { raw: true },
    });

    req.res.header('set-cookie', `SDM_${response.headers['set-cookie']}`);

    const { data: zipObject } = response;

    /**
     * @todo revisit once Issue #21 is fixed.
     * @see {@link https://github.com/vneecious/sap-cloud-cmis-client/issues/21}
     */
    const rootPath = `/browser/${cmisClient.getDefaultRepository().repositoryId
      }/root`;
    const fullPath = `${rootPath}?cmisselector=content&objectId=${zipObject.succinctProperties['cmis:objectId']}`;
    return fullPath;
  });

  async function mapCMISObjectToFiles(cmisObject) {
    const url = await cmisClient.getDocumentUriPath(cmisObject);
    const {
      'cmis:name': id,
      'cmis:contentStreamFileName': name,
      'cmis:objectId': CMISObjectId,
      'cmis:contentStreamMimeType': contentType,
      'cmis:createdBy': createdBy,
      'cmis:creationDate': creationDate,
    } = cmisObject.succinctProperties;

    return {
      id,
      name,
      CMISObjectId,
      contentType,
      createdBy,
      creationDate: new Date(creationDate).toISOString(),
      contentUrl: url.content ? encodeURI(`/sdm${url.content}`) : '',
      thumbnailUrl: url.thumbnail ? encodeURI(`/sdm${url.thumbnail}`) : '',
    };
  }
};
