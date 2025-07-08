/**
 * Main Zotero Web API client
 */

import { ZoteroHttpClient, ZoteroHttpClientConfig } from './http.js';
import { ZoteroAuth, ZoteroAuthConfig, createAuth } from './auth.js';
import { ItemsAPI } from '../api/items.js';
import { CollectionsAPI } from '../api/collections.js';

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

export class ZoteroClient {
  private readonly httpClient: ZoteroHttpClient;
  private readonly _items: ItemsAPI;
  private readonly _collections: CollectionsAPI;

  constructor(config: ZoteroClientConfig = {}) {
    // Set up authentication
    let auth: ZoteroAuth | undefined;
    
    if (config.auth) {
      auth = new ZoteroAuth(config.auth);
    } else if (config.apiKey) {
      auth = createAuth(config.apiKey);
    }
    
    // Create HTTP client
    this.httpClient = new ZoteroHttpClient({
      ...config,
      auth,
    });
    
    // Initialize API modules
    this._items = new ItemsAPI(this.httpClient);
    this._collections = new CollectionsAPI(this.httpClient);
  }

  /**
   * Items API
   */
  items(): ItemsAPI {
    return this._items;
  }

  /**
   * Collections API
   */
  collections(): CollectionsAPI {
    return this._collections;
  }

  /**
   * Set authentication for the client
   */
  setAuth(auth: ZoteroAuthConfig | string): void {
    const authInstance = typeof auth === 'string' ? createAuth(auth) : new ZoteroAuth(auth);
    this.httpClient.setAuth(authInstance);
  }

  /**
   * Get the underlying HTTP client for advanced usage
   */
  getHttpClient(): ZoteroHttpClient {
    return this.httpClient;
  }
}

/**
 * Create a new Zotero client instance
 */
export function createClient(config: ZoteroClientConfig = {}): ZoteroClient {
  return new ZoteroClient(config);
}

/**
 * Default export for convenience
 */
export { ZoteroClient as default };