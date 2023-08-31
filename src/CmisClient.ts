import { HttpDestinationOrFetchOptions } from "@sap-cloud-sdk/connectivity";
import * as middlewares from "./middleware";

import * as CmisGeneratedApi from "./generated";
import {
  transformInputToBody,
  transformInputToPropetyBody,
} from "./util/Transform";

import { Object as AddAclPropertyResponse } from "./generated/AddAclPropertyApi";
import { Object as CmisRepository } from "./generated/ServiceApi";
import { Object as CreateFolderResponse } from "./generated/CreateFolderApi";

export interface InputAcl {
  addACEPrincipal: string;
  addACEPermission: Array<string>;
}

export interface InputFolder {
  "cmis:name": string;
  succinct: boolean;
}

export class CmisClient {
  private repositories: CmisRepository;
  private defaultRepository: CmisRepository;
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
    const body = {
      cmisaction: "applyAcl",
      ACLPropagation: "propagate",
      ...transformInputToBody(acl),
    };

    return CmisGeneratedApi.AddAclPropertyApi.AddAclPropertyApi.createBrowserRootByRepositoryId(
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
    this.repositories =
      await CmisGeneratedApi.ServiceApi.FetchRepositoryApi.getBrowser().execute(
        this.destination
      );

    if (repositoryId) {
      this.setDefaultRepository(repositoryId);
    }

    this.defaultRepository = Object.values(this.repositories)[0];
    return this.repositories;
  }

  /**
   * Create a new Folder in the given directoryPath. If no directoryPath is given, then creates it in the root folder
   * @param folder - Folder data
   * @param directoryPath - [OPTIONAL] path where the folder must be created
   * @returns
   */
  async createFolder(
    { succinct = true, ...folder }: InputFolder,
    directoryPath?: string
  ): Promise<CreateFolderResponse> {
    const body = {
      cmisaction: "createFolder",
      succinct: succinct,
      ...transformInputToPropetyBody({
        ...folder,
        "cmis:objectTypeId": "cmis:folder",
      }),
    };

    if (!directoryPath)
      return await CmisGeneratedApi.CreateFolderApi.CreateFolderApi.createBrowserRootByRepositoryId(
        this.defaultRepository.repositoryId,
        body
      )
        .middleware(middlewares.jsonToFormData)
        .execute(this.destination);

    return await CmisGeneratedApi.CreateFolderApi.CreateFolderApi.createBrowserRootByRepositoryIdAndDirectoryPath(
      this.defaultRepository.repositoryId,
      directoryPath,
      body
    )
      .middleware(middlewares.jsonToFormData)
      .execute(this.destination);
  }

  /**
   * It provides a type-based query service for discovering objects that match speciﬁed criteria, by deﬁning a read-only projection of the CMIS data model into a relational view
   * Through this relational view, queries may be performed via a simpliﬁed SQL SELECT statement.
   * @param queryParameters - Object containing the following keys: cmisSelector, q.
   * @returns
   */
  async query(q: string) {
    const parameters = {
      cmisSelector: "query",
      q: encodeURIComponent(q),
    };

    return await CmisGeneratedApi.CMISQuery.CMISQueryApi.getBrowserByRepositoryId(
      this.defaultRepository.repositoryId,
      parameters
    ).execute(this.destination);
  }

  /**==========================================================================================
   * CMIS CLIENT SPECIFIC METHODS
   *==========================================================================================/

  /**
   * Set the given repository Id as the default
   * @param repositoryId Repository ID
   */
  setDefaultRepository(repositoryId: string) {
    const newRepository = this.repositories[repositoryId];
    if (!newRepository) {
      throw new Error(`No repository found with ID: ${repositoryId}`);
    }
    this.defaultRepository = newRepository;
  }
}
