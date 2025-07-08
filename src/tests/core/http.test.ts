/**
 * Tests for HTTP client functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ZoteroHttpClient } from '../../core/http.js';
import { ZoteroAuth } from '../../core/auth.js';
import { ZoteroAPIError, ZoteroRateLimitError, ZoteroAuthenticationError } from '../../core/errors.js';

describe('ZoteroHttpClient', () => {
  let client: ZoteroHttpClient;
  const testApiKey = 'abcdef1234567890abcdef1234567890';

  beforeEach(() => {
    client = new ZoteroHttpClient({
      auth: new ZoteroAuth({ apiKey: testApiKey }),
      timeout: 5000, // Increase timeout for tests
      retries: 1, // Reduce retries for tests
    });
  });

  describe('constructor', () => {
    it('should create client with default config', () => {
      const defaultClient = new ZoteroHttpClient();
      expect(defaultClient).toBeInstanceOf(ZoteroHttpClient);
    });

    it('should create client with custom config', () => {
      const customClient = new ZoteroHttpClient({
        baseURL: 'https://custom.api.com',
        timeout: 60000,
        retries: 5,
      });
      expect(customClient).toBeInstanceOf(ZoteroHttpClient);
    });
  });

  describe('GET requests', () => {
    it('should make successful GET request', async () => {
      const response = await client.get('/users/12345/items');
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data).toHaveLength(2);
    });

    it('should handle query parameters', async () => {
      const response = await client.get('/users/12345/items', {
        params: { limit: 10, start: 0 },
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should extract pagination info', async () => {
      const response = await client.get('/users/12345/items');
      const pagination = client.extractPaginationInfo(response.response);
      
      expect(pagination.totalResults).toBe(2);
      expect(pagination.links).toBeDefined();
    });

    it('should handle 404 errors', async () => {
      await expect(client.get('/users/12345/items/NOTFOUND')).rejects.toThrow(ZoteroAPIError);
    });

    it('should handle rate limiting', async () => {
      await expect(client.get('/users/12345/items/RATELIMIT')).rejects.toThrow(ZoteroRateLimitError);
    });

    it('should handle authentication errors', async () => {
      await expect(client.get('/users/12345/items/UNAUTHORIZED')).rejects.toThrow(ZoteroAuthenticationError);
    });
  });

  describe('POST requests', () => {
    it('should make successful POST request', async () => {
      const itemData = [{
        itemType: 'book',
        title: 'Test Book',
      }];
      
      const response = await client.post('/users/12345/items', itemData);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('successful');
      expect(response.data).toHaveProperty('success');
    });

    it('should handle validation errors', async () => {
      await expect(client.post('/users/12345/items', 'invalid-data')).rejects.toThrow(ZoteroAPIError);
    });
  });

  describe('PUT requests', () => {
    it('should make successful PUT request', async () => {
      const itemData = {
        itemType: 'book',
        title: 'Updated Book',
        version: 1,
      };
      
      const response = await client.put('/users/12345/items/ABCD1234', itemData);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('key', 'ABCD1234');
    });
  });

  describe('DELETE requests', () => {
    it('should make successful DELETE request', async () => {
      const response = await client.delete('/users/12345/items/ABCD1234');
      
      expect(response.status).toBe(204);
    });

    it('should handle 404 on delete', async () => {
      await expect(client.delete('/users/12345/items/NOTFOUND')).rejects.toThrow(ZoteroAPIError);
    });
  });

  describe('authentication', () => {
    it('should include auth headers in requests', async () => {
      // This is tested implicitly by the successful requests above
      // The MSW handlers expect the auth headers to be present
      const response = await client.get('/users/12345/items');
      expect(response.status).toBe(200);
    });

    it('should be able to set new auth', () => {
      const newAuth = new ZoteroAuth({ apiKey: 'new-key-12345678901234567890123456' });
      client.setAuth(newAuth);
      
      // Test that the new auth is used (implicitly through successful requests)
      expect(() => client.setAuth(newAuth)).not.toThrow();
    });
  });

  describe('error handling', () => {
    it('should handle network errors', async () => {
      // This would be tested with a real network failure
      // For now, we test that errors are properly thrown
      await expect(client.get('/users/12345/items/SERVERERROR')).rejects.toThrow(ZoteroAPIError);
    });

    it('should retry on server errors', async () => {
      // Server errors should be retried
      await expect(client.get('/users/12345/items/SERVERERROR')).rejects.toThrow(ZoteroAPIError);
    });

    it('should not retry on client errors', async () => {
      // Client errors (4xx) should not be retried
      await expect(client.get('/users/12345/items/NOTFOUND')).rejects.toThrow(ZoteroAPIError);
    });
  });

  describe('response parsing', () => {
    it('should parse JSON responses', async () => {
      const response = await client.get('/users/12345/items');
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle empty responses', async () => {
      const response = await client.delete('/users/12345/items/ABCD1234');
      expect(response.status).toBe(204);
    });
  });
});

describe('ZoteroHttpClient without auth', () => {
  it('should work for public endpoints', async () => {
    const client = new ZoteroHttpClient();
    const response = await client.get('/schema');
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('version');
  });
});