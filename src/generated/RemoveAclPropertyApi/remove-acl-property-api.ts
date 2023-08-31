/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'RemoveAclPropertyApi'.
 * This API is part of the 'RemoveAclPropertyApi' service.
 */
export const RemoveAclPropertyApi = {
  /**
   * It removes Ace to or from the access control list of an object. A list of Ace's that must be removed from the newly-created document object, either using the access control list from folder Id if specified, or being ignored if no folder Id is specified.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (repositoryId: string, body: any) =>
    new OpenApiRequestBuilder<Object>('post', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      body
    })
};
