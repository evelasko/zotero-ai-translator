"use strict";
/**
 * Authentication configuration and utilities for the Zotero Web API client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoteroAuth = void 0;
exports.createAuth = createAuth;
exports.isValidAuthConfig = isValidAuthConfig;
class ZoteroAuth {
    constructor(config) {
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "method", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (!config.apiKey || config.apiKey.trim() === '') {
            throw new Error('API key is required for authentication');
        }
        this.apiKey = config.apiKey.trim();
        this.method = config.method ?? 'header';
    }
    /**
     * Get the authentication headers for API requests
     */
    getAuthHeaders() {
        switch (this.method) {
            case 'bearer':
                return {
                    Authorization: `Bearer ${this.apiKey}`,
                };
            case 'header':
            default:
                return {
                    'Zotero-API-Key': this.apiKey,
                };
        }
    }
    /**
     * Get the API key (for query parameter authentication if needed)
     */
    getApiKey() {
        return this.apiKey;
    }
    /**
     * Check if authentication is configured
     */
    isAuthenticated() {
        return this.apiKey.length > 0;
    }
    /**
     * Validate API key format (basic validation)
     */
    validateApiKey() {
        // Basic validation - Zotero API keys are typically 32 characters
        const keyRegex = /^[a-zA-Z0-9]{32}$/;
        return keyRegex.test(this.apiKey);
    }
}
exports.ZoteroAuth = ZoteroAuth;
/**
 * Create authentication instance from API key string
 */
function createAuth(apiKey, method) {
    return new ZoteroAuth({ apiKey, method: method ?? 'header' });
}
/**
 * Type guard to check if auth config is valid
 */
function isValidAuthConfig(config) {
    return (typeof config === 'object' &&
        config !== null &&
        typeof config.apiKey === 'string' &&
        config.apiKey.trim().length > 0);
}
//# sourceMappingURL=auth.js.map