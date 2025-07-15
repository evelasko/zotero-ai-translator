"use strict";
/**
 * Utility functions for schema processing
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaFetcher = void 0;
exports.getItemTypeNames = getItemTypeNames;
exports.getCreatorTypesForItem = getCreatorTypesForItem;
exports.getFieldsForItem = getFieldsForItem;
exports.isValidItemType = isValidItemType;
exports.getSchemaVersion = getSchemaVersion;
var schema_fetcher_1 = require("./schema-fetcher");
Object.defineProperty(exports, "SchemaFetcher", { enumerable: true, get: function () { return schema_fetcher_1.SchemaFetcher; } });
/**
 * Utility function to get item type names from schema
 */
function getItemTypeNames(schema) {
    return schema.itemTypes.map(item => item.itemType);
}
/**
 * Utility function to get creator types for a specific item type
 */
function getCreatorTypesForItem(schema, itemType) {
    const item = schema.itemTypes.find(item => item.itemType === itemType);
    return item?.creatorTypes?.map(ct => ct.creatorType) || [];
}
/**
 * Utility function to get fields for a specific item type
 */
function getFieldsForItem(schema, itemType) {
    const item = schema.itemTypes.find(item => item.itemType === itemType);
    return item?.fields?.map(field => field.field || field.baseField || '') || [];
}
/**
 * Utility function to validate if an item type exists in the schema
 */
function isValidItemType(schema, itemType) {
    return schema.itemTypes.some(item => item.itemType === itemType);
}
/**
 * Utility function to get schema version
 */
function getSchemaVersion(schema) {
    return schema.version;
}
//# sourceMappingURL=index.js.map