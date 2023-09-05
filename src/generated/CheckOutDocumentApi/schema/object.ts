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
             * @example "4OtM-tvPZrPZKCZW-HqlD8k6TtA2VLP9b7D6W_k9YKQ"
             */
            'cmis:objectId'?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'cmis:lastModifiedBy'?: string;
            /**
             * @example "5e60de977b6abb000693a303/dbc_7c181fd00007511b48b78d06_60d87b84b11570000df181c9/96143065_1624799700/121-4295-6ae38bf6-0769-4bdf-9fb1-aafec8fd9490"
             */
            'cmis:contentStreamId'?: string;
            /**
             * @example "cmis:document"
             */
            'cmis:objectTypeId'?: string;
            /**
             * @example "application/json"
             */
            'cmis:contentStreamMimeType'?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'cmis:createdBy'?: string;
            /**
             * @example "cmis:document"
             */
            'cmis:baseTypeId'?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'sap:owner'?: string;
            /**
             * @example 1624800281507
             */
            'cmis:creationDate'?: number;
            'cmis:changeToken'?: string;
            'cmis:isPrivateWorkingCopy'?: boolean;
            'cmis:isVersionSeriesCheckedOut'?: boolean;
            'cmis:isMajorVersion'?: boolean;
            /**
             * @example "Test (2) (1).docx"
             */
            'cmis:contentStreamFileName'?: string;
            'sap:parentIds'?: string[];
            /**
             * @example "Test.json"
             */
            'cmis:name'?: string;
            'cmis:isLatestVersion'?: boolean;
            /**
             * @example 1624800281507
             */
            'cmis:lastModificationDate'?: number;
            /**
             * @example "5Q-eM8fJ_DE-EKGiHg2scXX7zTGnq8yFREhTE3ksLZI"
             */
            'cmis:versionSeriesId'?: string;
            'cmis:isLatestMajorVersion'?: boolean;
            /**
             * @example 50605
             */
            'cmis:contentStreamLength'?: number;
            /**
             * @example "4OtM-tvPZrPZKCZW-HqlD8k6TtA2VLP9b7D6W_k9YKQ"
             */
            'cmis:versionSeriesCheckedOutId'?: string;
          }
        | Record<string, any>;
      exactACL?: boolean;
    }
  | Record<string, any>;
