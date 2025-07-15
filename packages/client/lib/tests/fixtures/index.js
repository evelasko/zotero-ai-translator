"use strict";
/**
 * Test fixtures for Zotero API responses
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleUser = exports.sampleCollections = exports.sampleItems = exports.sampleSchema = void 0;
exports.sampleSchema = {
    version: 33,
    itemTypes: [
        {
            itemType: 'book',
            fields: [
                { field: 'title' },
                { field: 'abstractNote' },
                { field: 'series' },
                { field: 'seriesNumber' },
                { field: 'volume' },
                { field: 'numberOfVolumes' },
                { field: 'edition' },
                { field: 'place' },
                { field: 'publisher' },
                { field: 'date' },
                { field: 'numPages' },
                { field: 'language' },
                { field: 'ISBN' },
                { field: 'shortTitle' },
                { field: 'url' },
                { field: 'accessDate' },
                { field: 'archive' },
                { field: 'archiveLocation' },
                { field: 'libraryCatalog' },
                { field: 'callNumber' },
                { field: 'rights' },
                { field: 'extra' },
            ],
            creatorTypes: [
                { creatorType: 'author', primary: true },
                { creatorType: 'contributor' },
                { creatorType: 'editor' },
                { creatorType: 'translator' },
            ],
        },
        {
            itemType: 'journalArticle',
            fields: [
                { field: 'title' },
                { field: 'abstractNote' },
                { field: 'publicationTitle' },
                { field: 'volume' },
                { field: 'issue' },
                { field: 'pages' },
                { field: 'date' },
                { field: 'series' },
                { field: 'seriesTitle' },
                { field: 'seriesText' },
                { field: 'journalAbbreviation' },
                { field: 'language' },
                { field: 'DOI' },
                { field: 'ISSN' },
                { field: 'shortTitle' },
                { field: 'url' },
                { field: 'accessDate' },
                { field: 'archive' },
                { field: 'archiveLocation' },
                { field: 'libraryCatalog' },
                { field: 'callNumber' },
                { field: 'rights' },
                { field: 'extra' },
            ],
            creatorTypes: [
                { creatorType: 'author', primary: true },
                { creatorType: 'contributor' },
                { creatorType: 'editor' },
                { creatorType: 'translator' },
                { creatorType: 'reviewedAuthor' },
            ],
        },
    ],
    meta: {
        fields: [
            { field: 'title', type: 'text' },
            { field: 'abstractNote', type: 'text' },
            { field: 'date', type: 'date' },
            { field: 'url', type: 'url' },
        ],
    },
    csl: {},
    locales: {},
};
exports.sampleItems = [
    {
        key: 'ABCD1234',
        version: 1,
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
        links: {
            self: {
                href: 'https://api.zotero.org/users/12345/items/ABCD1234',
                type: 'application/json',
            },
            alternate: {
                href: 'https://www.zotero.org/testuser/items/ABCD1234',
                type: 'text/html',
            },
        },
        meta: {
            createdByUser: {
                id: 12345,
                username: 'testuser',
                name: 'Test User',
            },
            createdDate: '2023-01-01T00:00:00Z',
            lastModifiedByUser: {
                id: 12345,
                username: 'testuser',
                name: 'Test User',
            },
            lastModifiedDate: '2023-01-01T00:00:00Z',
            numChildren: 0,
        },
        data: {
            key: 'ABCD1234',
            version: 1,
            itemType: 'book',
            title: 'Test Book',
            creators: [
                {
                    creatorType: 'author',
                    firstName: 'John',
                    lastName: 'Doe',
                },
            ],
            abstractNote: 'This is a test book.',
            publisher: 'Test Publisher',
            date: '2023',
            numPages: '100',
            language: 'en',
            ISBN: '978-0-123456-78-9',
            tags: [
                { tag: 'test', type: 0 },
                { tag: 'book', type: 1 },
            ],
            collections: ['COLLECTION1'],
            relations: {},
            dateAdded: '2023-01-01T00:00:00Z',
            dateModified: '2023-01-01T00:00:00Z',
        },
    },
    {
        key: 'EFGH5678',
        version: 1,
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
        links: {
            self: {
                href: 'https://api.zotero.org/users/12345/items/EFGH5678',
                type: 'application/json',
            },
            alternate: {
                href: 'https://www.zotero.org/testuser/items/EFGH5678',
                type: 'text/html',
            },
        },
        meta: {
            createdByUser: {
                id: 12345,
                username: 'testuser',
                name: 'Test User',
            },
            createdDate: '2023-01-02T00:00:00Z',
            lastModifiedByUser: {
                id: 12345,
                username: 'testuser',
                name: 'Test User',
            },
            lastModifiedDate: '2023-01-02T00:00:00Z',
            numChildren: 0,
        },
        data: {
            key: 'EFGH5678',
            version: 1,
            itemType: 'journalArticle',
            title: 'Test Article',
            creators: [
                {
                    creatorType: 'author',
                    firstName: 'Jane',
                    lastName: 'Smith',
                },
            ],
            abstractNote: 'This is a test article.',
            publicationTitle: 'Test Journal',
            volume: '1',
            issue: '1',
            pages: '1-10',
            date: '2023-01-01',
            DOI: '10.1000/test',
            tags: [
                { tag: 'test', type: 0 },
                { tag: 'article', type: 1 },
            ],
            collections: [],
            relations: {},
            dateAdded: '2023-01-02T00:00:00Z',
            dateModified: '2023-01-02T00:00:00Z',
        },
    },
];
exports.sampleCollections = [
    {
        key: 'COLLECTION1',
        version: 1,
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
        links: {
            self: {
                href: 'https://api.zotero.org/users/12345/collections/COLLECTION1',
                type: 'application/json',
            },
            alternate: {
                href: 'https://www.zotero.org/testuser/collections/COLLECTION1',
                type: 'text/html',
            },
        },
        meta: {
            numCollections: 0,
            numItems: 1,
        },
        data: {
            key: 'COLLECTION1',
            version: 1,
            name: 'Test Collection',
            parentCollection: false,
            relations: {},
        },
    },
];
exports.sampleUser = {
    userID: 12345,
    username: 'testuser',
    displayName: 'Test User',
    links: {
        self: {
            href: 'https://api.zotero.org/users/12345',
            type: 'application/json',
        },
        alternate: {
            href: 'https://www.zotero.org/testuser',
            type: 'text/html',
        },
    },
};
//# sourceMappingURL=index.js.map