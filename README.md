# Zotero AI Translator Suite

A suite of TypeScript packages for AI-powered Zotero translation, built as a monorepo with Turborepo.

## 📦 Release Process

This project uses a **tag-based release workflow**. Packages are published to npm only when a version tag is pushed. See [RELEASE.md](./RELEASE.md) for detailed instructions.

## Packages

### [`zotero-schema-types`](./packages/schema-types)

The foundational package that ingests the official Zotero `schema.json` to generate and export Zod schemas and derived TypeScript types for the entire suite.

### [`zotero-web-client`](./packages/client)

The Zotero API Client - a modern, robust, and type-safe client for the Zotero Web API v3, refactored to consume all its types directly from the `zotero-schema-types` package.

### [`zotero-ai-translator`](./packages/translator)

The AI Translator - translates unstructured content from URLs or raw text into structured, validated Zotero items using AI models via LangChain.

## Development

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm run test
npm run test:coverage
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Architecture

This monorepo follows the technical mandates defined in the PRD:

- **Language**: TypeScript with strict configuration
- **Module System**: CommonJS output for maximum compatibility
- **Type Definitions**: All packages generate `.d.ts` files
- **Testing**: Comprehensive unit tests with mocking for external services
- **Build System**: Turborepo for efficient monorepo management

## License

MIT
