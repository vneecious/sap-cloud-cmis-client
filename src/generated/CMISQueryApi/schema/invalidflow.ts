/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'Invalidflow' schema.
 */
export type Invalidflow =
  | {
      /**
       * error
       * @example "invalidArgument"
       */
      exception?: string;
      /**
       * @example "Statement must be set!"
       */
      message?: string;
    }
  | Record<string, any>;
