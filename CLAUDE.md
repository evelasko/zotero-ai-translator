# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript library called `zotero-web-client` that provides a modern, type-safe client for the Zotero Web API v3. The library enables developers to interact with Zotero's API for managing bibliographic items, collections, and other research data.

**Key Features:**
- Schema-driven development with types automatically generated from Zotero's official schema
- Full TypeScript support with comprehensive type safety
- Runtime validation using Zod schemas
- Dual module support (ESM and CommonJS)
- Comprehensive error handling with custom error classes
- Built on modern fetch API with retry logic

## Architecture

The codebase follows a layered architecture:

### Core Layer (`src/core/`)
- **`client.ts`**: Main `ZoteroClient` class that orchestrates API access
- **`http.ts`**: `ZoteroHttpClient` for HTTP requests with retry logic, timeout, and error handling
- **`auth.ts`**: Authentication handling for API keys and bearer tokens
- **`errors.ts`**: Custom error classes for different API scenarios

### API Layer (`src/api/`)
- **`items.ts`**: `ItemsAPI` class for managing Zotero items (CRUD operations, children, trash)
- **`collections.ts`**: `CollectionsAPI` class for managing collections (CRUD operations, subcollections)

### Generated Code (`src/generated/`)
- **`types/`**: TypeScript interfaces generated from Zotero schema
- **`schemas/`**: Zod validation schemas generated from Zotero schema

### Testing (`src/tests/`)
- Uses Vitest with MSW (Mock Service Worker) for mocking HTTP requests
- Test fixtures and setup files for consistent testing environment

## Development Commands

### Build and Development
```bash
# Build the project (runs type generation first)
npm run build

# Development mode with watch
npm run dev

# Generate types and schemas from Zotero API schema
npm run generate
```

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Code Quality
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run all validation (type-check + lint + tests)
npm run validate
```

## Type Generation System

The project uses a sophisticated type generation system (`scripts/generate-types.cjs`) that:

1. Fetches the latest Zotero schema from `https://api.zotero.org/schema`
2. Generates TypeScript interfaces for all Zotero item types
3. Creates corresponding Zod schemas for runtime validation
4. Caches the schema locally as `schema.json`

**Key Generated Types:**
- `ZoteroItem` - Base item interface
- `ZoteroItemData` - Item data structure
- `ZoteroCollection` - Collection interface
- Item-specific types (e.g., `ZoteroBookItem`, `ZoteroArticleItem`)

## Error Handling

The library includes comprehensive error handling with custom error classes:

- `ZoteroAPIError` - Base API error class
- `ZoteroAuthenticationError` - Authentication failures
- `ZoteroNotFoundError` - Resource not found (404)
- `ZoteroRateLimitError` - Rate limiting (429)
- `ZoteroValidationError` - Validation failures
- `ZoteroConflictError` - Version conflicts (409)
- `ZoteroNetworkError` - Network-related errors

## Testing Strategy

Tests use MSW to mock Zotero API responses, ensuring:
- No actual API calls during testing
- Predictable test outcomes
- Fast test execution
- Proper error scenario testing

Test files are organized by feature:
- `core/` tests for HTTP client, authentication, errors
- `api/` tests for Items and Collections APIs
- Fixtures provide consistent test data

## Configuration Files

- **`tsconfig.json`**: Strict TypeScript configuration with path aliases
- **`tsup.config.ts`**: Build configuration for dual module output
- **`vitest.config.ts`**: Test configuration with coverage settings
- **`eslint.config.js`**: Modern ESLint configuration with TypeScript rules

## Development Guidelines

1. **Always run type generation** before building: `npm run generate`
2. **Use strict typing** - the project enforces strict TypeScript rules
3. **Test thoroughly** - maintain high test coverage, especially for error scenarios
4. **Follow the existing patterns** for API endpoint implementations
5. **Use Zod schemas** for runtime validation of API responses
6. **Handle errors properly** using the custom error classes

## Future Development Context

This library is part of a larger "Zotero AI Translator Suite" project (see `prd.md`). The current codebase serves as the foundation client library that will be integrated into a monorepo structure with AI-powered translation capabilities.