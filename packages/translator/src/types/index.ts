/**
 * Type definitions for the Zotero AI Translator package
 */

import { ZoteroItemData } from '@zotero-suite/schema-types';

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
   * AI configuration options
   */
  ai?: AIConfig;
}

/**
 * AI configuration for LangChain integration
 */
export interface AIConfig {
  /**
   * OpenAI API key
   */
  apiKey: string;
  
  /**
   * OpenAI model to use for classification
   * @default 'gpt-3.5-turbo'
   */
  classificationModel?: string;
  
  /**
   * OpenAI model to use for extraction
   * @default 'gpt-3.5-turbo'
   */
  extractionModel?: string;
  
  /**
   * Temperature for AI responses
   * @default 0.1
   */
  temperature?: number;
  
  /**
   * Maximum tokens for AI responses
   * @default 2000
   */
  maxTokens?: number;
  
  /**
   * Custom base URL for OpenAI API
   */
  baseURL?: string;
}

/**
 * Required AI configuration with all optional fields resolved
 */
export interface RequiredAIConfig {
  apiKey: string;
  classificationModel: string;
  extractionModel: string;
  temperature: number;
  maxTokens: number;
  baseURL?: string;
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
  };
}

/**
 * Error types specific to the translator
 */
export class TranslatorError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'TranslatorError';
  }
}

/**
 * Content extraction errors
 */
export class ContentExtractionError extends TranslatorError {
  constructor(message: string, cause?: Error) {
    super(message, 'CONTENT_EXTRACTION_ERROR', cause);
    this.name = 'ContentExtractionError';
  }
}

/**
 * URL fetch errors
 */
export class UrlFetchError extends TranslatorError {
  constructor(message: string, cause?: Error) {
    super(message, 'URL_FETCH_ERROR', cause);
    this.name = 'UrlFetchError';
  }
}

/**
 * PDF parsing errors
 */
export class PdfParseError extends TranslatorError {
  constructor(message: string, cause?: Error) {
    super(message, 'PDF_PARSE_ERROR', cause);
    this.name = 'PdfParseError';
  }
}

/**
 * Configuration validation errors
 */
export class ConfigurationError extends TranslatorError {
  constructor(message: string) {
    super(message, 'CONFIGURATION_ERROR');
    this.name = 'ConfigurationError';
  }
}

/**
 * AI classification errors
 */
export class AIClassificationError extends TranslatorError {
  constructor(message: string, cause?: Error) {
    super(message, 'AI_CLASSIFICATION_ERROR', cause);
    this.name = 'AIClassificationError';
  }
}

/**
 * AI extraction errors
 */
export class AIExtractionError extends TranslatorError {
  constructor(message: string, cause?: Error) {
    super(message, 'AI_EXTRACTION_ERROR', cause);
    this.name = 'AIExtractionError';
  }
}

/**
 * AI validation errors
 */
export class AIValidationError extends TranslatorError {
  constructor(message: string, cause?: Error) {
    super(message, 'AI_VALIDATION_ERROR', cause);
    this.name = 'AIValidationError';
  }
}