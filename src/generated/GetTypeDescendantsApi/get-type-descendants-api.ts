/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'GetTypeDescendantsApi'.
 * This API is part of the 'GetTypeDescendantsApi' service.
 */
export const GetTypeDescendantsApi = {
  /**
   * Returns the set of the descendant object-types defined for the Repository under the specified type. This method does not support paging. The order in which results are returned is repository-speciﬁc.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisselector, includePropertyDefinitions, depth, repositoryId, typeId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserByRepositoryId: (
    repositoryId: string,
    queryParameters?: {
      cmisselector?: string;
      includePropertyDefinitions?: boolean;
      depth?: string;
      repositoryId?: string;
      typeId?: string;
    }
  ) =>
    new OpenApiRequestBuilder<Object>('get', '/browser/{repositoryId}', {
      pathParameters: { repositoryId },
      queryParameters,
    }),
};
