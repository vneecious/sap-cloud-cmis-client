/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { RepoObject } from './schema';
/**
 * Representation of the 'FetchRepositoryApi'.
 * This API is part of the 'ServiceApi' service.
 */
export const FetchRepositoryApi = {
  /**
   * Provides detailed information of all the Content Management Interoperability Services(CMIS) repositories linked to an instance with all the necessary information for connecting to them. Response is an object with key as repoID and value will be an object with all necessary information of the repo.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowser: () => new OpenApiRequestBuilder<RepoObject>('get', '/browser')
};
