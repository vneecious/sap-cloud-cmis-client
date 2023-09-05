/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'GetTypeChildrenApi'.
 * This API is part of the 'GetTypeChildrenApi' service.
 */
export const GetTypeChildrenApi = {
  /**
   * It returns the list of object-types defined for the repository that are children of the specified type based on type Id, repository Id provided
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisselector, includePropertyDefinitions, repositoryId, maxItems, typeId, skipCount.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserByRepositoryId: (
    repositoryId: string,
    queryParameters?: {
      cmisselector?: string;
      includePropertyDefinitions?: boolean;
      repositoryId?: string;
      maxItems?: string;
      typeId?: string;
      skipCount?: string;
    }
  ) =>
    new OpenApiRequestBuilder<Object>('get', '/browser/{repositoryId}', {
      pathParameters: { repositoryId },
      queryParameters,
    }),
};
