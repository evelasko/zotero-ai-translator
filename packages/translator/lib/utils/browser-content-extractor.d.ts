/**
 * Browser-compatible content extraction utilities for Electron renderer environments
 */
import { ExtractedContent, TranslatorConfig } from '../types';
/**
 * Browser-compatible content extractor for handling URL and PDF content extraction
 * Designed specifically for Electron renderer environments like Obsidian plugins
 */
export declare class BrowserContentExtractor {
    private readonly config;
    constructor(config?: TranslatorConfig);
    /**
     * Configure PDF.js worker for browser/Electron environments
     */
    private configurePdfJsWorker;
    /**
     * Extract content from a URL using browser-compatible fetch
     */
    extractFromUrl(url: string): Promise<ExtractedContent>;
    /**
     * Extract content from source text
     */
    extractFromSourceText(sourceText: string): Promise<ExtractedContent>;
    /**
     * Fetch URL with retry logic using browser-compatible fetch API
     */
    private fetchWithRetry;
    /**
     * Extract content from HTML using browser-compatible DOMParser and DOMPurify
     */
    private extractFromHtml;
    /**
     * Extract readable content from document using simplified readability algorithm
     */
    private extractReadableContent;
    /**
     * Extract content from PDF using PDF.js
     */
    private extractFromPdf;
    /**
     * Extract title from PDF metadata or first page
     */
    private extractPdfTitle;
    /**
     * Extract content from plain text
     */
    private extractFromText;
    /**
     * Extract title from HTML document using browser DOM
     */
    private extractTitleFromHtml;
    /**
     * Delay utility for retry logic
     */
    private delay;
}
