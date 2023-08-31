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
      results?:
        | {
            properties?: Record<
              string,
              | {
                  /**
                   * @example "cmis:objectId"
                   */
                  id?: string;
                  /**
                   * @example "cmis:objectId"
                   */
                  localName?: string;
                  /**
                   * @example "cmis:objectId"
                   */
                  displayName?: string;
                  /**
                   * @example "cmis:objectId"
                   */
                  queryName?: string;
                  /**
                   * @example "id"
                   */
                  type?: string;
                  /**
                   * @example "single"
                   */
                  cardinality?: string;
                  /**
                   * @example "X-y5Ea4gwlCTRQ0IojlMihp7e6OSKMyd_kcSoVKIRfA"
                   */
                  value?: string;
                }
              | Record<string, any>
            >;
          }
        | Record<string, any>[];
      hasMoreItems?: boolean;
      numItems?: number;
    }
  | Record<string, any>;
