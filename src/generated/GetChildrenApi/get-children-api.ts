/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'GetChildrenApi'.
 * This API is part of the 'GetChildrenApi' service.
 */
export const GetChildrenApi = {
  /**
   * It returns the list of child objects contained in the speciﬁed folder. It provides us information about the immediate children of specified object.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisselector, objectId, filter, maxItems, skipCount, orderBy, includeAllowableActions, includePathSegment, includeRelationships, renditionFilter.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserRootByRepositoryId: (
    repositoryId: string,
    queryParameters?: {
      cmisselector?: string;
      objectId?: string;
      filter?: string;
      maxItems?: number;
      skipCount?: number;
      orderBy?: 'none' | 'common' | 'custom';
      includeAllowableActions?: boolean;
      includePathSegment?: boolean;
      includeRelationships?: 'None' | 'Source' | 'target' | 'Both';
      renditionFilter?: string;
    }
  ) =>
    new OpenApiRequestBuilder<Object>('get', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      queryParameters
    })
};
