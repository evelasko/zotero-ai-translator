/**
 * Utility functions for schema processing
 */

export { SchemaFetcher, ZoteroSchema, ZoteroItemType, ZoteroField, ZoteroCreatorType } from './schema-fetcher';

/**
 * Utility function to get item type names from schema
 */
export function getItemTypeNames(schema: import('./schema-fetcher').ZoteroSchema): string[] {
  return schema.itemTypes.map(item => item.itemType);
}

/**
 * Utility function to get creator types for a specific item type
 */
export function getCreatorTypesForItem(
  schema: import('./schema-fetcher').ZoteroSchema, 
  itemType: string
): string[] {
  const item = schema.itemTypes.find(item => item.itemType === itemType);
  return item?.creatorTypes?.map(ct => ct.creatorType) || [];
}

/**
 * Utility function to get fields for a specific item type
 */
export function getFieldsForItem(
  schema: import('./schema-fetcher').ZoteroSchema, 
  itemType: string
): string[] {
  const item = schema.itemTypes.find(item => item.itemType === itemType);
  return item?.fields?.map(field => field.field || field.baseField || '') || [];
}

/**
 * Utility function to validate if an item type exists in the schema
 */
export function isValidItemType(schema: import('./schema-fetcher').ZoteroSchema, itemType: string): boolean {
  return schema.itemTypes.some(item => item.itemType === itemType);
}

/**
 * Utility function to get schema version
 */
export function getSchemaVersion(schema: import('./schema-fetcher').ZoteroSchema): string {
  return schema.version;
}