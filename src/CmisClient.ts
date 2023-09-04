import { HttpDestinationOrFetchOptions } from "@sap-cloud-sdk/connectivity";
import * as middlewares from "./middleware";

import * as CmisGeneratedApi from "./generated";
import {
  transformToQueryArrayFormat,
  transformObjectToCmisProperties,
  transformJsonToFormData,
} from "./util/Transform";

import { BaseOptions, WriteOptions, AddAclProperty, CreateType } from "./types";
import { CreateSecondaryType as CreateSecondaryTypeConstants } from "./util/Constants";

export class CmisClient {
  private repositories: CmisGeneratedApi.FetchRepositoryResponse;
  private defaultRepository: CmisGeneratedApi.Repository;

  constructor(
    private readonly destination: HttpDestinationOrFetchOptions,
    private globalParameters?: BaseOptions
  ) {
    if (!globalParameters) {
      this.globalParameters = {
        _charset: "UTF-8",
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
    addACEs: Array<AddAclProperty.InputAcl>,
    options: BaseOptions & {
      ACLPropagation?: "objectonly" | "propagate" | "repositorydetermined";
    } = { ACLPropagation: "repositorydetermined" }
  ): Promise<CmisGeneratedApi.AddAclPropertyResponse> {
    const formattedAddACEs = transformToQueryArrayFormat(addACEs);
    const requestBody = {
      cmisaction: "applyAcl",
      ...formattedAddACEs,
      ...this.globalParameters,
      ...options,
    };

    const api = CmisGeneratedApi.addAclPropertyApi;
    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
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
    options: BaseOptions & { isLastChunk?: boolean } = { isLastChunk: false }
  ): Promise<CmisGeneratedApi.CreateDocumentResponse> {
    const bodyData = {
      cmisaction: "appendContent",
      objectId,
      ...this.globalParameters,
      ...options,
    };

    const requestBody = transformJsonToFormData(bodyData);
    if (contentStream) requestBody.append("content", contentStream, filename);

    const api = CmisGeneratedApi.appendContentStreamApi;
    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .execute(this.destination);
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
    options: BaseOptions & {
      searchAllVersions?: boolean;
      includeRelationships?: "none" | "source" | "target" | "both";
      renditionFilter?: string;
      includeAllowableActions?: boolean;
      maxItems?: number;
      skipCount?: number;
    } = {
      searchAllVersions: false,
    }
  ): Promise<CmisGeneratedApi.CMISQueryResponse> {
    const parameters = {
      cmisSelector: "query",
      q: encodeURIComponent(statement),
      ...this.globalParameters,
      ...options,
    };

    const api = CmisGeneratedApi.cmisQueryApi;
    return api
      .getBrowserByRepositoryId(this.defaultRepository.repositoryId, parameters)
      .execute(this.destination);
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
  async cancelCheckOutDocument(
    objectId: string,
    options: BaseOptions = {}
  ): Promise<void> {
    const requestBody = {
      cmisaction: "cancelCheckOut",
      objectId,
      ...this.globalParameters,
      ...options,
    };

    const api = CmisGeneratedApi.cancelCheckoutDocumentApi;

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
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
      checkinComment: "not set",
    }
  ): Promise<CmisGeneratedApi.CreateDocumentResponse> {
    const { cmisProperties, ...optionalParameters } = options;
    const allCmisProperties = {
      ...transformObjectToCmisProperties(cmisProperties || {}),
    };

    const requestBody = {
      cmisaction: "checkIn",
      objectId,
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.checkInDocumentApi;

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
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
    } & BaseOptions = {}
  ): Promise<CmisGeneratedApi.CreateDocumentResponse> {
    const requestBody = {
      cmisaction: "checkOut",
      objectId,
      ...this.globalParameters,
      ...options,
    };

    const api = CmisGeneratedApi.checkOutDocumentApi;

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
  }

  /**
   * Creates a new document object within the specified location in the repository.
   *
   * This method allows for the creation of a document object based on a given type, typically specified by the cmis:objectTypeId property.
   *
   * @param filename - The name that will be assigned to the document object.
   * @param content - The actual content/data of the document to be stored.
   * @param options - Options for document creation.
   * @property options.folderPath - The path within the repository where the document will be created. If not provided, the default location may be used.
   *
   * @returns Promise resolving to the created document object with its metadata and other relevant details.
   */
  async createDocument(
    filename: string,
    content: any,
    options: WriteOptions & {
      folderPath?: string;
    } = {}
  ): Promise<CmisGeneratedApi.CreateDocumentResponse> {
    const { cmisProperties, ...optionalParameters } = options;
    const allCmisProperties = transformObjectToCmisProperties({
      "cmis:name": filename,
      "cmis:objectTypeId": "cmis:document",
      ...(cmisProperties || {}),
    });

    const bodyData = {
      cmisaction: "createDocument",
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const requestBody = transformJsonToFormData(bodyData);
    if (content) requestBody.append("content", content, filename);

    const api = CmisGeneratedApi.createDocumentApi;
    if (!options.folderPath) {
      return api
        .createBrowserRootByRepositoryId(
          this.defaultRepository.repositoryId,
          requestBody
        )
        .execute(this.destination);
    } else {
      return api
        .createBrowserRootByRepositoryIdAndDirectoryPath(
          this.defaultRepository.repositoryId,
          options.folderPath,
          requestBody
        )
        .execute(this.destination);
    }
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
    } = {}
  ): Promise<CmisGeneratedApi.CreateDocumentResponse> {
    const { cmisProperties, ...optionalParameters } = options;
    const allCmisProperties = {
      ...transformObjectToCmisProperties(cmisProperties || {}),
    };

    const requestBody = {
      cmisaction: "createDocumentFromSource",
      sourceId,
      objectId: targetFolderId || this.defaultRepository.rootFolderId,
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.createDocumentfromSourceApi;

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
  }

  /**
   * Creates a favorite link object for a specified object if a favorites repository is configured.
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
    objectId: string
  ): Promise<CmisGeneratedApi.CreateDocumentResponse> {
    return this.updateProperties(objectId, {
      cmisProperties: {
        "cmis:secondaryObjectTypeIds": ["sap:createFavorite"],
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
    } = {}
  ): Promise<CmisGeneratedApi.CreateFolderResponse> {
    const { cmisProperties, ...optionalParameters } = options;
    const allCmisProperties = transformObjectToCmisProperties({
      "cmis:name": name,
      "cmis:objectTypeId": "cmis:folder",
      ...(cmisProperties || {}),
    });

    const requestBody = {
      cmisaction: "createFolder",
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.createFolderApi;

    if (!options.folderPath) {
      return api
        .createBrowserRootByRepositoryId(
          this.defaultRepository.repositoryId,
          requestBody
        )
        .middleware(middlewares.jsonToFormData)
        .execute(this.destination);
    } else {
      return api
        .createBrowserRootByRepositoryIdAndDirectoryPath(
          this.defaultRepository.repositoryId,
          options.folderPath,
          requestBody
        )
        .middleware(middlewares.jsonToFormData)
        .execute(this.destination);
    }
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
    options: WriteOptions = {}
  ): Promise<CmisGeneratedApi.CreateDocumentResponse> {
    const requiredCmisPropeties = transformObjectToCmisProperties({
      "cmis:name": title || url,
      "cmis:objectTypeId": "cmis:document",
      "cmis:secondaryObjectTypeIds": "sap:createLink",
      "sap:linkRepositoryId": this.defaultRepository.repositoryId,
      "sap:linkExternalURL": url,
    });

    const { cmisProperties, ...optionalParameters } = options;

    const allCmisProperties = {
      ...transformObjectToCmisProperties(cmisProperties || {}),
      ...requiredCmisPropeties,
    };

    const requestBody = {
      cmisaction: "createDocument",
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.createLinkApi;

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
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
    type: CreateType.TypeInput,
    options: BaseOptions = {}
  ): Promise<CmisGeneratedApi.CreateDocumentResponse> {
    const propertyDefinitions: CreateType.PropertyDefinitions = {};
    const { DEFAULT_SECONDARY_TYPE, DEFAULT_PROPERTY_DEFINITION } =
      CreateSecondaryTypeConstants;

    // Merge property definitions with defaults
    for (const key in type.propertyDefinitions) {
      propertyDefinitions[key] = {
        ...DEFAULT_PROPERTY_DEFINITION,
        ...type.propertyDefinitions[key],
      };
    }

    // Construct the final secondary type definition
    const finalSecondaryType: CreateType.Type = {
      ...DEFAULT_SECONDARY_TYPE,
      ...type,
      propertyDefinitions,
    };

    const requestBody = {
      cmisaction: "createType",
      type: JSON.stringify(finalSecondaryType),
      ...this.globalParameters,
      ...options,
    };

    const api = CmisGeneratedApi.createTypeApi;

    return api
      .createBrowserByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
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
    options: BaseOptions = {}
  ): Promise<CmisGeneratedApi.CreateDocumentResponse> {
    return this.createFolder(name, {
      ...options,
      cmisProperties: {
        "cmis:objectTypeId": "sap:share",
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
    } = { allVersions: true }
  ): Promise<void> {
    const requestBody = {
      cmisaction: "delete",
      objectId,
      ...options,
    };

    const api = CmisGeneratedApi.deleteObjectApi;

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
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
    objectId: string
  ): Promise<CmisGeneratedApi.CreateDocumentResponse> {
    const api = CmisGeneratedApi.deletePermanentlyApi;

    return api
      .createBrowserRootByRepositoryId(this.defaultRepository.repositoryId, {
        cmisselector: "deletePermanent",
        objectId,
      })
      .execute(this.destination);
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
      unfileObjects?: "unfile" | "deletesinglefiled" | "delete";
      continueOnFailure?: boolean;
    } = {
      allVersions: true,
      unfileObjects: "delete",
      continueOnFailure: false,
    }
  ): Promise<any> {
    const api = CmisGeneratedApi.deleteTreeApi;

    const requestBody = {
      cmisaction: "deleteTree",
      objectId: folderId,
      ...options,
    };

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
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
  async fetchRepository(
    repositoryId?: string
  ): Promise<CmisGeneratedApi.FetchRepositoryResponse> {
    const api = CmisGeneratedApi.fetchRepositoryApi;

    this.repositories = await api.getBrowser().execute(this.destination);

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
        "Repositories not initialized. Please execute CmisClient.getRepositories() first."
      );
    }

    const repository: CmisGeneratedApi.Repository =
      this.repositories[repositoryId];
    if (!repository) {
      throw new Error(
        `No repository found for the provided ID: ${repositoryId}`
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
      download: "attachment" | "inline";
    } = { download: "attachment" }
  ): Promise<any> {
    const api = CmisGeneratedApi.downloadAFileApi;

    const requestBody = {
      cmisselector: "content",
      download: options.download,
      filename: options.filename,
      objectId,
    };

    return api
      .getBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .execute(this.destination);
  }

  /**
   * Generates a thumbnail for a specified document based on its ID.
   *
   * @param objectId - The unique identifier of the document for which the thumbnail is to be generated.
   * @returns A promise that resolves to the URL or path of the generated thumbnail.
   */
  async generateThumbnail(objectId: string): Promise<string> {
    const api = CmisGeneratedApi.generateThumbnailApi;

    return api
      .createBrowserRootByRepositoryId(this.defaultRepository.repositoryId, {
        cmisAction: "generateThumbnail",
        objectId,
      })
      .execute(this.destination);
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
    } & BaseOptions = {
      filter: "*",
      includeAllowableActions: true,
      renditionFilter: "cmis:none",
    }
  ): Promise<CmisGeneratedApi.GetAclPropertyResponse> {
    const api = CmisGeneratedApi.getAclPropertyApi;

    const requestBody = {
      objectId,
      cmisselector: "object",
      ...this.globalParameters,
      includeACL: true,
      ...options,
    };

    return api
      .getBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .execute(this.destination);
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
    } & BaseOptions = {
      filter: "*",
    }
  ): Promise<CmisGeneratedApi.GetAllowableActionsResponse> {
    const api = CmisGeneratedApi.getAllowableActionsApi;

    const requestBody = {
      objectId,
      cmisselector: "allowableActions",
      ...this.globalParameters,
      ...options,
    };

    return api
      .getBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .execute(this.destination);
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
      includeRelationships?: "none" | "source" | "target" | "both";
      renditionFilter?: string;
    } & BaseOptions = {
      filter: "*",
      includeAllowableActions: false,
      includePathSegment: false,
      includeRelationships: "none",
    }
  ): Promise<CmisGeneratedApi.GetChildrenResponse> {
    const api = CmisGeneratedApi.getChildrenApi;

    const requestBody = {
      objectId,
      cmisselector: "children",
      ...this.globalParameters,
      ...options,
    };

    return api
      .getBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        /**
         * The `any` type assertion is used here to bypass the "orderBy" property type restriction.
         * For some reason, it was defined that the possible values are 'none', 'common', or 'custom'.
         * However, these are the possible values for the repository's capabilityOrderBy.
         * In this context, "orderBy" should accept a string.
         */
        requestBody as any
      )
      .execute(this.destination);
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
    options: BaseOptions = {}
  ): Promise<CmisGeneratedApi.GetDeletedChildrenResponse> {
    const api = CmisGeneratedApi.getDeletedChildrenApi;

    const requestBody = {
      objectId,
      cmisselector: "deletedChildren",
      ...this.globalParameters,
      ...options,
    };

    return api
      .getBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .execute(this.destination);
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
    objectId: string,
    options: {
      filter?: string;
      maxItems?: number;
      skipCount?: number;
      orderBy?: string;
      includeAllowableActions?: boolean;
      includePathSegment?: boolean;
      includeRelationships?: "none" | "source" | "target" | "both";
      renditionFilter?: string;
    } & BaseOptions = {
      filter: "*",
      includeAllowableActions: false,
      includePathSegment: false,
      includeRelationships: "none",
    }
  ): Promise<CmisGeneratedApi.GetDescendantsResponse> {
    const api = CmisGeneratedApi.getDescendantsApi;

    const requestBody = {
      objectId,
      cmisselector: "descendants",
      ...this.globalParameters,
      ...options,
    };

    return api
      .getBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        /**
         * The `any` type assertion is used here to bypass the "orderBy" property type restriction.
         * For some reason, it was defined that the possible values are 'none', 'common', or 'custom'.
         * However, these are the possible values for the repository's capabilityOrderBy.
         * In this context, "orderBy" should accept a string.
         */
        requestBody as any
      )
      .execute(this.destination);
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
    objectId: string,
    options: {
      depth?: number;
      filter?: string;
      includeAllowableActions?: boolean;
      includePathSegment?: boolean;
      includeRelationships?: "none" | "source" | "target" | "both";
      renditionFilter?: string;
    } & BaseOptions = {
      depth: 1,
      filter: "*",
      includeAllowableActions: false,
      includePathSegment: false,
      includeRelationships: "none",
    }
  ): Promise<CmisGeneratedApi.GetFolderTreeResponse> {
    const api = CmisGeneratedApi.getFolderTreeApi;

    const requestBody = {
      objectId,
      cmisselector: "folderTree",
      ...this.globalParameters,
      ...options,
    };

    return api
      .getBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody as any
      )
      .execute(this.destination);
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
      includeRelationships?: "none" | "source" | "target" | "both";
      renditionFilter?: string;
      includePolicyIds?: boolean;
    } & BaseOptions = {
      filter: "*",
      includeAllowableActions: false,
      includePathSegment: false,
      includeRelationships: "none",
      includePolicyIds: false,
    }
  ): Promise<CmisGeneratedApi.GetObjectResponse> {
    const api = CmisGeneratedApi.getObjectApi;

    const requestBody = {
      objectId,
      cmisselector: "object",
      ...this.globalParameters,
      ...options,
    };

    return api
      .getBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        /**
         * The `any` type assertion is used here to bypass the "orderBy" property type restriction.
         * For some reason, it was defined that the possible values are 'none', 'common', or 'custom'.
         * However, these are the possible values for the repository's capabilityOrderBy.
         * In this context, "orderBy" should accept a string.
         */
        requestBody as any
      )
      .execute(this.destination);
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
      includeRelationships?: "none" | "source" | "target" | "both";
      renditionFilter?: string;
      includePolicyIds?: boolean;
    } & BaseOptions = {
      filter: "*",
      includeAllowableActions: false,
      includePathSegment: false,
      includeRelationships: "none",
      includePolicyIds: false,
    }
  ): Promise<CmisGeneratedApi.GetPropertiesApiResponse> {
    const api = CmisGeneratedApi.getPropertiesApi;

    const requestBody = {
      objectId,
      cmisselector: "object",
      ...this.globalParameters,
      ...options,
    };

    return api
      .getBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        /**
         * The `any` type assertion is used here to bypass the "orderBy" property type restriction.
         * For some reason, it was defined that the possible values are 'none', 'common', or 'custom'.
         * However, these are the possible values for the repository's capabilityOrderBy.
         * In this context, "orderBy" should accept a string.
         */
        requestBody as any
      )
      .execute(this.destination);
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
    } & BaseOptions = {
      filter: "*",
    }
  ): Promise<CmisGeneratedApi.GetParentResponse> {
    const api = CmisGeneratedApi.getParentApi;

    const requestBody = {
      objectId,
      cmisselector: "parent",
      ...this.globalParameters,
      ...options,
    };

    return api
      .getBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody as any
      )
      .execute(this.destination);
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
    } & BaseOptions = {
      includePropertiesDefinition: false,
    }
  ): Promise<CmisGeneratedApi.GetParentResponse> {
    const api = CmisGeneratedApi.getTypeChildrenApi;

    const requestBody = {
      typeId,
      cmisselector: "typeChildren",
      repositoryId: this.defaultRepository.repositoryId,
      ...this.globalParameters,
      ...options,
    };

    return api
      .getBrowserByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody as any
      )
      .execute(this.destination);
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
    options: WriteOptions = {}
  ): Promise<CmisGeneratedApi.UpdatePropertiesResponse> {
    const { cmisProperties, ...optionalParameters } = options;
    const allCmisProperties = {
      ...transformObjectToCmisProperties(cmisProperties || {}),
    };

    const requestBody = {
      cmisaction: "update",
      objectId,
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.updatePropertiesApi;

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
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
   * Set parameters that should be sent in all requests
   * @param value - Default Options
   */
  setGlobalParameters(value: BaseOptions): void {
    this.globalParameters = value;
  }

  /**==========================================================================================
   * PRIVATE
   *==========================================================================================*/
}
