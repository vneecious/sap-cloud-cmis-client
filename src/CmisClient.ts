import { HttpDestinationOrFetchOptions } from "@sap-cloud-sdk/connectivity";
import * as middlewares from "./middleware";

import * as CmisGeneratedApi from "./generated";
import {
  transformInputToBody,
  transformInputToPropetyBody,
  transformJsonToFormData,
} from "./util/Transform";

import { Object as AddAclPropertyResponse } from "./generated/AddAclPropertyApi";
import { Object as CmisRepository } from "./generated/ServiceApi";
import { Object as CreateFolderResponse } from "./generated/CreateFolderApi";
import { Object as CMISQueryResponse } from "./generated/CMISQueryApi";
import { Object as CreateDocumentResponse } from "./generated/CreateDocumentApi";

export type BaseInput = {
  succinct?: boolean;
};

export interface InputAcl {
  addACEPrincipal: string;
  addACEPermission: Array<string>;
}

export type InputFolder = {
  name: string;
} & BaseInput;

export type InputDocument = {
  filename: string;
  content: any;
  includeAllowableActions?: boolean;
} & BaseInput;

export class CmisClient {
  private repositories: CmisRepository;
  private defaultRepository: CmisRepository;
  private charset: string;

  constructor(private readonly destination: HttpDestinationOrFetchOptions) {}

  /**==========================================================================================
   * CMIS API METHODS
   *==========================================================================================/

  /**
   * It adds a list of  Access Control Entries(ACE) to the Access Control List(ACL) of an object with permissions that can be of cmis:read, cmis:write, all.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param objectId - The object to be updated
   * @param acl - ACL to be added.
   * @returns Response data.
   */
  async addAclProperty(
    objectId: string,
    acl: Array<InputAcl>
  ): Promise<AddAclPropertyResponse> {
    const transformedAcl = transformInputToBody(acl);
    const api = CmisGeneratedApi.AddAclPropertyApi.AddAclPropertyApi;

    const body = {
      cmisaction: "applyAcl",
      ACLPropagation: "propagate",
      ...transformedAcl,
    };

    return api
      .createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        body
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
   * @param folder - Folder data
   * @param directoryPath - [OPTIONAL] path where the folder must be created
   * @returns
   */
  async createFolder(
    folder: InputFolder,
    directoryPath?: string
  ): Promise<CreateFolderResponse> {
    const transformedProperties = transformInputToPropetyBody({
      "cmis:name": folder.name,
      "cmis:objectTypeId": "cmis:folder",
    });

    const bodyData = {
      cmisaction: "createFolder",
      succinct: folder.succinct,
      ...transformedProperties,
    };

    const api = CmisGeneratedApi.CreateFolderApi.CreateFolderApi;

    if (!directoryPath) {
      return api
        .createBrowserRootByRepositoryId(
          this.defaultRepository.repositoryId,
          bodyData
        )
        .middleware(middlewares.jsonToFormData)
        .execute(this.destination);
    } else {
      return api
        .createBrowserRootByRepositoryIdAndDirectoryPath(
          this.defaultRepository.repositoryId,
          directoryPath,
          bodyData
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
    document: InputDocument,
    directoryPath?: string
  ): Promise<CreateDocumentResponse> {
    const documentProperties = {
      "cmis:name": document.filename,
      "cmis:objectTypeId": "cmis:document",
    };

    const { content, ...otherData } = document;

    const transformedProperties =
      transformInputToPropetyBody(documentProperties);

    const bodyData = {
      cmisaction: "createDocument",
      ...transformedProperties,
      ...otherData,
    };

    const body = transformJsonToFormData(bodyData);
    body.append("content", content, otherData.filename);

    const api = CmisGeneratedApi.CreateDocumentApi.CreateDocumentApi;
    if (!directoryPath) {
      return api
        .createBrowserRootByRepositoryId(
          this.defaultRepository.repositoryId,
          body
        )
        .execute(this.destination);
    } else {
      return api
        .createBrowserRootByRepositoryIdAndDirectoryPath(
          this.defaultRepository.repositoryId,
          directoryPath,
          body
        )
        .execute(this.destination);
    }
  }

  /**
   * It provides a type-based query service for discovering objects that match speciﬁed criteria, by deﬁning a read-only projection of the CMIS data model into a relational view
   * Through this relational view, queries may be performed via a simpliﬁed SQL SELECT statement.
   * @param queryParameters - Object containing the following keys: cmisSelector, q.
   * @returns
   */
  async query(q: string): Promise<CMISQueryResponse> {
    const parameters = {
      cmisSelector: "query",
      q: encodeURIComponent(q),
    };

    const api = CmisGeneratedApi.CMISQuery.CMISQueryApi;
    return api
      .getBrowserByRepositoryId(this.defaultRepository.repositoryId, parameters)
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

  /**==========================================================================================
   * PRIVATE
   *==========================================================================================*/
  setCharset(value: string) {
    this.charset = value;
  }
}
