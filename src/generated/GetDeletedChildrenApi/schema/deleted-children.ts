/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'DeletedChildren' schema.
 */
export type DeletedChildren =
  | {
      /**
       * @example 1208178248
       */
      TimeLeft?: number;
      /**
       * @example "cmis:document"
       */
      objectTypeId?: string;
      /**
       * @example "file_name.txt"
       */
      name?: string;
      /**
       * @example "cmis:document"
       */
      baseTypeId?: string;
      /**
       * @example "text/plain"
       */
      mimeType?: string;
      /**
       * @example "6HBEZx75rvdOVq74c-ok4_1pruXMUzs-BUfpckD-8PA"
       */
      objectId?: string;
      /**
       * @example "null"
       */
      parentId?: string;
    }
  | Record<string, any>;
