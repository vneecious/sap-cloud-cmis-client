/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { getDestinationFromDestinationService } from '@sap-cloud-sdk/connectivity';
import { CmisClient } from '../src/CmisClient';
import { loadEnv } from '@sap/xsenv';
import fs from 'fs';
import path from 'path';

import {
  CreateDocumentResponse,
  CreateFolderResponse,
  FetchRepositoryResponse,
} from '../src/generated';
import { CMISTypeInput } from 'src/types';

describe('CmisClient integration with BTP - DMS Service', function () {
  let cmisClient: CmisClient;
  beforeAll(async () => {
    // !Before running the tests, ensure the project has bindings with both a UAA Service and a Destination Service.
    loadEnv('test-env.json');
    const destination = await getDestinationFromDestinationService({
      destinationName: process.env.TEST_DESTINATION_NAME,
    });
    if (!destination) {
      throw new Error('Could not fetch the destination. Tests aborted');
    }
    cmisClient = new CmisClient({
      destinationName: process.env.TEST_DESTINATION_NAME,
    });
  });

  it('should load repositories from DMS', async () => {
    const result =
      (await cmisClient.getRepositories()) as FetchRepositoryResponse;
    const repository = Object.values(result)[0];
    expect(repository).toHaveProperty('repositoryId');
  });

  let document: CreateDocumentResponse;
  it('should create a document in root', async () => {
    const result = await cmisClient.createDocument(
      `File-${Date.now().toString()}.txt`,
      Buffer.from('Lorem ipsum dolor', 'utf-8')
    );

    document = result;
    expect(result.succinctProperties).toHaveProperty(
      'cmis:contentStreamLength'
    );
  });

  const fileName = `File-${Date.now().toString()}.txt`;

  it('should create an empty document', async () => {
    const result = await cmisClient.createDocument(fileName, '');

    document = result;

    expect(result).toHaveProperty('succinctProperties');
  });

  let documentCheckOut: CreateDocumentResponse;
  it('should checkout the created document', async () => {
    documentCheckOut = await cmisClient.checkOut(
      document.succinctProperties['cmis:objectId']
    );

    expect(
      documentCheckOut.succinctProperties['cmis:isPrivateWorkingCopy']
    ).toBe(true);
  });

  it('should cancel checkout', async () => {
    const result = await cmisClient.cancelCheckOut(
      documentCheckOut.succinctProperties['cmis:objectId']
    );
    expect(result).toBe('');
  });

  it('should checkout the again', async () => {
    const result = await cmisClient.checkOut(
      document.succinctProperties['cmis:objectId']
    );

    document = result;

    expect(result.succinctProperties['cmis:isPrivateWorkingCopy']).toBe(true);
  });

  it('should append content stream the document', async () => {
    try {
      const result = await cmisClient.appendContentStream(
        document.succinctProperties['cmis:objectId'],
        fileName,
        Buffer.from('This content was appended', 'utf-8'),
        {
          isLastChunk: true,
        }
      );

      document = result;

      expect(result.succinctProperties).toHaveProperty(
        'cmis:contentStreamLength'
      );
    } catch (error) {
      console.error(error.response.data);
    }
  });

  it('should checkin the modified document', async () => {
    const result = await cmisClient.checkIn(
      document.succinctProperties['cmis:objectId']
    );

    document = result;

    expect(result.succinctProperties['cmis:versionLabel']).toBe('2.0');
  });

  it('should create a document from a source', async () => {
    await cmisClient.createDocumentFromSource(
      document.succinctProperties['cmis:objectId'],
      null,
      {
        cmisProperties: {
          'cmis:name': `${document.succinctProperties['cmis:name']}-copy`,
        },
      }
    );
  });

  // NOTE: the repository MUST be set as 'Favorites' in order for this test to succeed.
  // This feature is only avaliable for 'Application Option'
  it.skip('should set an object as favorite', async () => {
    // cmisClient.setDefaultRepository('ee2f17a2-6218-4056-93e0-f8a9b343fcc6'); // set share repository as default
    const document = await cmisClient.createDocument(
      `File-${Date.now().toString()}.txt`,
      Buffer.from('Lorem ipsum dolor', 'utf-8')
    );
    await cmisClient.createFavorite(
      document.succinctProperties['cmis:objectId']
    );
  });

  let folder: CreateFolderResponse;
  it('should create a folder in root', async () => {
    const result = await cmisClient.createFolder(`folder-${Date.now()}`);
    folder = result;
    expect(result).toHaveProperty('succinctProperties');
  });

  it('should create link', async () => {
    const result = await cmisClient.createLink(
      'http://sap.com',
      `SAP-${Date.now()}`
    );
    expect(result.succinctProperties['cmis:objectTypeId']).toBe('sap:link');
  });

  it('should run queries', async () => {
    const result = await cmisClient.cmisQuery('select * from cmis:document', {
      maxItems: 10,
    });
    expect(result).toHaveProperty('results');
  });

  it('should create a secondary type', async () => {
    const typeName = `my:ST${Date.now()}`;
    try {
      await cmisClient.createType({
        id: typeName,
        description: 'a secondary type test',
        displayName: typeName,
        localName: typeName,
        localNamespace: 'my.org',
        queryName: typeName,
      } as CMISTypeInput);
    } catch (erro) {
      console.warn(erro.response.data);
    }
  });

  it('should update the properties of an object', async () => {
    const oldName = document.succinctProperties['cmis:name'];
    const newName = `${oldName}-updated`;
    const result = await cmisClient.updateProperties(
      document.succinctProperties['cmis:objectId'],
      {
        cmisProperties: {
          'cmis:name': newName,
        },
        succinct: true,
      }
    );

    expect(result.succinctProperties['cmis:name']).toBe(newName);
  });

  // NOTE: the repository MUST be set as 'Collaboration' in order for this test to succeed.
  // This feature is only avaliable for 'Application Option'
  it.skip('should create a share folder', async () => {
    // cmisClient.setDefaultRepository('2dfc4fd5-e8dc-4dee-b6fc-3160268303cf'); // set share repository as default
    await cmisClient.createShare('my share');
  });

  it('should delete an object', async () => {
    await cmisClient.deleteObject(document.succinctProperties['cmis:objectId']);
  });

  it('should delete permanently an object', async () => {
    await cmisClient.deletePermanently(
      document.succinctProperties['cmis:objectId']
    );
  });

  it('should delete a tree', async () => {
    await cmisClient.deleteTree(folder.succinctProperties['cmis:objectId']);
  });

  it('should download a file', async () => {
    const filename = `test-downloadFile-${Date.now().toString()}.txt`;
    const fileContent = 'Lorem ipsum dolor';
    const createdDocument = await cmisClient.createDocument(
      filename,
      Buffer.from('Lorem ipsum dolor', 'utf-8')
    );

    const result = await cmisClient.downloadFile(
      createdDocument.succinctProperties['cmis:objectId']
    );

    expect(result).toBe(fileContent);
  });

  // NOTE: The repository MUST be onboarded with the property `isThumbnailEnabled` set to `true`
  // in order for this test to succeed.
  it('should generate a thumbnail', async () => {
    const filePath = path.join(__dirname, 'chico.jpg');
    const content = fs.createReadStream(filePath);
    const fileName = `chico-${Date.now()}.jpg`;

    document = await cmisClient.createDocument(fileName, content);
    await cmisClient.generateThumbnail(
      document.succinctProperties['cmis:objectId']
    );
  });

  it('should get ACL property from an object', async () => {
    const result = await cmisClient.getACLProperty(
      document.succinctProperties['cmis:objectId']
    );
    expect(result).toHaveProperty('acl');
  });

  it('should get allowable actions', async () => {
    await cmisClient.getAllowableActions(
      document.succinctProperties['cmis:objectId']
    );
  });

  let subFolder: CreateFolderResponse;
  it('should get children', async () => {
    // Create some folder and subfolder
    folder = await cmisClient.createFolder(`folder-${Date.now()}`);
    subFolder = await cmisClient.createFolder(`subFolder1-${Date.now()}`, {
      folderPath: folder.succinctProperties['cmis:name'],
    });

    const result = await cmisClient.getChildren(
      folder.succinctProperties['cmis:objectId']
    );
    expect(result).toHaveProperty('objects');
  });

  it('should get deleted children', async () => {
    await cmisClient.getDeletedChildren();
  });

  it('should get descendants', async () => {
    await cmisClient.getDescendants(folder.succinctProperties['cmis:objectId']);
  });

  it('should get folder tree', async () => {
    await cmisClient.getFolderTree(folder.succinctProperties['cmis:objectId']);
  });

  it('should get object', async () => {
    await cmisClient.getObject(folder.succinctProperties['cmis:objectId'], {
      includeAllowableActions: true,
    });
  });

  it('should get parent', async () => {
    await cmisClient.getParent(subFolder.succinctProperties['cmis:objectId']);
  });

  it('should get properties of the given object', async () => {
    await cmisClient.getProperties(
      document.succinctProperties['cmis:objectId']
    );
  });

  it('should get children of the given type', async () => {
    await cmisClient.getTypeChildren('cmis:document');
  });

  it('should get the definition of the type', async () => {
    await cmisClient.getTypeDefinition('sap:link');
  });

  it('should get the descendants of a type', async () => {
    await cmisClient.getTypeDescendants('cmis:document');
  });

  it.skip('should create a zip content', async () => {
    const objectIds: string[] = [];

    // Create two documents
    const filePath = path.join(__dirname, 'chico.jpg');

    let fileName = `first-${Date.now()}.jpg`;
    let content = fs.createReadStream(filePath);
    const firstDocument = await cmisClient.createDocument(fileName, content);
    objectIds.push(firstDocument.succinctProperties['cmis:objectId']);

    fileName = `second-${Date.now()}.jpg`;
    content = fs.createReadStream(filePath);
    const secondDocument = await cmisClient.createDocument(fileName, content);
    objectIds.push(secondDocument.succinctProperties['cmis:objectId']);

    await cmisClient.zipCreationForDownload(objectIds, {
      config: {
        raw: true,
      },
    });
  });

  it.skip('should retrieve the content stream of the recently created ZIP file', async () => {
    // TODO: Need to determine the correct method to fetch the content stream.
    // Previous attempts have led to the following error:
    // {
    //   Status: 500,
    //   Message: '[ZIP Rendition] objectId could not be found in session'
    // }
  });

  it('should upload a ZIP and extract its files into a new folder', async () => {
    const filePath = path.join(__dirname, 'files.zip');
    const content = fs.createReadStream(filePath);
    const fileName = `files-${Date.now()}.zip`;
    await cmisClient.zipExtractAndUpload(fileName, content);
  });
});
