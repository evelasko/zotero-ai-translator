"use strict";
/**
 * AI Service for Anthropic-powered content translation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const zod_1 = require("zod");
const types_1 = require("../types");
const anthropic_client_1 = require("./anthropic-client");
const config_validator_1 = require("./config-validator");
/**
 * AI Service class that handles the two-step AI translation process using Anthropic
 */
class AIService {
    anthropicClient;
    constructor(config) {
        // Validate the configuration
        config_validator_1.ConfigValidator.validateProviderConfig(config);
        this.anthropicClient = new anthropic_client_1.AnthropicClient(config);
    }
    /**
     * Main AI translation method that executes the two-step process
     */
    async translateContent(content) {
        try {
            // Step 1: Classification - determine the item type
            const itemType = await this.anthropicClient.classify(content);
            // Step 2: Extraction - extract structured data using dynamic schema
            const extractedData = await this.anthropicClient.extract(content, itemType);
            // Step 3: Validation - validate using Zod schema
            const validatedItem = await this.validateExtractedData(extractedData, itemType);
            return {
                item: validatedItem,
                confidence: this.calculateConfidence(content, validatedItem),
                provider: 'anthropic',
                modelsUsed: {
                    classification: this.anthropicClient.getClassificationModel(),
                    extraction: this.anthropicClient.getExtractionModel(),
                },
            };
        }
        catch (error) {
            if (error instanceof types_1.AIClassificationError ||
                error instanceof types_1.AIExtractionError ||
                error instanceof types_1.AIValidationError) {
                throw error;
            }
            throw new types_1.AIExtractionError('AI translation process failed', error instanceof Error ? error : new Error(String(error)));
        }
    }
    /**
     * Validate extracted data using Zod schema
     */
    async validateExtractedData(extractedData, itemType) {
        try {
            // Get the appropriate schema for validation
            const schema = this.getSchemaForItemType(itemType);
            // Validate the extracted data
            const validationResult = schema.safeParse(extractedData);
            if (!validationResult.success) {
                throw new types_1.AIValidationError(`Validation failed: ${validationResult.error.message}`);
            }
            // Ensure the item type is set correctly
            const validatedData = {
                ...validationResult.data,
                itemType: itemType,
            };
            return validatedData;
        }
        catch (error) {
            if (error instanceof types_1.AIValidationError) {
                throw error;
            }
            throw new types_1.AIValidationError('Failed to validate extracted data', error instanceof Error ? error : new Error(String(error)));
        }
    }
    /**
     * Get the appropriate Zod schema for the given item type
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getSchemaForItemType(itemType) {
        // Base schema with common fields
        const baseSchema = {
            title: zod_1.z.string().optional(),
            creators: zod_1.z
                .array(zod_1.z.object({
                firstName: zod_1.z.string().optional(),
                lastName: zod_1.z.string(),
                creatorType: zod_1.z.string().default('author'),
            }))
                .optional(),
            date: zod_1.z.string().optional(),
            url: zod_1.z.string().optional(),
            accessDate: zod_1.z.string().optional(),
            abstractNote: zod_1.z.string().optional(),
            tags: zod_1.z.array(zod_1.z.string()).optional(),
            notes: zod_1.z.array(zod_1.z.string()).optional(),
        };
        // Extend base schema based on item type
        switch (itemType) {
            case 'journalarticle':
                return zod_1.z.object({
                    ...baseSchema,
                    publicationTitle: zod_1.z.string().optional(),
                    volume: zod_1.z.string().optional(),
                    issue: zod_1.z.string().optional(),
                    pages: zod_1.z.string().optional(),
                    DOI: zod_1.z.string().optional(),
                    ISSN: zod_1.z.string().optional(),
                });
            case 'book':
                return zod_1.z.object({
                    ...baseSchema,
                    publisher: zod_1.z.string().optional(),
                    place: zod_1.z.string().optional(),
                    ISBN: zod_1.z.string().optional(),
                    edition: zod_1.z.string().optional(),
                    numPages: zod_1.z.string().optional(),
                });
            case 'booksection':
                return zod_1.z.object({
                    ...baseSchema,
                    bookTitle: zod_1.z.string().optional(),
                    publisher: zod_1.z.string().optional(),
                    place: zod_1.z.string().optional(),
                    pages: zod_1.z.string().optional(),
                    ISBN: zod_1.z.string().optional(),
                });
            case 'conferencepaper':
                return zod_1.z.object({
                    ...baseSchema,
                    proceedingsTitle: zod_1.z.string().optional(),
                    conferenceName: zod_1.z.string().optional(),
                    place: zod_1.z.string().optional(),
                    pages: zod_1.z.string().optional(),
                    DOI: zod_1.z.string().optional(),
                });
            case 'thesis':
                return zod_1.z.object({
                    ...baseSchema,
                    university: zod_1.z.string().optional(),
                    place: zod_1.z.string().optional(),
                    thesisType: zod_1.z.string().optional(),
                    numPages: zod_1.z.string().optional(),
                });
            case 'newspaperarticle':
                return zod_1.z.object({
                    ...baseSchema,
                    publicationTitle: zod_1.z.string().optional(),
                    section: zod_1.z.string().optional(),
                    place: zod_1.z.string().optional(),
                    edition: zod_1.z.string().optional(),
                });
            case 'magazinearticle':
                return zod_1.z.object({
                    ...baseSchema,
                    publicationTitle: zod_1.z.string().optional(),
                    volume: zod_1.z.string().optional(),
                    issue: zod_1.z.string().optional(),
                    pages: zod_1.z.string().optional(),
                    ISSN: zod_1.z.string().optional(),
                });
            case 'blogpost':
                return zod_1.z.object({
                    ...baseSchema,
                    blogTitle: zod_1.z.string().optional(),
                    websiteType: zod_1.z.string().default('Blog'),
                });
            case 'podcast':
                return zod_1.z.object({
                    ...baseSchema,
                    seriesTitle: zod_1.z.string().optional(),
                    episodeNumber: zod_1.z.string().optional(),
                    audioRecordingFormat: zod_1.z.string().optional(),
                    runningTime: zod_1.z.string().optional(),
                });
            case 'videorecording':
                return zod_1.z.object({
                    ...baseSchema,
                    studio: zod_1.z.string().optional(),
                    runningTime: zod_1.z.string().optional(),
                    videoRecordingFormat: zod_1.z.string().optional(),
                });
            case 'document':
                return zod_1.z.object({
                    ...baseSchema,
                    publisher: zod_1.z.string().optional(),
                    place: zod_1.z.string().optional(),
                    reportNumber: zod_1.z.string().optional(),
                    institution: zod_1.z.string().optional(),
                });
            case 'webpage':
            default:
                return zod_1.z.object({
                    ...baseSchema,
                    websiteTitle: zod_1.z.string().optional(),
                    websiteType: zod_1.z.string().optional(),
                });
        }
    }
    /**
     * Calculate confidence score based on content and extraction quality
     */
    calculateConfidence(content, item) {
        let confidence = 0.5; // Base confidence
        // Increase confidence based on available metadata
        if (item.title)
            confidence += 0.2;
        if (item.creators && item.creators.length > 0)
            confidence += 0.15;
        if (item.date)
            confidence += 0.1;
        if (item.url)
            confidence += 0.05;
        // Increase confidence based on content quality
        if (content.title)
            confidence += 0.1;
        if (content.metadata?.author)
            confidence += 0.1;
        if (content.metadata?.publishedDate)
            confidence += 0.1;
        // Cap confidence at 1.0
        return Math.min(confidence, 1.0);
    }
    /**
     * Get provider information for debugging
     */
    getProviderInfo() {
        return {
            provider: 'anthropic',
            classificationModel: this.anthropicClient.getClassificationModel(),
            extractionModel: this.anthropicClient.getExtractionModel(),
        };
    }
}
exports.AIService = AIService;
