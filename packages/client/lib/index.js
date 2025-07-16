"use strict";
/**
 * Main entry point for the Zotero Web API client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoteroKeyPermissionsSchema = exports.ZoteroSettingsSchema = exports.ZoteroDeletedContentSchema = exports.ZoteroCollectionTemplateSchema = exports.ZoteroTemplateSchema = exports.ZoteroItemTypeTemplateSchema = exports.ZoteroFieldTemplateSchema = exports.ZoteroCreatorTemplateSchema = exports.ZoteroItemTemplateSchema = exports.ZoteroCreatorTypeSchema = exports.ZoteroFieldSchema = exports.ZoteroItemTypeSchema = exports.ZoteroDateObjectSchema = exports.ZoteroDateStringSchema = exports.ZoteroRelationSchema = exports.ZoteroAttachmentSchema = exports.ZoteroNoteSchema = exports.ZoteroTagSchema = exports.ZoteroCreatorSchema = exports.ZoteroUserSchema = exports.ZoteroGroupSchema = exports.ZoteroLibrarySchema = exports.ZoteroCollectionDataSchema = exports.ZoteroItemDataSchema = exports.ZoteroCollectionSchema = exports.ZoteroItemSchema = exports.CollectionsAPI = exports.ItemsAPI = exports.isNetworkError = exports.isValidationError = exports.isAuthenticationError = exports.isRateLimitError = exports.isZoteroAPIError = exports.createErrorFromResponse = exports.ZoteroNetworkError = exports.ZoteroServerError = exports.ZoteroBadRequestError = exports.ZoteroForbiddenError = exports.ZoteroConflictError = exports.ZoteroValidationError = exports.ZoteroRateLimitError = exports.ZoteroNotFoundError = exports.ZoteroAuthenticationError = exports.ZoteroAPIError = exports.isValidAuthConfig = exports.createAuth = exports.ZoteroAuth = exports.ZoteroHttpClient = exports.createClient = exports.ZoteroClient = void 0;
exports.default = exports.ZoteroWriteTokenSchema = exports.ZoteroAPIResponseSchema = exports.ZoteroSyncErrorSchema = exports.ZoteroSyncSchema = exports.ZoteroInkSchema = exports.ZoteroImageSchema = exports.ZoteroHighlightSchema = exports.ZoteroAnnotationSchema = exports.ZoteroFulltextContentSchema = exports.ZoteroSearchResultSchema = exports.ZoteroSearchQuerySchema = exports.ZoteroGroupMetadataSchema = void 0;
// Export the main client class and factory function
var client_1 = require("./core/client");
Object.defineProperty(exports, "ZoteroClient", { enumerable: true, get: function () { return client_1.ZoteroClient; } });
Object.defineProperty(exports, "createClient", { enumerable: true, get: function () { return client_1.createClient; } });
// Export HTTP client and related types
var http_1 = require("./core/http");
Object.defineProperty(exports, "ZoteroHttpClient", { enumerable: true, get: function () { return http_1.ZoteroHttpClient; } });
// Export authentication classes and functions
var auth_1 = require("./core/auth");
Object.defineProperty(exports, "ZoteroAuth", { enumerable: true, get: function () { return auth_1.ZoteroAuth; } });
Object.defineProperty(exports, "createAuth", { enumerable: true, get: function () { return auth_1.createAuth; } });
Object.defineProperty(exports, "isValidAuthConfig", { enumerable: true, get: function () { return auth_1.isValidAuthConfig; } });
// Export all error classes and utility functions
var errors_1 = require("./core/errors");
Object.defineProperty(exports, "ZoteroAPIError", { enumerable: true, get: function () { return errors_1.ZoteroAPIError; } });
Object.defineProperty(exports, "ZoteroAuthenticationError", { enumerable: true, get: function () { return errors_1.ZoteroAuthenticationError; } });
Object.defineProperty(exports, "ZoteroNotFoundError", { enumerable: true, get: function () { return errors_1.ZoteroNotFoundError; } });
Object.defineProperty(exports, "ZoteroRateLimitError", { enumerable: true, get: function () { return errors_1.ZoteroRateLimitError; } });
Object.defineProperty(exports, "ZoteroValidationError", { enumerable: true, get: function () { return errors_1.ZoteroValidationError; } });
Object.defineProperty(exports, "ZoteroConflictError", { enumerable: true, get: function () { return errors_1.ZoteroConflictError; } });
Object.defineProperty(exports, "ZoteroForbiddenError", { enumerable: true, get: function () { return errors_1.ZoteroForbiddenError; } });
Object.defineProperty(exports, "ZoteroBadRequestError", { enumerable: true, get: function () { return errors_1.ZoteroBadRequestError; } });
Object.defineProperty(exports, "ZoteroServerError", { enumerable: true, get: function () { return errors_1.ZoteroServerError; } });
Object.defineProperty(exports, "ZoteroNetworkError", { enumerable: true, get: function () { return errors_1.ZoteroNetworkError; } });
Object.defineProperty(exports, "createErrorFromResponse", { enumerable: true, get: function () { return errors_1.createErrorFromResponse; } });
Object.defineProperty(exports, "isZoteroAPIError", { enumerable: true, get: function () { return errors_1.isZoteroAPIError; } });
Object.defineProperty(exports, "isRateLimitError", { enumerable: true, get: function () { return errors_1.isRateLimitError; } });
Object.defineProperty(exports, "isAuthenticationError", { enumerable: true, get: function () { return errors_1.isAuthenticationError; } });
Object.defineProperty(exports, "isValidationError", { enumerable: true, get: function () { return errors_1.isValidationError; } });
Object.defineProperty(exports, "isNetworkError", { enumerable: true, get: function () { return errors_1.isNetworkError; } });
// Export API classes and their interfaces
var items_1 = require("./api/items");
Object.defineProperty(exports, "ItemsAPI", { enumerable: true, get: function () { return items_1.ItemsAPI; } });
var collections_1 = require("./api/collections");
Object.defineProperty(exports, "CollectionsAPI", { enumerable: true, get: function () { return collections_1.CollectionsAPI; } });
// Re-export types and schemas from the schema-types package
var zotero_schema_types_1 = require("zotero-schema-types");
Object.defineProperty(exports, "ZoteroItemSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroItemSchema; } });
Object.defineProperty(exports, "ZoteroCollectionSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroCollectionSchema; } });
Object.defineProperty(exports, "ZoteroItemDataSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroItemDataSchema; } });
Object.defineProperty(exports, "ZoteroCollectionDataSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroCollectionDataSchema; } });
Object.defineProperty(exports, "ZoteroLibrarySchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroLibrarySchema; } });
Object.defineProperty(exports, "ZoteroGroupSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroGroupSchema; } });
Object.defineProperty(exports, "ZoteroUserSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroUserSchema; } });
Object.defineProperty(exports, "ZoteroCreatorSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroCreatorSchema; } });
Object.defineProperty(exports, "ZoteroTagSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroTagSchema; } });
Object.defineProperty(exports, "ZoteroNoteSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroNoteSchema; } });
Object.defineProperty(exports, "ZoteroAttachmentSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroAttachmentSchema; } });
Object.defineProperty(exports, "ZoteroRelationSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroRelationSchema; } });
Object.defineProperty(exports, "ZoteroDateStringSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroDateStringSchema; } });
Object.defineProperty(exports, "ZoteroDateObjectSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroDateObjectSchema; } });
Object.defineProperty(exports, "ZoteroItemTypeSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroItemTypeSchema; } });
Object.defineProperty(exports, "ZoteroFieldSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroFieldSchema; } });
Object.defineProperty(exports, "ZoteroCreatorTypeSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroCreatorTypeSchema; } });
Object.defineProperty(exports, "ZoteroItemTemplateSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroItemTemplateSchema; } });
Object.defineProperty(exports, "ZoteroCreatorTemplateSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroCreatorTemplateSchema; } });
Object.defineProperty(exports, "ZoteroFieldTemplateSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroFieldTemplateSchema; } });
Object.defineProperty(exports, "ZoteroItemTypeTemplateSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroItemTypeTemplateSchema; } });
Object.defineProperty(exports, "ZoteroTemplateSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroTemplateSchema; } });
Object.defineProperty(exports, "ZoteroCollectionTemplateSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroCollectionTemplateSchema; } });
Object.defineProperty(exports, "ZoteroDeletedContentSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroDeletedContentSchema; } });
Object.defineProperty(exports, "ZoteroSettingsSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroSettingsSchema; } });
Object.defineProperty(exports, "ZoteroKeyPermissionsSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroKeyPermissionsSchema; } });
Object.defineProperty(exports, "ZoteroGroupMetadataSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroGroupMetadataSchema; } });
Object.defineProperty(exports, "ZoteroSearchQuerySchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroSearchQuerySchema; } });
Object.defineProperty(exports, "ZoteroSearchResultSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroSearchResultSchema; } });
Object.defineProperty(exports, "ZoteroFulltextContentSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroFulltextContentSchema; } });
Object.defineProperty(exports, "ZoteroAnnotationSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroAnnotationSchema; } });
Object.defineProperty(exports, "ZoteroHighlightSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroHighlightSchema; } });
Object.defineProperty(exports, "ZoteroImageSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroImageSchema; } });
Object.defineProperty(exports, "ZoteroInkSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroInkSchema; } });
Object.defineProperty(exports, "ZoteroSyncSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroSyncSchema; } });
Object.defineProperty(exports, "ZoteroSyncErrorSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroSyncErrorSchema; } });
Object.defineProperty(exports, "ZoteroAPIResponseSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroAPIResponseSchema; } });
Object.defineProperty(exports, "ZoteroWriteTokenSchema", { enumerable: true, get: function () { return zotero_schema_types_1.ZoteroWriteTokenSchema; } });
// Default export for convenience
var client_2 = require("./core/client");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return client_2.ZoteroClient; } });
//# sourceMappingURL=index.js.map