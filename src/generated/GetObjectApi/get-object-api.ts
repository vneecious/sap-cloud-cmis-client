/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'GetObjectApi'.
 * This API is part of the 'GetObjectApi' service.
 */
export const GetObjectApi = {
  /**
   * It provides the information for the specified object in the root folder of repository where the object can be of folder, link, document type.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisselector, objectId, filter, maxItems, skipCount, includeAllowableActions, includeRelationships, renditionFilter, succinct, includePolicyIds, includeACL.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserRootByRepositoryId: (
    repositoryId: string,
    queryParameters?: {
      cmisselector?: string;
      objectId?: string;
      filter?: string;
      maxItems?: number;
      skipCount?: number;
      includeAllowableActions?: boolean;
      includeRelationships?: 'None' | 'Source' | 'target' | 'Both';
      renditionFilter?: string;
      succinct?: boolean;
      includePolicyIds?: boolean;
      includeACL?: boolean;
    }
  ) =>
    new OpenApiRequestBuilder<Object>('get', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      queryParameters,
    }),
  /**
   * It provides the information for the specified object where the object can be of folder, link, document type.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param directoryPath - The folder path to get the object.
   * @param queryParameters - Object containing the following keys: cmisselector, objectId, filter, maxItems, skipCount, includeAllowableActions, includeRelationships, renditionFilter, succinct, includePolicyIds, includeACL.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserRootByRepositoryIdAndDirectoryPath: (
    repositoryId: string,
    directoryPath: string,
    queryParameters?: {
      cmisselector?: string;
      objectId?: string;
      filter?: string;
      maxItems?: number;
      skipCount?: number;
      includeAllowableActions?: boolean;
      includeRelationships?: 'None' | 'Source' | 'target' | 'Both';
      renditionFilter?: string;
      succinct?: boolean;
      includePolicyIds?: boolean;
      includeACL?: boolean;
    }
  ) =>
    new OpenApiRequestBuilder<Object>(
      'get',
      '/browser/{repositoryId}/root/{directoryPath}',
      {
        pathParameters: { repositoryId, directoryPath },
        queryParameters,
      }
    ),
};
