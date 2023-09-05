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
             * @example "PssqdhvvecOJUZdWTj0vr9LNdR-NotOTclyIYfwmdVE"
             */
            'cmis:objectId'?: string;
            'sap:parentIds'?: string[];
            /**
             * @example "Raadhica"
             */
            'cmis:name'?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'cmis:lastModifiedBy'?: string;
            /**
             * @example "cmis:folder"
             */
            'cmis:objectTypeId'?: string;
            /**
             * @example 1623948932307
             */
            'cmis:lastModificationDate'?: number;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'cmis:createdBy'?: string;
            /**
             * @example "cmis:folder"
             */
            'cmis:baseTypeId'?: string;
            /**
             * @example "2d42c1d0000652c0a677bc06"
             */
            'cmis:parentId'?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'sap:owner'?: string;
            /**
             * @example 1623947488616
             */
            'cmis:creationDate'?: number;
            /**
             * @example 6
             */
            'cmis:changeToken'?: string;
            exactACL?: boolean;
          }
        | Record<string, any>;
    }
  | Record<string, any>;
