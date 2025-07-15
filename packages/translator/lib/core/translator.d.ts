/**
 * Main Translator class for AI-powered Zotero metadata extraction
 */
import { TranslationInput, TranslationResult, TranslatorConfig } from '../types';
/**
 * Main Translator class that orchestrates content ingestion and AI-powered translation
 */
export declare class Translator {
    private readonly config;
    private readonly contentExtractor;
    private readonly aiService?;
    constructor(config?: TranslatorConfig);
    /**
     * Main translation method that processes input and returns Zotero item data
     *
     * @param input - Either URL or source text input
     * @returns Promise resolving to translation result with Zotero item data
     */
    translate(input: TranslationInput): Promise<TranslationResult>;
    /**
     * Content Ingestion Pipeline - handles both URL and source text inputs
     */
    private ingestContent;
    /**
     * AI Translation Pipeline - converts extracted content to Zotero item data
     *
     * This method implements the two-step AI translation process:
     * 1. Classification: Determine the appropriate Zotero item type
     * 2. Extraction: Extract structured metadata using LangChain with dynamic schemas
     * 3. Validation: Validate the result using Zod safeParse
     */
    private translateToZoteroItem;
    /**
     * Basic fallback extraction when AI is not available or fails
     */
    private basicFallbackExtraction;
    /**
     * Infer item type based on content characteristics
     */
    private inferItemType;
    /**
     * Extract excerpt from content text
     */
    private extractExcerpt;
    /**
     * Validate translator configuration
     */
    private validateConfig;
    /**
     * Validate translation input
     */
    private validateInput;
    /**
     * Get current configuration
     */
    getConfig(): Readonly<Required<TranslatorConfig>>;
}
