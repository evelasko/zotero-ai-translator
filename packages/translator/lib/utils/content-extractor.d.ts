/**
 * Content extraction utilities for URL and PDF processing
 */
import { ExtractedContent, TranslatorConfig } from '../types';
/**
 * Content extractor class for handling URL and PDF content extraction
 */
export declare class ContentExtractor {
    private readonly config;
    constructor(config?: TranslatorConfig);
    /**
     * Extract content from a URL
     */
    extractFromUrl(url: string): Promise<ExtractedContent>;
    /**
     * Extract content from source text
     */
    extractFromSourceText(sourceText: string): Promise<ExtractedContent>;
    /**
     * Fetch URL with retry logic
     */
    private fetchWithRetry;
    /**
     * Extract content from HTML using Readability
     */
    private extractFromHtml;
    /**
     * Extract content from PDF buffer
     */
    private extractFromPdf;
    /**
     * Extract content from plain text
     */
    private extractFromText;
    /**
     * Extract title from HTML document
     */
    private extractTitleFromHtml;
    /**
     * Delay utility for retry logic
     */
    private delay;
}
