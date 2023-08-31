/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'ObjectSchema' schema.
 */
export type ObjectSchema =
  | {
      succinctProperties:
        | {
            'cmis:objectId': string;
            'sap:parentIds': string[];
            'cmis:name': string;
            'cmis:lastModifiedBy': string;
            'cmis:objectTypeId': string;
            'cmis:lastModificationDate': number;
            'cmis:createdBy': string;
            'cmis:baseTypeId': string;
            'sap:owner': string;
            'cmis:creationDate': number;
            'cmis:changeToken': string;
          }
        | Record<string, any>;
      exactACL: boolean;
    }
  | Record<string, any>;
