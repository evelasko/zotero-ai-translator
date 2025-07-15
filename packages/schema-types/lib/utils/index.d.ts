/**
 * Utility functions for schema processing
 */
export { SchemaFetcher, ZoteroSchema, ZoteroItemType, ZoteroField, ZoteroCreatorType } from './schema-fetcher';
/**
 * Utility function to get item type names from schema
 */
export declare function getItemTypeNames(schema: import('./schema-fetcher').ZoteroSchema): string[];
/**
 * Utility function to get creator types for a specific item type
 */
export declare function getCreatorTypesForItem(schema: import('./schema-fetcher').ZoteroSchema, itemType: string): string[];
/**
 * Utility function to get fields for a specific item type
 */
export declare function getFieldsForItem(schema: import('./schema-fetcher').ZoteroSchema, itemType: string): string[];
/**
 * Utility function to validate if an item type exists in the schema
 */
export declare function isValidItemType(schema: import('./schema-fetcher').ZoteroSchema, itemType: string): boolean;
/**
 * Utility function to get schema version
 */
export declare function getSchemaVersion(schema: import('./schema-fetcher').ZoteroSchema): string;
//# sourceMappingURL=index.d.ts.map