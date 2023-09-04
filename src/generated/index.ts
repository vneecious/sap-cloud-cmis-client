import { HttpResponse } from '@sap-cloud-sdk/http-client';

export {
  AddAclPropertyApi as addAclPropertyApi,
  Object as AddAclPropertyResponse,
} from './AddAclPropertyApi';
export {
  AppendContentStreamApi as appendContentStreamApi,
  Object as AppendContentStreamResponse,
} from './AppendContentStreamApi';

export {
  CMISQueryApi as cmisQueryApi,
  Object as CMISQueryResponse,
} from './CMISQueryApi';

export { CancelCheckoutDocumentApi as cancelCheckoutDocumentApi } from './CancelCheckOutDocumentApi';

export {
  CheckInDocumentApi as checkInDocumentApi,
  Object as CheckInDocumentResponse,
} from './CheckInDocumentApi';

export {
  CheckOutDocumentApi as checkOutDocumentApi,
  Object as CheckOutDocumentResponse,
} from './CheckOutDocumentApi';

export {
  CreateDocumentfromSourceApi as createDocumentfromSourceApi,
  Copyobject as CreateDocumentfromSourceResponse,
} from './CreateDocumentFromSourceApi';

export {
  CreateFavoritesApi as createFavoritesApi,
  Object as CreateFavoritesResponse,
} from './CreateFavoriteApi';

export {
  CreateFolderApi as createFolderApi,
  Object as CreateFolderResponse,
} from './CreateFolderApi';

export {
  CreateLinkApi as createLinkApi,
  LinkObject as CreateLinkResponse,
} from './CreateLinkApi';

export { CreateTypeApi as createTypeApi } from './CreateSecondaryTypeApi';

export {
  CreateDocumentApi as createDocumentApi,
  Object as CreateDocumentResponse,
} from './CreateDocumentApi';

export { DeleteObjectApi as deleteObjectApi } from './DeleteObjectApi';

export {
  DeletePermanentlyApi as deletePermanentlyApi,
  ApiResponse as DeletePermanentlyResponse,
} from './DeletePermanentlyApi';

export { DeleteTreeApi as deleteTreeApi } from './DeleteTreeApi';

export { DownloadAFileApi as downloadAFileApi } from './DownloadFileApi';

export { GenerateThumbnailApi as generateThumbnailApi } from './GenerateThumbnailApi';
export type GenerateThumbnailResponse = XOR<string, HttpResponse>;

export {
  GetAclPropertyApi as getAclPropertyApi,
  Object as GetAclPropertyResponse,
} from './GetAclPropertyApi';

export {
  GetAllowableActionsApi as getAllowableActionsApi,
  Object as GetAllowableActionsResponse,
} from './GetAllowableActionsApi';

export {
  GetChildrenApi as getChildrenApi,
  Object as GetChildrenResponse,
} from './GetChildrenApi';

export {
  ApiResponse as GetDeletedChildrenResponse,
  GetDeletedChildrenApi as getDeletedChildrenApi,
} from './GetDeletedChildrenApi';

export {
  GetDescendantsApi as getDescendantsApi,
  Object as GetDescendantsResponse,
} from './GetDescendantsApi';

export {
  GetFolderTreeApi as getFolderTreeApi,
  Object as GetFolderTreeResponse,
} from './GetFolderTreeApi';

export {
  GetObjectApi as getObjectApi,
  Object as GetObjectResponse,
} from './GetObjectApi';

export {
  GetParentApi as getParentApi,
  Object as GetParentResponse,
} from './GetParentApi';

export {
  FetchRepositoryApi as fetchRepositoryApi,
  RepoObject as FetchRepositoryResponse,
  Object as Repository,
} from './ServiceApi';

export {
  GetPropertiesApi as getPropertiesApi,
  Object as GetPropertiesApiResponse,
} from './GetPropertiesApi';

export {
  GetTypeChildrenApi as getTypeChildrenApi,
  Object as GetTypeChildrenResponse,
} from './GetTypeChildrenApi';

export {
  GetTypeDefinitionApi as getTypeDefinitoinApi,
  Object as GetTypeDefinitionResponse,
} from './GetTypeDefinitionApi';

export {
  GetTypeDescendantsApi as getTypeDescendants,
  Object as GetTypeDescendantsResponse,
} from './GetTypeDescendantsApi';

export { ZipDownloadApi as zipDownloadApi } from './GetZipContentStream';

import { XOR } from 'src/types';

/**
 * The `UpdatePropertiesResponse` type is designed to handle two possible shapes of response objects.
 * The two possible response objects originate from two different internal APIs: `UpdatePropertiesApi`
 * and `CreateDocumentApi`.
 *
 * The exclusive type (`XOR`) ensures that `UpdatePropertiesResponse` can only have the shape of one of
 * these two response objects, but not both simultaneously. This exclusive typing is particularly useful
 * when the user updates properties with `succinctProperties` set to `true`, which triggers a response
 * similar to `CreateDocumentApi`.
 */
import { Object as InternalUpdatePropertiesResponse } from './UpdatePropertiesApi';
import { Object as InternalCreateDocumentResponse } from './CreateDocumentApi';
export type UpdatePropertiesResponse = XOR<
  InternalUpdatePropertiesResponse,
  InternalCreateDocumentResponse
>;

export { UpdatePropertiesApi as updatePropertiesApi } from './UpdatePropertiesApi';

export { GeneralApi as zipCreationForDownload } from './ZipCreationForDownload';

/**
 * The `ZipCreationForDownloadResponse` type is designed to handle two possible shapes of response objects.
 * The two possible response objects originate from two different internal APIs: `ZipCreationForDownload`
 * and `CreateDocumentApi`.
 *
 * The exclusive type (`XOR`) ensures that `ZipCreationForDownloadResponse` can only have the shape of one of
 * these two response objects, but not both simultaneously. This exclusive typing is particularly useful
 * when the user updates properties with `succinctProperties` set to `true`, which triggers a response
 * similar to `CreateDocumentApi`.
 */
import { Object as InternalZipCreationForDownloadResponse } from './ZipCreationForDownload';
export type ZipCreationForDownloadResponse = XOR<
  InternalZipCreationForDownloadResponse,
  InternalCreateDocumentResponse
>;
