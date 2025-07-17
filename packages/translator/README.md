# zotero-ai-translator

[![npm version](https://img.shields.io/npm/v/zotero-ai-translator.svg)](https://www.npmjs.com/package/zotero-ai-translator)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/Tests-All%20Passing-green.svg)](#test-status)

AI-powered content translation service for Zotero metadata extraction, optimized
for browser and Electron environments.

## Overview

The `zotero-ai-translator` package provides intelligent content processing and
metadata extraction capabilities for converting web content, PDFs, and text into
structured Zotero item data. This package is specifically designed to work in
browser and Electron renderer environments, making it ideal for Obsidian plugins
and other browser-based applications.

## Features

- **🌐 Browser Compatible**: Designed for Electron renderer and browser
  environments
- **🤖 Anthropic AI Integration**: Powered by Claude for intelligent metadata
  extraction
- **📄 Dual Input Support**: Process content from URLs or direct source text
- **📊 Advanced Content Extraction**: Browser-compatible parsing for HTML, PDF,
  and plain text
- **🏷️ Smart Metadata Extraction**: Automatic extraction of titles, authors,
  dates, and descriptions
- **🔒 Type Safety**: Full TypeScript support with comprehensive type
  definitions
- **⚡ Error Handling**: Detailed error types for different failure scenarios
- **⚙️ Configurable**: Flexible configuration options for timeouts, retries, and
  content limits
- **🛡️ Fallback Support**: Graceful fallback to basic extraction when AI is
  unavailable

## Installation

```bash
npm install zotero-ai-translator
```

## Quick Start

### Basic Usage (No AI)

```typescript
import { Translator } from 'zotero-ai-translator';

const translator = new Translator({
  timeout: 30000,
  maxRetries: 3,
  debug: false,
});

// Translate from URL
const urlResult = await translator.translate({
  url: 'https://example.com/article',
});

// Translate from source text
const textResult = await translator.translate({
  sourceText: 'This is the content to translate...',
});

console.log(urlResult.item); // Zotero item data
console.log(textResult.confidence); // Confidence score
```

### With Anthropic AI

```typescript
import { Translator } from 'zotero-ai-translator';

const translator = new Translator({
  ai: {
    apiKey: 'sk-ant-your-anthropic-api-key',
    classificationModel: 'claude-3-haiku-20240307',
    extractionModel: 'claude-3-5-sonnet-20241022',
    temperature: 0.1,
    maxTokens: 4096,
    enableDangerousBrowserAccess: true, // Required for browser environments
  },
});

const result = await translator.translate({
  url: 'https://example.com/research-paper',
});

console.log(result.item.itemType); // e.g., "journalArticle"
console.log(result.processing.aiProvider); // "anthropic"
```

## Configuration

### TranslatorConfig

```typescript
interface TranslatorConfig {
  timeout?: number; // Request timeout in ms (default: 30000)
  maxRetries?: number; // Max retry attempts (default: 3)
  userAgent?: string; // User agent string
  maxContentLength?: number; // Max content length (default: 50000)
  debug?: boolean; // Enable debug logging (default: false)
  ai?: AnthropicConfig; // Anthropic AI configuration
}
```

### AnthropicConfig

```typescript
interface AnthropicConfig {
  apiKey: string; // Anthropic API key (required)
  classificationModel?: string; // Model for item type classification
  extractionModel?: string; // Model for metadata extraction
  temperature?: number; // Model temperature (0-1)
  maxTokens?: number; // Max tokens for response
  maxRetries?: number; // Max retry attempts
  timeout?: number; // Request timeout in ms
  enablePromptCaching?: boolean; // Enable prompt caching
  enableDangerousBrowserAccess?: boolean; // Enable browser support (required for Electron)
  customHeaders?: Record<string, string>; // Custom headers for API requests
}
```

## Browser/Electron Usage

This package is specifically designed for browser and Electron renderer
environments. When using in Obsidian plugins or similar environments, ensure you
enable browser access:

```typescript
const translator = new Translator({
  ai: {
    apiKey: 'sk-ant-your-api-key',
    enableDangerousBrowserAccess: true, // Required for browser/Electron
  },
});
```

## Content Processing Pipeline

### 1. Content Extraction (Browser-Compatible)

- **URL Fetching**: Uses native `fetch` API with CORS support
- **HTML Processing**: Browser-native `DOMParser` with `DOMPurify` for security
- **PDF Processing**: `PDF.js` for browser-compatible PDF extraction
- **Metadata Extraction**: Extracts author, title, date, and description

### 2. AI Translation Pipeline

#### Step 1: Classification

- Analyzes content to determine the appropriate Zotero item type
- Returns item type (e.g., "journalArticle", "webpage", "book")

#### Step 2: Extraction

- Uses Anthropic's Claude to extract structured metadata
- Dynamic schema selection based on item type
- Validates extracted data with Zod schemas

#### Step 3: Validation

- Ensures all data conforms to Zotero's expected formats
- Provides detailed error information for debugging

### 3. Fallback Mechanism

When AI is unavailable or fails, the system falls back to basic extraction:

- Title extraction from HTML or first line of text
- Basic metadata from meta tags
- URL and content type preservation

## Supported Item Types

The AI can classify and extract metadata for these Zotero item types:

- **webpage**: General web content, blog posts
- **journalArticle**: Academic papers, research articles
- **book**: Books, monographs
- **bookSection**: Book chapters
- **document**: Reports, white papers
- **conferencePaper**: Conference proceedings
- **thesis**: Dissertations, theses
- **newspaperArticle**: News articles
- **magazineArticle**: Magazine content
- **blogPost**: Blog posts
- **forumPost**: Forum discussions
- **podcast**: Audio content
- **videoRecording**: Video content

## API Reference

### Translator Class

#### `new Translator(config?: TranslatorConfig)`

Creates a new translator instance.

#### `translate(input: TranslationInput): Promise<TranslationResult>`

Translates content into Zotero item data.

**Parameters:**

- `input`: Either `{ url: string }` or `{ sourceText: string }`

**Returns:**

```typescript
interface TranslationResult {
  item: ZoteroItemData; // Structured Zotero item
  confidence: number; // Confidence score (0-1)
  extractedContent: ExtractedContent; // Raw extracted content
  processing: ProcessingMetadata; // Processing details
}
```

## Error Handling

The package provides specific error types:

```typescript
// Base error class
class TranslatorError extends Error {
  code: string;
  cause?: Error;
}

// Specific error types
class ContentExtractionError extends TranslatorError
class UrlFetchError extends TranslatorError
class PdfParseError extends TranslatorError
class ConfigurationError extends TranslatorError
class AIClassificationError extends TranslatorError
class AIExtractionError extends TranslatorError
class AIValidationError extends TranslatorError
```

### Error Handling Example

```typescript
try {
  const result = await translator.translate({ url: 'https://example.com' });
  console.log(result.item);
} catch (error) {
  if (error instanceof ConfigurationError) {
    console.error('Configuration error:', error.message);
  } else if (error instanceof UrlFetchError) {
    console.error('Failed to fetch URL:', error.message, error.statusCode);
  } else if (error instanceof AIClassificationError) {
    console.error('AI classification failed:', error.message);
  }
}
```

## Advanced Usage

### Debug Mode

Enable detailed logging:

```typescript
const translator = new Translator({
  debug: true,
  ai: { apiKey: 'sk-ant-...' },
});
```

### Custom Headers

Add custom headers for API requests:

```typescript
const translator = new Translator({
  ai: {
    apiKey: 'sk-ant-...',
    customHeaders: {
      'X-Custom-Header': 'value',
    },
  },
});
```

### Timeout Configuration

Configure timeouts at multiple levels:

```typescript
const translator = new Translator({
  timeout: 60000, // Overall request timeout
  ai: {
    apiKey: 'sk-ant-...',
    timeout: 30000, // AI-specific timeout
  },
});
```

## Test Status

The package has comprehensive test coverage with **all 77 tests passing**:

✅ **Core Functionality**: Translation, extraction, and processing ✅ **Browser
Compatibility**: Fetch API, DOMParser, PDF.js integration  
✅ **AI Integration**: Anthropic client and response handling ✅ **Error
Handling**: All error scenarios properly tested ✅ **Configuration**: Validation
and defaults

## Performance Considerations

- **Content Limits**: Default 50,000 character limit (configurable)
- **Timeouts**: Default 30 second timeout (configurable)
- **Retries**: Automatic retry with exponential backoff
- **AI Latency**: Classification ~1s, extraction 2-5s depending on content

## Troubleshooting

### CORS Issues

When using URLs, ensure the target server allows CORS:

```typescript
// The fetch API uses CORS mode automatically
const result = await translator.translate({
  url: 'https://cors-enabled-site.com/article',
});
```

### PDF.js Worker

The package automatically configures PDF.js for browser environments. If you
encounter issues:

```typescript
// PDF.js will use CDN worker by default
// Custom worker paths can be configured if needed
```

### API Key Security

In browser environments, ensure API keys are properly secured:

- Use environment variables in development
- Implement proper API key management in production
- Consider proxy servers for enhanced security

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## Changelog

### 2.0.0

- Complete refactor for browser/Electron compatibility
- Replaced LangChain with direct Anthropic SDK integration
- Added browser-compatible content extraction
- Replaced Node.js dependencies with browser alternatives
- Improved error handling and type safety

### 1.0.0

- Initial release with multi-provider support
