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
      type?:
        | {
            /**
             * @example "sap:link"
             */
            id?: string;
            /**
             * @example "sap:link"
             */
            localName?: string;
            /**
             * @example "com.sap.ecm"
             */
            localNamespace?: string;
            /**
             * @example "Link Document"
             */
            displayName?: string;
            /**
             * @example "sap:link"
             */
            queryName?: string;
            /**
             * @example "SAP Document Management Link Document"
             */
            description?: string;
            /**
             * @example "cmis:document"
             */
            baseId?: string;
            /**
             * @example "cmis:document"
             */
            parentId?: string;
            creatable?: boolean;
            fileable?: boolean;
            queryable?: boolean;
            fulltextIndexed?: boolean;
            includedInSupertypeQuery?: boolean;
            controllablePolicy?: boolean;
            controllableACL?: boolean;
            typeMutability?:
              | {
                  create?: boolean;
                  update?: boolean;
                  delete?: boolean;
                }
              | Record<string, any>;
            versionable?: boolean;
            /**
             * @example "allowed"
             */
            contentStreamAllowed?: string;
            propertyDefinitions?:
              | {
                  'sap:linkExternalURL'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "sap:linkExternalURL"
                         */
                        id?: string;
                        /**
                         * @example "sap:linkExternalURL"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:linkExternalURL"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:linkExternalURL"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:linkExternalURL"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readwrite"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'sap:noFullTextErr'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "sap:noFullTextErr"
                         */
                        id?: string;
                        /**
                         * @example "sap:noFullTextErr"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:noFullTextErr"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:noFullTextErr"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:noFullTextErr"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'sap:linkRepositoryId'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "sap:linkRepositoryId"
                         */
                        id?: string;
                        /**
                         * @example "sap:linkRepositoryId"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:linkRepositoryId"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:linkRepositoryId"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:linkRepositoryId"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readwrite"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'sap:versionSeriesContentLength'?:
                    | {
                        /**
                         * @example -9223372036854776000
                         */
                        minValue?: number;
                        /**
                         * @example 9223372036854776000
                         */
                        maxValue?: number;
                        /**
                         * @example "sap:versionSeriesContentLength"
                         */
                        id?: string;
                        /**
                         * @example "sap:versionSeriesContentLength"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:versionSeriesContentLength"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:versionSeriesContentLength"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:versionSeriesContentLength"
                         */
                        description?: string;
                        /**
                         * @example "integer"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'sap:blockdate'?:
                    | {
                        /**
                         * @example "time"
                         */
                        resolution?: string;
                        /**
                         * @example "sap:blockdate"
                         */
                        id?: string;
                        /**
                         * @example "sap:blockdate"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:blockdate"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:blockdate"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:blockdate"
                         */
                        description?: string;
                        /**
                         * @example "datetime"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:isImmutable'?:
                    | {
                        /**
                         * @example "cmis:isImmutable"
                         */
                        id?: string;
                        /**
                         * @example "cmis:isImmutable"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:isImmutable"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:isImmutable"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:isImmutable"
                         */
                        description?: string;
                        /**
                         * @example "boolean"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:objectTypeId'?:
                    | {
                        /**
                         * @example "cmis:objectTypeId"
                         */
                        id?: string;
                        /**
                         * @example "cmis:objectTypeId"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:objectTypeId"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:objectTypeId"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:objectTypeId"
                         */
                        description?: string;
                        /**
                         * @example "id"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "oncreate"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:versionLabel'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "cmis:versionLabel"
                         */
                        id?: string;
                        /**
                         * @example "cmis:versionLabel"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:versionLabel"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:versionLabel"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:versionLabel"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:description'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "cmis:description"
                         */
                        id?: string;
                        /**
                         * @example "cmis:description"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:description"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:description"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:description"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readwrite"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'sap:nextVersionId'?:
                    | {
                        /**
                         * @example "sap:nextVersionId"
                         */
                        id?: string;
                        /**
                         * @example "sap:nextVersionId"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:nextVersionId"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:nextVersionId"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:nextVersionId"
                         */
                        description?: string;
                        /**
                         * @example "id"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:createdBy'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "cmis:createdBy"
                         */
                        id?: string;
                        /**
                         * @example "cmis:createdBy"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:createdBy"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:createdBy"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:createdBy"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                        'mcm:miscellaneous'?:
                          | {
                              /**
                               * @example true
                               */
                              isQueryableInUI?: string;
                            }
                          | Record<string, any>;
                      }
                    | Record<string, any>;
                  'cmis:checkinComment'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "cmis:checkinComment"
                         */
                        id?: string;
                        /**
                         * @example "cmis:checkinComment"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:checkinComment"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:checkinComment"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:checkinComment"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'sap:owner'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "sap:owner"
                         */
                        id?: string;
                        /**
                         * @example "sap:owner"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:owner"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:owner"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:owner"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readwrite"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:creationDate'?:
                    | {
                        /**
                         * @example "time"
                         */
                        resolution?: string;
                        /**
                         * @example "cmis:creationDate"
                         */
                        id?: string;
                        /**
                         * @example "cmis:creationDate"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:creationDate"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:creationDate"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:creationDate"
                         */
                        description?: string;
                        /**
                         * @example "datetime"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                        'mcm:miscellaneous'?:
                          | {
                              /**
                               * @example true
                               */
                              isQueryableInUI?: string;
                              /**
                               * @example true
                               */
                              isQueryableWithRange?: string;
                            }
                          | Record<string, any>;
                      }
                    | Record<string, any>;
                  'sap:linkId'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "sap:linkId"
                         */
                        id?: string;
                        /**
                         * @example "sap:linkId"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:linkId"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:linkId"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:linkId"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readwrite"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:isMajorVersion'?:
                    | {
                        /**
                         * @example "cmis:isMajorVersion"
                         */
                        id?: string;
                        /**
                         * @example "cmis:isMajorVersion"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:isMajorVersion"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:isMajorVersion"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:isMajorVersion"
                         */
                        description?: string;
                        /**
                         * @example "boolean"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:contentStreamFileName'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "cmis:contentStreamFileName"
                         */
                        id?: string;
                        /**
                         * @example "cmis:contentStreamFileName"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:contentStreamFileName"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:contentStreamFileName"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:contentStreamFileName"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'sap:parentIds'?:
                    | {
                        deafultValue?: string[];
                        /**
                         * @example "sap:parentIds"
                         */
                        id?: string;
                        /**
                         * @example "sap:parentIds"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:parentIds"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:parentIds"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:parentIds"
                         */
                        description?: string;
                        /**
                         * @example "id"
                         */
                        propertyType?: string;
                        /**
                         * @example "multi"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:name'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "cmis:name"
                         */
                        id?: string;
                        /**
                         * @example "cmis:name"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:name"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:name"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:name"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readwrite"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:isLatestVersion'?:
                    | {
                        /**
                         * @example "cmis:isLatestVersion"
                         */
                        id?: string;
                        /**
                         * @example "cmis:isLatestVersion"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:isLatestVersion"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:isLatestVersion"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:isLatestVersion"
                         */
                        description?: string;
                        /**
                         * @example "boolean"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'sap:tags'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        defaultValue?: string[];
                        /**
                         * @example "sap:tags"
                         */
                        id?: string;
                        /**
                         * @example "sap:tags"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:tags"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:tags"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:tags"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "multi"
                         */
                        cardinality?: string;
                        /**
                         * @example "readwrite"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:lastModificationDate'?:
                    | {
                        /**
                         * @example "time"
                         */
                        resolution?: string;
                        /**
                         * @example "cmis:lastModificationDate"
                         */
                        id?: string;
                        /**
                         * @example "cmis:lastModificationDate"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:lastModificationDate"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:lastModificationDate"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:lastModificationDate"
                         */
                        description?: string;
                        /**
                         * @example "datetime"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                        'mcm:miscellaneous'?:
                          | {
                              /**
                               * @example true
                               */
                              isQueryableInUI?: string;
                              /**
                               * @example true
                               */
                              isQueryableWithRange?: string;
                            }
                          | Record<string, any>;
                      }
                    | Record<string, any>;
                  'cmis:contentStreamLength'?:
                    | {
                        /**
                         * @example -9223372036854776000
                         */
                        minValue?: number;
                        /**
                         * @example 9223372036854776000
                         */
                        maxValue?: number;
                        /**
                         * @example "cmis:contentStreamLength"
                         */
                        id?: string;
                        /**
                         * @example "cmis:contentStreamLength"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:contentStreamLength"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:contentStreamLength"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:contentStreamLength"
                         */
                        description?: string;
                        /**
                         * @example "integer"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:objectId'?:
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
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:objectId"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:objectId"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:objectId"
                         */
                        description?: string;
                        /**
                         * @example "id"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'sap:ident'?:
                    | {
                        /**
                         * @example -9223372036854776000
                         */
                        minValue?: number;
                        /**
                         * @example 9223372036854776000
                         */
                        maxValue?: number;
                        /**
                         * @example "sap:ident"
                         */
                        id?: string;
                        /**
                         * @example "sap:ident"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:ident"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:ident"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:ident"
                         */
                        description?: string;
                        /**
                         * @example "integer"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:contentStreamHash'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        defaultValue?: string[];
                        /**
                         * @example "cmis:contentStreamHash"
                         */
                        id?: string;
                        /**
                         * @example "cmis:contentStreamHash"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:contentStreamHash"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:contentStreamHash"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:contentStreamHash"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "multi"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:lastModifiedBy'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "cmis:lastModifiedBy"
                         */
                        id?: string;
                        /**
                         * @example "cmis:lastModifiedBy"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:lastModifiedBy"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:lastModifiedBy"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:lastModifiedBy"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                        'mcm:miscellaneous'?:
                          | {
                              /**
                               * @example true
                               */
                              isQueryableInUI?: string;
                            }
                          | Record<string, any>;
                      }
                    | Record<string, any>;
                  'cmis:secondaryObjectTypeIds'?:
                    | {
                        defaultValue?: string[];
                        /**
                         * @example "cmis:secondaryObjectTypeIds"
                         */
                        id?: string;
                        /**
                         * @example "cmis:secondaryObjectTypeIds"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:secondaryObjectTypeIds"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:secondaryObjectTypeIds"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:secondaryObjectTypeIds"
                         */
                        description?: string;
                        /**
                         * @example "id"
                         */
                        propertyType?: string;
                        /**
                         * @example "multi"
                         */
                        cardinality?: string;
                        /**
                         * @example "readwrite"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:contentStreamId'?:
                    | {
                        /**
                         * @example "cmis:contentStreamId"
                         */
                        id?: string;
                        /**
                         * @example "cmis:contentStreamId"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:contentStreamId"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:contentStreamId"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:contentStreamId"
                         */
                        description?: string;
                        /**
                         * @example "id"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'sap:linkMimeType'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "sap:linkMimeType"
                         */
                        id?: string;
                        /**
                         * @example "sap:linkMimeType"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:linkMimeType"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:linkMimeType"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:linkMimeType"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readwrite"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:contentStreamMimeType'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "cmis:contentStreamMimeType"
                         */
                        id?: string;
                        /**
                         * @example "cmis:contentStreamMimeType"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:contentStreamMimeType"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:contentStreamMimeType"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:contentStreamMimeType"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:baseTypeId'?:
                    | {
                        /**
                         * @example "cmis:baseTypeId"
                         */
                        id?: string;
                        /**
                         * @example "cmis:baseTypeId"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:baseTypeId"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:baseTypeId"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:baseTypeId"
                         */
                        description?: string;
                        /**
                         * @example "id"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:changeToken'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "cmis:changeToken"
                         */
                        id?: string;
                        /**
                         * @example "cmis:changeToken"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:changeToken"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:changeToken"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:changeToken"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'sap:noFullText'?:
                    | {
                        /**
                         * @example "sap:noFullText"
                         */
                        id?: string;
                        /**
                         * @example "sap:noFullText"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:noFullText"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:noFullText"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:noFullText"
                         */
                        description?: string;
                        /**
                         * @example "boolean"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:isPrivateWorkingCopy'?:
                    | {
                        /**
                         * @example "cmis:isPrivateWorkingCopy"
                         */
                        id?: string;
                        /**
                         * @example "cmis:isPrivateWorkingCopy"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:isPrivateWorkingCopy"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:isPrivateWorkingCopy"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:isPrivateWorkingCopy"
                         */
                        description?: string;
                        /**
                         * @example "boolean"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:isVersionSeriesCheckedOut'?:
                    | {
                        /**
                         * @example "cmis:isVersionSeriesCheckedOut"
                         */
                        id?: string;
                        /**
                         * @example "cmis:isVersionSeriesCheckedOut"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:isVersionSeriesCheckedOut"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:isVersionSeriesCheckedOut"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:isVersionSeriesCheckedOut"
                         */
                        description?: string;
                        /**
                         * @example "boolean"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:versionSeriesCheckedOutBy'?:
                    | {
                        /**
                         * @example 4500
                         */
                        maxLength?: number;
                        /**
                         * @example "cmis:versionSeriesCheckedOutBy"
                         */
                        id?: string;
                        /**
                         * @example "cmis:versionSeriesCheckedOutBy"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:versionSeriesCheckedOutBy"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:versionSeriesCheckedOutBy"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:versionSeriesCheckedOutBy"
                         */
                        description?: string;
                        /**
                         * @example "string"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'sap:ispwc'?:
                    | {
                        /**
                         * @example "sap:ispwc"
                         */
                        id?: string;
                        /**
                         * @example "sap:ispwc"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "sap:ispwc"
                         */
                        displayName?: string;
                        /**
                         * @example "sap:ispwc"
                         */
                        queryName?: string;
                        /**
                         * @example "sap:ispwc"
                         */
                        description?: string;
                        /**
                         * @example "boolean"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:versionSeriesId'?:
                    | {
                        /**
                         * @example "cmis:versionSeriesId"
                         */
                        id?: string;
                        /**
                         * @example "cmis:versionSeriesId"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:versionSeriesId"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:versionSeriesId"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:versionSeriesId"
                         */
                        description?: string;
                        /**
                         * @example "id"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:isLatestMajorVersion'?:
                    | {
                        /**
                         * @example "cmis:isLatestMajorVersion"
                         */
                        id?: string;
                        /**
                         * @example "cmis:isLatestMajorVersion"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:isLatestMajorVersion"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:isLatestMajorVersion"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:isLatestMajorVersion"
                         */
                        description?: string;
                        /**
                         * @example "boolean"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                  'cmis:versionSeriesCheckedOutId'?:
                    | {
                        /**
                         * @example "cmis:versionSeriesCheckedOutId"
                         */
                        id?: string;
                        /**
                         * @example "cmis:versionSeriesCheckedOutId"
                         */
                        localName?: string;
                        /**
                         * @example "com.sap.ecm"
                         */
                        localNamespace?: string;
                        /**
                         * @example "cmis:versionSeriesCheckedOutId"
                         */
                        displayName?: string;
                        /**
                         * @example "cmis:versionSeriesCheckedOutId"
                         */
                        queryName?: string;
                        /**
                         * @example "cmis:versionSeriesCheckedOutId"
                         */
                        description?: string;
                        /**
                         * @example "id"
                         */
                        propertyType?: string;
                        /**
                         * @example "single"
                         */
                        cardinality?: string;
                        /**
                         * @example "readonly"
                         */
                        updatability?: string;
                        inherited?: boolean;
                        required?: boolean;
                        queryable?: boolean;
                        orderable?: boolean;
                        openChoice?: boolean;
                      }
                    | Record<string, any>;
                }
              | Record<string, any>;
          }
        | Record<string, any>;
    }
  | Record<string, any>;
