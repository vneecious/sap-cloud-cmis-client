/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'DeleteObjectApi'.
 * This API is part of the 'DeleteObjectApi' service.
 */
export const DeleteObjectApi = {
  /**
   * It deletes the specified objects and all of it's properties present in a repository
   * @param repositoryId - The repository to be used is identified using repository id
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (repositoryId: string, body: any) =>
    new OpenApiRequestBuilder<any>('post', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      body
    })
};
