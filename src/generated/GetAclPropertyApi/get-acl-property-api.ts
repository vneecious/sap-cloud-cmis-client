/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Object } from './schema';
/**
 * Representation of the 'GetAclPropertyApi'.
 * This API is part of the 'GetAclPropertyApi' service.
 */
export const GetAclPropertyApi = {
  /**
   * It returns  the Access Control List(ACL) currently applied to the speciﬁed object. This service allows the requestor to specify that the result be expressed using only the CMIS deﬁned permissions. Without this restriction, the response may include, or be solely expressed in repository speciﬁc permissions.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisselector, objectId, filter, includeAllowableActions, includeACL, succinct, renditionFilter.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserRootByRepositoryId: (
    repositoryId: string,
    queryParameters?: {
      cmisselector?: string;
      objectId?: string;
      filter?: string;
      includeAllowableActions?: boolean;
      includeACL?: boolean;
      succinct?: boolean;
      renditionFilter?: string;
    }
  ) =>
    new OpenApiRequestBuilder<Object>('get', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      queryParameters,
    }),
};
