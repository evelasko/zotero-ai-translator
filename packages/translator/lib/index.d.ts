/**
 * Main entry point for the Zotero AI Translator package
 */
export { Translator } from './core/translator';
export { ProviderDetector, ProviderFactory, getProviderStatus, registerAllProviders, } from './core/providers';
export { ConfigValidator } from './core/config-validator';
export type { AIProviderConfig, AnthropicConfig, AnthropicModel, ExtractedContent, ProviderFactory as IProviderFactory, LLMProvider, ModelCapabilities, OllamaConfig, OllamaModel, OpenAIConfig, OpenAIModel, ProviderName, TextTranslationInput, TranslationInput, TranslationResult, TranslatorConfig, UrlTranslationInput, VertexAIConfig, VertexAIModel, } from './types';
export { AIClassificationError, AIExtractionError, AIValidationError, ConfigurationError, ContentExtractionError, PdfParseError, TranslatorError, UrlFetchError, } from './types';
export { ContentExtractor } from './utils/content-extractor';
export { AIService } from './core/ai-service';
export { Translator as default } from './core/translator';
