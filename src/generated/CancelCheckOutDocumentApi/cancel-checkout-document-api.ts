/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'CancelCheckoutDocumentApi'.
 * This API is part of the 'CancelCheckOutDocumentApi' service.
 */
export const CancelCheckoutDocumentApi = {
  /**
   * Reverses the eﬀect of a check-out (check out). Removes the Private Working Copy of the checked-out document, allowing other documents in the version series to be checked out again.
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
