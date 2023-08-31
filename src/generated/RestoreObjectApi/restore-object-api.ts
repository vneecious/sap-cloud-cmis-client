/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { ApiResponse } from './schema';
/**
 * Representation of the 'RestoreObjectApi'.
 * This API is part of the 'RestoreObjectApi' service.
 */
export const RestoreObjectApi = {
  /**
   * Restores the document (or folder with all its deleted children) for the specified objectId.
   * @param repositoryId - The repository to be used is identified using the repository ID.
   * @param queryParameters - Object containing the following keys: cmisaction, objectId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateBrowserRootByRepositoryId: (
    repositoryId: string,
    queryParameters: { cmisaction: string; objectId: string }
  ) =>
    new OpenApiRequestBuilder<ApiResponse>(
      'put',
      '/browser/{repositoryId}/root',
      {
        pathParameters: { repositoryId },
        queryParameters
      }
    )
};
