/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { ApiResponse } from './schema';
/**
 * Representation of the 'GetDeletedChildrenApi'.
 * This API is part of the 'GetDeletedChildrenApi' service.
 */
export const GetDeletedChildrenApi = {
  /**
   * It returns the list of child objects deleted from the specified folder. When the objectId of the folder is not specified, the root folder is assumed by default.
   * @param repositoryId - The repository to be used is identified using the repository ID.
   * @param queryParameters - Object containing the following keys: cmisselector, objectId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserRootByRepositoryId: (
    repositoryId: string,
    queryParameters: { cmisselector: string; objectId?: string }
  ) =>
    new OpenApiRequestBuilder<ApiResponse>(
      'get',
      '/browser/{repositoryId}/root',
      {
        pathParameters: { repositoryId },
        queryParameters
      }
    )
};
