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
      succinctProperties?:
        | {
            /**
             * @example "qHAV2ODqQEl5pGNMzBDephFGamHjGKllKAAamq-I6_M"
             */
            'cmis:objectId'?: string;
            /**
             * Format: "nullable".
             */
            'sap:ident'?: string;
            /**
             * @example "/New Share"
             */
            'cmis:path'?: string;
            /**
             * Format: "nullable".
             */
            'cmis:allowedChildObjectTypeIds'?: string;
            /**
             * Format: "nullable".
             */
            'sap:blockdate'?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'cmis:lastModifiedBy'?: string;
            'cmis:secondaryObjectTypeIds'?: string[];
            'cmis:isImmutable'?: boolean;
            /**
             * @example "sap:share"
             */
            'cmis:objectTypeId'?: string;
            /**
             * Format: "nullable".
             */
            'cmis:description'?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'cmis:createdBy'?: string;
            /**
             * @example "cmis:folder"
             */
            'cmis:baseTypeId'?: string;
            /**
             * @example "14830fd00007511bc9058d06"
             */
            'cmis:parentId'?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'sap:owner'?: string;
            /**
             * @example 1624789623612
             */
            'cmis:creationDate'?: number;
            /**
             * @example 2
             */
            'cmis:changeToken'?: string;
            /**
             * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
             */
            'sap:shareOwner'?: string;
            'sap:parentIds'?: string[];
            /**
             * @example "New Share"
             */
            'cmis:name'?: string;
            /**
             * Format: "nullable".
             */
            'sap:tags'?: string;
            /**
             * @example 1624789623612
             */
            'cmis:lastModificationDate'?: number;
            /**
             * Format: "nullable".
             */
            'sap:publicLinkId'?: string;
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
                  acl?:
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
                            }
                          | Record<string, any>[];
                        isExact?: boolean;
                        exactACL?: boolean;
                      }
                    | Record<string, any>;
                }
              | Record<string, any>;
          }
        | Record<string, any>;
    }
  | Record<string, any>;
