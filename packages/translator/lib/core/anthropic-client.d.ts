/**
 * Browser-compatible Anthropic client for AI-powered translation
 */
import { AnthropicConfig, ExtractedContent } from '../types';
/**
 * Direct Anthropic client implementation for browser environments
 */
export declare class AnthropicClient {
    private client;
    private config;
    constructor(config: AnthropicConfig);
    /**
     * Classify content to determine the appropriate Zotero item type
     */
    classify(content: ExtractedContent): Promise<string>;
    /**
     * Extract structured data from content based on item type
     */
    extract(content: ExtractedContent, itemType: string): Promise<Record<string, unknown>>;
    /**
     * Build classification prompt
     */
    private buildClassificationPrompt;
    /**
     * Build extraction prompt with structured output instructions
     */
    private buildExtractionPrompt;
    /**
     * Parse classification response
     */
    private parseClassificationResponse;
    /**
     * Parse extraction response and validate against schema
     */
    private parseExtractionResponse;
    /**
     * Get Zod schema for item type
     */
    private getSchemaForItemType;
    /**
     * Generate human-readable schema description
     */
    private generateSchemaDescription;
    /**
     * Get string representation of Zod type
     */
    private getZodTypeString;
    /**
     * Validate configuration
     */
    private validateConfig;
    /**
     * Get classification model name
     */
    getClassificationModel(): string;
    /**
     * Get extraction model name
     */
    getExtractionModel(): string;
}
