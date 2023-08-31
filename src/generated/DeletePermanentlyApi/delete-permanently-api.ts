/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { ApiResponse } from './schema';
/**
 * Representation of the 'DeletePermanentlyApi'.
 * This API is part of the 'DeletePermanentlyApi' service.
 */
export const DeletePermanentlyApi = {
  /**
   * Deletes the document (or folder with all its deleted children) from the recycle bin permanently.
   * @param repositoryId - The repository to be used is identified using the repository ID.
   * @param queryParameters - Object containing the following keys: cmisselector, objectId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (
    repositoryId: string,
    queryParameters: { cmisselector: string; objectId: string }
  ) =>
    new OpenApiRequestBuilder<ApiResponse>(
      'post',
      '/browser/{repositoryId}/root',
      {
        pathParameters: { repositoryId },
        queryParameters
      }
    )
};
