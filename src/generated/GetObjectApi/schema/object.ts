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
      objects?:
        | {
            object?:
              | {
                  succinctProperties?:
                    | {
                        /**
                         * @example "X-y5Ea4gwlCTRQ0IojlMihp7e6OSKMyd_kcSoVKIRfA"
                         */
                        'cmis:objectId'?: string;
                        /**
                         * @example "/check4/check4"
                         */
                        'cmis:path'?: string;
                        /**
                         * @example "check4"
                         */
                        'cmis:name'?: string;
                        /**
                         * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
                         */
                        'cmis:lastModifiedBy'?: string;
                        /**
                         * Format: "nullable".
                         */
                        'cmis:secondaryObjectTypeIds'?: string;
                        /**
                         * @example "cmis:folder"
                         */
                        'cmis:objectTypeId'?: string;
                        /**
                         * @example 1625503091567
                         */
                        'cmis:lastModificationDate'?: number;
                        /**
                         * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
                         */
                        'cmis:createdBy'?: string;
                        /**
                         * @example "cmis:folder"
                         */
                        'cmis:baseTypeId'?: string;
                        /**
                         * @example "afrIiK_9PzVRgP2Xmy6LdlsAyHv7S_Hh0k_oES0I9m4"
                         */
                        'cmis:parentId'?: string;
                        /**
                         * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
                         */
                        'sap:owner'?: string;
                        /**
                         * @example 1625503091567
                         */
                        'cmis:creationDate'?: number;
                      }
                    | Record<string, any>;
                  allowableActions?:
                    | {
                        canDeleteObject?: boolean;
                        canUpdateProperties?: boolean;
                        canGetFolderTree?: boolean;
                        canGetProperties?: boolean;
                        canGetObjectRelationships?: boolean;
                        canGetObjectParents?: boolean;
                        canGetFolderParent?: boolean;
                        canGetDescendants?: boolean;
                        canMoveObject?: boolean;
                        canDeleteContentStream?: boolean;
                        canCheckOut?: boolean;
                        canCancelCheckOut?: boolean;
                        canCheckIn?: boolean;
                        canSetContentStream?: boolean;
                        canGetAllVersions?: boolean;
                        canAddObjectToFolder?: boolean;
                        canRemoveObjectFromFolder?: boolean;
                        canGetContentStream?: boolean;
                        canApplyPolicy?: boolean;
                        canGetAppliedPolicies?: boolean;
                        canRemovePolicy?: boolean;
                        canGetChildren?: boolean;
                        canCreateDocument?: boolean;
                        canCreateFolder?: boolean;
                        canCreateRelationship?: boolean;
                        canCreateItem?: boolean;
                        canDeleteTree?: boolean;
                        canGetRenditions?: boolean;
                        canGetACL?: boolean;
                        canApplyACL?: boolean;
                      }
                    | Record<string, any>;
                  exactACL?: boolean;
                }
              | Record<string, any>;
          }
        | Record<string, any>[];
      hasMoreItems?: boolean;
    }
  | Record<string, any>;
