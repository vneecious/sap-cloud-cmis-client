import { CreateSecondaryType as CreateSecondaryTypeConstants } from "src/util/Constants";

export type BaseOptions = {
  _charset?: string;
  succinct?: boolean;
};

export type ReadOptions = BaseOptions & {
  cmisProperties?: Record<any, string | string[]>;
};

export type WriteOptions = {
  directoryPath?: string;
} & ReadOptions;

export namespace AddAclProperty {
  export type InputAcl = {
    addACEPrincipal: string;
    addACEPermission: Array<string>;
  };
}

export namespace CreateSecondaryType {
  export type PropertyDefinition = {
    id: string;
    localNamespace: string;
    localName: string;
    queryName: string;
    displayName: string;
    description: string;
    propertyType:
      | "string"
      | "boolean"
      | "decimal"
      | "integer"
      | "datetime"
      | "uri";
    updatability: "readwrite" | "readonly" | "whencheckedout" | "oncreate";
    inherited: false;
    openChoice: true;
    required: false;
    cardinality: "single" | "multi";
    queryable: true;
    orderable: false;
  };

  export type PropertyDefinitions = {
    [key: string]: PropertyDefinition;
  };

  export type SecondaryType = {
    id: string;
    localNamespace: string;
    localName: string;
    queryName: string;
    displayName: string;
    description: string;
    baseId: "cmis:secondary";
    parentId: "cmis:secondary";
    creatable: false;
    fileable: false;
    queryable: true;
    fulltextIndexed: false;
    includedInSupertypeQuery: true;
    controllablePolicy: false;
    controllableACL: false;
    typeMutability: {
      create: true;
      update: true;
      delete: true;
    };
    propertyDefinitions?: PropertyDefinitions;
  };

  export type InputPropertyDefinition = Omit<
    PropertyDefinition,
    keyof typeof CreateSecondaryTypeConstants.DEFAULT_PROPERTY_DEFINITION
  >;

  export type InputPropertyDefinitions = {
    [key: string]: InputPropertyDefinition;
  };

  export type InputSecondaryType = Omit<
    SecondaryType,
    keyof typeof CreateSecondaryTypeConstants.DEFAULT_SECONDARY_TYPE
  > & {
    propertyDefinitions?: InputPropertyDefinitions;
  };
}
