"use strict";
/**
 * Items API implementation for the Zotero Web API client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsAPI = void 0;
const zotero_schema_types_1 = require("zotero-schema-types");
class ItemsAPI {
    constructor(httpClient) {
        Object.defineProperty(this, "httpClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: httpClient
        });
    }
    /**
     * Get all items in a library
     */
    async getAll(libraryType, libraryId, params = {}) {
        const endpoint = `/${libraryType}s/${libraryId}/items`;
        const response = await this.httpClient.get(endpoint, { params: params });
        // Validate response data
        if (Array.isArray(response.data)) {
            response.data.forEach(item => {
                try {
                    zotero_schema_types_1.ZoteroItemSchema.parse(item);
                }
                catch {
                    // Invalid item data received
                }
            });
        }
        return {
            ...response,
            pagination: this.httpClient.extractPaginationInfo(response.response),
        };
    }
    /**
     * Get a specific item by key
     */
    async get(libraryType, libraryId, itemKey, params = {}) {
        const endpoint = `/${libraryType}s/${libraryId}/items/${itemKey}`;
        const response = await this.httpClient.get(endpoint, { params: params });
        // Validate response data
        try {
            zotero_schema_types_1.ZoteroItemSchema.parse(response.data);
        }
        catch {
            // Invalid item data received
        }
        return response;
    }
    /**
     * Create new items
     */
    async create(libraryType, libraryId, items) {
        const endpoint = `/${libraryType}s/${libraryId}/items`;
        // Validate items before sending
        items.forEach(item => {
            try {
                // Basic validation - you might want to use a more specific schema
                if (!item.itemType) {
                    throw new Error('Item type is required');
                }
            }
            catch (error) {
                throw new Error(`Invalid item data: ${error}`);
            }
        });
        return this.httpClient.post(endpoint, items);
    }
    /**
     * Update an existing item
     */
    async update(libraryType, libraryId, itemKey, itemData, headers = {}) {
        const endpoint = `/${libraryType}s/${libraryId}/items/${itemKey}`;
        // Include version header for conflict detection
        const requestHeaders = {
            ...headers,
        };
        // If version is provided, include it in the If-Unmodified-Since-Version header
        if (itemData.version) {
            requestHeaders['If-Unmodified-Since-Version'] = String(itemData.version);
        }
        const response = await this.httpClient.put(endpoint, itemData, { headers: requestHeaders });
        // Validate response data
        try {
            zotero_schema_types_1.ZoteroItemSchema.parse(response.data);
        }
        catch {
            // Invalid item data received
        }
        return response;
    }
    /**
     * Update multiple items
     */
    async updateMultiple(libraryType, libraryId, items) {
        const endpoint = `/${libraryType}s/${libraryId}/items`;
        // Validate items before sending
        items.forEach(item => {
            if (!item.key) {
                throw new Error('Item key is required for updates');
            }
            if (!item.version) {
                throw new Error('Item version is required for updates');
            }
        });
        return this.httpClient.patch(endpoint, items);
    }
    /**
     * Delete an item
     */
    async delete(libraryType, libraryId, itemKey, version) {
        const endpoint = `/${libraryType}s/${libraryId}/items/${itemKey}`;
        const headers = {};
        // Include version header for conflict detection
        if (version) {
            headers['If-Unmodified-Since-Version'] = String(version);
        }
        return this.httpClient.delete(endpoint, { headers });
    }
    /**
     * Delete multiple items
     */
    async deleteMultiple(libraryType, libraryId, items) {
        const endpoint = `/${libraryType}s/${libraryId}/items`;
        const itemKeys = items.map(item => item.key);
        const queryParams = {
            itemKey: itemKeys.join(','),
        };
        // If all items have versions, include them in the header
        const versions = items.map(item => item.version).filter(Boolean);
        const headers = {};
        if (versions.length === items.length) {
            headers['If-Unmodified-Since-Version'] = versions.join(',');
        }
        return this.httpClient.delete(endpoint, { params: queryParams, headers });
    }
    /**
     * Get item children (attachments, notes)
     */
    async getChildren(libraryType, libraryId, itemKey, params = {}) {
        const endpoint = `/${libraryType}s/${libraryId}/items/${itemKey}/children`;
        const response = await this.httpClient.get(endpoint, { params: params });
        return {
            ...response,
            pagination: this.httpClient.extractPaginationInfo(response.response),
        };
    }
    /**
     * Get items in trash
     */
    async getTrash(libraryType, libraryId, params = {}) {
        const endpoint = `/${libraryType}s/${libraryId}/items/trash`;
        const response = await this.httpClient.get(endpoint, { params: params });
        return {
            ...response,
            pagination: this.httpClient.extractPaginationInfo(response.response),
        };
    }
    /**
     * Get top-level items (items without parents)
     */
    async getTop(libraryType, libraryId, params = {}) {
        const endpoint = `/${libraryType}s/${libraryId}/items/top`;
        const response = await this.httpClient.get(endpoint, { params: params });
        return {
            ...response,
            pagination: this.httpClient.extractPaginationInfo(response.response),
        };
    }
}
exports.ItemsAPI = ItemsAPI;
//# sourceMappingURL=items.js.map