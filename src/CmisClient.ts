/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpDestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import * as middlewares from './middleware';

import * as CmisGeneratedApi from './generated';
import {
  transformToQueryArrayFormat,
  transformObjectToCmisProperties,
  transformJsonToFormData,
} from './util/Transform';

import {
  BaseCmisOptions,
  WriteOptions,
  BaseOptions,
  AddAcl,
  CMISTypeInput,
  CMISTypePropertyDefinitions,
  CMISType,
  RemoveAcl,
  CMISTypePropertyDefinition,
} from './types';
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import {
  DEFAULT_CMIS_PROPERTY_DEFINITION,
  DEFAULT_SECONDARY_TYPE,
} from './util/Constants';

export class CmisClient {
  private repositories: CmisGeneratedApi.FetchRepositoryResponse;
  private defaultRepository: CmisGeneratedApi.Repository;

  constructor(
    private readonly destination: HttpDestinationOrFetchOptions,
    private globalParameters?: BaseCmisOptions,
  ) {
    if (!globalParameters) {
      this.globalParameters = {
        _charset: 'UTF-8',
        succinct: true,
      };
    }
  }

  /**==========================================================================================
   * CMIS API METHODS
   *==========================================================================================*/

  /**
   * Adds a list of Access Control Entries (ACE) to the Access Control List (ACL) of an object.
   * The permissions can include values such as cmis:read, cmis:write, and all.
   *
   * @param objectId - The ID of the object to which the ACEs should be added.
   * @param addACEs - The list of ACEs to be added.
   * @param options - Optional parameters to modify the ACL behavior.
   * @property options.ACLPropagation - Specifies how ACEs should be applied.
   * - "objectonly": Apply ACEs only to the object without changing the ACLs of other objects.
   * - "propagate": Apply ACEs by propagating the changes to all inheriting objects.
   * - "repositorydetermined": (default) Let the repository determine the behavior.
   *
   * @returns The response data from the addition operation.
   */
  async addAclProperty(
    objectId: string,
    addACEs: Array<AddAcl>,
    options: BaseCmisOptions & {
      ACLPropagation?: 'objectonly' | 'propagate' | 'repositorydetermined';
    } = { ACLPropagation: 'repositorydetermined' },
  ): Promise<CmisGeneratedApi.AddAclPropertyResponse | HttpResponse> {
    const formattedAddACEs = transformToQueryArrayFormat(addACEs);
    const { config, ...optionalParams } = options;

    const requestBody = {
      cmisaction: 'applyAcl',
      ...formattedAddACEs,
      ...this.globalParameters,
      ...optionalParams,
    };

    const api = CmisGeneratedApi.addAclPropertyApi;
    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request = request.middleware(middlewares.jsonToFormData);
    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Appends a content stream to the content stream of the document and refreshes this object afterwards.
   * If the repository created a new version, this new document is returned. Otherwise, the current document is returned.
   *
   * @param objectId - The ID of the document.
   * @param filename - The name of the file (e.g., filename.json).
   * @param contentStream - The content stream to be appended to the existing content.
   * @param options - Optional parameters to modify the append behavior.
   * @property options.isLastChunk - Indicates whether this is the last chunk of content. If `true`, this is the last chunk, and no additional chunks are expected. Defaults to `false`.
   *
   * @returns The updated or new document.
   */
  async appendContentStream(
    objectId: string,
    filename: string,
    contentStream: any,
    options: BaseCmisOptions & { isLastChunk?: boolean } = {
      isLastChunk: false,
    },
  ): Promise<CmisGeneratedApi.CreateDocumentResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const bodyData = {
      cmisaction: 'appendContent',
      objectId,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const requestBody = transformJsonToFormData(bodyData);
    if (contentStream) requestBody.append('content', contentStream, filename);

    const api = CmisGeneratedApi.appendContentStreamApi;
    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Provides a type-based query service for discovering objects that match specified criteria.
   * Through this relational view, queries may be performed via a simplified SQL SELECT statement.
   *
   * @param statement - CMIS query to be executed.
   * @param options - Additional query options.
   * @property {boolean} [options.searchAllVersions] - If TRUE, the repository MUST include both the latest and non-latest versions of document objects in the query search scope. Default is FALSE.
   * @property {"none"|"source"|"target"|"both"} [options.includeRelationships] - Determines which relationships of the returned objects should be returned. If the SELECT clause contains properties from multiple tables, this MUST be "none". Defaults to "none".
   * @property {string} [options.renditionFilter] - Defines the renditions to be included. If the SELECT clause contains properties from more than one table, this value MUST not be set.
   *
   * Examples for `renditionFilter`:
   * - `*`: Include all renditions.
   * - `cmis:thumbnail`: Include only thumbnails.
   * - `image/*`: Include all image renditions.
   * - `application/pdf,application/x-shockwave-flash`: Include web ready renditions.
   * - `cmis:none`: Exclude all renditions (Default).
   *
   * @property {boolean} [options.includeAllowableActions] - If TRUE, the repository MUST return the available actions for each object in the result set. If the SELECT clause contains properties from more than one table, this MUST be FALSE. Defaults to FALSE.
   * @property {number} [options.maxItems] - The maximum number of items to return in a response.
   * @property {number} [options.skipCount] - The number of potential results the repository should skip. Defaults to 0.
   *
   * @returns {Promise<CmisQueryResponse>} - Returns the result of the CMIS query.
   */
  async cmisQuery(
    statement: string,
    options: BaseCmisOptions & {
      searchAllVersions?: boolean;
      includeRelationships?: 'none' | 'source' | 'target' | 'both';
      renditionFilter?: string;
      includeAllowableActions?: boolean;
      maxItems?: number;
      skipCount?: number;
    } = {
      searchAllVersions: false,
    },
  ): Promise<CmisGeneratedApi.CMISQueryResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const parameters = {
      cmisSelector: 'query',
      q: encodeURIComponent(statement),
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.cmisQueryApi;
    let request = api.getBrowserByRepositoryId(
      this.defaultRepository.repositoryId,
      parameters,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Reverses the eﬀect of a check-out
   * Removes the Private Working Copy of the checked-out document, allowing other documents in the version series to be checked out again.
   * If the private working copy has been created by createDocument, cancelCheckOut will delete the created document.
   *
   * @param objectId - The identiﬁer of the Private Working Copy.
   * @param options - Additional options.
   * @returns Promise<void>
   */
  async cancelCheckOut(
    objectId: string,
    options: BaseCmisOptions = {},
  ): Promise<any> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      cmisaction: 'cancelCheckOut',
      objectId,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.cancelCheckoutDocumentApi;
    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request = request.middleware(middlewares.jsonToFormData);

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Checks in the document that was checked out as a private working copy (PWC).
   *
   * @param objectId The identifier for the Private Working Copy.
   * @param options Options for the check-in operation.
   * @property options.major If `true` (default), the checked-in document object will be a major version. If `false`, the checked-in document object will be a minor version.
   * @property options.checkinComment Textual comment associated with the given version. Defaults to "not set" if not provided.
   * @returns Promise containing the checked-in document.
   */
  async checkIn(
    objectId: string,
    options: {
      major?: boolean;
      checkinComment?: string;
    } & WriteOptions = {
      major: true,
      checkinComment: 'not set',
    },
  ): Promise<CmisGeneratedApi.CreateDocumentResponse | HttpResponse> {
    const { cmisProperties, config, ...optionalParameters } = options;
    const allCmisProperties = {
      ...transformObjectToCmisProperties(cmisProperties || {}),
    };

    const requestBody = {
      cmisaction: 'checkIn',
      objectId,
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.checkInDocumentApi;

    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request.middleware(middlewares.jsonToFormData);

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Create a private working copy (PWC) of the document.
   * @param objectId The identiﬁer for the document version object that should be checked out.
   * @param options Options for the check-out operation.
   * @returns Promise containing the created private working copy
   */
  async checkOut(
    objectId: string,
    options: {
      includeAllowableActions?: boolean;
    } & BaseCmisOptions = {},
  ): Promise<CmisGeneratedApi.CreateDocumentResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      cmisaction: 'checkOut',
      objectId,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.checkOutDocumentApi;
    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request = request.middleware(middlewares.jsonToFormData);
    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Creates a new document object within the specified location in the repository.
   *
   * This method allows for the creation of a document object based on a given type, typically specified by the cmis:objectTypeId property.
   *
   * @param name - The name that will be assigned to the document object.
   * @param content - The actual content/data of the document to be stored.
   * @param options - Options for document creation.
   * @property options.folderPath - The path within the repository where the document will be created. If not provided, the default location may be used.
   *
   * @returns Promise resolving to the created document object with its metadata and other relevant details.
   */
  async createDocument(
    name: string,
    content: any,
    options: WriteOptions & {
      folderPath?: string;
      versioningState?: 'none' | 'checkedout' | 'major' | 'minor';
    } = { versioningState: 'major' },
  ): Promise<CmisGeneratedApi.CreateDocumentResponse | HttpResponse> {
    const { cmisProperties, config, ...optionalParameters } = options;

    const allCmisProperties = transformObjectToCmisProperties({
      'cmis:name': name,
      'cmis:objectTypeId': 'cmis:document',
      ...(cmisProperties || {}),
    });

    const bodyData = {
      cmisaction: 'createDocument',
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const requestBody = transformJsonToFormData(bodyData);
    if (content) requestBody.append('content', content, name);

    const api = CmisGeneratedApi.createDocumentApi;

    let request: OpenApiRequestBuilder<CmisGeneratedApi.CreateDocumentResponse>;
    if (!options.folderPath) {
      request = api.createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody,
      );
    } else {
      request = api.createBrowserRootByRepositoryIdAndDirectoryPath(
        this.defaultRepository.repositoryId,
        options.folderPath,
        requestBody,
      );
    }

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Creates a copy of a specified document, placing it into a target folder.
   *
   * This method allows for the duplication of an existing document within the repository without modifying the original document's properties.
   *
   * @param sourceId - The ID of the document object to be copied.
   * @param targetFolderId - The ID of the folder where the copied document should be placed. If not provided, the `folderPath` in the options will be used or the default location.
   * @param options - Configuration and settings for the document creation from the source.
   * @property options.folderPath - The path within the repository where the copied document will be placed. If `targetFolderId` is not provided, this path will be used. If neither are provided, the default location may be used.
   *
   * @returns Promise resolving to the copied document object with its metadata and other relevant details.
   */
  async createDocumentFromSource(
    sourceId: string,
    targetFolderId?: string,
    options: WriteOptions & {
      folderPath?: string;
    } = {},
  ): Promise<CmisGeneratedApi.CreateDocumentResponse | HttpResponse> {
    const { cmisProperties, config, ...optionalParameters } = options;
    const allCmisProperties = {
      ...transformObjectToCmisProperties(cmisProperties || {}),
    };

    const requestBody = {
      cmisaction: 'createDocumentFromSource',
      sourceId,
      objectId: targetFolderId || this.defaultRepository.rootFolderId,
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.createDocumentfromSourceApi;

    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request = request.middleware(middlewares.jsonToFormData);

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Creates a favorite link object for a specified object.
   *
   * This is not a standard CMIS service. It adds "sap:createFavorite" as a secondary object type
   * ID to the specified object.
   *
   * ⚠️ **[PRE-REQUISITES]**: : This method should only be used for favorites repositories. For more details, refer to the following documentation:
   * @see {@link https://help.sap.com/docs/document-management-service/sap-document-management-service/onboarding-favorites-repository}
   *
   * @param objectId - The ID of the object to be marked as a favorite.
   *
   * @returns A promise resolving to the updated document object.
   */
  async createFavorite(
    objectId: string,
    options: BaseOptions = {},
  ): Promise<CmisGeneratedApi.CreateDocumentResponse | HttpResponse> {
    return this.updateProperties(objectId, {
      ...options,
      cmisProperties: {
        'cmis:secondaryObjectTypeIds': ['sap:createFavorite'],
      },
    });
  }

  /**
   * Creates a folder object of the speciﬁed type in the speciﬁed location (options.folderPath).
   * If no folderPath is given, then creates it in the root folder
   * @param name - Folder name
   * @param options - Options for the folder creation.
   * @param options - Configuration and settings for the document creation from the source.
   * @property options.folderPath - The path within the repository where the copied document will be placed. If `targetFolderId` is not provided, this path will be used. If neither are provided, the default location may be used.
   * @returns
   */
  async createFolder(
    name: string,
    options: WriteOptions & {
      folderPath?: string;
    } = {},
  ): Promise<CmisGeneratedApi.CreateFolderResponse | HttpResponse> {
    const { cmisProperties, config, ...optionalParameters } = options;
    const allCmisProperties = transformObjectToCmisProperties({
      'cmis:name': name,
      'cmis:objectTypeId': 'cmis:folder',
      ...(cmisProperties || {}),
    });

    const requestBody = {
      cmisaction: 'createFolder',
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.createFolderApi;

    let request: OpenApiRequestBuilder<CmisGeneratedApi.CreateFolderResponse>;
    if (!options.folderPath) {
      request = api.createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody,
      );
    } else {
      request = api.createBrowserRootByRepositoryIdAndDirectoryPath(
        this.defaultRepository.repositoryId,
        options.folderPath,
        requestBody,
      );
    }

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request = request.middleware(middlewares.jsonToFormData);

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Creates a link object within a specified repository. The link object
   * represents a URL with an optional title. If no title is provided, the URL
   * itself will be used as the title.
   *
   * @param url - The URL that the link object will point to.
   * @param title - Optional. The title for the link. If not provided, the URL will be used as the title.
   * @param options - Additional options for creating the link.
   *
   * @returns A promise resolving to the created link document.
   */
  async createLink(
    url: string,
    title?: string,
    options: WriteOptions = {},
  ): Promise<CmisGeneratedApi.CreateDocumentResponse | HttpResponse> {
    const { cmisProperties, config, ...optionalParameters } = options;

    const requiredCmisPropeties = transformObjectToCmisProperties({
      'cmis:name': title || url,
      'cmis:objectTypeId': 'cmis:document',
      'cmis:secondaryObjectTypeIds': 'sap:createLink',
      'sap:linkRepositoryId': this.defaultRepository.repositoryId,
      'sap:linkExternalURL': url,
    });

    const allCmisProperties = {
      ...transformObjectToCmisProperties(cmisProperties || {}),
      ...requiredCmisPropeties,
    };

    const requestBody = {
      cmisaction: 'createDocument',
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.createLinkApi;

    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request.middleware(middlewares.jsonToFormData);

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Creates a new type definition in the CMIS repository, which serves as a subtype
   * of a previously defined parent type. This function ensures that the provided
   * type includes all the required property definitions by merging them with default
   * values where necessary.
   *
   * @param type - An object that describes the new type definition including its property definitions.
   * @param options - Additional options for the type creation request.
   *
   * @returns A promise resolving to the created type document.
   */
  async createType(
    type: CMISTypeInput,
    options: BaseCmisOptions = {},
  ): Promise<CmisGeneratedApi.CreateDocumentResponse | HttpResponse> {
    const propertyDefinitions: CMISTypePropertyDefinitions = {};
    // Merge property definitions with defaults
    for (const key in type.propertyDefinitions) {
      propertyDefinitions[key] = {
        ...DEFAULT_CMIS_PROPERTY_DEFINITION,
        ...type.propertyDefinitions[key],
      } as CMISTypePropertyDefinition;
    }

    // Construct the final secondary type definition
    const finalSecondaryType: CMISType = {
      ...DEFAULT_SECONDARY_TYPE,
      ...type,
      propertyDefinitions,
    } as CMISType;

    const { config, ...optionalParameters } = options;

    const requestBody = {
      cmisaction: 'createType',
      type: JSON.stringify(finalSecondaryType),
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.createTypeApi;

    let request = api.createBrowserByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request.middleware(middlewares.jsonToFormData);

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Creates a shared folder.
   *
   * ⚠️ **[PRE-REQUISITES]**: This method should only be used for collaboration repositories. For more details, refer to the following documentation:
   * @see {@link https://help.sap.com/docs/document-management-service/sap-document-management-service/collaboration-repositories-for-shared-folders}
   *
   * @param name - The name of the shared folder
   *
   * @returns A promise resolving to the updated document object.
   */
  async createShare(
    name: string,
    options: BaseCmisOptions = {},
  ): Promise<CmisGeneratedApi.CreateDocumentResponse | HttpResponse> {
    return this.createFolder(name, {
      ...options,
      cmisProperties: {
        'cmis:objectTypeId': 'sap:share',
      },
    });
  }

  /**
   * Deletes the specified object from the repository.
   *
   * Note: If the object being deleted is a Private Working Copy (PWC), the checkout associated with it will be discarded.
   *
   * @param objectId - Identifier of the object to be deleted.
   * @param options - Configuration settings for the deletion.
   *
   * @property options.allVersions - Determines if all versions of a document should be deleted.
   *                                 If set to TRUE (default), all versions of the document are deleted.
   *                                 If set to FALSE, only the specified document object is deleted.
   *                                 This property is disregarded when the service is invoked on non-document
   *                                 objects or non-versionable document objects.
   *
   * @returns A promise that resolves once the deletion operation is completed.
   */
  async deleteObject(
    objectId: string,
    options: {
      allVersions?: boolean;
    } & BaseOptions = { allVersions: true },
  ): Promise<any> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      cmisaction: 'delete',
      objectId,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.deleteObjectApi;
    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request = request.middleware(middlewares.jsonToFormData);

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Delete operation in the recycle bin, enabling the permanent deletion of objects from the
   * recycle bin. The 'objectId' may refer to either a document or a folder.
   *
   *
   * @param objectId - Object that should be permanently deleted
   * @returns
   */
  async deletePermanently(
    objectId: string,
    options: BaseOptions = {},
  ): Promise<CmisGeneratedApi.CreateDocumentResponse | HttpResponse> {
    const { config } = options;

    const api = CmisGeneratedApi.deletePermanentlyApi;
    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      {
        cmisselector: 'deletePermanent',
        objectId,
      },
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Deletes the specified folder object and all of its child- and descendant-objects.
   *
   * @param folderId - The identifier of the folder to be deleted.
   * @param options - Optional params.
   * @property options.allVersions - If true, delete all versions of all documents. If false, delete only the document versions referenced in the tree. Ignored when invoked on non-document objects or non-versionable document objects. Defaults to `true`.
   * @property options.unfileObjects - Specifies how the repository should process file-able child- or descendant-objects:
   * - "unfile": Unfile all fileable objects.
   * - "deletesinglefiled": Delete all fileable non-folder objects whose only parent-folders are in the current folder tree. Unfile all other fileable non-folder objects from the current folder tree.
   * - "delete": Delete all fileable objects. Defaults to `"delete"`.
   * @property options.continueOnFailure - If true, the repository should continue attempting to perform this operation even if a child or descendant object can't be deleted. If false, the repository should abort this method when a single child or descendant object deletion fails. Defaults to `false`.
   *
   * @returns Promise<void>
   */
  async deleteTree(
    folderId: string,
    options: {
      allVersions?: boolean;
      unfileObjects?: 'unfile' | 'deletesinglefiled' | 'delete';
      continueOnFailure?: boolean;
    } & BaseOptions = {
      allVersions: true,
      unfileObjects: 'delete',
      continueOnFailure: false,
    },
  ): Promise<any> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      cmisaction: 'deleteTree',
      objectId: folderId,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.deleteTreeApi;
    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request = request.middleware(middlewares.jsonToFormData);

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Retrieves detailed information about the specified CMIS (Content Management Interoperability Services) repository associated with the current instance.
   * It also provides essential data for establishing a connection.
   *
   * If no `repositoryId` is provided, the first available repository will be set as the default.
   *
   * @param repositoryId - Optional identifier for a specific repository. If omitted, the first repository is taken as default.
   *
   * @returns A promise resolving to the details of the available repositories.
   */
  async getRepositories(
    repositoryId?: string,
    options: BaseOptions = {},
  ): Promise<CmisGeneratedApi.FetchRepositoryResponse | HttpResponse> {
    const { config } = options;
    const api = CmisGeneratedApi.fetchRepositoryApi;

    let request = api.getBrowser();

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    this.repositories = await request.execute(this.destination);

    if (repositoryId) {
      this.setDefaultRepository(repositoryId);
    } else {
      this.defaultRepository = Object.values(this.repositories)[0];
    }

    return this.repositories;
  }

  /**
   * Fetches details for the specified CMIS repository.
   *
   * @param repositoryId - Identifier for the desired repository.
   * @throws {Error} If the repositories are not pre-loaded using `CmisClient.getRepositories()`.
   * @throws {Error} If the provided `repositoryId` does not correspond to any available repository.
   *
   * @returns Details of the specified repository.
   */
  getRepositoryInfo(repositoryId: string): CmisGeneratedApi.Repository {
    if (!this.repositories) {
      throw new Error(
        'Repositories not initialized. Please execute CmisClient.getRepositories() first.',
      );
    }

    const repository: CmisGeneratedApi.Repository =
      this.repositories[repositoryId];
    if (!repository) {
      throw new Error(
        `No repository found for the provided ID: ${repositoryId}`,
      );
    }

    return repository;
  }

  /**
   * Initiates the download of a specified document. Either directly returns the document content or redirects to a URL for download.
   *
   * @param objectId - Unique identifier for the desired document object.
   * @param options - Configuration options for the download.
   * @property options.filename - The desired name for the downloaded file. If not provided, the original name will be used.
   * @property options.download - Specifies the content disposition. "attachment" results in a download prompt, whereas "inline" attempts to display the content within the browser, if possible.
   *
   * @returns Promise resolving to the downloaded content or the redirection URL.
   */
  async downloadFile(
    objectId: string,
    options: {
      filename?: string;
      download?: 'attachment' | 'inline';
    } & BaseOptions = {
      download: 'attachment',
    },
  ): Promise<any> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      cmisselector: 'content',
      download: optionalParameters.download,
      filename: optionalParameters.filename,
      objectId,
    };

    const api = CmisGeneratedApi.downloadAFileApi;

    let request = api.getBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Generates a thumbnail for a specified document based on its ID.
   *
   * @param objectId - The unique identifier of the document for which the thumbnail is to be generated.
   * @returns A promise that resolves to the URL or path of the generated thumbnail.
   */
  async generateThumbnail(
    objectId: string,
    options: BaseOptions = {},
  ): Promise<CmisGeneratedApi.GenerateThumbnailResponse | HttpResponse> {
    const { config } = options;

    const api = CmisGeneratedApi.generateThumbnailApi;
    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      {
        cmisAction: 'generateThumbnail',
        objectId,
      },
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Retrieves the Access Control List (ACL) applied to the specified object.
   * The result can be expressed using only CMIS-defined permissions,
   * or it may also include repository-specific permissions.
   *
   * @param objectId - Identifier of the object for which the ACL should be fetched.
   * @param options - Configuration options for the request.
   * @property {string} [options.filter] - List of property query names to return (e.g., 'cmis:name,amount'). For secondary type properties, use the pattern <secondaryTypeQueryName>.<propertyQueryName>.
   * @property {boolean} [options.includeAllowableActions] - Indicates if allowable actions should be included.
   * @property {boolean} [options.includeACL] - Indicates if the ACL should be included.
   * @property {string} [options.renditionFilter] - Defines which renditions to include. Examples:
   *   - `*`: All renditions.
   *   - `cmis:thumbnail`: Only thumbnails.
   *   - `image/*`: All image renditions.
   *   - `application/pdf,application/x-shockwave-flash`: Web ready renditions.
   *   - `cmis:none`: No renditions (Default).
   *
   * @returns A promise that resolves to the ACL properties of the specified object.
   */
  async getACLProperty(
    objectId: string,
    options: {
      filter?: string;
      includeAllowableActions?: boolean;
      renditionFilter?: string;
    } & BaseCmisOptions = {
      filter: '*',
      includeAllowableActions: true,
      renditionFilter: 'cmis:none',
    },
  ): Promise<CmisGeneratedApi.GetAclPropertyResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      objectId,
      cmisselector: 'object',
      ...this.globalParameters,
      includeACL: true,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.getAclPropertyApi;
    let request = api.getBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Retrieves the list of allowable actions for a specified object.
   * This method helps determine the actions that can be performed on the object,
   * based on the object's ACLs (Access Control Lists).
   *
   * @param objectId - Identifier of the object for which allowable actions should be fetched.
   * @param options - Configuration options for the request.
   * @property {string} [options.filter] - List of property query names to return (e.g., 'cmis:name,amount').
   *                                       For secondary type properties, follow the format: <secondaryTypeQueryName>.<propertyQueryName>.
   *
   * @returns A promise that resolves to the allowable actions of the specified object.
   */
  async getAllowableActions(
    objectId: string,
    options: {
      filter?: string;
    } & BaseCmisOptions = {
      filter: '*',
    },
  ): Promise<CmisGeneratedApi.GetAllowableActionsResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      objectId,
      cmisselector: 'allowableActions',
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.getAllowableActionsApi;

    let request = api.getBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Retrieves the children of a specified object within the CMIS repository.
   *
   * This method is used to get the immediate descendants of a specified folder object. It's especially useful
   * for navigation or hierarchical content structures.
   *
   * @param objectId - Identifier of the object for which children should be fetched.
   * @param options - Configuration options for the request.
   * @property {string} [options.filter] - List of property query names to return (e.g., 'cmis:name,description').
   *                                       For secondary type properties, follow the format: <secondaryTypeQueryName>.<propertyQueryName>.
   * @property {number} [options.maxItems] - Maximum number of children to return.
   * @property {number} [options.skipCount] - Number of initial results to skip.
   * @property {string} [options.orderBy] - A comma-separated list of query names and an optional ascending modiﬁer "ASC" or descending modiﬁer "DESC" for each query name.
   *                                        If the modiﬁer is not stated, "ASC" is assumed
   * @property {boolean} [options.includeAllowableActions] - Whether to include allowable actions for each child.
   * @property {boolean} [options.includePathSegment] - Whether to include the path segment for each child.
   * @property {"none" | "source" | "target" | "both"} [options.includeRelationships] - Scope of the relationships to include.
   * @property {string} [options.renditionFilter] - Defines the renditions to be included in the response.
   *                                               Examples for `renditionFilter`:
   *                                               - `*`: Include all renditions.
   *                                               - `cmis:thumbnail`: Include only thumbnails.
   *                                               - `image/*`: Include all image renditions.
   *                                               - `application/pdf,application/x-shockwave-flash`: Include web ready renditions.
   *                                               - `cmis:none`: Exclude all renditions (Default).
   *
   * @returns A promise that resolves to the children of the specified object.
   */
  async getChildren(
    objectId: string,
    options: {
      filter?: string;
      maxItems?: number;
      skipCount?: number;
      orderBy?: string;
      includeAllowableActions?: boolean;
      includePathSegment?: boolean;
      includeRelationships?: 'none' | 'source' | 'target' | 'both';
      renditionFilter?: string;
    } & BaseCmisOptions = {
      filter: '*',
      includeAllowableActions: false,
      includePathSegment: false,
      includeRelationships: 'none',
    },
  ): Promise<CmisGeneratedApi.GetChildrenResponse | HttpResponse> {
    const { config, ...optionalparameters } = options;

    const requestBody = {
      objectId,
      cmisselector: 'children',
      ...this.globalParameters,
      ...optionalparameters,
    };

    const api = CmisGeneratedApi.getChildrenApi;
    let request = api.getBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      /**
       * The `any` type assertion is used here to bypass the "orderBy" property type restriction.
       * For some reason, it was defined that the possible values are 'none', 'common', or 'custom'.
       * However, these are the possible values for the repository's capabilityOrderBy.
       * In this context, "orderBy" should accept a string.
       */
      requestBody as any,
    );
    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * It returns the list of child objects deleted from the specified folder.
   * This is one of the recycle bin APIs that provides information about the immediate children deleted from a specified folder.
   * When the folder objectId is not mentioned, the root is considered by default.
   *
   * @param objectId - Identifier of the object for which children should be fetched.
   * @returns A promise that resolves to the children of the specified object.
   */
  async getDeletedChildren(
    objectId?: string,
    options: BaseCmisOptions = {},
  ): Promise<CmisGeneratedApi.GetDeletedChildrenResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;
    const requestBody = {
      objectId,
      cmisselector: 'deletedChildren',
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.getDeletedChildrenApi;

    let request = api.getBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Retrieves the descendants of a specified object in the CMIS repository,
   * including children of its child-folders.
   *
   * @param objectId - Identifier of the object whose descendants should be fetched.
   * @param options - Configuration options for fetching descendants.
   * @property {string} [options.filter] - List of property query names to return, e.g., 'cmis:name,description'.
   *                                      For secondary type properties, use: <secondaryTypeQueryName>.<propertyQueryName>.
   * @property {number} [options.maxItems] - Maximum number of descendants to return.
   * @property {number} [options.skipCount] - Number of initial results to skip.
   * @property {string} [options.orderBy] - Comma-separated list of query names with optional "ASC" or "DESC" modiﬁer.
   *                                        Defaults to "ASC" if not stated.
   * @property {boolean} [options.includeAllowableActions] - If true, includes allowable actions for each descendant.
   * @property {boolean} [options.includePathSegment] - If true, includes the path segment for each descendant.
   * @property {"none" | "source" | "target" | "both"} [options.includeRelationships] - Specifies the scope of relationships to include.
   * @property {string} [options.renditionFilter] - Renditions to include in the response, e.g.,
   *                                               '*' for all, 'cmis:thumbnail' for thumbnails.
   *
   * @returns A promise that resolves to an object containing the descendants of the specified object.
   */
  async getDescendants(
    objectId?: string,
    options: {
      filter?: string;
      maxItems?: number;
      skipCount?: number;
      orderBy?: string;
      includeAllowableActions?: boolean;
      includePathSegment?: boolean;
      includeRelationships?: 'none' | 'source' | 'target' | 'both';
      renditionFilter?: string;
    } & BaseCmisOptions = {
      filter: '*',
      includeAllowableActions: false,
      includePathSegment: false,
      includeRelationships: 'none',
    },
  ): Promise<CmisGeneratedApi.GetDescendantsResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      objectId: objectId || this.defaultRepository.rootFolderId,
      cmisselector: 'descendants',
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.getDescendantsApi;

    let request = api.getBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      /**
       * The `any` type assertion is used here to bypass the "orderBy" property type restriction.
       * For some reason, it was defined that the possible values are 'none', 'common', or 'custom'.
       * However, these are the possible values for the repository's capabilityOrderBy.
       * In this context, "orderBy" should accept a string.
       */
      requestBody as any,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * It returns the set of descendant folder objects contained in the speciﬁed folder. This operation does not support paging.
   * The order in which results are returned is repository-speciﬁc.
   *
   * @param objectId - Identifier of the folder object.
   * @param options - Configuration options for the request.
   * @property {number} [options.depth] - Depth in the folder hierarchy to fetch. Defaults to 1.
   * @property {string} [options.filter] - List of property query names to return (e.g., 'cmis:name,description').
   *                                      For secondary type properties, format as: <secondaryTypeQueryName>.<propertyQueryName>.
   * @property {boolean} [options.includeAllowableActions] - If true, includes allowable actions for each descendant.
   * @property {boolean} [options.includePathSegment] - If true, includes the path segment for each descendant.
   * @property {"none" | "source" | "target" | "both"} [options.includeRelationships] - Specifies the scope of relationships to be included.
   * @property {string} [options.renditionFilter] - Specifies renditions to be included in the response. Examples:
   *                                               - `*`: All renditions.
   *                                               - `cmis:thumbnail`: Thumbnails only.
   *
   * @returns A promise that resolves to an object containing the folder's tre.
   */
  async getFolderTree(
    objectId?: string,
    options: {
      depth?: number;
      filter?: string;
      includeAllowableActions?: boolean;
      includePathSegment?: boolean;
      includeRelationships?: 'none' | 'source' | 'target' | 'both';
      renditionFilter?: string;
    } & BaseCmisOptions = {
      depth: 1,
      filter: '*',
      includeAllowableActions: false,
      includePathSegment: false,
      includeRelationships: 'none',
    },
  ): Promise<CmisGeneratedApi.GetFolderTreeResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      objectId: objectId || this.defaultRepository.rootFolderId,
      cmisselector: 'folderTree',
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.getFolderTreeApi;

    let request = api.getBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody as any,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Retrieves the details of a specified object within the CMIS repository.
   *
   * @param objectId - Identifier of the object.
   * @param options - Configuration options for the request.
   * @property {string} [options.filter] - List of property query names to return (e.g., 'cmis:name,description').
   *                                       For secondary type properties, follow the format: <secondaryTypeQueryName>.<propertyQueryName>.
   * @property {number} [options.maxItems] - Maximum number of children to return.
   * @property {number} [options.skipCount] - Number of initial results to skip.
   * @property {string} [options.orderBy] - A comma-separated list of query names and an optional ascending modiﬁer "ASC" or descending modiﬁer "DESC" for each query name.
   *                                        If the modiﬁer is not stated, "ASC" is assumed
   * @property {boolean} [options.includeAllowableActions] - Whether to include allowable actions for each child.
   * @property {boolean} [options.includePathSegment] - Whether to include the path segment for each child.
   * @property {"none" | "source" | "target" | "both"} [options.includeRelationships] - Scope of the relationships to include.
   * @property {string} [options.renditionFilter] - Defines the renditions to be included in the response.
   *                                               Examples for `renditionFilter`:
   *                                               - `*`: Include all renditions.
   *                                               - `cmis:thumbnail`: Include only thumbnails.
   *                                               - `image/*`: Include all image renditions.
   *                                               - `application/pdf,application/x-shockwave-flash`: Include web ready renditions.
   *                                               - `cmis:none`: Exclude all renditions (Default).
   * @property {boolean} [options.includePolicyIds] - Indicates whether the repository should return the IDs of policies applied to the object. If set to `true`, the repository is required to return these IDs.
   * @returns A promise that resolves to the specified object.
   */
  async getObject(
    objectId: string,
    options: {
      filter?: string;
      maxItems?: number;
      skipCount?: number;
      orderBy?: string;
      includeAllowableActions?: boolean;
      includePathSegment?: boolean;
      includeRelationships?: 'none' | 'source' | 'target' | 'both';
      renditionFilter?: string;
      includePolicyIds?: boolean;
    } & BaseCmisOptions = {
      filter: '*',
      includeAllowableActions: false,
      includePathSegment: false,
      includeRelationships: 'none',
      includePolicyIds: false,
    },
  ): Promise<CmisGeneratedApi.CreateDocumentResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      objectId,
      cmisselector: 'object',
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.getObjectApi;

    let request = api.getBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      /**
       * The `any` type assertion is used here to bypass the "orderBy" property type restriction.
       * For some reason, it was defined that the possible values are 'none', 'common', or 'custom'.
       * However, these are the possible values for the repository's capabilityOrderBy.
       * In this context, "orderBy" should accept a string.
       */
      requestBody as any,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * It provides the information for the specified object where the object can be of folder, link, document type.
   *
   * @param objectId - Identifier of the object.
   * @param options - Configuration options for the request.
   * @property {string} [options.filter] - List of property query names to return (e.g., 'cmis:name,description').
   *                                       For secondary type properties, follow the format: <secondaryTypeQueryName>.<propertyQueryName>.
   * @property {number} [options.maxItems] - Maximum number of children to return.
   * @property {number} [options.skipCount] - Number of initial results to skip.
   * @property {string} [options.orderBy] - A comma-separated list of query names and an optional ascending modiﬁer "ASC" or descending modiﬁer "DESC" for each query name.
   *                                        If the modiﬁer is not stated, "ASC" is assumed
   * @property {boolean} [options.includeAllowableActions] - Whether to include allowable actions for each child.
   * @property {boolean} [options.includePathSegment] - Whether to include the path segment for each child.
   * @property {"none" | "source" | "target" | "both"} [options.includeRelationships] - Scope of the relationships to include.
   * @property {string} [options.renditionFilter] - Defines the renditions to be included in the response.
   *                                               Examples for `renditionFilter`:
   *                                               - `*`: Include all renditions.
   *                                               - `cmis:thumbnail`: Include only thumbnails.
   *                                               - `image/*`: Include all image renditions.
   *                                               - `application/pdf,application/x-shockwave-flash`: Include web ready renditions.
   *                                               - `cmis:none`: Exclude all renditions (Default).
   * @property {boolean} [options.includePolicyIds] - Indicates whether the repository should return the IDs of policies applied to the object. If set to `true`, the repository is required to return these IDs.
   * @returns A promise that resolves to the specified object.
   */
  async getProperties(
    objectId: string,
    options: {
      filter?: string;
      maxItems?: number;
      skipCount?: number;
      orderBy?: string;
      includeAllowableActions?: boolean;
      includePathSegment?: boolean;
      includeRelationships?: 'none' | 'source' | 'target' | 'both';
      renditionFilter?: string;
      includePolicyIds?: boolean;
    } & BaseCmisOptions = {
      filter: '*',
      includeAllowableActions: false,
      includePathSegment: false,
      includeRelationships: 'none',
      includePolicyIds: false,
    },
  ): Promise<CmisGeneratedApi.GetPropertiesApiResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      objectId,
      cmisselector: 'object',
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.getPropertiesApi;

    let request = api.getBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * It returns the parent folder object for the speciﬁed object. Every folder object, except for one which is called the root folder, must have one and only one parent folder.
   *
   * @param objectId - Identifier of the object for which children should be fetched.
   * @param options - Configuration options for the request.
   * @property {string} [options.filter] - List of property query names to return (e.g., 'cmis:name,description').
   *                                       For secondary type properties, follow the format: <secondaryTypeQueryName>.<propertyQueryName>.
   * @returns A promise that resolves to the parent of the specified object.
   */
  async getParent(
    objectId: string,
    options: {
      filter?: string;
    } & BaseCmisOptions = {
      filter: '*',
    },
  ): Promise<CmisGeneratedApi.GetParentResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      objectId,
      cmisselector: 'parent',
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.getParentApi;

    let request = api.getBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * It returns the list of object-types defined for the repository that are children of the specified type based on type Id, repository Id provided
   *
   * @param objectId - Identifier of the object for which children should be fetched.
   * @param options - Configuration options for the request.
   * @property {string} [options.includePropertiesDefinition] -
   * @property {number} [options.maxItem] -
   * @property {number} [options.skipCount] -
   * @returns A promise that resolves to the children of the given type.
   */
  async getTypeChildren(
    typeId: string,
    options: {
      includePropertiesDefinition?: boolean;
      maxItems?: number;
      skipCount?: number;
    } & BaseCmisOptions = {
      includePropertiesDefinition: false,
    },
  ): Promise<CmisGeneratedApi.GetTypeChildrenResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      typeId,
      cmisselector: 'typeChildren',
      repositoryId: this.defaultRepository.repositoryId,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.getTypeChildrenApi;

    let request = api.getBrowserByRepositoryId(
      this.defaultRepository.repositoryId,
      /**
       * The `any` type assertion is used here to bypass the "orderBy" property type restriction.
       * For some reason, it was defined that the possible values are 'none', 'common', or 'custom'.
       * However, these are the possible values for the repository's capabilityOrderBy.
       * In this context, "orderBy" should accept a string.
       */
      requestBody as any,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Gets the deﬁnition of the speciﬁed object-type.
   *
   * @param typeId - The typeId of an object-type speciﬁed in the repository
   * @param options - Configuration options for the request.
   * @returns A promise that resolves to the Object-type including all property deﬁnitions.
   */
  async getTypeDefinition(
    typeId: string,
    options: BaseCmisOptions = {},
  ): Promise<CmisGeneratedApi.GetTypeDefinitionResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      typeId,
      cmisselector: 'typeDefinition',
      repositoryId: this.defaultRepository.repositoryId,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.getTypeChildrenApi;

    let request = api.getBrowserByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Returns the set of the descendant object-types deﬁned for the Repository under the speciﬁed type.
   *
   * @param objectId - Identifier of the object for which descendants should be fetched.
   * @param options - Configuration options for the request.
   * @property {string} [options.includePropertiesDefinition] -
   * @property {number} [options.depth] -
   * @returns A promise that resolves to the hierarchy of object-types deﬁned for the repository
   */
  async getTypeDescendants(
    typeId: string,
    options: {
      includePropertiesDefinition?: boolean;
      depth?: number;
    } & BaseCmisOptions = {
      includePropertiesDefinition: false,
    },
  ): Promise<CmisGeneratedApi.GetTypeDescendantsResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      typeId,
      cmisselector: 'typeDescendants',
      repositoryId: this.defaultRepository.repositoryId,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.getTypeChildrenApi;

    let request = api.getBrowserByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Moves an object (e.g., folder, link, share, document) from a source folder to a target folder.
   * If the object is a folder, all its children are moved recursively.
   *
   * @param objectId - Identifier of the object to be moved.
   * @param sourceFolderId - Identifier of the source folder.
   * @param targetFolderId - Identifier of the destination folder.
   * @param options - Additional configuration options.
   * @returns A promise resolving to the result of the move operation or the full HTTP response if the `raw` option is set.
   */
  async moveObject(
    objectId: string,
    sourceFolderId: string,
    targetFolderId: string,
    options: BaseOptions = {},
  ): Promise<CmisGeneratedApi.MoveObjectResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      cmisaction: 'move',
      objectId,
      sourceFolderId,
      targetFolderId,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.moveObjectApi;
    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request = request.middleware(middlewares.jsonToFormData);

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * It creates a folder with the zip name and all the contents inside the zip, folder or document are created inside it.
   * The maximum size that can be uploaded is 4GB and the maximum entries in zip can be 10000.
   * @param filename - The name of the file (e.g., filename.zip).
   * @param content - The content
   * @param options - Optional parameters to modify the append behavior.
   *
   * @returns
   */
  async zipExtractAndUpload(
    filename: string,
    content: any,
    options: BaseOptions = {},
  ): Promise<CmisGeneratedApi.CreateDocumentResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    return this.createDocument(filename, content, {
      ...optionalParameters,
      config: {
        ...config,
        customHeaders: {
          zipExtraction: 'true',
        },
      },
    });
  }

  /**
   * Removes a list of Access Control Entries (ACE) from the Access Control List (ACL) of an object.
   * The permissions can include values such as cmis:read, cmis:write, and all.
   *
   * @param objectId - The ID of the object from which the ACEs should be removed.
   * @param removeACEs - The list of ACEs to be removed.
   * @param options - Optional parameters to modify the ACL behavior.
   * @property options.ACLPropagation - Specifies how ACEs should be applied.
   * - "objectonly": Apply ACEs only to the object without changing the ACLs of other objects.
   * - "propagate": Apply ACEs by propagating the changes to all inheriting objects.
   * - "repositorydetermined": (default) Let the repository determine the behavior.
   *
   * @returns The response data from the removing operation.
   */
  async removeAclProperty(
    objectId: string,
    removeACEs: Array<RemoveAcl>,
    options: BaseCmisOptions & {
      ACLPropagation?: 'objectonly' | 'propagate' | 'repositorydetermined';
    } = { ACLPropagation: 'repositorydetermined' },
  ): Promise<CmisGeneratedApi.RemoveAclPropertyResponse | HttpResponse> {
    const formattedRemoveACEs = transformToQueryArrayFormat(removeACEs);
    const { config, ...optionalParams } = options;

    const requestBody = {
      cmisaction: 'applyAcl',
      ...formattedRemoveACEs,
      ...this.globalParameters,
      ...optionalParams,
    };

    const api = CmisGeneratedApi.removeAlcPropertyApi;
    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request = request.middleware(middlewares.jsonToFormData);
    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Restores a deleted object, either a document or a folder, from the recycle bin.
   *
   * @param objectId - Identifier of the deleted object to be restored.
   * @param options - Additional configuration options.
   * @returns A promise resolving to the result of the restore operation or the full HTTP response if the `raw` option is set.
   */
  async restoreObject(
    objectId: string,
    options: BaseOptions = {},
  ): Promise<CmisGeneratedApi.RestoreObjectResponse | HttpResponse> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      cmisaction: 'restoreObject',
      objectId,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.restoreObjectApi;
    let request = api.updateBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request = request.middleware(middlewares.jsonToFormData);

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Updates properties and secondary types of the specified object.
   * All properties passed to updateProperties be updated to their new values.
   * Properties that are passed without a value will be set to their default value or un-set if no default value is defined.
   * All others property values remain untouched.
   * @param objectId - Object that should be updated
   * @param options
   * @returns Response data.
   */
  async updateProperties(
    objectId: string,
    options: WriteOptions = {},
  ): Promise<CmisGeneratedApi.UpdatePropertiesResponse | HttpResponse> {
    const { cmisProperties, config, ...optionalParameters } = options;
    const allCmisProperties = {
      ...transformObjectToCmisProperties(cmisProperties || {}),
    };

    const requestBody = {
      cmisaction: 'update',
      objectId,
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.updatePropertiesApi;

    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    request = request.middleware(middlewares.jsonToFormData);

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * It creates a temporary Zip information on HTTP session used to communicate
   * @param objectIds - An array with  the object ids that should be added to the zip file
   * @param options
   * @returns
   */
  async zipCreationForDownload(
    objectIds: string[],
    options: BaseCmisOptions = {},
  ): Promise<any> {
    const api = CmisGeneratedApi.zipCreationForDownload;
    const cmisProperties = transformObjectToCmisProperties({
      'cmis:objectTypeId': 'cmis:document',
    });
    const { config, ...optionalParameters } = options;

    const bodyData = {
      cmisaction: 'createDocument',
      objectId: 'sap:zipRendition',
      ...cmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const requestBody = transformJsonToFormData(bodyData);
    const media = Buffer.from(objectIds.join('\n'), 'utf-8');
    requestBody.append('media', media, {
      contentType: 'text/plain',
      filename: 'DUMMY.txt',
    });

    let request = api.createBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**
   * Initiates the download of a specified document. Either directly returns the document content or redirects to a URL for download.
   *
   * @param zipObjectId - The previously generated objectID while creating a ZIP request in same session
   * @param options - Configuration options for the download.
   * @property options.filename - The desired name for the downloaded file. If not provided, the original name will be used.
   * @property options.download - Specifies the content disposition. "attachment" results in a download prompt, whereas "inline" attempts to display the content within the browser, if possible.
   *
   * @returns Promise resolving to the downloaded content or the redirection URL.
   */
  async zipDownload(
    zipObjectId: string,
    options: {
      filename?: string;
      download?: 'attachment' | 'inline';
    } & BaseOptions = {
      filename: 'download.zip',
      download: 'attachment',
    },
  ): Promise<any> {
    const { config, ...optionalParameters } = options;

    const requestBody = {
      objectId: zipObjectId,
      streamId: 'sap:zipRendition',
      cmisSelector: 'content',
      download: optionalParameters.download,
      filename: optionalParameters.filename,
    };

    const api = CmisGeneratedApi.zipDownloadApi;

    let request = api.getBrowserRootByRepositoryId(
      this.defaultRepository.repositoryId,
      requestBody,
    );

    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    return config?.raw
      ? request.executeRaw(this.destination)
      : request.execute(this.destination);
  }

  /**==========================================================================================
   * CMIS CLIENT SPECIFIC METHODS
   *=========================================================================================*/

  /**
   * Set the given repository Id as the default
   * @param repositoryId Repository ID
   */
  setDefaultRepository(repositoryId: string): void {
    const newRepository = this.repositories[repositoryId];

    if (!newRepository) {
      throw new Error(`No repository found with ID: ${repositoryId}`);
    }

    this.defaultRepository = newRepository;
  }

  /**
   * Retrieves the content and thumbnail URIs for a given CMIS document.
   *
   * @async
   * @param {CmisGeneratedApi.CreateDocumentResponse | string} document - The CMIS document object or its ID as a string.
   * If a string is provided, it fetches the document using the `getObject` method.
   * @returns {Promise<{ content?: string; thumbnail?: string }>} An object containing URLs for content and thumbnail.
   * If the respective stream ID is not available, the URL property will not be set.
   *
   * @example
   * const { content, thumbnail } = await getObjectPath("documentId12345");
   * console.log(content);  // Outputs content URL
   * console.log(thumbnail);  // Outputs thumbnail URL
   */
  async getDocumentUriPath(
    document: CmisGeneratedApi.CreateDocumentResponse | string,
  ): Promise<{ content?: string; thumbnail?: string }> {
    const object =
      typeof document == 'string' ? await this.getObject(document) : document;

    const {
      'cmis:objectId': objectId,
      'cmis:thumbnailContentStreamId': thumbnailStreamId,
      'cmis:contentStreamId': contentStreamId,
    } = object.succinctProperties;

    const path = `/browser/${this.defaultRepository.repositoryId}/root`;

    const buildURL = (streamId: string) =>
      streamId
        ? `${path}?cmisselector=content&objectId=${objectId}&streamId=${streamId}`
        : null;

    return {
      content: buildURL(contentStreamId),
      thumbnail: buildURL(thumbnailStreamId),
    };
  }

  /**
   * Retrieves the default repository.
   *
   * @returns - The default CMIS repository.
   */
  getDefaultRepository(): CmisGeneratedApi.Repository {
    return this.defaultRepository;
  }

  /**
   * Set parameters that should be sent in all requests
   * @param value - Default Options
   */
  setGlobalParameters(value: BaseCmisOptions): void {
    this.globalParameters = value;
  }
}
