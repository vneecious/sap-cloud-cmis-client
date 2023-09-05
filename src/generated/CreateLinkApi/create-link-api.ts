/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { LinkObject } from './schema';
/**
 * Representation of the 'CreateLinkApi'.
 * This API is part of the 'CreateLinkApi' service.
 */
export const CreateLinkApi = {
  /**
   * It creates a link type object under a specified repository for which the name and URL for the link should be provided.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (repositoryId: string, body: any) =>
    new OpenApiRequestBuilder<LinkObject>(
      'post',
      '/browser/{repositoryId}/root',
      {
        pathParameters: { repositoryId },
        body,
      }
    ),
};
