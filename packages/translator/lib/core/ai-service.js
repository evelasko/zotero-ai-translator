"use strict";
/**
 * AI Service for LangChain-powered content translation with multi-provider support
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const output_parsers_1 = require("@langchain/core/output_parsers");
const prompts_1 = require("@langchain/core/prompts");
const zod_1 = require("zod");
const types_1 = require("../types");
const config_validator_1 = require("./config-validator");
const provider_factory_1 = require("./provider-factory");
/**
 * AI Service class that handles the two-step AI translation process with multi-provider support
 */
class AIService {
    config;
    classificationModel;
    extractionModel;
    provider;
    constructor(config) {
        // Validate the configuration
        config_validator_1.ConfigValidator.validateProviderConfig(config);
        this.config = config;
        this.provider = config.provider;
        // Create provider and models
        const providerInstance = provider_factory_1.ProviderFactory.createProvider(config);
        this.classificationModel = providerInstance.createClassificationModel(config);
        this.extractionModel = providerInstance.createExtractionModel(config);
    }
    /**
     * Main AI translation method that executes the two-step process
     */
    async translateContent(content) {
        try {
            // Step 1: Classification - determine the item type
            const itemType = await this.classifyContent(content);
            // Step 2: Extraction - extract structured data using dynamic schema
            const extractedData = await this.extractStructuredData(content, itemType);
            // Step 3: Validation - validate using Zod schema
            const validatedItem = await this.validateExtractedData(extractedData, itemType);
            return {
                item: validatedItem,
                confidence: this.calculateConfidence(content, validatedItem),
                provider: this.provider,
                modelsUsed: {
                    classification: this.getModelName('classification'),
                    extraction: this.getModelName('extraction'),
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
     * Step 1: Classification - determine the most appropriate Zotero item type
     */
    async classifyContent(content) {
        try {
            const classificationPrompt = prompts_1.PromptTemplate.fromTemplate(`
You are a bibliographic expert who specializes in classifying content into appropriate Zotero item types.

Given the following content, determine the most appropriate Zotero item type from this list:
- webpage: General web content, blog posts, online articles
- journalArticle: Academic journal articles, research papers
- book: Books, monographs, edited volumes
- bookSection: Book chapters, sections within books
- document: Reports, working papers, white papers
- conferencePaper: Conference proceedings, conference papers
- thesis: Dissertations, theses
- newspaperArticle: News articles, newspaper content
- magazineArticle: Magazine articles, popular press
- blogPost: Blog posts, personal articles
- forumPost: Forum discussions, community posts
- podcast: Podcast episodes, audio content
- videoRecording: Video content, lectures, presentations

Analyze the content and respond with ONLY the item type (e.g., "journalArticle", "webpage", etc.).

Title: {title}
URL: {url}
Content Type: {contentType}
Content Preview: {contentPreview}

Item Type:`);
            const contentPreview = content.text.substring(0, 1000);
            const result = await this.classificationModel.invoke(await classificationPrompt.format({
                title: content.title || 'Unknown',
                url: content.url || 'Unknown',
                contentType: content.contentType || 'Unknown',
                contentPreview,
            }));
            const itemType = result.content.toString().trim().toLowerCase();
            // Validate that the returned item type is valid
            const validItemTypes = [
                'webpage', 'journalarticle', 'book', 'booksection', 'document',
                'conferencepaper', 'thesis', 'newspaperarticle', 'magazinearticle',
                'blogpost', 'forumpost', 'podcast', 'videorecording'
            ];
            if (!validItemTypes.includes(itemType)) {
                throw new types_1.AIClassificationError(`Invalid item type returned: ${itemType}`);
            }
            return itemType;
        }
        catch (error) {
            if (error instanceof types_1.AIClassificationError) {
                throw error;
            }
            throw new types_1.AIClassificationError('Failed to classify content', error instanceof Error ? error : new Error(String(error)));
        }
    }
    /**
     * Step 2: Extraction - extract structured data using dynamic Zod schema
     */
    async extractStructuredData(content, itemType) {
        try {
            // Get the appropriate schema for the item type
            const schema = this.getSchemaForItemType(itemType);
            // Create output parser
            const parser = output_parsers_1.StructuredOutputParser.fromZodSchema(schema);
            // Create extraction prompt
            const extractionPrompt = prompts_1.PromptTemplate.fromTemplate(`
You are a bibliographic data extraction expert. Extract structured metadata from the given content for a Zotero item of type "{itemType}".

Extract as much relevant information as possible, but only include fields that you can confidently determine from the content. Leave fields empty if the information is not available or uncertain.

{format_instructions}

Title: {title}
URL: {url}
Content Type: {contentType}
Full Content: {fullContent}

Extracted Data:`);
            const formattedPrompt = await extractionPrompt.format({
                itemType,
                title: content.title || '',
                url: content.url || '',
                contentType: content.contentType || '',
                fullContent: content.text,
                format_instructions: parser.getFormatInstructions(),
            });
            const result = await this.extractionModel.invoke(formattedPrompt);
            // Parse the result using the output parser
            const parsedResult = await parser.parse(result.content.toString());
            return parsedResult;
        }
        catch (error) {
            throw new types_1.AIExtractionError('Failed to extract structured data', error instanceof Error ? error : new Error(String(error)));
        }
    }
    /**
     * Step 3: Validation - validate extracted data using Zod schema
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
            creators: zod_1.z.array(zod_1.z.object({
                firstName: zod_1.z.string().optional(),
                lastName: zod_1.z.string(),
                creatorType: zod_1.z.string().default('author'),
            })).optional(),
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
     * Get the model name for a specific purpose
     */
    getModelName(purpose) {
        switch (this.config.provider) {
            case 'openai':
                return purpose === 'classification'
                    ? this.config.classificationModel || 'gpt-4o-mini'
                    : this.config.extractionModel || 'gpt-4o-mini';
            case 'anthropic':
                return purpose === 'classification'
                    ? this.config.classificationModel || 'claude-3-haiku-20240307'
                    : this.config.extractionModel || 'claude-3-5-sonnet-20241022';
            case 'vertexai':
                return purpose === 'classification'
                    ? this.config.classificationModel || 'gemini-1.5-flash'
                    : this.config.extractionModel || 'gemini-1.5-pro';
            case 'ollama':
                return purpose === 'classification'
                    ? this.config.classificationModel || 'llama3.1:8b'
                    : this.config.extractionModel || 'llama3.1:8b';
            default:
                return 'unknown';
        }
    }
    /**
     * Get provider configuration for debugging
     */
    getProviderInfo() {
        return {
            provider: this.provider,
            classificationModel: this.getModelName('classification'),
            extractionModel: this.getModelName('extraction'),
        };
    }
}
exports.AIService = AIService;
