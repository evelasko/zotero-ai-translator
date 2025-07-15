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
     * NOTE: This is a placeholder implementation. The actual AI logic using LangChain
     * will be implemented in a future step.
     */
    private translateToZoteroItem;
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
