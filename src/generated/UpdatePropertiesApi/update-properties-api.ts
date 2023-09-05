/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'UpdatePropertiesApi'.
 * This API is part of the 'UpdatePropertiesApi' service.
 */
export const UpdatePropertiesApi = {
  /**
   * Updates properties and secondary types of the specified object. All properties passed to updateProperties be updated to their new values. Properties that are passed without a value will be set to their default value or un-set if no default value is defined. All others property values remain untouched.
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
