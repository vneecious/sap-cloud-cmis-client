/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'Error' schema.
 */
export type Error =
  | {
      /**
       * error
       * @example "connection"
       */
      exception?: string;
      /**
       * @example "Short description"
       */
      message?: string;
    }
  | Record<string, any>;
