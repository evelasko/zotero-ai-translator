/**
 * Tests for the main Zotero client
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ZoteroClient, createClient } from '../../core/client';
import { ItemsAPI } from '../../api/items';
import { CollectionsAPI } from '../../api/collections';
import { ZoteroHttpClient } from '../../core/http';

describe('ZoteroClient', () => {
  const testApiKey = 'abcdef1234567890abcdef1234567890';

  describe('constructor', () => {
    it('should create client with API key', () => {
      const client = new ZoteroClient({ apiKey: testApiKey });
      expect(client).toBeInstanceOf(ZoteroClient);
    });

    it('should create client with auth config', () => {
      const client = new ZoteroClient({ 
        auth: { apiKey: testApiKey, method: 'bearer' } 
      });
      expect(client).toBeInstanceOf(ZoteroClient);
    });

    it('should create client without authentication', () => {
      const client = new ZoteroClient();
      expect(client).toBeInstanceOf(ZoteroClient);
    });

    it('should create client with custom config', () => {
      const client = new ZoteroClient({
        apiKey: testApiKey,
        baseURL: 'https://custom.api.com',
        timeout: 60000,
      });
      expect(client).toBeInstanceOf(ZoteroClient);
    });
  });

  describe('API modules', () => {
    let client: ZoteroClient;

    beforeEach(() => {
      client = new ZoteroClient({ 
        apiKey: testApiKey,
        timeout: 5000, // Increase timeout for tests
        retries: 1, // Reduce retries for tests
      });
    });

    it('should provide items API', () => {
      const itemsAPI = client.items();
      expect(itemsAPI).toBeInstanceOf(ItemsAPI);
    });

    it('should provide collections API', () => {
      const collectionsAPI = client.collections();
      expect(collectionsAPI).toBeInstanceOf(CollectionsAPI);
    });

    it('should provide HTTP client', () => {
      const httpClient = client.getHttpClient();
      expect(httpClient).toBeInstanceOf(ZoteroHttpClient);
    });
  });

  describe('setAuth', () => {
    let client: ZoteroClient;

    beforeEach(() => {
      client = new ZoteroClient();
    });

    it('should set auth with API key string', () => {
      expect(() => client.setAuth(testApiKey)).not.toThrow();
    });

    it('should set auth with config object', () => {
      const authConfig = { apiKey: testApiKey, method: 'bearer' as const };
      expect(() => client.setAuth(authConfig)).not.toThrow();
    });
  });

  describe('integration tests', () => {
    let client: ZoteroClient;

    beforeEach(() => {
      client = new ZoteroClient({ 
        apiKey: testApiKey,
        timeout: 5000, // Increase timeout for tests
        retries: 1, // Reduce retries for tests
      });
    });

    it('should fetch schema without authentication', async () => {
      const publicClient = new ZoteroClient();
      const response = await publicClient.getHttpClient().get('/schema');
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('version');
    });

    it('should fetch user items with authentication', async () => {
      const response = await client.items().getAll('user', 12345);
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should fetch user collections with authentication', async () => {
      const response = await client.collections().getAll('user', 12345);
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle chained operations', async () => {
      // Get all items
      const itemsResponse = await client.items().getAll('user', 12345);
      expect(itemsResponse.data).toBeInstanceOf(Array);
      
      // Get all collections
      const collectionsResponse = await client.collections().getAll('user', 12345);
      expect(collectionsResponse.data).toBeInstanceOf(Array);
      
      // Get specific item
      if (itemsResponse.data.length > 0) {
        const firstItem = itemsResponse.data[0];
        if (firstItem?.key) {
          const itemResponse = await client.items().get('user', 12345, firstItem.key);
          expect(itemResponse.data).toHaveProperty('key', firstItem.key);
        }
      }
    });
  });
});

describe('createClient', () => {
  const testApiKey = 'abcdef1234567890abcdef1234567890';

  it('should create client with API key', () => {
    const client = createClient({ apiKey: testApiKey });
    expect(client).toBeInstanceOf(ZoteroClient);
  });

  it('should create client without config', () => {
    const client = createClient();
    expect(client).toBeInstanceOf(ZoteroClient);
  });

  it('should create client with custom config', () => {
    const client = createClient({
      apiKey: testApiKey,
      baseURL: 'https://custom.api.com',
      timeout: 60000,
    });
    expect(client).toBeInstanceOf(ZoteroClient);
  });
});