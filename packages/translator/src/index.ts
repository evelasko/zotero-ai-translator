/**
 * Main entry point for the Zotero AI Translator package
 */

// Export the main Translator class
export { Translator } from './core/translator';

// Export provider system
export {
  ProviderDetector,
  ProviderFactory,
  getProviderStatus,
  registerAllProviders,
} from './core/providers';

export { ConfigValidator } from './core/config-validator';

// Export all types and interfaces
export type {
  // Provider types
  AIProviderConfig,
  AnthropicConfig,
  AnthropicModel,
  ExtractedContent,
  ProviderFactory as IProviderFactory,
  LLMProvider,
  ModelCapabilities,
  OllamaConfig,
  OllamaModel,
  OpenAIConfig,
  // Model types
  OpenAIModel,
  ProviderName,
  TextTranslationInput,
  TranslationInput,
  TranslationResult,
  TranslatorConfig,
  UrlTranslationInput,
  VertexAIConfig,
  VertexAIModel,
} from './types';

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

// Export content extraction utilities
export { ContentExtractor } from './utils/content-extractor';

// Export AI service
export { AIService } from './core/ai-service';

// Default export for convenience
export { Translator as default } from './core/translator';
