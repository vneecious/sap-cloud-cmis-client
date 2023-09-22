/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { getDestinationFromDestinationService } from '@sap-cloud-sdk/connectivity';
import { CmisClient } from '../src/CmisClient';
import fs from 'fs';
import path from 'path';

import {
  CreateDocumentResponse,
  CreateFolderResponse,
  FetchRepositoryResponse,
  MoveObjectResponse,
} from '../src/generated';
import { CMISTypeInput } from 'src/types';
import { HttpResponse } from '@sap-cloud-sdk/http-client';

describe('CmisClient integration with BTP - DMS Service', function () {
  let cmisClient: CmisClient;
  const createdObjectIds: Array<string> = [];
  beforeAll(async () => {
    const destination = await getDestinationFromDestinationService({
      destinationName: process.env.DESTINATION_NAME,
    });
    if (!destination) {
      throw new Error('Could not fetch the destination. Tests aborted');
    }
    cmisClient = new CmisClient({
      destinationName: process.env.DESTINATION_NAME,
    });
    await cmisClient.getRepositories();
  });

  afterAll(() => {
    createdObjectIds.map(async id => {
      try {
        await cmisClient.deleteObject(id);
      } catch (error) {
        // nothing to do
      }
    });
  });

  it('should load repositories from DMS', async () => {
    const result = await cmisClient.getRepositories();
    const repository = Object.values(result)[0];
    expect(repository).toHaveProperty('repositoryId');
  });

  describe('CMIS Object Services Test', () => {
    describe('Document Management Tests', () => {
      let document: CreateDocumentResponse;
      let documentCheckOut: CreateDocumentResponse;
      const fileName = `File-${Date.now().toString()}.txt`;

      // Este é um teste sobre a obtenção de repositórios.
      it('should load repositories from DMS', async () => {
        const result =
          (await cmisClient.getRepositories()) as FetchRepositoryResponse;
        const repository = Object.values(result)[0];
        expect(repository).toHaveProperty('repositoryId');
      });

      // Criar um documento no repositório com conteúdo
      it('should create a document in root with content', async () => {
        const result = await cmisClient.createDocument(
          `File-${Date.now().toString()}.txt`,
          Buffer.from('Lorem ipsum dolor', 'utf-8'),
        );

        document = result;

        createdObjectIds.push(document.succinctProperties['cmis:objectId']);
        expect(result.succinctProperties).toHaveProperty(
          'cmis:contentStreamLength',
        );
      });

      it('should get the properties of the object', async () => {
        await cmisClient.getProperties(
          document.succinctProperties['cmis:objectId'],
        );
      });

      // Criar um documento no repositório sem conteúdo
      it('should create an empty document in root', async () => {
        const result = await cmisClient.createDocument(fileName, '');
        document = result;

        createdObjectIds.push(document.succinctProperties['cmis:objectId']);

        expect(result).toHaveProperty('succinctProperties');
      });

      // Teste de checkout de documento
      it('should checkout the created document', async () => {
        documentCheckOut = await cmisClient.checkOut(
          document.succinctProperties['cmis:objectId'],
        );
        expect(
          documentCheckOut.succinctProperties['cmis:isPrivateWorkingCopy'],
        ).toBe(true);
      });

      // Cancelar checkout de documento
      it('should cancel checkout', async () => {
        const result = await cmisClient.cancelCheckOut(
          documentCheckOut.succinctProperties['cmis:objectId'],
        );
        expect(result).toBe('');
      });

      // Adicionar fluxo de conteúdo ao documento
      it('should append content stream to the document', async () => {
        documentCheckOut = await cmisClient.checkOut(
          document.succinctProperties['cmis:objectId'],
        );
        expect(
          documentCheckOut.succinctProperties['cmis:isPrivateWorkingCopy'],
        );

        try {
          const result = await cmisClient.appendContentStream(
            documentCheckOut.succinctProperties['cmis:objectId'],
            fileName,
            Buffer.from('This content was appended', 'utf-8'),
            { isLastChunk: true },
          );

          expect(result.succinctProperties).toHaveProperty(
            'cmis:contentStreamLength',
          );
        } catch (error) {
          console.error(error.response.data);
        }
      });

      // Checkin de um documento modificado
      it('should checkin the modified document', async () => {
        const result = await cmisClient.checkIn(
          documentCheckOut.succinctProperties['cmis:objectId'],
        );
        document = result;
        expect(result.succinctProperties['cmis:versionLabel']).toBe('2.0');
      });

      // Criar um documento a partir de uma fonte existente
      it('should create a document from a source', async () => {
        document = await cmisClient.createDocumentFromSource(
          document.succinctProperties['cmis:objectId'],
          null,
          {
            cmisProperties: {
              'cmis:name': `${document.succinctProperties['cmis:name']}-copy`,
            },
          },
        );

        createdObjectIds.push(document.succinctProperties['cmis:objectId']);
      });

      it('should get allowable actions', async () => {
        await cmisClient.getAllowableActions(
          document.succinctProperties['cmis:objectId'],
        );
      });

      it('should delete a document', async () => {
        await cmisClient.deleteObject(
          document.succinctProperties['cmis:objectId'],
        );
      });
    });

    describe('Folder Management Tests', () => {
      const createdIds: Array<string> = [];
      let folder: CreateFolderResponse;
      const folderName = `Folder-${Date.now().toString()}`;

      // Create a folder in the root
      it('should create a folder in root', async () => {
        const result = await cmisClient.createFolder(folderName);
        folder = result;
        expect(result).toHaveProperty('succinctProperties');
        expect(result.succinctProperties['cmis:objectTypeId']).toBe(
          'cmis:folder',
        );

        createdIds.push(folder.succinctProperties['cmis:objectId']);
      });

      // Get details of the created folder
      it('should retrieve the created folder details', async () => {
        const result = await cmisClient.getObject(
          folder.succinctProperties['cmis:objectId'],
        );
        expect(result.succinctProperties['cmis:name']).toBe(folderName);
      });

      // Move folder inside another folder
      it('should move the folder', async () => {
        const newFolderName = `Folder-${Date.now().toString()}`;
        const newFolder: CreateFolderResponse =
          await cmisClient.createFolder(newFolderName);

        expect(newFolder).toBeTruthy();
        createdIds.push(newFolder.succinctProperties['cmis:objectId']);

        const result: MoveObjectResponse = await cmisClient.moveObject(
          folder.succinctProperties['cmis:objectId'],
          cmisClient.getDefaultRepository().rootFolderId,
          newFolder.succinctProperties['cmis:objectId'],
        );
        expect(result.properties['cmis:parentId'].value).toBe(
          newFolder.succinctProperties['cmis:objectId'],
        );
      });

      // Rename a folder
      it('should rename the folder', async () => {
        const newName = `Renamed-${folderName}`;
        const result = await cmisClient.updateProperties(
          folder.succinctProperties['cmis:objectId'],
          {
            cmisProperties: {
              'cmis:name': newName,
            },
          },
        );
        expect(result.succinctProperties['cmis:name']).toBe(newName);
      });

      // Delete folder and its inner folders
      it('Should delete a tree', async () => {
        await cmisClient.deleteTree(folder.succinctProperties['cmis:objectId']);
      });
    });
  });

  describe('SAP DMS Helpers Tests', () => {
    let document: CreateDocumentResponse;
    it('should download a file', async () => {
      const filename = `test-downloadFile-${Date.now().toString()}.txt`;
      const fileContent = 'Lorem ipsum dolor';
      document = await cmisClient.createDocument(
        filename,
        Buffer.from('Lorem ipsum dolor', 'utf-8'),
      );

      const result = await cmisClient.downloadFile(
        document.succinctProperties['cmis:objectId'],
      );

      expect(result).toBe(fileContent);
    });

    it('should download a file as arraybuffer', async () => {
      const filename = `test-downloadFile-${Date.now().toString()}.txt`;
      const fileContent = 'Lorem ipsum dolor';
      const inputBuffer = Buffer.from('Lorem ipsum dolor', 'utf-8');
      document = await cmisClient.createDocument(filename, inputBuffer);

      const outputBuffer = await cmisClient.downloadFile(
        document.succinctProperties['cmis:objectId'],
        {
          download: 'attachment',
          filename,
          config: {
            customRequestConfiguration: {
              responseType: 'arraybuffer',
            },
          },
        },
      );
      expect(Buffer.isBuffer(outputBuffer)).toBe(true);
      expect(inputBuffer).toEqual(outputBuffer);
    });

    it('should get deleted children', async () => {
      await cmisClient.getDeletedChildren();
    });

    // NOTE: the repository MUST be set as 'Favorites' in order for this test to succeed.
    // This feature is only avaliable for 'Application Option'
    it.skip('should set an object as favorite', async () => {
      // cmisClient.setDefaultRepository('ee2f17a2-6218-4056-93e0-f8a9b343fcc6'); // set share repository as default
      const document = await cmisClient.createDocument(
        `File-${Date.now().toString()}.txt`,
        Buffer.from('Lorem ipsum dolor', 'utf-8'),
      );
      await cmisClient.createFavorite(
        document.succinctProperties['cmis:objectId'],
      );
    });

    it('should create link', async () => {
      const result = await cmisClient.createLink(
        'http://sap.com',
        `SAP-${Date.now()}`,
      );
      expect(result.succinctProperties['cmis:objectTypeId']).toBe('sap:link');
    });

    // NOTE: the repository MUST be set as 'Collaboration' in order for this test to succeed.
    // This feature is only avaliable for 'Application Option'
    it.skip('should create a share folder', async () => {
      // cmisClient.setDefaultRepository('2dfc4fd5-e8dc-4dee-b6fc-3160268303cf'); // set share repository as default
      await cmisClient.createShare('my share');
    });

    it('should delete permanently an object', async () => {
      const deleteResult = await cmisClient.deleteObject(
        document.succinctProperties['cmis:objectId'],
      );

      const permanentlyDeleteResult = await cmisClient.deletePermanently(
        document.succinctProperties['cmis:objectId'],
      );
      debugger;
    });

    // NOTE: The repository MUST be onboarded with the property `isThumbnailEnabled` set to `true`
    // in order for this test to succeed.
    it('should generate a thumbnail', async () => {
      const filePath = path.join(__dirname, 'chico.jpg');
      const content = fs.createReadStream(filePath);
      const fileName = `chico-${Date.now()}.jpg`;

      const document = await cmisClient.createDocument(fileName, content);
      const result = await cmisClient.generateThumbnail(
        document.succinctProperties['cmis:objectId'],
      );
      debugger;
    });

    describe('CMIS Client ZIP tests', () => {
      let rawResponse: HttpResponse;
      const objectIds: string[] = [];
      const filePath = path.join(__dirname, 'chico.jpg');

      async function createDocumentWithFileName(
        fileName: string,
      ): Promise<string> {
        const content = fs.createReadStream(filePath);
        const document: CreateDocumentResponse =
          await cmisClient.createDocument(fileName, content);
        return document.succinctProperties['cmis:objectId'] as string;
      }

      it('should create a zip content from two documents', async () => {
        const firstFileName = `first-${Date.now()}.jpg`;
        objectIds.push(await createDocumentWithFileName(firstFileName));

        const secondFileName = `second-${Date.now()}.jpg`;
        objectIds.push(await createDocumentWithFileName(secondFileName));

        rawResponse = await cmisClient.zipCreationForDownload(objectIds, {
          config: {
            raw: true, // send as raw to obtain the set-cookie headers for session id
          },
        });

        expect(rawResponse.status).toBe(201);
      });

      it('should retrieve the content stream of the recently created ZIP file', async () => {
        expect(rawResponse).toBeTruthy();

        const setCookieHeader: Array<any> = rawResponse.headers['set-cookie'];
        const response: string = await cmisClient.zipDownload(
          rawResponse.data.succinctProperties['cmis:objectId'],
          {
            download: 'attachment',
            config: {
              customHeaders: {
                Cookie: setCookieHeader.join('; '),
              },
            },
          },
        );
        const isZip = response.startsWith('PK');
        expect(isZip).toBeTruthy();
      });
    });
  });

  describe('CMIS ACL Services Tests', () => {
    let document: CreateDocumentResponse;
    it('should get ACL property from an object', async () => {
      const response = await cmisClient.cmisQuery(
        'select * from cmis:document',
        {
          maxItems: 1,
        },
      );

      expect(response.numItems).toBeGreaterThan(0);
      document = response.results[0];

      const result = await cmisClient.getACLProperty(
        document.succinctProperties['cmis:objectId'],
      );

      expect(result).toHaveProperty('acl');
    });
  });

  describe('CMIS Discovery Services Test', () => {
    it('should run queries', async () => {
      const result = await cmisClient.cmisQuery('select * from cmis:document', {
        maxItems: 10,
      });
      expect(result).toHaveProperty('results');
    });
  });

  describe('CMIS Repository Services Test', () => {
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

    it('should get the definition of the type', async () => {
      await cmisClient.getTypeDefinition('sap:link');
    });

    it('should get the descendants of a type', async () => {
      await cmisClient.getTypeDescendants('cmis:document');
    });
  });

  describe('CMIS Navigation Services Test', () => {
    let folder: CreateFolderResponse;
    let subFolder: CreateFolderResponse;
    it('should get children', async () => {
      // Create some folder and subfolder
      folder = await cmisClient.createFolder(`folder-${Date.now()}`);
      subFolder = await cmisClient.createFolder(`subFolder1-${Date.now()}`, {
        folderPath: folder.succinctProperties['cmis:name'],
      });

      const result = await cmisClient.getChildren(
        folder.succinctProperties['cmis:objectId'],
      );
      expect(result).toHaveProperty('objects');
    });

    it('should get descendants', async () => {
      await cmisClient.getDescendants(
        folder.succinctProperties['cmis:objectId'],
      );
    });

    it('should get folder tree', async () => {
      await cmisClient.getFolderTree(
        folder.succinctProperties['cmis:objectId'],
      );
    });

    it('should get parent', async () => {
      await cmisClient.getParent(subFolder.succinctProperties['cmis:objectId']);
    });

    it('should get children of the given type', async () => {
      await cmisClient.getTypeChildren('cmis:document');
    });

    it('should get the content URL', async () => {
      const sampleDocument = {
        succinctProperties: {
          'cmis:objectId': 'sampleId',
          'sap:thumbnailContentStreamId': 'sampleThumbnailStreamId',
          'cmis:contentStreamId': 'sampleContentStreamId',
        },
      };

      const url = await cmisClient.getDocumentUriPath(sampleDocument);

      const expectedBasePath = `/browser/${
        cmisClient.getDefaultRepository().repositoryId
      }/root`;
      const expectedContentUrl = `${expectedBasePath}?cmisselector=content&objectId=sampleId&streamId=sampleContentStreamId`;
      const expectedThumbnailUrl = `${expectedBasePath}?cmisselector=content&objectId=sampleId&streamId=sampleThumbnailStreamId`;

      expect(url.content).toBe(expectedContentUrl);
      expect(url.thumbnail).toBe(expectedThumbnailUrl);
    });
  });
});
