/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Moveobject } from './schema';
/**
 * Representation of the 'MoveObjectApi'.
 * This API is part of the 'MoveObjectApi' service.
 */
export const MoveObjectApi = {
  /**
   * It moves the object which can be folder, link, share, document type from the source folder into the targeted folder recursively moving children inside folder if present.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (repositoryId: string, body: any) =>
    new OpenApiRequestBuilder<Moveobject>(
      'post',
      '/browser/{repositoryId}/root',
      {
        pathParameters: { repositoryId },
        body
      }
    )
};
