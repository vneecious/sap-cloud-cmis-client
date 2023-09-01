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
             * @example "vts_mR0EfTpcri1_TDHqM39fasTVI5akhVHDDX7-7eo"
             */
            "cmis:objectId"?: string;
            "sap:parentIds"?: string[];
            /**
             * @example "Test.docx"
             */
            "cmis:name"?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            "cmis:lastModifiedBy"?: string;
            /**
             * @example "cmis:document"
             */
            "cmis:objectTypeId"?: string;
            /**
             * @example 1623853693632
             */
            "cmis:lastModificationDate"?: number;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            "cmis:createdBy"?: string;
            /**
             * @example "cmis:document"
             */
            "cmis:baseTypeId"?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            "sap:owner"?: string;
            /**
             * @example 1623853693632
             */
            "cmis:creationDate"?: number;
            "cmis:changeToken"?: string;
          }
        | Record<string, any>;
      exactACL?: boolean;
    }
  | Record<string, any>;
