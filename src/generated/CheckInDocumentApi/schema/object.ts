/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'Object' schema.
 */
export type Object =
  | {
      succinctProperties?:
        | {
            /**
             * @example "cmis:document"
             */
            'cmis:baseTypeId'?: string;
            /**
             * @example 16
             */
            'cmis:changeToken'?: string;
            /**
             * @example "comments"
             */
            'cmis:checkinComment'?: string;
            /**
             * @example "some_file.json"
             */
            'cmis:contentStreamFileName'?: string;
            'cmis:contentStreamHash'?: string[];
            /**
             * @example "62d7e2ded99d570007e2d6d2/dbc_dbb8717000e43b92f9f26b46_64b62f9f29b34e0007178bbf/813589379_1691148600/123-50ce-38239e2d-b7d4-46a0-93f6-fb4f3aa29dfc"
             */
            'cmis:contentStreamId'?: string;
            /**
             * @example 62288
             */
            'cmis:contentStreamLength'?: number;
            /**
             * @example "text/plain"
             */
            'cmis:contentStreamMimeType'?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'cmis:createdBy'?: string;
            /**
             * @example 1691151367229
             */
            'cmis:creationDate'?: number;
            'cmis:isLatestMajorVersion'?: boolean;
            /**
             * @example true
             */
            'cmis:isLatestVersion'?: boolean;
            'cmis:isMajorVersion'?: boolean;
            'cmis:isVersionSeriesCheckedOut'?: boolean;
            /**
             * @example 1691151367229
             */
            'cmis:lastModificationDate'?: number;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'cmis:lastModifiedBy'?: string;
            /**
             * @example "Test.json"
             */
            'cmis:name'?: string;
            /**
             * @example "aOXuQi7mhoFrOIlEKz9GSoMKVM1KM_NVi9INnLTjaqc"
             */
            'cmis:objectId'?: string;
            /**
             * @example "cmis:document"
             */
            'cmis:objectTypeId'?: string;
            'cmis:secondaryObjectTypeIds'?: string[];
            /**
             * @example "2.1"
             */
            'cmis:versionLabel'?: string;
            /**
             * @example "fo0n5vogqnAeuWUoFaL79VaoolE-d-mWD0C6RAem2qE"
             */
            'cmis:versionSeriesId'?: string;
            'sap:isCMKEnabled'?: boolean;
            /**
             * @example "I0VfNYZY0QRo6MYpdklo-OinU1rdI-9tDJZ8TH0MNwI"
             */
            'sap:nextVersionId'?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'sap:owner'?: string;
            'sap:parentIds'?: string[];
          }
        | Record<string, any>;
      exactACL?: boolean;
    }
  | Record<string, any>;
