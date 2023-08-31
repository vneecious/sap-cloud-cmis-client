/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Copyobject } from './schema';
/**
 * Representation of the 'CreateDocumentfromSourceApi'.
 * This API is part of the 'CreateDocumentFromSourceApi' service.
 */
export const CreateDocumentfromSourceApi = {
  /**
   * It creates copy of document from the source folder into a targeted folder without changing any properties of the document.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (repositoryId: string, body: any) =>
    new OpenApiRequestBuilder<Copyobject>(
      'post',
      '/browser/{repositoryId}/root',
      {
        pathParameters: { repositoryId },
        body
      }
    )
};
