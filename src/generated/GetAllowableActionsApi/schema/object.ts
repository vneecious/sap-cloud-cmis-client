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
