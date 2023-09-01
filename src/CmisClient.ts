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
  additionalProperties?: Array<Record<string, string>>;
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
    const { additionalProperties, ...optionalParameters } = options;
    const cmisProperties = {
      ...transformedAcl,
      ...transformObjectToCmisProperties(additionalProperties || {}),
    };

    const requestBody = {
      cmisaction: "applyAcl",
      ...cmisProperties,
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
    const { additionalProperties, ...optionalParameters } = options;
    const cmisProperties = transformObjectToCmisProperties({
      ...(additionalProperties || {}),
    });

    const bodyData = {
      cmisaction: "appendContent",
      objectId,
      ...cmisProperties,
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
    const { additionalProperties, ...optionalParameters } = options;
    const cmisProperties = transformObjectToCmisProperties({
      ...(additionalProperties || {}),
    });

    const parameters = {
      cmisSelector: "query",
      q: encodeURIComponent(q),
      ...cmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CmisGeneratedApi.CMISQuery.CMISQueryApi;
    return api
      .getBrowserByRepositoryId(this.defaultRepository.repositoryId, parameters)
      .execute(this.destination);
  }

  /**
   * It checks in the document that was checked out as private working copy (PWC).
   * @param objectId - The object to be updated
   * @param acl - ACL to be added.
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
    const { additionalProperties, ...optionalParameters } = options;
    const cmisProperties = {
      ...transformObjectToCmisProperties(additionalProperties || {}),
    };

    const requestBody = {
      cmisaction: "checkIn",
      objectId,
      ...cmisProperties,
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
   * @param acl - ACL to be added.
   * @param options
   * @returns Response data.
   */
  async checkOutDocument(
    objectId: string,
    options: {
      includeAllowableAction?: boolean;
    } & ReadOptions = {}
  ): Promise<CmisDocument> {
    const { additionalProperties, ...optionalParameters } = options;
    const cmisProperties = {
      ...transformObjectToCmisProperties(additionalProperties || {}),
    };

    const requestBody = {
      cmisaction: "checkOut",
      objectId,
      ...cmisProperties,
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
    const { additionalProperties, ...optionalParameters } = options;
    const cmisProperties = transformObjectToCmisProperties({
      "cmis:name": name,
      "cmis:objectTypeId": "cmis:folder",
      ...(additionalProperties || {}),
    });

    const requestBody = {
      cmisaction: "createFolder",
      ...cmisProperties,
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
    const { additionalProperties, ...optionalParameters } = options;
    const cmisProperties = transformObjectToCmisProperties({
      "cmis:name": filename,
      "cmis:objectTypeId": "cmis:document",
      ...(additionalProperties || {}),
    });

    const bodyData = {
      cmisaction: "createDocument",
      ...cmisProperties,
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
