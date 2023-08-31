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
                  properties?:
                    | {
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
                          | Record<string, any>;
                        'sap:parentIds'?:
                          | {
                              /**
                               * @example "sap:parentIds"
                               */
                              id?: string;
                              /**
                               * @example "sap:parentIds"
                               */
                              localName?: string;
                              /**
                               * @example "sap:parentIds"
                               */
                              displayName?: string;
                              /**
                               * @example "sap:parentIds"
                               */
                              queryName?: string;
                              /**
                               * @example "id"
                               */
                              type?: string;
                              /**
                               * @example "multi"
                               */
                              cardinality?: string;
                              value?: string[];
                            }
                          | Record<string, any>;
                        'cmis:name'?:
                          | {
                              /**
                               * @example "cmis:name"
                               */
                              id?: string;
                              /**
                               * @example "cmis:name"
                               */
                              localName?: string;
                              /**
                               * @example "cmis:name"
                               */
                              displayName?: string;
                              /**
                               * @example "cmis:name"
                               */
                              queryName?: string;
                              /**
                               * @example "string"
                               */
                              type?: string;
                              /**
                               * @example "single"
                               */
                              cardinality?: string;
                              /**
                               * @example "check4"
                               */
                              value?: string;
                            }
                          | Record<string, any>;
                        'cmis:lastModifiedBy'?:
                          | {
                              /**
                               * @example "cmis:lastModifiedBy"
                               */
                              id?: string;
                              /**
                               * @example "cmis:lastModifiedBy"
                               */
                              localName?: string;
                              /**
                               * @example "cmis:lastModifiedBy"
                               */
                              displayName?: string;
                              /**
                               * @example "cmis:lastModifiedBy"
                               */
                              queryName?: string;
                              /**
                               * @example "string"
                               */
                              type?: string;
                              /**
                               * @example "single"
                               */
                              cardinality?: string;
                              /**
                               * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
                               */
                              value?: string;
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
                               * @example "cmis:objectTypeId"
                               */
                              displayName?: string;
                              /**
                               * @example "cmis:objectTypeId"
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
                               * @example "cmis:folder"
                               */
                              value?: string;
                            }
                          | Record<string, any>;
                        'cmis:lastModificationDate'?:
                          | {
                              /**
                               * @example "cmis:lastModificationDate"
                               */
                              id?: string;
                              /**
                               * @example "cmis:lastModificationDate"
                               */
                              localName?: string;
                              /**
                               * @example "cmis:lastModificationDate"
                               */
                              displayName?: string;
                              /**
                               * @example "cmis:lastModificationDate"
                               */
                              queryName?: string;
                              /**
                               * @example "datetime"
                               */
                              type?: string;
                              /**
                               * @example "single"
                               */
                              cardinality?: string;
                              /**
                               * @example 1625503091567
                               */
                              value?: number;
                            }
                          | Record<string, any>;
                        'cmis:createdBy'?:
                          | {
                              /**
                               * @example "cmis:createdBy"
                               */
                              id?: string;
                              /**
                               * @example "cmis:createdBy"
                               */
                              localName?: string;
                              /**
                               * @example "cmis:createdBy"
                               */
                              displayName?: string;
                              /**
                               * @example "cmis:createdBy"
                               */
                              queryName?: string;
                              /**
                               * @example "string"
                               */
                              type?: string;
                              /**
                               * @example "single"
                               */
                              cardinality?: string;
                              /**
                               * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
                               */
                              value?: string;
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
                               * @example "cmis:baseTypeId"
                               */
                              displayName?: string;
                              /**
                               * @example "cmis:baseTypeId"
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
                               * @example "cmis:folder"
                               */
                              value?: string;
                            }
                          | Record<string, any>;
                        'cmis:parentId'?:
                          | {
                              /**
                               * @example "cmis:parentId"
                               */
                              id?: string;
                              /**
                               * @example "cmis:parentId"
                               */
                              localName?: string;
                              /**
                               * @example "cmis:parentId"
                               */
                              displayName?: string;
                              /**
                               * @example "cmis:parentId"
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
                               * @example "afrIiK_9PzVRgP2Xmy6LdlsAyHv7S_Hh0k_oES0I9m4"
                               */
                              value?: string;
                            }
                          | Record<string, any>;
                        'sap:owner'?:
                          | {
                              /**
                               * @example "sap:owner"
                               */
                              id?: string;
                              /**
                               * @example "sap:owner"
                               */
                              localName?: string;
                              /**
                               * @example "sap:owner"
                               */
                              displayName?: string;
                              /**
                               * @example "sap:owner"
                               */
                              queryName?: string;
                              /**
                               * @example "string"
                               */
                              type?: string;
                              /**
                               * @example "single"
                               */
                              cardinality?: string;
                              /**
                               * @example "sb-1e6079ca-5822-41e0-9789-93a2f066d534!b32286|sdm-di-SDM_DI_QUAL-qual!b6551"
                               */
                              value?: string;
                            }
                          | Record<string, any>;
                        'cmis:creationDate'?:
                          | {
                              /**
                               * @example "cmis:creationDate"
                               */
                              id?: string;
                              /**
                               * @example "cmis:creationDate"
                               */
                              localName?: string;
                              /**
                               * @example "cmis:creationDate"
                               */
                              displayName?: string;
                              /**
                               * @example "cmis:creationDate"
                               */
                              queryName?: string;
                              /**
                               * @example "datetime"
                               */
                              type?: string;
                              /**
                               * @example "single"
                               */
                              cardinality?: string;
                              /**
                               * @example 1625503091567
                               */
                              value?: number;
                            }
                          | Record<string, any>;
                        'cmis:changeToken'?:
                          | {
                              /**
                               * @example "cmis:changeToken"
                               */
                              id?: string;
                              /**
                               * @example "cmis:changeToken"
                               */
                              localName?: string;
                              /**
                               * @example "cmis:changeToken"
                               */
                              displayName?: string;
                              /**
                               * @example "cmis:changeToken"
                               */
                              queryName?: string;
                              /**
                               * @example "string"
                               */
                              type?: string;
                              /**
                               * @example "single"
                               */
                              cardinality?: string;
                              /**
                               * @example 2
                               */
                              value?: string;
                            }
                          | Record<string, any>;
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
