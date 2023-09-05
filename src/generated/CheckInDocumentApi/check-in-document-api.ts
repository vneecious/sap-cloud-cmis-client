/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'CheckInDocumentApi'.
 * This API is part of the 'CheckInDocumentApi' service.
 */
export const CheckInDocumentApi = {
  /**
   * It checks in the document that was checked out as private working copy (PWC).
   * @param repositoryId - The repository to be used is identified using the repository ID.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (repositoryId: string, body: any) =>
    new OpenApiRequestBuilder<Object>('post', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      body,
    }),
};
