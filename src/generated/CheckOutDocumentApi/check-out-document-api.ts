/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'CheckOutDocumentApi'.
 * This API is part of the 'CheckOutDocumentApi' service.
 */
export const CheckOutDocumentApi = {
  /**
   * It creates a private working copy (PWC) of the document. A PWC is created by invoking Check Out on a versioned document object. A repository may allow any document object in a version series to be checked out, or may only allow the latest version to be checked out.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (repositoryId: string, body: any) =>
    new OpenApiRequestBuilder<Object>('post', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      body,
    }),
};
