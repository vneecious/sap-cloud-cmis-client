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
      /**
       * @example "Repo id"
       */
      repositoryId?: string;
      /**
       * @example "Repo Name"
       */
      repositoryName?: string;
      /**
       * @example "Description for the repository"
       */
      repositoryDescription?: string;
      /**
       * @example "SAP AG"
       */
      vendorName?: string;
      /**
       * @example "SAP Document Management Service"
       */
      productName?: string;
      /**
       * @example 1
       */
      productVersion?: string;
      /**
       * @example "54c16370006fac14ec10fb06"
       */
      rootFolderId?: string;
      capabilities?:
        | {
            /**
             * @example "anytime"
             */
            capabilityContentStreamUpdatability?: string;
            /**
             * @example "objectidsonly"
             */
            capabilityChanges?: string;
            /**
             * @example "none"
             */
            capabilityRenditions?: string;
            capabilityGetDescendants?: boolean;
            capabilityGetFolderTree?: boolean;
            capabilityMultifiling?: boolean;
            capabilityUnfiling?: boolean;
            capabilityVersionSpecificFiling?: boolean;
            capabilityPWCSearchable?: boolean;
            capabilityPWCUpdatable?: boolean;
            capabilityAllVersionsSearchable?: boolean;
            /**
             * @example "custom"
             */
            capabilityOrderBy?: string;
            /**
             * @example "metadataonly"
             */
            capabilityQuery?: string;
            /**
             * @example "none"
             */
            capabilityJoin?: string;
            /**
             * @example "manage"
             */
            capabilityACL?: string;
            capabilityCreatablePropertyTypes?:
              | {
                  canCreate?: string[];
                }
              | Record<string, any>;
            capabilityNewTypeSettableAttributes?:
              | {
                  id?: boolean;
                  localName?: boolean;
                  localNamespace?: boolean;
                  displayName?: boolean;
                  queryName?: boolean;
                  description?: boolean;
                  creatable?: boolean;
                  fileable?: boolean;
                  queryable?: boolean;
                  fulltextIndexed?: boolean;
                  includedInSupertypeQuery?: boolean;
                  controllablePolicy?: boolean;
                  controllableACL?: boolean;
                }
              | Record<string, any>;
          }
        | Record<string, any>;
      aclCapabilities?:
        | {
            /**
             * @example "both"
             */
            supportedPermissions?: string;
            /**
             * @example "propagate"
             */
            propagation?: string;
            permissions?:
              | {
                  /**
                   * @example "cmis:read"
                   */
                  permission?: string;
                  /**
                   * @example "cmis:read"
                   */
                  description?: string;
                }
              | Record<string, any>[];
            permissionMapping?:
              | {
                  /**
                   * @example "canUpdateProperties.Object"
                   */
                  key?: string;
                  permission?: string[];
                }
              | Record<string, any>[];
          }
        | Record<string, any>;
      /**
       * Format: "nullable".
       */
      latestChangeLogToken?: string;
      /**
       * @example 1.1
       */
      cmisVersionSupported?: string;
      changesIncomplete?: boolean;
      changesOnType?: string[];
      /**
       * @example "sap:builtinanonymous"
       */
      principalIdAnonymous?: string;
      /**
       * @example "sap:builtineveryone"
       */
      principalIdAnyone?: string;
      extendedFeatures?:
        | {
            /**
             * @example "http://docs.oasis-open.org/ns/cmis/extension/contentstreamhash"
             */
            id?: string;
            /**
             * @example "Content Stream Hash"
             */
            commonName?: string;
            /**
             * @example 1
             */
            versionLabel?: string;
            /**
             * @example "Adds the property cmis:contentStreamHash which represents the hash of the document content."
             */
            description?: string;
          }
        | Record<string, any>[];
      /**
       * @example "https://api-sdm-di-test.cfapps.sap.hana.ondemand.com/browser/Unique%20e%20theosiry"
       */
      repositoryUrl?: string;
      /**
       * @example "https://api-sdm-di-test.cfapps.sap.hana.ondemand.com/browser/Unique%20e%20theosiry/root"
       */
      rootFolderUrl?: string;
      /**
       * @example "54c16370006fac14ec10fb06"
       */
      cmisRepositoryId?: string;
      /**
       * @example "Instant"
       */
      repositoryCategory?: string;
      /**
       * @example "Unique e theosiry"
       */
      externalId?: string;
      /**
       * @example "service"
       */
      connectionType?: string;
    }
  | Record<string, any>;
