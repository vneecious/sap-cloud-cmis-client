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
      succinctProperties:
        | {
            'cmis:objectId': string;
            'cmis:lastModifiedBy': string;
            'cmis:contentStreamId': string;
            'cmis:objectTypeId': string;
            'cmis:contentStreamMimeType': string;
            'cmis:createdBy': string;
            'cmis:baseTypeId': string;
            'sap:owner': string;
            'cmis:creationDate': number;
            'cmis:changeToken': string;
            'cmis:contentStreamFileName': string;
            'sap:parentIds': string[];
            'cmis:name': string;
            'cmis:lastModificationDate': number;
            'cmis:contentStreamLength': number;
          }
        | Record<string, any>;
      exactACL: boolean;
    }
  | Record<string, any>;
