/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'GetParentApi'.
 * This API is part of the 'GetParentApi' service.
 */
export const GetParentApi = {
  /**
   * It returns the parent folder object for the speciﬁed object. Every folder object, except for one which is called the root folder, must have one and only one parent folder.
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
