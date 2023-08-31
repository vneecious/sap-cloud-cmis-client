/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'DeleteTreeApi'.
 * This API is part of the 'DeleteTreeApi' service.
 */
export const DeleteTreeApi = {
  /**
   * It deletes the specified folder and all the descendant-objects of the folder. A repository may attempt to delete child- and descendant-objects of the speciﬁed folder in any order. Any child- or descendant-object that the repository cannot delete must persist in a valid state in the CMIS domain model.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (repositoryId: string, body: any) =>
    new OpenApiRequestBuilder<any>('post', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      body
    })
};
