import { HttpDestinationOrFetchOptions } from "@sap-cloud-sdk/connectivity";
import * as middlewares from "./middleware";

import * as CmisGeneratedApi from "./generated";
import {
  transformToQueryArrayFormat,
  transformObjectToCmisProperties,
  transformJsonToFormData,
} from "./util/Transform";

import { Object as CmisAddAclProperty } from "./generated/AddAclPropertyApi";
import { Object as CmisRepository } from "./generated/ServiceApi";
import { Object as CmisFolder } from "./generated/CreateFolderApi";
import { Object as CmisQuery } from "./generated/CMISQueryApi";
import { Object as CmisDocument } from "./generated/CreateDocumentApi";

export type GlobalParameters = {
  _charset?: string;
  succinct?: boolean;
};

export type ReadOptions = {
  cmisProperties?: Record<any, string | string[]>;
};

export type WriteOptions = {
  directoryPath?: string;
} & ReadOptions;

export type InputAcl = {
  addACEPrincipal: string;
  addACEPermission: Array<string>;
};

export class CmisClient {
  private repositories: CmisRepository;
  private defaultRepository: CmisRepository;

  constructor(
    private readonly destination: HttpDestinationOrFetchOptions,
    private globalParameters?: GlobalParameters
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
   * It adds a list of  Access Control Entries(ACE) to the Access Control List(ACL) of an object with permissions that can be of cmis:read, cmis:write, all.
   * @param objectId - The object to be updated
   * @param acl - ACL to be added.
   * @param options
   * @returns Response data.
   */
  async addAclProperty(
    objectId: string,
    acl: Array<InputAcl>,
    options: {
      ACLPropagation?: "objectonly" | "propagate" | "repositorydetermined";
    } & ReadOptions = {}
  ): Promise<CmisAddAclProperty> {
    const transformedAcl = transformToQueryArrayFormat(acl);
    const { cmisProperties, ...optionalParameters } = options;
    const allCmisProperties = {
      ...transformedAcl,
      ...transformObjectToCmisProperties(cmisProperties || {}),
    };

    const requestBody = {
      cmisaction: "applyAcl",
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.AddAclPropertyApi.AddAclPropertyApi;

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
   * If the repository created a new version, this new document is returned. Otherwise the current document is returned
   * @param objectId - Document Id
   * @param filename - Filename (ex: filename.json)
   * @param content - File content. It can be whatever FormData accepts (Blob, Buffer, Stream)
   * @param options - Optional options
   * @returns the document
   */
  async appendContentStream(
    objectId: string,
    filename: string,
    content: any,
    options: { isLastChunk?: boolean } & Omit<
      WriteOptions,
      "directoryPath"
    > = {}
  ): Promise<CmisDocument> {
    const { cmisProperties, ...optionalParameters } = options;
    const allCmisProperties = transformObjectToCmisProperties({
      ...(cmisProperties || {}),
    });

    const bodyData = {
      cmisaction: "appendContent",
      objectId,
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const requestBody = transformJsonToFormData(bodyData);
    requestBody.append("content", content, filename);

    const api = CmisGeneratedApi.AppendContentStreamApi.AppendContentStreamApi;
    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .execute(this.destination);
  }

  /**
   * It provides a type-based query service for discovering objects that match speciﬁed criteria, by deﬁning a read-only projection of the CMIS data model into a relational view
   * Through this relational view, queries may be performed via a simpliﬁed SQL SELECT statement.
   * @param queryParameters - Object containing the following keys: cmisSelector, q.
   * @returns
   */
  async cmisQuery(q: string, options: ReadOptions = {}): Promise<CmisQuery> {
    const { cmisProperties, ...optionalParameters } = options;
    const allCmisProperties = transformObjectToCmisProperties({
      ...(cmisProperties || {}),
    });

    const parameters = {
      cmisSelector: "query",
      q: encodeURIComponent(q),
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.CMISQuery.CMISQueryApi;
    return api
      .getBrowserByRepositoryId(this.defaultRepository.repositoryId, parameters)
      .execute(this.destination);
  }

  /**
   * Reverses the eﬀect of a check-out (check out). Removes the Private Working Copy of the checked-out document, allowing other documents in the version series to be checked out again.
   * @param objectId - The object to be updated
   * @param acl - ACL to be added.
   * @param options
   * @returns Response data.
   */
  async cancelCheckOutDocument(
    objectId: string,
    options: {
      includeAllowableAction?: boolean;
    } & ReadOptions = {}
  ): Promise<CmisDocument> {
    const { cmisProperties, ...optionalParameters } = options;
    const allCmisProperties = {
      ...transformObjectToCmisProperties(cmisProperties || {}),
    };

    const requestBody = {
      cmisaction: "cancelCheckOut",
      objectId,
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api =
      CmisGeneratedApi.CancelCheckoutDocumentApi.CancelCheckoutDocumentApi;

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
  }

  /**
   * It checks in the document that was checked out as private working copy (PWC).
   * @param objectId - The object to be updated
   * @param options
   * @returns Response data.
   */
  async checkInDocument(
    objectId: string,
    options: {
      checkinComment?: string;
      major?: boolean;
    } & ReadOptions = {}
  ): Promise<CmisDocument> {
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

    const api = CmisGeneratedApi.CheckInDocumentApi.CheckInDocumentApi;

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
  }

  /**
   * It checks in the document that was checked out as private working copy (PWC).
   * @param objectId - The object to be updated
   * @param options
   * @returns Response data.
   */
  async checkOutDocument(
    objectId: string,
    options: {
      includeAllowableAction?: boolean;
    } & ReadOptions = {}
  ): Promise<CmisDocument> {
    const { cmisProperties, ...optionalParameters } = options;
    const allCmisProperties = {
      ...transformObjectToCmisProperties(cmisProperties || {}),
    };

    const requestBody = {
      cmisaction: "checkOut",
      objectId,
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.CheckOutDocumentApi.CheckOutDocumentApi;

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
  }

  /**
   * It creates copy of document from the source folder into a targeted folder without changing any properties of the document.
   * @param sourceId - The object that should be copied
   * @param targetFolderId - the folder where to copy should be placed
   * @param options
   * @returns Response data.
   */
  async createDocumentFromSource(
    sourceId: string,
    targetFolderId?: string,
    options: ReadOptions = {}
  ): Promise<CmisDocument> {
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

    const api =
      CmisGeneratedApi.CreateDocumentfromSourceApi.CreateDocumentfromSourceApi;

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        requestBody
      )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
  }

  /**
   * Creates favorite link object for the specified object if favorites repository configured
   * This is not a default CMIS method. It just add "sap:createFavorite" as an secondary object type id
   * of the object.
   * @param objectId - object that will be marked as favorite
   * @returns Response data.
   */
  async createFavorite(objectId: string): Promise<CmisDocument> {
    return this.updateProperties(objectId, {
      cmisProperties: {
        "cmis:secondaryObjectTypeIds": ["sap:createFavorite"],
      },
    });
  }

  /**
   * Provides detailed information of the given Content Management Interoperability Services(CMIS) repository linked to and instance and all the necessary information for connecting to it.
   * If no repositoryId is given, fetch all of them and set the first one as the default.
   */
  async fetchRepository(repositoryId?: string): Promise<CmisRepository> {
    const api = CmisGeneratedApi.ServiceApi.FetchRepositoryApi;

    this.repositories = await api.getBrowser().execute(this.destination);

    if (repositoryId) {
      this.setDefaultRepository(repositoryId);
    } else {
      this.defaultRepository = Object.values(this.repositories)[0];
    }

    return this.repositories;
  }

  /**
   * Create a new Folder in the given directoryPath. If no directoryPath is given, then creates it in the root folder
   * @param name - Folder name
   * @param directoryPath - [OPTIONAL] path where the folder must be created
   * @returns
   */
  async createFolder(
    name: string,
    options: WriteOptions = {}
  ): Promise<CmisFolder> {
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

    const api = CmisGeneratedApi.CreateFolderApi.CreateFolderApi;

    if (!options.directoryPath) {
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
          options.directoryPath,
          requestBody
        )
        .middleware(middlewares.jsonToFormData)
        .execute(this.destination);
    }
  }

  /**
   * It creates a document object of the speciﬁed type (given by the cmis:objectTypeId property) in the speciﬁed location.
   * @param document - document data
   * @param directoryPath - The folder path to create the document object.
   * @returns
   */
  async createDocument(
    filename: string,
    content: any,
    options: { includeAllowableActions?: boolean } & WriteOptions = {}
  ): Promise<CmisDocument> {
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
    requestBody.append("content", content, filename);

    const api = CmisGeneratedApi.CreateDocumentApi.CreateDocumentApi;
    if (!options.directoryPath) {
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
          options.directoryPath,
          requestBody
        )
        .execute(this.destination);
    }
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
    options: ReadOptions = {}
  ): Promise<CmisDocument> {
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

    const api = CmisGeneratedApi.UpdatePropertiesApi.UpdatePropertiesApi;

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
  setGlobalParameters(value: GlobalParameters): void {
    this.globalParameters = value;
  }

  /**==========================================================================================
   * PRIVATE
   *==========================================================================================*/
}
