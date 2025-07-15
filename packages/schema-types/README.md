# @zotero-suite/schema-types

The foundational package that ingests the official Zotero `schema.json` to
generate and export Zod schemas and derived TypeScript types for the entire
Zotero AI Translator Suite.

## Features

- **Schema-driven development**: Automatically generates types from Zotero's
  official schema
- **Type safety**: Comprehensive TypeScript interfaces for all Zotero item types
- **Runtime validation**: Zod schemas for validating data at runtime
- **Automatic updates**: Fetches the latest schema from Zotero API with local
  caching
- **Item-specific types**: Generates precise types for each Zotero item type
  (books, articles, etc.)

## Installation

```bash
npm install @zotero-suite/schema-types
```

## Usage

### Basic Usage

```typescript
import {
  ZoteroItemSchema,
  ZoteroBookItemSchema,
  ZoteroItem,
  ZoteroBookItem,
} from '@zotero-suite/schema-types';

// Validate a Zotero item
const item: ZoteroItem = {
  data: {
    itemType: 'book',
    title: 'The Great Gatsby',
    // ... other properties
  },
};

const result = ZoteroItemSchema.safeParse(item);
if (result.success) {
  console.log('Valid item:', result.data);
} else {
  console.error('Invalid item:', result.error);
}
```

### Advanced Usage

```typescript
import {
  ZoteroSchemaProcessor,
  getItemTypeNames,
  getCreatorTypesForItem,
} from '@zotero-suite/schema-types';

// Process schema and generate fresh types
const processor = new ZoteroSchemaProcessor();
await processor.processSchema();

// Use utility functions
const schema = await new SchemaFetcher().fetchSchema();
const itemTypes = getItemTypeNames(schema);
const creatorTypes = getCreatorTypesForItem(schema, 'book');
```

## Development

### Generate Types

Generate types from the latest Zotero schema:

```bash
npm run generate
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

## Architecture

The package is structured as follows:

- **`src/utils/`**: Schema fetching and utility functions
- **`src/generators/`**: Type and schema generation logic
- **`src/types/`**: Generated TypeScript types (auto-generated)
- **`src/schemas/`**: Generated Zod schemas (auto-generated)
- **`scripts/`**: Build and generation scripts

## Generated Types

The package generates the following types:

### Base Types

- `ZoteroItem` - Base item interface
- `ZoteroItemData` - Item data structure
- `ZoteroCreator` - Creator/author information
- `ZoteroTag` - Tag information
- `ZoteroCollection` - Collection structure
- `ZoteroSearch` - Search queries
- `ZoteroLibrary` - Library information

### Item-Specific Types

- `ZoteroBookItem` - Book items
- `ZoteroArticleItem` - Journal articles
- `ZoteroWebsiteItem` - Web pages
- ... and many more for each Zotero item type

### Validation Schemas

- `ZoteroItemSchema` - Base item validation
- `ZoteroBookItemSchema` - Book-specific validation
- `ZoteroArticleItemSchema` - Article-specific validation
- ... corresponding schemas for each type

## Schema Caching

The package automatically caches the Zotero schema locally to improve
performance and provide offline capabilities. The cache is updated whenever the
schema is fetched from the API.

## API Reference

### Classes

#### `ZoteroSchemaProcessor`

Main class for processing Zotero schema and generating types.

#### `SchemaFetcher`

Handles fetching and caching of Zotero schema.

#### `TypeGenerator`

Generates TypeScript interfaces from schema.

#### `ZodGenerator`

Generates Zod validation schemas from schema.

### Utility Functions

#### `getItemTypeNames(schema)`

Returns array of all available item type names.

#### `getCreatorTypesForItem(schema, itemType)`

Returns creator types valid for a specific item type.

#### `getFieldsForItem(schema, itemType)`

Returns fields available for a specific item type.

#### `isValidItemType(schema, itemType)`

Validates if an item type exists in the schema.

## License

MIT
