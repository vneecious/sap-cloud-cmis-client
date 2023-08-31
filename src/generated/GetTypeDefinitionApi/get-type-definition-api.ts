/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'GetTypeDefinitionApi'.
 * This API is part of the 'GetTypeDefinitionApi' service.
 */
export const GetTypeDefinitionApi = {
  /**
   * It provides us the definition of a specified object type on providing the type Id of object-type specified in repository
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisselector, object-type, repositoryId, typeId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserByRepositoryId: (
    repositoryId: string,
    queryParameters?: {
      cmisselector?: string;
      'object-type'?: string;
      repositoryId?: string;
      typeId?: string;
    }
  ) =>
    new OpenApiRequestBuilder<Object>('get', '/browser/{repositoryId}', {
      pathParameters: { repositoryId },
      queryParameters
    })
};
