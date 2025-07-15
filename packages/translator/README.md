# @zotero-suite/translator

AI-powered content translation service for Zotero metadata extraction.

## Overview

The `@zotero-suite/translator` package provides intelligent content processing
and metadata extraction capabilities for converting web content, PDFs, and text
into structured Zotero item data.

## Features

- **Dual Input Support**: Process content from URLs or direct source text
- **AI-Powered Translation**: Two-step AI process for intelligent metadata
  extraction
- **Content Extraction**: Advanced parsing for HTML, PDF, and plain text
- **Metadata Extraction**: Automatic extraction of titles, authors, dates, and
  descriptions
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Error Handling**: Detailed error types for different failure scenarios
- **Configurable**: Flexible configuration options for timeouts, retries, and
  content limits
- **Fallback Support**: Graceful fallback to basic extraction when AI is
  unavailable

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
  debug: false,
  ai: {
    apiKey: 'your-openai-api-key',
    classificationModel: 'gpt-3.5-turbo',
    extractionModel: 'gpt-3.5-turbo',
    temperature: 0.1,
    maxTokens: 2000,
  },
});

// Translate from URL with AI
const urlResult = await translator.translate({
  url: 'https://example.com/article',
});

// Translate from source text with AI
const textResult = await translator.translate({
  sourceText: 'This is the content to translate...',
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
type TranslationInput = { url: string } | { sourceText: string };
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
  ai?: AIConfig;
}
```

#### AIConfig

```typescript
interface AIConfig {
  apiKey: string;
  classificationModel?: string;
  extractionModel?: string;
  temperature?: number;
  maxTokens?: number;
  baseURL?: string;
}
```

## Content Ingestion Pipeline

The translator supports two content ingestion paths:

### URL-based Ingestion

1. **HTTP Fetch**: Retrieves content using axios with retry logic
2. **Content Type Detection**: Automatically detects HTML, PDF, or text content
3. **HTML Processing**: Uses Readability API for clean content extraction
4. **PDF Processing**: Extracts text and metadata from PDF files
5. **Metadata Extraction**: Pulls author, title, date, and description
   information

### Source Text Ingestion

1. **Format Detection**: Determines if input is HTML or plain text
2. **HTML Processing**: Applies same Readability processing as URL path
3. **Text Processing**: Direct text extraction with title inference
4. **Metadata Extraction**: Extracts available metadata from content

## AI Translation Pipeline

When AI configuration is provided, the translator uses a sophisticated two-step
AI process:

### Step 1: Classification

- Uses OpenAI's language model to analyze content and determine the most
  appropriate Zotero item type
- Considers content structure, metadata, and textual patterns
- Returns item type (e.g., "journalArticle", "webpage", "book", "document")

### Step 2: Extraction

- Uses LangChain's StructuredOutputParser with dynamically selected Zod schema
- Schema selection based on the classified item type from Step 1
- Extracts structured metadata including title, authors, dates, abstract, etc.
- Employs OutputFixingParser for error recovery and validation

### Step 3: Validation

- Final validation using Zod schema's `.safeParse()` method
- Ensures all extracted data conforms to expected types and formats
- Provides detailed error information for debugging

### Fallback Mechanism

- If AI translation fails, automatically falls back to basic extraction
- Ensures robustness and availability even when AI services are unavailable
- Maintains consistent output format regardless of extraction method

## Error Handling

The package provides specific error types for different failure scenarios:

- `TranslatorError`: Base error class
- `ContentExtractionError`: Content processing failures
- `UrlFetchError`: Network and HTTP errors
- `PdfParseError`: PDF processing errors
- `ConfigurationError`: Invalid configuration errors
- `AIClassificationError`: AI classification failures
- `AIExtractionError`: AI extraction failures
- `AIValidationError`: AI validation failures

## Configuration

### Default Configuration

```typescript
{
  timeout: 30000,          // 30 second timeout
  maxRetries: 3,           // 3 retry attempts
  userAgent: 'Zotero-AI-Translator/1.0.0',
  maxContentLength: 50000, // 50k character limit
  debug: false,
  ai: undefined            // AI disabled by default
}
```

### AI Configuration

```typescript
{
  apiKey: 'your-openai-api-key',    // Required: OpenAI API key
  classificationModel: 'gpt-3.5-turbo', // Default classification model
  extractionModel: 'gpt-3.5-turbo',     // Default extraction model
  temperature: 0.1,                      // Default temperature for consistency
  maxTokens: 2000,                      // Default token limit
  baseURL: undefined                    // Optional custom API base URL
}
```

### Custom Configuration

```typescript
const translator = new Translator({
  timeout: 60000, // 60 second timeout
  maxRetries: 5, // 5 retry attempts
  userAgent: 'MyApp/1.0.0',
  maxContentLength: 100000, // 100k character limit
  debug: true, // Enable debug logging
  ai: {
    apiKey: 'your-openai-api-key',
    classificationModel: 'gpt-4',
    extractionModel: 'gpt-4',
    temperature: 0.2,
    maxTokens: 4000,
  },
});
```

## Development Status

This package provides a complete AI-powered translation pipeline using
LangChain.js. The current implementation includes:

- ✅ Complete content ingestion pipeline
- ✅ Content extraction from URLs and source text
- ✅ Basic metadata extraction
- ✅ Type-safe interfaces
- ✅ AI-powered translation with two-step process (Classification → Extraction →
  Validation)
- ✅ LangChain.js integration with OpenAI models
- ✅ Dynamic Zod schema configuration for structured output
- ✅ Graceful fallback to basic extraction when AI is unavailable

## Dependencies

- `@zotero-suite/schema-types`: Zotero type definitions
- `axios`: HTTP client for URL fetching
- `jsdom`: DOM parsing for HTML content
- `@mozilla/readability`: Content extraction from HTML
- `pdf-parse`: PDF text extraction
- `langchain`: LangChain.js core library for AI orchestration
- `@langchain/openai`: OpenAI integration for LangChain
- `zod`: TypeScript-first schema validation

## License

MIT
