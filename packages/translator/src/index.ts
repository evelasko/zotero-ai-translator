/**
 * Main entry point for the Zotero AI Translator package
 */

// Export the main Translator class
export { Translator } from './core/translator';

// Export all types and interfaces
export type {
  TranslationInput,
  UrlTranslationInput,
  TextTranslationInput,
  TranslatorConfig,
  ExtractedContent,
  TranslationResult,
} from './types';

export {
  TranslatorError,
  ContentExtractionError,
  UrlFetchError,
  PdfParseError,
  ConfigurationError,
} from './types';

// Export content extraction utilities
export { ContentExtractor } from './utils/content-extractor';

// Default export for convenience
export { Translator as default } from './core/translator';