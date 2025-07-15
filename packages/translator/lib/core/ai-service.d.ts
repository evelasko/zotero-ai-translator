/**
 * AI Service for LangChain-powered content translation
 */
import { ZoteroItemData } from '@zotero-suite/schema-types';
import { AIConfig, ExtractedContent } from '../types';
/**
 * AI Service class that handles the two-step AI translation process
 */
export declare class AIService {
    private readonly config;
    private readonly classificationModel;
    private readonly extractionModel;
    constructor(config: AIConfig);
    /**
     * Main AI translation method that executes the two-step process
     */
    translateContent(content: ExtractedContent): Promise<{
        item: ZoteroItemData;
        confidence: number;
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
}
