/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'AppendContentStreamApi'.
 * This API is part of the 'AppendContentStreamApi' service.
 */
export const AppendContentStreamApi = {
  /**
   * Appends a content stream to the content stream of the document and refreshes this object afterwards. If the repository created a new version, this new document is returned. Otherwise the current document is returned
   * @param repositoryId - The repository to be used is identified using repository id
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (repositoryId: string, body: any) =>
    new OpenApiRequestBuilder<Object>('post', '/browser/{repositoryId}/root/', {
      pathParameters: { repositoryId },
      body,
    }),
};
