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
      properties:
        | {
            'cmis:objectId':
              | {
                  id: string;
                  type: string;
                  cardinality: string;
                  value: string;
                }
              | Record<string, any>;
            'cmis:baseTypeId':
              | {
                  id: string;
                  type: string;
                  cardinality: string;
                  value: string;
                }
              | Record<string, any>;
            'cmis:objectTypeId':
              | {
                  id: string;
                  type: string;
                  cardinality: string;
                  value: string;
                }
              | Record<string, any>;
          }
        | Record<string, any>;
    }
  | Record<string, any>;
