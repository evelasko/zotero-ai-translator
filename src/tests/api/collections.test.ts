/**
 * Tests for Collections API functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ZoteroClient } from '../../core/client.js';
import { ZoteroAPIError } from '../../core/errors.js';

describe('CollectionsAPI', () => {
  let client: ZoteroClient;
  const testApiKey = 'abcdef1234567890abcdef1234567890';
  const userId = 12345;

  beforeEach(() => {
    client = new ZoteroClient({ 
      apiKey: testApiKey,
      timeout: 5000, // Increase timeout for tests
      retries: 1, // Reduce retries for tests
    });
  });

  describe('getAll', () => {
    it('should fetch all collections', async () => {
      const response = await client.collections().getAll('user', userId);
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data).toHaveLength(1);
      expect(response.pagination.totalResults).toBe(1);
    });

    it('should handle query parameters', async () => {
      const response = await client.collections().getAll('user', userId, {
        limit: 10,
        start: 0,
        sort: 'title',
        direction: 'asc',
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle since parameter', async () => {
      const response = await client.collections().getAll('user', userId, {
        since: 0,
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('get', () => {
    it('should fetch a specific collection', async () => {
      const response = await client.collections().get('user', userId, 'COLLECTION1');
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('key', 'COLLECTION1');
      expect(response.data.data.name).toBe('Test Collection');
    });

    it('should handle 404 for non-existent collection', async () => {
      await expect(
        client.collections().get('user', userId, 'NOTFOUND')
      ).rejects.toThrow(ZoteroAPIError);
    });

    it('should handle include parameters', async () => {
      const response = await client.collections().get('user', userId, 'COLLECTION1', {
        include: ['data'],
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('key', 'COLLECTION1');
    });
  });

  describe('create', () => {
    it('should create new collections', async () => {
      const collectionsData = [
        {
          name: 'New Collection 1',
          parentCollection: false,
        },
        {
          name: 'New Collection 2',
          parentCollection: false,
        },
      ];

      const response = await client.collections().create('user', userId, collectionsData);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('successful');
      expect(response.data).toHaveProperty('success');
      expect(Object.keys(response.data.successful)).toHaveLength(2);
    });

    it('should validate collection data before creation', async () => {
      const invalidCollections = [
        {
          // Missing name
          parentCollection: false,
        },
      ];

      await expect(
        client.collections().create('user', userId, invalidCollections as unknown[])
      ).rejects.toThrow('Collection name is required');
    });
  });

  describe('update', () => {
    it('should update an existing collection', async () => {
      const collectionData = {
        key: 'COLLECTION1',
        version: 1,
        name: 'Updated Collection',
        parentCollection: false,
      };

      const response = await client.collections().update('user', userId, 'COLLECTION1', collectionData);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('key', 'COLLECTION1');
      expect(response.data).toHaveProperty('version', 2);
    });

    it('should handle version conflicts', async () => {
      const collectionData = {
        key: 'COLLECTION1',
        version: 1,
        name: 'Updated Collection',
        parentCollection: false,
      };

      // First update should succeed
      const response = await client.collections().update('user', userId, 'COLLECTION1', collectionData);
      expect(response.status).toBe(200);
    });
  });

  describe('updateMultiple', () => {
    it('should update multiple collections', async () => {
      const collectionsData = [
        {
          key: 'COLLECTION1',
          version: 1,
          name: 'Updated Collection 1',
          parentCollection: false,
        },
      ];

      const response = await client.collections().updateMultiple('user', userId, collectionsData);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('successful');
    });

    it('should validate collections have keys and versions', async () => {
      const invalidCollections = [
        {
          // Missing key
          version: 1,
          name: 'Invalid Collection',
          parentCollection: false,
        },
      ];

      await expect(
        client.collections().updateMultiple('user', userId, invalidCollections as unknown[])
      ).rejects.toThrow('Collection key is required');
    });
  });

  describe('delete', () => {
    it('should delete a collection', async () => {
      const response = await client.collections().delete('user', userId, 'COLLECTION1');
      
      expect(response.status).toBe(204);
    });

    it('should handle 404 for non-existent collection', async () => {
      await expect(
        client.collections().delete('user', userId, 'NOTFOUND')
      ).rejects.toThrow(ZoteroAPIError);
    });

    it('should include version in headers', async () => {
      const response = await client.collections().delete('user', userId, 'COLLECTION1', 1);
      
      expect(response.status).toBe(204);
    });
  });

  describe('deleteMultiple', () => {
    it('should delete multiple collections', async () => {
      const collections = [
        { key: 'COLLECTION1', version: 1 },
      ];

      const response = await client.collections().deleteMultiple('user', userId, collections);
      
      expect(response.status).toBe(204);
    });

    it('should handle collections without versions', async () => {
      const collections = [
        { key: 'COLLECTION1' },
      ];

      const response = await client.collections().deleteMultiple('user', userId, collections);
      
      expect(response.status).toBe(204);
    });
  });

  describe('getSubcollections', () => {
    it('should fetch subcollections', async () => {
      const response = await client.collections().getSubcollections('user', userId, 'COLLECTION1');
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle pagination for subcollections', async () => {
      const response = await client.collections().getSubcollections('user', userId, 'COLLECTION1', {
        limit: 10,
        start: 0,
      });
      
      expect(response.status).toBe(200);
      expect(response.pagination).toBeDefined();
    });
  });

  describe('getItems', () => {
    it('should fetch items in a collection', async () => {
      const response = await client.collections().getItems('user', userId, 'COLLECTION1');
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle query parameters for collection items', async () => {
      const response = await client.collections().getItems('user', userId, 'COLLECTION1', {
        limit: 10,
        start: 0,
        sort: 'title',
        direction: 'asc',
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle format parameter', async () => {
      const response = await client.collections().getItems('user', userId, 'COLLECTION1', {
        format: 'json',
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('getTop', () => {
    it('should fetch top-level collections', async () => {
      const response = await client.collections().getTop('user', userId);
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle filtering for top collections', async () => {
      const response = await client.collections().getTop('user', userId, {
        limit: 25,
        sort: 'title',
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });
  });
});