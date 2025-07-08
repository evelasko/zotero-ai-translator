# Zotero Web Client

A modern, robust, and type-safe TypeScript client for the Zotero Web API v3.

## Features

- ✅ **Schema-driven development** - Types automatically generated from Zotero's official schema
- ✅ **Dual module support** - Works with both ESM and CommonJS
- ✅ **Full TypeScript support** - Comprehensive type safety and autocompletion
- ✅ **Runtime validation** - Optional Zod schemas for request/response validation
- ✅ **Comprehensive error handling** - Custom error classes for different API scenarios
- ✅ **Modern HTTP client** - Built on fetch with retry logic and proper error handling
- ✅ **Extensible architecture** - Easy to extend with additional API endpoints
- ✅ **Production ready** - Comprehensive test coverage with Vitest and MSW

## Installation

```bash
npm install zotero-web-client
```

## Quick Start

```typescript
import { ZoteroClient } from 'zotero-web-client';

// Create client with API key
const client = new ZoteroClient({ 
  apiKey: 'your-api-key-here' 
});

// Get all items from user library
const items = await client.items().getAll('user', 12345);

// Get a specific item
const item = await client.items().get('user', 12345, 'ABCD1234');

// Create a new item
const newItem = await client.items().create('user', 12345, [{
  itemType: 'book',
  title: 'The Great Gatsby',
  creators: [{
    creatorType: 'author',
    firstName: 'F. Scott',
    lastName: 'Fitzgerald'
  }],
  date: '1925',
  publisher: 'Scribner'
}]);

// Get collections
const collections = await client.collections().getAll('user', 12345);
```

## API Documentation

### Authentication

```typescript
// API key authentication (recommended)
const client = new ZoteroClient({ apiKey: 'your-api-key' });

// Bearer token authentication
const client = new ZoteroClient({ 
  auth: { 
    apiKey: 'your-api-key', 
    method: 'bearer' 
  } 
});

// Update authentication later
client.setAuth('new-api-key');
```

### Items API

```typescript
// Get all items with filtering and pagination
const items = await client.items().getAll('user', 12345, {
  itemType: 'book',
  tag: 'important',
  limit: 25,
  start: 0,
  sort: 'title',
  direction: 'asc'
});

// Get specific item
const item = await client.items().get('user', 12345, 'ITEM_KEY');

// Create multiple items
const result = await client.items().create('user', 12345, [
  { itemType: 'book', title: 'Book 1' },
  { itemType: 'article', title: 'Article 1' }
]);

// Update item
const updated = await client.items().update('user', 12345, 'ITEM_KEY', {
  key: 'ITEM_KEY',
  version: 1,
  itemType: 'book',
  title: 'Updated Title'
});

// Delete item
await client.items().delete('user', 12345, 'ITEM_KEY', version);

// Get item children (attachments, notes)
const children = await client.items().getChildren('user', 12345, 'ITEM_KEY');

// Get top-level items
const topItems = await client.items().getTop('user', 12345);

// Get trashed items
const trash = await client.items().getTrash('user', 12345);
```

### Collections API

```typescript
// Get all collections
const collections = await client.collections().getAll('user', 12345);

// Get specific collection
const collection = await client.collections().get('user', 12345, 'COLLECTION_KEY');

// Create collections
const result = await client.collections().create('user', 12345, [{
  name: 'My Collection',
  parentCollection: false
}]);

// Update collection
const updated = await client.collections().update('user', 12345, 'COLLECTION_KEY', {
  key: 'COLLECTION_KEY',
  version: 1,
  name: 'Updated Collection Name'
});

// Delete collection
await client.collections().delete('user', 12345, 'COLLECTION_KEY', version);

// Get subcollections
const subcollections = await client.collections().getSubcollections('user', 12345, 'COLLECTION_KEY');

// Get items in collection
const items = await client.collections().getItems('user', 12345, 'COLLECTION_KEY');

// Get top-level collections
const topCollections = await client.collections().getTop('user', 12345');
```

### Error Handling

```typescript
import { 
  ZoteroAPIError, 
  ZoteroRateLimitError, 
  ZoteroAuthenticationError,
  isRateLimitError,
  isAuthenticationError 
} from 'zotero-web-client';

try {
  const items = await client.items().getAll('user', 12345);
} catch (error) {
  if (isRateLimitError(error)) {
    console.log(`Rate limited. Retry after: ${error.retryAfter} seconds`);
  } else if (isAuthenticationError(error)) {
    console.log('Authentication failed. Check your API key.');
  } else if (error instanceof ZoteroAPIError) {
    console.log(`API error: ${error.message} (${error.statusCode})`);
  } else {
    console.log('Unexpected error:', error);
  }
}
```

### Advanced Usage

```typescript
// Access the underlying HTTP client
const httpClient = client.getHttpClient();

// Custom request with full control
const response = await httpClient.request('/users/12345/items', {
  method: 'GET',
  params: { limit: 10 },
  headers: { 'Custom-Header': 'value' }
});

// Extract pagination info
const pagination = httpClient.extractPaginationInfo(response.response);
console.log(`Total results: ${pagination.totalResults}`);
```

## TypeScript Support

This library is built with TypeScript and provides comprehensive type definitions:

```typescript
import type { 
  ZoteroItem, 
  ZoteroBookItem, 
  ZoteroCollection,
  ItemsQueryParams,
  CollectionsQueryParams 
} from 'zotero-web-client';

// Fully typed responses
const items: ZoteroItem[] = await client.items().getAll('user', 12345);

// Type-safe item creation
const bookItem: ZoteroBookItem = {
  itemType: 'book',
  title: 'The Great Gatsby',
  creators: [{
    creatorType: 'author', // Only valid creator types for books
    firstName: 'F. Scott',
    lastName: 'Fitzgerald'
  }],
  ISBN: '978-0-7432-7356-5',
  publisher: 'Scribner',
  date: '1925'
};
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
npm run test:coverage
```

### Type Generation

Types are automatically generated from Zotero's schema:

```bash
npm run generate
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [Zotero](https://www.zotero.org/) - The reference management tool
- [Zotero Web API Documentation](https://www.zotero.org/support/dev/web_api/v3/start)
- [Zotero Schema](https://github.com/zotero/zotero-schema)

## Changelog

### 1.0.0

- Initial release
- Full Zotero Web API v3 support
- TypeScript support with generated types
- Comprehensive error handling
- Dual module support (ESM/CJS)
- Complete test coverage
