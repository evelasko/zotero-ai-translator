/**
 * Type definitions for the Zotero AI Translator package
 */

import { ZoteroItemData } from '@zotero-suite/schema-types';
import { AIProviderConfig } from './providers';

/**
 * Input configuration for URL-based translation
 */
export interface UrlTranslationInput {
  url: string;
  sourceText?: never;
}

/**
 * Input configuration for direct source text translation
 */
export interface TextTranslationInput {
  sourceText: string;
  url?: never;
}

/**
 * Union type for translation input - either URL or source text
 */
export type TranslationInput = UrlTranslationInput | TextTranslationInput;

/**
 * Configuration options for the Translator
 */
export interface TranslatorConfig {
  /**
   * Timeout for HTTP requests in milliseconds
   * @default 30000
   */
  timeout?: number;
  
  /**
   * Maximum number of retries for failed requests
   * @default 3
   */
  maxRetries?: number;
  
  /**
   * User agent string for HTTP requests
   * @default 'Zotero-AI-Translator/1.0.0'
   */
  userAgent?: string;
  
  /**
   * Maximum content length to process (in characters)
   * @default 50000
   */
  maxContentLength?: number;
  
  /**
   * Enable debug logging
   * @default false
   */
  debug?: boolean;
  
  /**
   * AI provider configuration
   */
  ai?: AIProviderConfig;
}

/**
 * Extracted content from URL or source text
 */
export interface ExtractedContent {
  /**
   * The main text content
   */
  text: string;
  
  /**
   * The title of the content (if available)
   */
  title?: string;
  
  /**
   * The original URL (if from URL input)
   */
  url?: string;
  
  /**
   * Content type information
   */
  contentType?: string;
  
  /**
   * Additional metadata extracted during content processing
   */
  metadata?: {
    author?: string;
    publishedDate?: string;
    excerpt?: string;
    language?: string;
    [key: string]: unknown;
  };
}

/**
 * Translation result containing the extracted Zotero item data
 */
export interface TranslationResult {
  /**
   * The extracted Zotero item data
   */
  item: ZoteroItemData;
  
  /**
   * Confidence score for the translation (0-1)
   */
  confidence: number;
  
  /**
   * The extracted content that was processed
   */
  extractedContent: ExtractedContent;
  
  /**
   * Processing metadata
   */
  processing: {
    /**
     * Time taken for content extraction (ms)
     */
    extractionTime: number;
    
    /**
     * Time taken for AI translation (ms)
     */
    translationTime: number;
    
    /**
     * Total processing time (ms)
     */
    totalTime: number;
    
    /**
     * Content ingestion method used
     */
    ingestionMethod: 'url' | 'sourceText';
    
    /**
     * AI provider used for translation
     */
    aiProvider?: string;
    
    /**
     * Models used for classification and extraction
     */
    modelsUsed?: {
      classification: string;
      extraction: string;
    };
  };
}

/**
 * Base error class for all translator errors
 */
export class TranslatorError extends Error {
  public readonly code: string;
  public readonly cause?: Error;

  constructor(message: string, code: string = 'TRANSLATOR_ERROR', cause?: Error) {
    super(message);
    this.name = 'TranslatorError';
    this.code = code;
    this.cause = cause;
  }
}

/**
 * Configuration validation error
 */
export class ConfigurationError extends TranslatorError {
  constructor(message: string, cause?: Error) {
    super(message, 'CONFIGURATION_ERROR', cause);
    this.name = 'ConfigurationError';
  }
}

/**
 * Content extraction error
 */
export class ContentExtractionError extends TranslatorError {
  constructor(message: string, cause?: Error) {
    super(message, 'CONTENT_EXTRACTION_ERROR', cause);
    this.name = 'ContentExtractionError';
  }
}

/**
 * URL fetch error
 */
export class UrlFetchError extends TranslatorError {
  public readonly statusCode?: number;
  
  constructor(message: string, statusCode?: number, cause?: Error) {
    super(message, 'URL_FETCH_ERROR', cause);
    this.name = 'UrlFetchError';
    this.statusCode = statusCode;
  }
}

/**
 * PDF parsing error
 */
export class PdfParseError extends TranslatorError {
  constructor(message: string, cause?: Error) {
    super(message, 'PDF_PARSE_ERROR', cause);
    this.name = 'PdfParseError';
  }
}

/**
 * AI classification error
 */
export class AIClassificationError extends TranslatorError {
  constructor(message: string, cause?: Error) {
    super(message, 'AI_CLASSIFICATION_ERROR', cause);
    this.name = 'AIClassificationError';
  }
}

/**
 * AI extraction error
 */
export class AIExtractionError extends TranslatorError {
  constructor(message: string, cause?: Error) {
    super(message, 'AI_EXTRACTION_ERROR', cause);
    this.name = 'AIExtractionError';
  }
}

/**
 * AI validation error
 */
export class AIValidationError extends TranslatorError {
  constructor(message: string, cause?: Error) {
    super(message, 'AI_VALIDATION_ERROR', cause);
    this.name = 'AIValidationError';
  }
}

// Re-export provider types for convenience
export type {
    AIProviderConfig, AnthropicConfig, AnthropicModel, LLMProvider, ModelCapabilities, OllamaConfig, OllamaModel, OpenAIConfig, OpenAIModel, ProviderFactory, ProviderName, VertexAIConfig, VertexAIModel
} from './providers';

