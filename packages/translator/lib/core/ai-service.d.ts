/**
 * AI Service for LangChain-powered content translation with multi-provider support
 */
import { ZoteroItemData } from '@zotero-suite/schema-types';
import { AIProviderConfig, ExtractedContent } from '../types';
/**
 * AI Service class that handles the two-step AI translation process with multi-provider support
 */
export declare class AIService {
    private readonly config;
    private readonly classificationModel;
    private readonly extractionModel;
    private readonly provider;
    constructor(config: AIProviderConfig);
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
     * Step 1: Classification - determine the most appropriate Zotero item type
     */
    private classifyContent;
    /**
     * Step 2: Extraction - extract structured data using dynamic Zod schema
     */
    private extractStructuredData;
    /**
     * Step 3: Validation - validate extracted data using Zod schema
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
     * Get the model name for a specific purpose
     */
    private getModelName;
    /**
     * Get provider configuration for debugging
     */
    getProviderInfo(): {
        provider: string;
        classificationModel: string;
        extractionModel: string;
    };
}
