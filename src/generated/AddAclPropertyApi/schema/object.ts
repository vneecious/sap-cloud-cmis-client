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
      aces?:
        | {
            principal?:
              | {
                  /**
                   * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
                   */
                  principalId?: string;
                }
              | Record<string, any>;
            permissions?: string[];
            isDirect?: boolean;
            isExact?: boolean;
          }
        | Record<string, any>[];
    }
  | Record<string, any>;
