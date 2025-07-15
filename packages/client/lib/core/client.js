"use strict";
/**
 * Main Zotero Web API client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.ZoteroClient = void 0;
exports.createClient = createClient;
const http_1 = require("./http");
const auth_1 = require("./auth");
const items_1 = require("../api/items");
const collections_1 = require("../api/collections");
class ZoteroClient {
    constructor(config = {}) {
        Object.defineProperty(this, "httpClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_items", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_collections", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Set up authentication
        let auth;
        if (config.auth) {
            auth = new auth_1.ZoteroAuth(config.auth);
        }
        else if (config.apiKey) {
            auth = (0, auth_1.createAuth)(config.apiKey);
        }
        // Create HTTP client
        this.httpClient = new http_1.ZoteroHttpClient({
            ...config,
            auth,
        });
        // Initialize API modules
        this._items = new items_1.ItemsAPI(this.httpClient);
        this._collections = new collections_1.CollectionsAPI(this.httpClient);
    }
    /**
     * Items API
     */
    items() {
        return this._items;
    }
    /**
     * Collections API
     */
    collections() {
        return this._collections;
    }
    /**
     * Set authentication for the client
     */
    setAuth(auth) {
        const authInstance = typeof auth === 'string' ? (0, auth_1.createAuth)(auth) : new auth_1.ZoteroAuth(auth);
        this.httpClient.setAuth(authInstance);
    }
    /**
     * Get the underlying HTTP client for advanced usage
     */
    getHttpClient() {
        return this.httpClient;
    }
}
exports.ZoteroClient = ZoteroClient;
exports.default = ZoteroClient;
/**
 * Create a new Zotero client instance
 */
function createClient(config = {}) {
    return new ZoteroClient(config);
}
//# sourceMappingURL=client.js.map