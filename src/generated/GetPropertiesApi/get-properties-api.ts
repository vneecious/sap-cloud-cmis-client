/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'GetPropertiesApi'.
 * This API is part of the 'GetPropertiesApi' service.
 */
export const GetPropertiesApi = {
  /**
   * It returns the list of properties for the object. The response is a representation of the properties of the speciﬁed object
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisselector, objectId, filter.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserRootByRepositoryId: (
    repositoryId: string,
    queryParameters?: {
      cmisselector?: string;
      objectId?: string;
      filter?: string;
    }
  ) =>
    new OpenApiRequestBuilder<Object>('get', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      queryParameters,
    }),
};
