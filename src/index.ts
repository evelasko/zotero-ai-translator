/**
 * Zotero Web API Client
 * 
 * A modern, robust, and type-safe client for the Zotero Web API v3
 */

// Core exports
export { ZoteroClient, ZoteroClientConfig, createClient } from './core/client.js';
export { ZoteroHttpClient, ZoteroHttpClientConfig, ZoteroResponse, PaginationInfo } from './core/http.js';
export { ZoteroAuth, ZoteroAuthConfig, createAuth } from './core/auth.js';

// Error exports
export {
  ZoteroAPIError,
  ZoteroAuthenticationError,
  ZoteroNotFoundError,
  ZoteroRateLimitError,
  ZoteroValidationError,
  ZoteroConflictError,
  ZoteroForbiddenError,
  ZoteroBadRequestError,
  ZoteroServerError,
  ZoteroNetworkError,
  createErrorFromResponse,
  isZoteroAPIError,
  isRateLimitError,
  isAuthenticationError,
  isValidationError,
  isNetworkError,
} from './core/errors.js';

// API exports
export { ItemsAPI, ItemsQueryParams, ItemsCreateData, ItemsUpdateData, ItemsBatchResponse } from './api/items.js';
export { CollectionsAPI, CollectionsQueryParams, CollectionsBatchResponse } from './api/collections.js';

// Generated types and schemas
export * from './generated/types/index.js';
export * from './generated/schemas/index.js';

// Default client for convenience
export { ZoteroClient as default } from './core/client.js';