import { CreateSecondaryType as CreateSecondaryTypeConstants } from 'src/util/Constants';

export type BaseCmisOptions = {
  /**
   * Specifies the character set to be used for the request or operation.
   * It's optional and if not provided, the default character set is used.
   */
  _charset?: string;
  /**
   * If set to `true`, the response will be in a succinct format.
   * Defaults to CmisClient.globalParameters.succinct if not provided.
   */
  succinct?: boolean;

  /**
   * If set to `true`, the response will include the allowable actions for the object.
   * These allowable actions represent the operations the current user is permitted to perform on the object.
   * Default is `false` if not provided.
   */
  includeAllowableActions?: boolean;
} & BaseOptions;

export type BaseOptions = {
  /**
   * Configuration options for the request.
   */
  config?: {
    /**
     * If set to `true`, the response will return the entire `HttpResponse` object.
     * Otherwise, only the response body will be returned.
     */
    raw?: boolean;

    /**
     * Custom headers to be included in the request.
     * Useful for passing additional metadata
     */
    customHeaders?: Record<string, string>;
  };
};

export type WriteOptions = {
  /**
   * The property values that MUST be applied to the object
   */
  cmisProperties?: Record<any, string | string[]>;
} & BaseCmisOptions;

export namespace AddAclProperty {
  export type InputAcl = {
    addACEPrincipal: string;
    addACEPermission: Array<string>;
  };
}

export namespace RemoveAclProperty {
  export type InputAcl = {
    removeACEPrincipal: string;
    removeACEPermission: Array<string>;
  };
}

export namespace CreateType {
  /**
   * Represents the definition of a property in a CMIS type.
   * @see {@link https://docs.oasis-open.org/cmis/CMIS/v1.1/errata01/os/CMIS-v1.1-errata01-os-complete.html#x1-270003}
   */
  export type PropertyDefinition = {
    /** Unique identifier for the property. */
    id: string;

    /** Namespace for the property, usually used for vendor extensions. */
    localNamespace: string;

    /** Name of the property used locally. */
    localName: string;

    /** Name of the property used in queries. */
    queryName: string;

    /** Display name for the property. */
    displayName: string;

    /** Description of the property. */
    description: string;

    /** The data type of the property. */
    propertyType:
      | 'string'
      | 'boolean'
      | 'decimal'
      | 'integer'
      | 'datetime'
      | 'uri';

    /** Indicates the updatability of the property. */
    updatability: 'readwrite' | 'readonly' | 'whencheckedout' | 'oncreate';

    /** Indicates if the property is inherited from a parent type. */
    inherited: false;

    /** Indicates if the choices for this property can be extended. */
    openChoice: true;

    /** Indicates if the property is mandatory. */
    required: false;

    /** Indicates if the property can have multiple values. */
    cardinality: 'single' | 'multi';

    /** Indicates if the property can be used in WHERE clauses in a query. */
    queryable: true;

    /** Indicates if the property can be used in an ORDER BY clause in a query. */
    orderable: false;
  };

  /**
   * Represents a collection of property definitions, indexed by their keys.
   */
  export type PropertyDefinitions = {
    [key: string]: PropertyDefinition;
  };

  /**
   * Represents the definition of a secondary type in CMIS.
   * @see {@link https://docs.oasis-open.org/cmis/CMIS/v1.1/errata01/os/CMIS-v1.1-errata01-os-complete.html#x1-270003}
   */
  export type Type = {
    /** Unique identifier for the type. */
    id: string;

    /** Namespace for the secondary type, usually used for vendor extensions. */
    localNamespace: string;

    /** Name of the secondary type used locally. */
    localName: string;

    /** Name of the secondary type used in queries. */
    queryName: string;

    /** Display name for the secondary type. */
    displayName: string;

    /** Description of the secondary type. */
    description: string;

    /** Indicates that this is a secondary type. */
    baseId: 'cmis:secondary';

    /** Identifier for the parent type. Always "cmis:secondary" for secondary types. */
    parentId: 'cmis:secondary';

    /** Indicates if the type can be created by clients. */
    creatable: false;

    /** Indicates if the type can be used in a folder hierarchy. */
    fileable: false;

    /** Indicates if the type can be used in queries. */
    queryable: true;

    /** Indicates if the type is indexed for full-text search. */
    fulltextIndexed: false;

    /** Indicates if the type should be included when querying its parent type. */
    includedInSupertypeQuery: true;

    /** Indicates if the type can have policies applied to it. */
    controllablePolicy: false;

    /** Indicates if the type supports access control lists. */
    controllableACL: false;

    /** Indicates the type of operations allowed on the type. */
    typeMutability: {
      create: true;
      update: true;
      delete: true;
    };

    /** Collection of property definitions associated with this secondary type. */
    propertyDefinitions?: PropertyDefinitions;
  };

  /**
   * Represents the input for a property definition, excluding default values.
   */
  export type PropertyDefinitionInput = Omit<
    PropertyDefinition,
    keyof typeof CreateSecondaryTypeConstants.DEFAULT_PROPERTY_DEFINITION
  >;

  /**
   * Represents a collection of input property definitions, indexed by their keys.
   */
  export type PropertyDefinitionsInput = {
    [key: string]: PropertyDefinitionInput;
  };

  /**
   * Represents the input for creating a new type, excluding default values.
   */
  export type TypeInput = Omit<
    Type,
    keyof typeof CreateSecondaryTypeConstants.DEFAULT_SECONDARY_TYPE
  > & {
    propertyDefinitions?: PropertyDefinitionsInput;
  };
}

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;
