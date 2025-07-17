/**
 * Main entry point for the Zotero AI Translator package
 */

// Export the main Translator class
export { Translator } from './core/translator';

// Export Anthropic client
export { AnthropicClient } from './core/anthropic-client';

// Export config validator
export { ConfigValidator } from './core/config-validator';

// Export all types and interfaces
export type {
  // Core types
  ExtractedContent,
  TextTranslationInput,
  TranslationInput,
  TranslationResult,
  TranslatorConfig,
  UrlTranslationInput,
  // Anthropic types
  AnthropicConfig,
  AnthropicModel,
  AnthropicResponse,
  AnthropicClientOptions,
} from './types';

// Export error classes
export {
  AIClassificationError,
  AIExtractionError,
  AIValidationError,
  ConfigurationError,
  ContentExtractionError,
  PdfParseError,
  TranslatorError,
  UrlFetchError,
} from './types';

// Export content extraction utilities (browser-compatible)
export { BrowserContentExtractor } from './utils/browser-content-extractor';
export { BrowserContentExtractor as ContentExtractor } from './utils/browser-content-extractor'; // Alias for backward compatibility

// Export AI service
export { AIService } from './core/ai-service';

// Default export for convenience
export { Translator as default } from './core/translator';