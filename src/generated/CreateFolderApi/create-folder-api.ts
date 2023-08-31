/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'CreateFolderApi'.
 * This API is part of the 'CreateFolderApi' service.
 */
export const CreateFolderApi = {
  /**
   * It creates a folder object of the speciﬁed type in the repository's root folder. It should not have repetitive folder names and properties that must be applied to the newly created folder should be present
   * @param repositoryId - The repository to be used is identified using repository id
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (repositoryId: string, body: any) =>
    new OpenApiRequestBuilder<Object>('post', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      body
    }),
  /**
   * It creates a folder object of the speciﬁed type in the speciﬁed location. It should not have repetitive folder names and properties that must be applied to the newly created folder should be present
   * @param repositoryId - The repository to be used is identified using repository id
   * @param directoryPath - Path to create the folder.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryIdAndDirectoryPath: (
    repositoryId: string,
    directoryPath: string,
    body: any
  ) =>
    new OpenApiRequestBuilder<Object>(
      'post',
      '/browser/{repositoryId}/root/{directoryPath}',
      {
        pathParameters: { repositoryId, directoryPath },
        body
      }
    )
};
