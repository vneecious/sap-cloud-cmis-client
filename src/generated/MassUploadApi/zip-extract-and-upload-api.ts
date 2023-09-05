/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { ObjectSchema } from './schema';
/**
 * Representation of the 'ZipExtractAndUploadApi'.
 * This API is part of the 'MassUploadApi' service.
 */
export const ZipExtractAndUploadApi = {
  /**
   * It creates a folder with the zip name and all the contents inside the zip, folder or document are created inside it. The maximum size that can be uploaded is 4GB and the maximum entries in zip can be 10000.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (repositoryId: string, body: any) =>
    new OpenApiRequestBuilder<ObjectSchema>(
      'post',
      '/browser/{repositoryId}/root',
      {
        pathParameters: { repositoryId },
        body,
      }
    ),
};
