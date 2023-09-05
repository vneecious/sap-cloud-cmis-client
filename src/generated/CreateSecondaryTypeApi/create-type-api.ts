/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'CreateTypeApi'.
 * This API is part of the 'CreateSecondaryTypeApi' service.
 */
export const CreateTypeApi = {
  /**
   * A secondary type deﬁnes a set of properties that can be dynamically added to and removed from objects. That is, an object can get and lose additional properties that are not deﬁned by its primary type during its lifetime. Multiple secondary types can be applied to the same object at the same time.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserByRepositoryId: (repositoryId: string, body: any) =>
    new OpenApiRequestBuilder<Record<string, any>>(
      'post',
      '/browser/{repositoryId}',
      {
        pathParameters: { repositoryId },
        body,
      }
    ),
};
