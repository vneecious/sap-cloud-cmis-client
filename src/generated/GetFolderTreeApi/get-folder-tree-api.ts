/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'GetFolderTreeApi'.
 * This API is part of the 'GetFolderTreeApi' service.
 */
export const GetFolderTreeApi = {
  /**
   * It returns the set of descendant folder objects contained in the speciﬁed folder. This operation does not support paging. The order in which results are returned is repository-speciﬁc.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisselector, objectId, filter, includeAllowableActions, includePathSegment, depth, includeRelationships, renditionFilter.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserRootByRepositoryId: (
    repositoryId: string,
    queryParameters?: {
      cmisselector?: string;
      objectId?: string;
      filter?: string;
      includeAllowableActions?: boolean;
      includePathSegment?: boolean;
      depth?: number;
      includeRelationships?: 'None' | 'Source' | 'target' | 'Both';
      renditionFilter?: string;
    }
  ) =>
    new OpenApiRequestBuilder<Object>('get', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      queryParameters
    })
};
