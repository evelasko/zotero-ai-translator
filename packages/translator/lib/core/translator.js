"use strict";
/**
 * Main Translator class for AI-powered Zotero metadata extraction
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translator = void 0;
const types_1 = require("../types");
const content_extractor_1 = require("../utils/content-extractor");
/**
 * Main Translator class that orchestrates content ingestion and AI-powered translation
 */
class Translator {
    config;
    contentExtractor;
    constructor(config = {}) {
        this.config = {
            timeout: config.timeout ?? 30000,
            maxRetries: config.maxRetries ?? 3,
            userAgent: config.userAgent ?? 'Zotero-AI-Translator/1.0.0',
            maxContentLength: config.maxContentLength ?? 50000,
            debug: config.debug ?? false,
        };
        this.validateConfig();
        this.contentExtractor = new content_extractor_1.ContentExtractor(this.config);
        if (this.config.debug) {
            console.log('[Translator] Initialized with config:', this.config);
        }
    }
    /**
     * Main translation method that processes input and returns Zotero item data
     *
     * @param input - Either URL or source text input
     * @returns Promise resolving to translation result with Zotero item data
     */
    async translate(input) {
        const startTime = Date.now();
        if (this.config.debug) {
            console.log('[Translator] Starting translation process');
        }
        try {
            // Validate input
            this.validateInput(input);
            // Step 1: Content Ingestion Pipeline
            const extractedContent = await this.ingestContent(input);
            const extractionTime = Date.now() - startTime;
            if (this.config.debug) {
                console.log(`[Translator] Content extracted in ${extractionTime}ms`);
                console.log(`[Translator] Content length: ${extractedContent.text.length} chars`);
            }
            // Step 2: AI Translation Pipeline (placeholder for now)
            const translationStartTime = Date.now();
            const item = await this.translateToZoteroItem(extractedContent);
            const translationTime = Date.now() - translationStartTime;
            const totalTime = Date.now() - startTime;
            if (this.config.debug) {
                console.log(`[Translator] Translation completed in ${translationTime}ms`);
                console.log(`[Translator] Total processing time: ${totalTime}ms`);
            }
            return {
                item,
                confidence: 0.8, // Placeholder confidence score
                extractedContent,
                processing: {
                    extractionTime,
                    translationTime,
                    totalTime,
                    ingestionMethod: 'url' in input ? 'url' : 'sourceText',
                },
            };
        }
        catch (error) {
            if (this.config.debug) {
                console.error('[Translator] Translation failed:', error);
            }
            if (error instanceof types_1.TranslatorError) {
                throw error;
            }
            throw new types_1.TranslatorError('Translation process failed', 'TRANSLATION_ERROR', error instanceof Error ? error : new Error(String(error)));
        }
    }
    /**
     * Content Ingestion Pipeline - handles both URL and source text inputs
     */
    async ingestContent(input) {
        if ('url' in input) {
            // URL-based ingestion path
            if (this.config.debug) {
                console.log(`[Translator] Ingesting content from URL: ${input.url}`);
            }
            return this.contentExtractor.extractFromUrl(input.url);
        }
        else {
            // Source text ingestion path
            if (this.config.debug) {
                console.log(`[Translator] Ingesting content from source text (${input.sourceText.length} chars)`);
            }
            return this.contentExtractor.extractFromSourceText(input.sourceText);
        }
    }
    /**
     * AI Translation Pipeline - converts extracted content to Zotero item data
     *
     * NOTE: This is a placeholder implementation. The actual AI logic using LangChain
     * will be implemented in a future step.
     */
    async translateToZoteroItem(content) {
        if (this.config.debug) {
            console.log('[Translator] AI translation pipeline (placeholder implementation)');
        }
        // TODO: Implement LangChain AI logic here
        // For now, return a basic item structure based on extracted content
        const item = {
            itemType: this.inferItemType(content),
            title: content.title || 'Untitled',
            url: content.url,
            accessDate: new Date().toISOString().split('T')[0],
            abstractNote: content.metadata?.excerpt || this.extractExcerpt(content.text),
            language: content.metadata?.language || 'en',
            creators: content.metadata?.author ? [{
                    creatorType: 'author',
                    firstName: '',
                    lastName: content.metadata.author
                }] : [],
            tags: [],
            collections: [],
            relations: {},
            dateAdded: new Date().toISOString(),
            dateModified: new Date().toISOString(),
        };
        // Add date if available
        if (content.metadata?.publishedDate) {
            item.date = content.metadata.publishedDate;
        }
        return item;
    }
    /**
     * Infer item type based on content characteristics
     */
    inferItemType(content) {
        if (content.contentType === 'application/pdf') {
            return 'document';
        }
        if (content.url) {
            return 'webpage';
        }
        return 'document';
    }
    /**
     * Extract excerpt from content text
     */
    extractExcerpt(text, maxLength = 300) {
        if (text.length <= maxLength) {
            return text;
        }
        const excerpt = text.substring(0, maxLength);
        const lastSpaceIndex = excerpt.lastIndexOf(' ');
        if (lastSpaceIndex > maxLength * 0.8) {
            return excerpt.substring(0, lastSpaceIndex) + '...';
        }
        return excerpt + '...';
    }
    /**
     * Validate translator configuration
     */
    validateConfig() {
        if (this.config.timeout <= 0) {
            throw new types_1.ConfigurationError('Timeout must be greater than 0');
        }
        if (this.config.maxRetries < 0) {
            throw new types_1.ConfigurationError('Max retries must be non-negative');
        }
        if (this.config.maxContentLength <= 0) {
            throw new types_1.ConfigurationError('Max content length must be greater than 0');
        }
        if (!this.config.userAgent || this.config.userAgent.trim().length === 0) {
            throw new types_1.ConfigurationError('User agent must be specified');
        }
    }
    /**
     * Validate translation input
     */
    validateInput(input) {
        if (!input) {
            throw new types_1.ConfigurationError('Translation input is required');
        }
        if ('url' in input) {
            if (!input.url || typeof input.url !== 'string' || input.url.trim().length === 0) {
                throw new types_1.ConfigurationError('URL must be a non-empty string');
            }
            // Basic URL validation
            try {
                new URL(input.url);
            }
            catch {
                throw new types_1.ConfigurationError('Invalid URL format');
            }
        }
        else if ('sourceText' in input) {
            if (!input.sourceText || typeof input.sourceText !== 'string' || input.sourceText.trim().length === 0) {
                throw new types_1.ConfigurationError('Source text must be a non-empty string');
            }
        }
        else {
            throw new types_1.ConfigurationError('Input must contain either "url" or "sourceText" property');
        }
    }
    /**
     * Get current configuration
     */
    getConfig() {
        return { ...this.config };
    }
}
exports.Translator = Translator;
