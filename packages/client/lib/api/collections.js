"use strict";
/**
 * Collections API implementation for the Zotero Web API client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionsAPI = void 0;
const zotero_schema_types_1 = require("zotero-schema-types");
class CollectionsAPI {
    constructor(httpClient) {
        Object.defineProperty(this, "httpClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: httpClient
        });
    }
    /**
     * Get all collections in a library
     */
    async getAll(libraryType, libraryId, params = {}) {
        const endpoint = `/${libraryType}s/${libraryId}/collections`;
        const response = await this.httpClient.get(endpoint, { params: params });
        // Validate response data
        if (Array.isArray(response.data)) {
            response.data.forEach(collection => {
                try {
                    zotero_schema_types_1.ZoteroCollectionSchema.parse(collection);
                }
                catch {
                    // Invalid collection data received
                }
            });
        }
        return {
            ...response,
            pagination: this.httpClient.extractPaginationInfo(response.response),
        };
    }
    /**
     * Get a specific collection by key
     */
    async get(libraryType, libraryId, collectionKey, params = {}) {
        const endpoint = `/${libraryType}s/${libraryId}/collections/${collectionKey}`;
        const response = await this.httpClient.get(endpoint, { params: params });
        // Validate response data
        try {
            zotero_schema_types_1.ZoteroCollectionSchema.parse(response.data);
        }
        catch {
            // Invalid collection data received
        }
        return response;
    }
    /**
     * Create new collections
     */
    async create(libraryType, libraryId, collections) {
        const endpoint = `/${libraryType}s/${libraryId}/collections`;
        // Validate collections before sending
        collections.forEach(collection => {
            try {
                if (!collection.name) {
                    throw new Error('Collection name is required');
                }
            }
            catch (error) {
                throw new Error(`Invalid collection data: ${error}`);
            }
        });
        return this.httpClient.post(endpoint, collections);
    }
    /**
     * Update an existing collection
     */
    async update(libraryType, libraryId, collectionKey, collectionData, headers = {}) {
        const endpoint = `/${libraryType}s/${libraryId}/collections/${collectionKey}`;
        // Include version header for conflict detection
        const requestHeaders = {
            ...headers,
        };
        // If version is provided, include it in the If-Unmodified-Since-Version header
        if (collectionData.version) {
            requestHeaders['If-Unmodified-Since-Version'] = String(collectionData.version);
        }
        const response = await this.httpClient.put(endpoint, collectionData, { headers: requestHeaders });
        // Validate response data
        try {
            zotero_schema_types_1.ZoteroCollectionSchema.parse(response.data);
        }
        catch {
            // Invalid collection data received
        }
        return response;
    }
    /**
     * Update multiple collections
     */
    async updateMultiple(libraryType, libraryId, collections) {
        const endpoint = `/${libraryType}s/${libraryId}/collections`;
        // Validate collections before sending
        collections.forEach(collection => {
            if (!collection.key) {
                throw new Error('Collection key is required for updates');
            }
            if (!collection.version) {
                throw new Error('Collection version is required for updates');
            }
        });
        return this.httpClient.patch(endpoint, collections);
    }
    /**
     * Delete a collection
     */
    async delete(libraryType, libraryId, collectionKey, version) {
        const endpoint = `/${libraryType}s/${libraryId}/collections/${collectionKey}`;
        const headers = {};
        // Include version header for conflict detection
        if (version) {
            headers['If-Unmodified-Since-Version'] = String(version);
        }
        return this.httpClient.delete(endpoint, { headers });
    }
    /**
     * Delete multiple collections
     */
    async deleteMultiple(libraryType, libraryId, collections) {
        const endpoint = `/${libraryType}s/${libraryId}/collections`;
        const collectionKeys = collections.map(collection => collection.key);
        const queryParams = {
            collectionKey: collectionKeys.join(','),
        };
        // If all collections have versions, include them in the header
        const versions = collections.map(collection => collection.version).filter(Boolean);
        const headers = {};
        if (versions.length === collections.length) {
            headers['If-Unmodified-Since-Version'] = versions.join(',');
        }
        return this.httpClient.delete(endpoint, { params: queryParams, headers });
    }
    /**
     * Get subcollections of a collection
     */
    async getSubcollections(libraryType, libraryId, collectionKey, params = {}) {
        const endpoint = `/${libraryType}s/${libraryId}/collections/${collectionKey}/collections`;
        const response = await this.httpClient.get(endpoint, { params: params });
        return {
            ...response,
            pagination: this.httpClient.extractPaginationInfo(response.response),
        };
    }
    /**
     * Get items in a collection
     */
    async getItems(libraryType, libraryId, collectionKey, params = {}) {
        const endpoint = `/${libraryType}s/${libraryId}/collections/${collectionKey}/items`;
        const response = await this.httpClient.get(endpoint, { params: params });
        return {
            ...response,
            pagination: this.httpClient.extractPaginationInfo(response.response),
        };
    }
    /**
     * Get top-level collections (collections without parents)
     */
    async getTop(libraryType, libraryId, params = {}) {
        const endpoint = `/${libraryType}s/${libraryId}/collections/top`;
        const response = await this.httpClient.get(endpoint, { params: params });
        return {
            ...response,
            pagination: this.httpClient.extractPaginationInfo(response.response),
        };
    }
}
exports.CollectionsAPI = CollectionsAPI;
//# sourceMappingURL=collections.js.map