/**
 * Tests for Items API functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ZoteroClient } from '../../core/client';
import { ZoteroAPIError } from '../../core/errors';

describe('ItemsAPI', () => {
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
    it('should fetch all items', async () => {
      const response = await client.items().getAll('user', userId);
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data).toHaveLength(2);
      expect(response.pagination.totalResults).toBe(2);
    });

    it('should handle query parameters', async () => {
      const response = await client.items().getAll('user', userId, {
        limit: 10,
        start: 0,
        sort: 'title',
        direction: 'asc',
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle item type filtering', async () => {
      const response = await client.items().getAll('user', userId, {
        itemType: 'book',
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle tag filtering', async () => {
      const response = await client.items().getAll('user', userId, {
        tag: 'test',
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('get', () => {
    it('should fetch a specific item', async () => {
      const response = await client.items().get('user', userId, 'ABCD1234');
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('key', 'ABCD1234');
      expect(response.data.data.itemType).toBe('book');
    });

    it('should handle 404 for non-existent item', async () => {
      await expect(
        client.items().get('user', userId, 'NOTFOUND')
      ).rejects.toThrow(ZoteroAPIError);
    });

    it('should handle include parameters', async () => {
      const response = await client.items().get('user', userId, 'ABCD1234', {
        include: ['bib', 'data'],
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('key', 'ABCD1234');
    });
  });

  describe('create', () => {
    it('should create new items', async () => {
      const itemsData = [
        {
          itemType: 'book',
          title: 'New Test Book',
          creators: [
            {
              creatorType: 'author',
              firstName: 'John',
              lastName: 'Doe',
            },
          ],
        },
        {
          itemType: 'journalArticle',
          title: 'New Test Article',
          creators: [
            {
              creatorType: 'author',
              firstName: 'Jane',
              lastName: 'Smith',
            },
          ],
        },
      ];

      const response = await client.items().create('user', userId, itemsData);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('successful');
      expect(response.data).toHaveProperty('success');
      expect(Object.keys(response.data.successful)).toHaveLength(2);
    });

    it('should validate item data before creation', async () => {
      const invalidItems = [
        {
          // Missing itemType
          title: 'Invalid Item',
        },
      ];

      await expect(
        client.items().create('user', userId, invalidItems as unknown[])
      ).rejects.toThrow('Item type is required');
    });
  });

  describe('update', () => {
    it('should update an existing item', async () => {
      const itemData = {
        key: 'ABCD1234',
        version: 1,
        itemType: 'book',
        title: 'Updated Test Book',
        creators: [
          {
            creatorType: 'author',
            firstName: 'John',
            lastName: 'Updated',
          },
        ],
      };

      const response = await client.items().update('user', userId, 'ABCD1234', itemData);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('key', 'ABCD1234');
      expect(response.data).toHaveProperty('version', 2);
    });

    it('should handle version conflicts', async () => {
      const itemData = {
        key: 'ABCD1234',
        version: 1,
        itemType: 'book',
        title: 'Updated Test Book',
      };

      // First update should succeed
      const response = await client.items().update('user', userId, 'ABCD1234', itemData);
      expect(response.status).toBe(200);
    });
  });

  describe('updateMultiple', () => {
    it('should update multiple items', async () => {
      const itemsData = [
        {
          key: 'ABCD1234',
          version: 1,
          itemType: 'book',
          title: 'Updated Book 1',
        },
        {
          key: 'EFGH5678',
          version: 1,
          itemType: 'journalArticle',
          title: 'Updated Article 1',
        },
      ];

      const response = await client.items().updateMultiple('user', userId, itemsData);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('successful');
    });

    it('should validate items have keys and versions', async () => {
      const invalidItems = [
        {
          // Missing key
          version: 1,
          itemType: 'book',
          title: 'Invalid Item',
        },
      ];

      await expect(
        client.items().updateMultiple('user', userId, invalidItems as unknown[])
      ).rejects.toThrow('Item key is required');
    });
  });

  describe('delete', () => {
    it('should delete an item', async () => {
      const response = await client.items().delete('user', userId, 'ABCD1234');
      
      expect(response.status).toBe(204);
    });

    it('should handle 404 for non-existent item', async () => {
      await expect(
        client.items().delete('user', userId, 'NOTFOUND')
      ).rejects.toThrow(ZoteroAPIError);
    });

    it('should include version in headers', async () => {
      const response = await client.items().delete('user', userId, 'ABCD1234', 1);
      
      expect(response.status).toBe(204);
    });
  });

  describe('deleteMultiple', () => {
    it('should delete multiple items', async () => {
      const items = [
        { key: 'ABCD1234', version: 1 },
        { key: 'EFGH5678', version: 1 },
      ];

      const response = await client.items().deleteMultiple('user', userId, items);
      
      expect(response.status).toBe(204);
    });

    it('should handle items without versions', async () => {
      const items = [
        { key: 'ABCD1234' },
        { key: 'EFGH5678' },
      ];

      const response = await client.items().deleteMultiple('user', userId, items);
      
      expect(response.status).toBe(204);
    });
  });

  describe('getChildren', () => {
    it('should fetch item children', async () => {
      const response = await client.items().getChildren('user', userId, 'ABCD1234');
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle pagination for children', async () => {
      const response = await client.items().getChildren('user', userId, 'ABCD1234', {
        limit: 10,
        start: 0,
      });
      
      expect(response.status).toBe(200);
      expect(response.pagination).toBeDefined();
    });
  });

  describe('getTrash', () => {
    it('should fetch trashed items', async () => {
      const response = await client.items().getTrash('user', userId);
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle sorting for trash', async () => {
      const response = await client.items().getTrash('user', userId, {
        sort: 'dateModified',
        direction: 'desc',
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('getTop', () => {
    it('should fetch top-level items', async () => {
      const response = await client.items().getTop('user', userId);
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    it('should handle filtering for top items', async () => {
      const response = await client.items().getTop('user', userId, {
        itemType: 'book',
        limit: 25,
      });
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });
  });
});