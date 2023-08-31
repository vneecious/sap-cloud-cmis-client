/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'DownloadAFileApi'.
 * This API is part of the 'DownloadFileApi' service.
 */
export const DownloadAFileApi = {
  /**
   * This request helps in downloading a file. It returns requested document content directly or redirects to a URL that provides the document content.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisselector, download, filename, objectId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserRootByRepositoryId: (
    repositoryId: string,
    queryParameters?: {
      cmisselector?: string;
      download?: string;
      filename?: string;
      objectId?: string;
    }
  ) =>
    new OpenApiRequestBuilder<any>('get', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      queryParameters
    })
};
