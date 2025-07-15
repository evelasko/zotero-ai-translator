/**
 * Main Zotero Web API client
 */
import { ZoteroHttpClient, ZoteroHttpClientConfig } from './http';
import { ZoteroAuthConfig } from './auth';
import { ItemsAPI } from '../api/items';
import { CollectionsAPI } from '../api/collections';
export interface ZoteroClientConfig extends Omit<ZoteroHttpClientConfig, 'auth'> {
    /**
     * API key for authentication
     */
    apiKey?: string;
    /**
     * Authentication configuration
     */
    auth?: ZoteroAuthConfig;
}
export declare class ZoteroClient {
    private readonly httpClient;
    private readonly _items;
    private readonly _collections;
    constructor(config?: ZoteroClientConfig);
    /**
     * Items API
     */
    items(): ItemsAPI;
    /**
     * Collections API
     */
    collections(): CollectionsAPI;
    /**
     * Set authentication for the client
     */
    setAuth(auth: ZoteroAuthConfig | string): void;
    /**
     * Get the underlying HTTP client for advanced usage
     */
    getHttpClient(): ZoteroHttpClient;
}
/**
 * Create a new Zotero client instance
 */
export declare function createClient(config?: ZoteroClientConfig): ZoteroClient;
/**
 * Default export for convenience
 */
export { ZoteroClient as default };
//# sourceMappingURL=client.d.ts.map