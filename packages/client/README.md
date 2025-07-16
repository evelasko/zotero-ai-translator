# zotero-web-client

A modern, robust, and type-safe Zotero Web API client for TypeScript/JavaScript. This client provides comprehensive access to the Zotero Web API v3 with full TypeScript support, runtime validation, and comprehensive error handling.

## Features

- **Type-safe**: Full TypeScript support with types generated from Zotero's official schema
- **Runtime validation**: Built-in validation using Zod schemas
- **Comprehensive error handling**: Custom error classes for different API scenarios
- **Dual module support**: Both ESM and CommonJS supported
- **Retry logic**: Automatic retry for transient failures
- **Rate limiting**: Built-in rate limit handling
- **Authentication**: Support for API keys and OAuth tokens
- **Batch operations**: Efficient batch create/update operations
- **Pagination**: Automatic pagination handling

## Installation

```bash
npm install zotero-web-client
```

## Quick Start

### Basic Usage

```typescript
import { ZoteroClient, createClient } from 'zotero-web-client';

// Create client with API key
const client = createClient({
  apiKey: 'your-api-key',
  userId: 'your-user-id'
});

// Or create manually
const client = new ZoteroClient({
  apiKey: 'your-api-key',
  userId: 'your-user-id'
});

// Get library items
const items = await client.items.getAll();
console.log('Found items:', items.length);

// Create a new item
const newItem = await client.items.create({
  itemType: 'book',
  title: 'The Great Gatsby',
  creators: [{
    firstName: 'F. Scott',
    lastName: 'Fitzgerald',
    creatorType: 'author'
  }]
});
```

### Authentication

```typescript
// Using API key
const client = createClient({
  apiKey: 'your-api-key',
  userId: 'your-user-id' // or groupId for group libraries
});

// Using OAuth token
const client = createClient({
  oauthToken: 'your-oauth-token',
  userId: 'your-user-id'
});
```

### Working with Items

```typescript
// Get all items
const items = await client.items.getAll();

// Get item by key
const item = await client.items.get('ITEM_KEY');

// Create new item
const newItem = await client.items.create({
  itemType: 'journalArticle',
  title: 'Research Paper',
  creators: [{
    firstName: 'John',
    lastName: 'Doe',
    creatorType: 'author'
  }],
  date: '2024',
  publicationTitle: 'Journal of Research'
});

// Update item
const updatedItem = await client.items.update('ITEM_KEY', {
  title: 'Updated Title'
});

// Delete item
await client.items.delete('ITEM_KEY');

// Search items
const searchResults = await client.items.getAll({
  q: 'search query',
  itemType: 'book'
});
```

### Working with Collections

```typescript
// Get all collections
const collections = await client.collections.getAll();

// Create new collection
const newCollection = await client.collections.create({
  name: 'My Research Collection',
  parentCollection: 'PARENT_KEY' // optional
});

// Get collection items
const collectionItems = await client.items.getAll({
  collectionKey: 'COLLECTION_KEY'
});

// Add item to collection
await client.items.addToCollection('ITEM_KEY', 'COLLECTION_KEY');
```

### Batch Operations

```typescript
// Batch create items
const itemsData = [
  { itemType: 'book', title: 'Book 1' },
  { itemType: 'book', title: 'Book 2' },
  { itemType: 'book', title: 'Book 3' }
];

const batchResult = await client.items.batchCreate(itemsData);
console.log('Created items:', batchResult.successful);
console.log('Failed items:', batchResult.failed);

// Batch update items
const updates = [
  { key: 'ITEM_KEY_1', data: { title: 'Updated Title 1' } },
  { key: 'ITEM_KEY_2', data: { title: 'Updated Title 2' } }
];

const updateResult = await client.items.batchUpdate(updates);
```

### Error Handling

```typescript
import { 
  ZoteroAPIError, 
  ZoteroNotFoundError, 
  ZoteroRateLimitError,
  ZoteroAuthenticationError
} from 'zotero-web-client';

try {
  const item = await client.items.get('INVALID_KEY');
} catch (error) {
  if (error instanceof ZoteroNotFoundError) {
    console.log('Item not found');
  } else if (error instanceof ZoteroRateLimitError) {
    console.log('Rate limit exceeded, retry after:', error.retryAfter);
  } else if (error instanceof ZoteroAuthenticationError) {
    console.log('Authentication failed');
  } else if (error instanceof ZoteroAPIError) {
    console.log('API error:', error.message);
  }
}
```

### Advanced Configuration

```typescript
const client = createClient({
  apiKey: 'your-api-key',
  userId: 'your-user-id',
  baseURL: 'https://api.zotero.org', // Custom base URL
  timeout: 30000, // Request timeout in ms
  retryAttempts: 3, // Number of retry attempts
  retryDelay: 1000, // Base delay between retries
  userAgent: 'MyApp/1.0.0' // Custom user agent
});
```

## API Reference

### ZoteroClient

Main client class for interacting with the Zotero API.

#### Constructor Options

- `apiKey` - Your Zotero API key
- `userId` - Your Zotero user ID (for personal libraries)
- `groupId` - Group ID (for group libraries)
- `baseURL` - API base URL (default: 'https://api.zotero.org')
- `timeout` - Request timeout in milliseconds (default: 30000)
- `retryAttempts` - Number of retry attempts (default: 3)
- `retryDelay` - Base delay between retries (default: 1000)
- `userAgent` - Custom user agent string

#### Properties

- `client.items` - ItemsAPI instance for item operations
- `client.collections` - CollectionsAPI instance for collection operations

### ItemsAPI

Handles all item-related operations.

#### Methods

- `getAll(params?)` - Get all items with optional filters
- `get(key)` - Get item by key
- `create(data)` - Create new item
- `update(key, data)` - Update existing item
- `delete(key)` - Delete item
- `batchCreate(items)` - Create multiple items
- `batchUpdate(updates)` - Update multiple items
- `getChildren(key)` - Get item children (notes, attachments)
- `getTrash()` - Get items in trash

### CollectionsAPI

Handles all collection-related operations.

#### Methods

- `getAll(params?)` - Get all collections
- `get(key)` - Get collection by key
- `create(data)` - Create new collection
- `update(key, data)` - Update existing collection
- `delete(key)` - Delete collection
- `getSubcollections(key)` - Get subcollections

## Type Safety

This client uses types generated from Zotero's official schema via the `zotero-schema-types` package:

```typescript
import { ZoteroItem, ZoteroCollection } from 'zotero-web-client';

// All operations are fully typed
const item: ZoteroItem = await client.items.get('ITEM_KEY');
const collection: ZoteroCollection = await client.collections.get('COLLECTION_KEY');
```

## Error Types

- `ZoteroAPIError` - Base error class
- `ZoteroAuthenticationError` - Authentication failed
- `ZoteroNotFoundError` - Resource not found (404)
- `ZoteroRateLimitError` - Rate limit exceeded (429)
- `ZoteroValidationError` - Data validation failed
- `ZoteroConflictError` - Version conflict (409)
- `ZoteroForbiddenError` - Access forbidden (403)
- `ZoteroBadRequestError` - Bad request (400)
- `ZoteroServerError` - Server error (5xx)
- `ZoteroNetworkError` - Network connectivity issues

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT