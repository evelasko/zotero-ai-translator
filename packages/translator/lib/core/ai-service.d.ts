/**
 * AI Service for Anthropic-powered content translation
 */
import { ZoteroItemData } from 'zotero-schema-types';
import { AnthropicConfig, ExtractedContent } from '../types';
/**
 * AI Service class that handles the two-step AI translation process using Anthropic
 */
export declare class AIService {
    private readonly anthropicClient;
    constructor(config: AnthropicConfig);
    /**
     * Main AI translation method that executes the two-step process
     */
    translateContent(content: ExtractedContent): Promise<{
        item: ZoteroItemData;
        confidence: number;
        provider: string;
        modelsUsed: {
            classification: string;
            extraction: string;
        };
    }>;
    /**
     * Validate extracted data using Zod schema
     */
    private validateExtractedData;
    /**
     * Get the appropriate Zod schema for the given item type
     */
    private getSchemaForItemType;
    /**
     * Calculate confidence score based on content and extraction quality
     */
    private calculateConfidence;
    /**
     * Get provider information for debugging
     */
    getProviderInfo(): {
        provider: string;
        classificationModel: string;
        extractionModel: string;
    };
}
