/**
 * MSW request handlers for mocking Zotero API
 */

import { http, HttpResponse } from 'msw';
import { sampleItems, sampleCollections, sampleSchema } from '../fixtures/index.js';

const BASE_URL = 'https://api.zotero.org';

export const handlers = [
  // Schema endpoint
  http.get(`${BASE_URL}/schema`, () => {
    return HttpResponse.json(sampleSchema);
  }),

  // Error scenarios (MUST come before general handlers)
  http.get(`${BASE_URL}/users/:userId/items/NOTFOUND`, () => {
    return HttpResponse.json(
      { error: 'Item not found' },
      { status: 404 }
    );
  }),

  http.get(`${BASE_URL}/users/:userId/items/RATELIMIT`, () => {
    return HttpResponse.json(
      { error: 'Too many requests' },
      { 
        status: 429,
        headers: {
          'Retry-After': '60',
          'Backoff': '30',
        }
      }
    );
  }),

  http.get(`${BASE_URL}/users/:userId/items/UNAUTHORIZED`, () => {
    return HttpResponse.json(
      { error: 'Invalid API key' },
      { status: 401 }
    );
  }),

  http.get(`${BASE_URL}/users/:userId/items/SERVERERROR`, () => {
    return HttpResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }),

  http.get(`${BASE_URL}/users/:userId/collections/NOTFOUND`, () => {
    return HttpResponse.json(
      { error: 'Collection not found' },
      { status: 404 }
    );
  }),

  // Items endpoints - specific endpoints must come before general ones
  http.get(`${BASE_URL}/users/:userId/items/top`, ({ params }) => {
    const { userId } = params;
    return HttpResponse.json(sampleItems, {
      headers: {
        'Total-Results': '2',
        'Link': `<${BASE_URL}/users/${userId}/items/top?start=0&limit=25>; rel="self"`,
      },
    });
  }),

  http.get(`${BASE_URL}/users/:userId/items/trash`, () => {
    return HttpResponse.json([], {
      headers: {
        'Total-Results': '0',
      },
    });
  }),

  http.get(`${BASE_URL}/users/:userId/items`, ({ params }) => {
    const { userId } = params;
    return HttpResponse.json(sampleItems, {
      headers: {
        'Total-Results': '2',
        'Link': `<${BASE_URL}/users/${userId}/items?start=0&limit=25>; rel="self", <${BASE_URL}/users/${userId}/items?start=0&limit=25>; rel="first", <${BASE_URL}/users/${userId}/items?start=0&limit=25>; rel="last"`,
      },
    });
  }),

  http.get(`${BASE_URL}/users/:userId/items/:itemKey`, ({ params }) => {
    const { itemKey } = params;
    const item = sampleItems.find(item => item.key === itemKey);
    
    if (!item) {
      return HttpResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(item);
  }),

  http.post(`${BASE_URL}/users/:userId/items`, async ({ request }) => {
    try {
      const items = await request.json() as unknown[];
      
      if (!Array.isArray(items)) {
        return HttpResponse.json(
          { error: 'Invalid request format' },
          { status: 400 }
        );
      }
      
      const createdItems = items.map((item, index) => ({
        ...(item as Record<string, unknown>),
        key: `CREATED${index}`,
        version: 1,
      }));
      
      return HttpResponse.json({
        successful: createdItems.reduce((acc, item, index) => {
          acc[index] = item;
          return acc;
        }, {} as Record<number, unknown>),
        success: createdItems.reduce((acc, _, index) => {
          acc[index] = `CREATED${index}`;
          return acc;
        }, {} as Record<number, string>),
        unchanged: {},
        failed: {},
      }, { status: 200 });
    } catch (error) {
      // Handle invalid JSON or other parsing errors
      return HttpResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }
  }),

  http.put(`${BASE_URL}/users/:userId/items/:itemKey`, async ({ params, request }) => {
    const { itemKey } = params;
    const updatedItem = await request.json();
    
    return HttpResponse.json({
      key: itemKey,
      version: 2,
      library: {
        type: 'user' as const,
        id: 12345,
        name: 'Test User',
        links: {
          alternate: {
            href: 'https://www.zotero.org/testuser',
            type: 'text/html',
          },
        },
      },
      data: {
        ...(updatedItem as Record<string, unknown>),
        key: itemKey,
        version: 2,
      },
    });
  }),

  http.delete(`${BASE_URL}/users/:userId/items/:itemKey`, ({ params }) => {
    const { itemKey } = params;
    
    const item = sampleItems.find(item => item.key === itemKey);
    if (!item) {
      return HttpResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(null, { status: 204 });
  }),

  // Collections endpoints
  http.get(`${BASE_URL}/users/:userId/collections`, ({ params }) => {
    const { userId } = params;
    return HttpResponse.json(sampleCollections, {
      headers: {
        'Total-Results': '1',
        'Link': `<${BASE_URL}/users/${userId}/collections?start=0&limit=25>; rel="self"`,
      },
    });
  }),

  http.get(`${BASE_URL}/users/:userId/collections/top`, ({ params }) => {
    const { userId } = params;
    return HttpResponse.json(sampleCollections, {
      headers: {
        'Total-Results': '1',
        'Link': `<${BASE_URL}/users/${userId}/collections/top?start=0&limit=25>; rel="self"`,
      },
    });
  }),

  http.get(`${BASE_URL}/users/:userId/collections/:collectionKey`, ({ params }) => {
    const { collectionKey } = params;
    const collection = sampleCollections.find(col => col.key === collectionKey);
    
    if (!collection) {
      return HttpResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(collection);
  }),

  http.post(`${BASE_URL}/users/:userId/collections`, async ({ request }) => {
    const collections = await request.json() as unknown[];
    
    if (!Array.isArray(collections)) {
      return HttpResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    const createdCollections = collections.map((collection, index) => ({
      ...(collection as Record<string, unknown>),
      key: `COLLECTION${index}`,
      version: 1,
    }));
    
    return HttpResponse.json({
      successful: createdCollections.reduce((acc, collection, index) => {
        acc[index] = collection;
        return acc;
      }, {} as Record<number, unknown>),
      success: createdCollections.reduce((acc, _, index) => {
        acc[index] = `COLLECTION${index}`;
        return acc;
      }, {} as Record<number, string>),
      unchanged: {},
      failed: {},
    }, { status: 200 });
  }),

  http.put(`${BASE_URL}/users/:userId/collections/:collectionKey`, async ({ params, request }) => {
    const { collectionKey } = params;
    const updatedCollection = await request.json();
    
    return HttpResponse.json({
      key: collectionKey,
      version: 2,
      library: {
        type: 'user' as const,
        id: 12345,
        name: 'Test User',
        links: {
          alternate: {
            href: 'https://www.zotero.org/testuser',
            type: 'text/html',
          },
        },
      },
      data: {
        ...(updatedCollection as Record<string, unknown>),
        key: collectionKey,
        version: 2,
      },
    });
  }),

  http.patch(`${BASE_URL}/users/:userId/collections`, async ({ request }) => {
    const collections = await request.json() as unknown[];
    
    if (!Array.isArray(collections)) {
      return HttpResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    const updatedCollections = collections.map((collection) => ({
      ...(collection as Record<string, unknown>),
      version: 2,
    }));
    
    return HttpResponse.json({
      successful: updatedCollections.reduce((acc, collection, index) => {
        acc[index] = collection;
        return acc;
      }, {} as Record<number, unknown>),
      success: updatedCollections.reduce((acc, collection: any, index) => {
        acc[index] = collection.key;
        return acc;
      }, {} as Record<number, string>),
      unchanged: {},
      failed: {},
    }, { status: 200 });
  }),

  http.delete(`${BASE_URL}/users/:userId/collections/:collectionKey`, ({ params }) => {
    const { collectionKey } = params;
    
    const collection = sampleCollections.find(col => col.key === collectionKey);
    if (!collection) {
      return HttpResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(null, { status: 204 });
  }),

  http.delete(`${BASE_URL}/users/:userId/collections`, () => {
    return HttpResponse.json(null, { status: 204 });
  }),

  http.get(`${BASE_URL}/users/:userId/collections/:collectionKey/collections`, () => {
    return HttpResponse.json([], {
      headers: {
        'Total-Results': '0',
      },
    });
  }),

  http.get(`${BASE_URL}/users/:userId/collections/:collectionKey/items`, () => {
    return HttpResponse.json([], {
      headers: {
        'Total-Results': '0',
      },
    });
  }),

  // Items additional endpoints
  http.get(`${BASE_URL}/users/:userId/items/:itemKey/children`, () => {
    return HttpResponse.json([], {
      headers: {
        'Total-Results': '0',
      },
    });
  }),


  http.patch(`${BASE_URL}/users/:userId/items`, async ({ request }) => {
    const items = await request.json() as unknown[];
    
    if (!Array.isArray(items)) {
      return HttpResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    const updatedItems = items.map((item) => ({
      ...(item as Record<string, unknown>),
      version: 2,
    }));
    
    return HttpResponse.json({
      successful: updatedItems.reduce((acc, item, index) => {
        acc[index] = item;
        return acc;
      }, {} as Record<number, unknown>),
      success: updatedItems.reduce((acc, item: any, index) => {
        acc[index] = item.key;
        return acc;
      }, {} as Record<number, string>),
      unchanged: {},
      failed: {},
    }, { status: 200 });
  }),

  http.delete(`${BASE_URL}/users/:userId/items`, () => {
    return HttpResponse.json(null, { status: 204 });
  }),

];