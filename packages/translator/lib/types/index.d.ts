/**
 * Type definitions for the Zotero AI Translator package
 */
import { ZoteroItemData } from 'zotero-schema-types';
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
export declare class TranslatorError extends Error {
    readonly code: string;
    readonly cause?: Error;
    constructor(message: string, code?: string, cause?: Error);
}
/**
 * Configuration validation error
 */
export declare class ConfigurationError extends TranslatorError {
    constructor(message: string, cause?: Error);
}
/**
 * Content extraction error
 */
export declare class ContentExtractionError extends TranslatorError {
    constructor(message: string, cause?: Error);
}
/**
 * URL fetch error
 */
export declare class UrlFetchError extends TranslatorError {
    readonly statusCode?: number;
    constructor(message: string, statusCode?: number, cause?: Error);
}
/**
 * PDF parsing error
 */
export declare class PdfParseError extends TranslatorError {
    constructor(message: string, cause?: Error);
}
/**
 * AI classification error
 */
export declare class AIClassificationError extends TranslatorError {
    constructor(message: string, cause?: Error);
}
/**
 * AI extraction error
 */
export declare class AIExtractionError extends TranslatorError {
    constructor(message: string, cause?: Error);
}
/**
 * AI validation error
 */
export declare class AIValidationError extends TranslatorError {
    constructor(message: string, cause?: Error);
}
export type { AIProviderConfig, AnthropicConfig, AnthropicModel, LLMProvider, ModelCapabilities, OllamaConfig, OllamaModel, OpenAIConfig, OpenAIModel, ProviderFactory, ProviderName, VertexAIConfig, VertexAIModel } from './providers';
