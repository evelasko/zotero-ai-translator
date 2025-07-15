"use strict";
/**
 * MSW request handlers for mocking Zotero API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
const msw_1 = require("msw");
const index_1 = require("../fixtures/index");
const BASE_URL = 'https://api.zotero.org';
exports.handlers = [
    // Schema endpoint
    msw_1.http.get(`${BASE_URL}/schema`, () => {
        return msw_1.HttpResponse.json(index_1.sampleSchema);
    }),
    // Error scenarios (MUST come before general handlers)
    msw_1.http.get(`${BASE_URL}/users/:userId/items/NOTFOUND`, () => {
        return msw_1.HttpResponse.json({ error: 'Item not found' }, { status: 404 });
    }),
    msw_1.http.get(`${BASE_URL}/users/:userId/items/RATELIMIT`, () => {
        return msw_1.HttpResponse.json({ error: 'Too many requests' }, {
            status: 429,
            headers: {
                'Retry-After': '60',
                'Backoff': '30',
            }
        });
    }),
    msw_1.http.get(`${BASE_URL}/users/:userId/items/UNAUTHORIZED`, () => {
        return msw_1.HttpResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }),
    msw_1.http.get(`${BASE_URL}/users/:userId/items/SERVERERROR`, () => {
        return msw_1.HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
    }),
    msw_1.http.get(`${BASE_URL}/users/:userId/collections/NOTFOUND`, () => {
        return msw_1.HttpResponse.json({ error: 'Collection not found' }, { status: 404 });
    }),
    // Items endpoints - specific endpoints must come before general ones
    msw_1.http.get(`${BASE_URL}/users/:userId/items/top`, ({ params }) => {
        const { userId } = params;
        return msw_1.HttpResponse.json(index_1.sampleItems, {
            headers: {
                'Total-Results': '2',
                'Link': `<${BASE_URL}/users/${userId}/items/top?start=0&limit=25>; rel="self"`,
            },
        });
    }),
    msw_1.http.get(`${BASE_URL}/users/:userId/items/trash`, () => {
        return msw_1.HttpResponse.json([], {
            headers: {
                'Total-Results': '0',
            },
        });
    }),
    msw_1.http.get(`${BASE_URL}/users/:userId/items`, ({ params }) => {
        const { userId } = params;
        return msw_1.HttpResponse.json(index_1.sampleItems, {
            headers: {
                'Total-Results': '2',
                'Link': `<${BASE_URL}/users/${userId}/items?start=0&limit=25>; rel="self", <${BASE_URL}/users/${userId}/items?start=0&limit=25>; rel="first", <${BASE_URL}/users/${userId}/items?start=0&limit=25>; rel="last"`,
            },
        });
    }),
    msw_1.http.get(`${BASE_URL}/users/:userId/items/:itemKey`, ({ params }) => {
        const { itemKey } = params;
        const item = index_1.sampleItems.find(item => item.key === itemKey);
        if (!item) {
            return msw_1.HttpResponse.json({ error: 'Item not found' }, { status: 404 });
        }
        return msw_1.HttpResponse.json(item);
    }),
    msw_1.http.post(`${BASE_URL}/users/:userId/items`, async ({ request }) => {
        try {
            const items = await request.json();
            if (!Array.isArray(items)) {
                return msw_1.HttpResponse.json({ error: 'Invalid request format' }, { status: 400 });
            }
            const createdItems = items.map((item, index) => ({
                ...item,
                key: `CREATED${index}`,
                version: 1,
            }));
            return msw_1.HttpResponse.json({
                successful: createdItems.reduce((acc, item, index) => {
                    acc[index] = item;
                    return acc;
                }, {}),
                success: createdItems.reduce((acc, _, index) => {
                    acc[index] = `CREATED${index}`;
                    return acc;
                }, {}),
                unchanged: {},
                failed: {},
            }, { status: 200 });
        }
        catch {
            // Handle invalid JSON or other parsing errors
            return msw_1.HttpResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
        }
    }),
    msw_1.http.put(`${BASE_URL}/users/:userId/items/:itemKey`, async ({ params, request }) => {
        const { itemKey } = params;
        const updatedItem = await request.json();
        return msw_1.HttpResponse.json({
            key: itemKey,
            version: 2,
            library: {
                type: 'user',
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
                ...updatedItem,
                key: itemKey,
                version: 2,
            },
        });
    }),
    msw_1.http.delete(`${BASE_URL}/users/:userId/items/:itemKey`, ({ params }) => {
        const { itemKey } = params;
        const item = index_1.sampleItems.find(item => item.key === itemKey);
        if (!item) {
            return msw_1.HttpResponse.json({ error: 'Item not found' }, { status: 404 });
        }
        return msw_1.HttpResponse.json(null, { status: 204 });
    }),
    // Collections endpoints
    msw_1.http.get(`${BASE_URL}/users/:userId/collections`, ({ params }) => {
        const { userId } = params;
        return msw_1.HttpResponse.json(index_1.sampleCollections, {
            headers: {
                'Total-Results': '1',
                'Link': `<${BASE_URL}/users/${userId}/collections?start=0&limit=25>; rel="self"`,
            },
        });
    }),
    msw_1.http.get(`${BASE_URL}/users/:userId/collections/top`, ({ params }) => {
        const { userId } = params;
        return msw_1.HttpResponse.json(index_1.sampleCollections, {
            headers: {
                'Total-Results': '1',
                'Link': `<${BASE_URL}/users/${userId}/collections/top?start=0&limit=25>; rel="self"`,
            },
        });
    }),
    msw_1.http.get(`${BASE_URL}/users/:userId/collections/:collectionKey`, ({ params }) => {
        const { collectionKey } = params;
        const collection = index_1.sampleCollections.find(col => col.key === collectionKey);
        if (!collection) {
            return msw_1.HttpResponse.json({ error: 'Collection not found' }, { status: 404 });
        }
        return msw_1.HttpResponse.json(collection);
    }),
    msw_1.http.post(`${BASE_URL}/users/:userId/collections`, async ({ request }) => {
        const collections = await request.json();
        if (!Array.isArray(collections)) {
            return msw_1.HttpResponse.json({ error: 'Invalid request format' }, { status: 400 });
        }
        const createdCollections = collections.map((collection, index) => ({
            ...collection,
            key: `COLLECTION${index}`,
            version: 1,
        }));
        return msw_1.HttpResponse.json({
            successful: createdCollections.reduce((acc, collection, index) => {
                acc[index] = collection;
                return acc;
            }, {}),
            success: createdCollections.reduce((acc, _, index) => {
                acc[index] = `COLLECTION${index}`;
                return acc;
            }, {}),
            unchanged: {},
            failed: {},
        }, { status: 200 });
    }),
    msw_1.http.put(`${BASE_URL}/users/:userId/collections/:collectionKey`, async ({ params, request }) => {
        const { collectionKey } = params;
        const updatedCollection = await request.json();
        return msw_1.HttpResponse.json({
            key: collectionKey,
            version: 2,
            library: {
                type: 'user',
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
                ...updatedCollection,
                key: collectionKey,
                version: 2,
            },
        });
    }),
    msw_1.http.patch(`${BASE_URL}/users/:userId/collections`, async ({ request }) => {
        const collections = await request.json();
        if (!Array.isArray(collections)) {
            return msw_1.HttpResponse.json({ error: 'Invalid request format' }, { status: 400 });
        }
        const updatedCollections = collections.map((collection) => ({
            ...collection,
            version: 2,
        }));
        return msw_1.HttpResponse.json({
            successful: updatedCollections.reduce((acc, collection, index) => {
                acc[index] = collection;
                return acc;
            }, {}),
            success: updatedCollections.reduce((acc, collection, index) => {
                acc[index] = collection['key'];
                return acc;
            }, {}),
            unchanged: {},
            failed: {},
        }, { status: 200 });
    }),
    msw_1.http.delete(`${BASE_URL}/users/:userId/collections/:collectionKey`, ({ params }) => {
        const { collectionKey } = params;
        const collection = index_1.sampleCollections.find(col => col.key === collectionKey);
        if (!collection) {
            return msw_1.HttpResponse.json({ error: 'Collection not found' }, { status: 404 });
        }
        return msw_1.HttpResponse.json(null, { status: 204 });
    }),
    msw_1.http.delete(`${BASE_URL}/users/:userId/collections`, () => {
        return msw_1.HttpResponse.json(null, { status: 204 });
    }),
    msw_1.http.get(`${BASE_URL}/users/:userId/collections/:collectionKey/collections`, () => {
        return msw_1.HttpResponse.json([], {
            headers: {
                'Total-Results': '0',
            },
        });
    }),
    msw_1.http.get(`${BASE_URL}/users/:userId/collections/:collectionKey/items`, () => {
        return msw_1.HttpResponse.json([], {
            headers: {
                'Total-Results': '0',
            },
        });
    }),
    // Items additional endpoints
    msw_1.http.get(`${BASE_URL}/users/:userId/items/:itemKey/children`, () => {
        return msw_1.HttpResponse.json([], {
            headers: {
                'Total-Results': '0',
            },
        });
    }),
    msw_1.http.patch(`${BASE_URL}/users/:userId/items`, async ({ request }) => {
        const items = await request.json();
        if (!Array.isArray(items)) {
            return msw_1.HttpResponse.json({ error: 'Invalid request format' }, { status: 400 });
        }
        const updatedItems = items.map((item) => ({
            ...item,
            version: 2,
        }));
        return msw_1.HttpResponse.json({
            successful: updatedItems.reduce((acc, item, index) => {
                acc[index] = item;
                return acc;
            }, {}),
            success: updatedItems.reduce((acc, item, index) => {
                acc[index] = item['key'];
                return acc;
            }, {}),
            unchanged: {},
            failed: {},
        }, { status: 200 });
    }),
    msw_1.http.delete(`${BASE_URL}/users/:userId/items`, () => {
        return msw_1.HttpResponse.json(null, { status: 204 });
    }),
];
//# sourceMappingURL=handlers.js.map