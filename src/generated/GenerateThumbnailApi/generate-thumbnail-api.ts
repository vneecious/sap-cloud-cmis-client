/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'GenerateThumbnailApi'.
 * This API is part of the 'GenerateThumbnailApi' service.
 */
export const GenerateThumbnailApi = {
  /**
   * Returns the message 'Thumbnail generation request is accepted' when successful.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisAction, objectId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (
    repositoryId: string,
    queryParameters: { cmisAction: string; objectId: string }
  ) =>
    new OpenApiRequestBuilder<string>('post', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      queryParameters
    })
};
