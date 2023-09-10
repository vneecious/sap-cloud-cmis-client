import { CMISType, CMISTypePropertyDefinition } from 'src/types';

export const DEFAULT_SECONDARY_TYPE: Readonly<Partial<CMISType>> =
  Object.freeze({
    baseId: 'cmis:secondary',
    parentId: 'cmis:secondary',
    creatable: false,
    fileable: false,
    queryable: true,
    fulltextIndexed: false,
    includedInSupertypeQuery: true,
    controllablePolicy: false,
    controllableACL: false,
    typeMutability: Object.freeze({
      create: true,
      update: true,
      delete: true,
    }),
  });

export const DEFAULT_CMIS_PROPERTY_DEFINITION: Readonly<
  Partial<CMISTypePropertyDefinition>
> = Object.freeze({
  inherited: false,
  openChoice: true,
  required: false,
  queryable: true,
  orderable: false,
});
