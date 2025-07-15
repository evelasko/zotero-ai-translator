# @zotero-suite/translator

AI-powered content translation service for Zotero metadata extraction.

## Overview

The `@zotero-suite/translator` package provides intelligent content processing and metadata extraction capabilities for converting web content, PDFs, and text into structured Zotero item data.

## Features

- **Dual Input Support**: Process content from URLs or direct source text
- **Content Extraction**: Advanced parsing for HTML, PDF, and plain text
- **Metadata Extraction**: Automatic extraction of titles, authors, dates, and descriptions
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Error Handling**: Detailed error types for different failure scenarios
- **Configurable**: Flexible configuration options for timeouts, retries, and content limits

## Installation

```bash
npm install @zotero-suite/translator
```

## Quick Start

```typescript
import { Translator } from '@zotero-suite/translator';

const translator = new Translator({
  timeout: 30000,
  maxRetries: 3,
  debug: false
});

// Translate from URL
const urlResult = await translator.translate({
  url: 'https://example.com/article'
});

// Translate from source text
const textResult = await translator.translate({
  sourceText: 'This is the content to translate...'
});

console.log(urlResult.item); // Zotero item data
console.log(textResult.confidence); // Confidence score
```

## API Reference

### Translator Class

#### Constructor

```typescript
new Translator(config?: TranslatorConfig)
```

#### Methods

- `translate(input: TranslationInput): Promise<TranslationResult>`
- `getConfig(): Readonly<Required<TranslatorConfig>>`

### Types

#### TranslationInput

```typescript
type TranslationInput = 
  | { url: string }
  | { sourceText: string }
```

#### TranslationResult

```typescript
interface TranslationResult {
  item: ZoteroItemData;
  confidence: number;
  extractedContent: ExtractedContent;
  processing: ProcessingMetadata;
}
```

#### TranslatorConfig

```typescript
interface TranslatorConfig {
  timeout?: number;
  maxRetries?: number;
  userAgent?: string;
  maxContentLength?: number;
  debug?: boolean;
}
```

## Content Ingestion Pipeline

The translator supports two content ingestion paths:

### URL-based Ingestion

1. **HTTP Fetch**: Retrieves content using axios with retry logic
2. **Content Type Detection**: Automatically detects HTML, PDF, or text content
3. **HTML Processing**: Uses Readability API for clean content extraction
4. **PDF Processing**: Extracts text and metadata from PDF files
5. **Metadata Extraction**: Pulls author, title, date, and description information

### Source Text Ingestion

1. **Format Detection**: Determines if input is HTML or plain text
2. **HTML Processing**: Applies same Readability processing as URL path
3. **Text Processing**: Direct text extraction with title inference
4. **Metadata Extraction**: Extracts available metadata from content

## Error Handling

The package provides specific error types for different failure scenarios:

- `TranslatorError`: Base error class
- `ContentExtractionError`: Content processing failures
- `UrlFetchError`: Network and HTTP errors
- `PdfParseError`: PDF processing errors  
- `ConfigurationError`: Invalid configuration errors

## Configuration

### Default Configuration

```typescript
{
  timeout: 30000,          // 30 second timeout
  maxRetries: 3,           // 3 retry attempts
  userAgent: 'Zotero-AI-Translator/1.0.0',
  maxContentLength: 50000, // 50k character limit
  debug: false
}
```

### Custom Configuration

```typescript
const translator = new Translator({
  timeout: 60000,          // 60 second timeout
  maxRetries: 5,           // 5 retry attempts
  userAgent: 'MyApp/1.0.0',
  maxContentLength: 100000, // 100k character limit
  debug: true              // Enable debug logging
});
```

## Development Status

This package is currently in development. The AI translation pipeline using LangChain will be implemented in a future release. The current implementation provides:

- ✅ Complete content ingestion pipeline
- ✅ Content extraction from URLs and source text
- ✅ Basic metadata extraction
- ✅ Type-safe interfaces
- ⏳ AI-powered translation (coming soon)

## Dependencies

- `@zotero-suite/schema-types`: Zotero type definitions
- `axios`: HTTP client for URL fetching
- `jsdom`: DOM parsing for HTML content
- `@mozilla/readability`: Content extraction from HTML
- `pdf-parse`: PDF text extraction

## License

MIT