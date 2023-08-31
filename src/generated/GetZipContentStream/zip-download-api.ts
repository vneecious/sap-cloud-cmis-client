/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'ZipDownloadApi'.
 * This API is part of the 'GetZipContentStream' service.
 */
export const ZipDownloadApi = {
  /**
   * Downloads the ZIP that has been created previously for a Folder/ Multiple files on the server for the same session
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: objectId, streamId, cmisSelector, download, filename.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserRootByRepositoryId: (
    repositoryId: string,
    queryParameters: {
      objectId: string;
      streamId: string;
      cmisSelector: string;
      download: string;
      filename: string;
    }
  ) =>
    new OpenApiRequestBuilder<any>('get', '/browser/{repositoryId}/root', {
      pathParameters: { repositoryId },
      queryParameters
    })
};
