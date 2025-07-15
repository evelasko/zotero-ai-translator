"use strict";
/**
 * AI Service for LangChain-powered content translation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const openai_1 = require("@langchain/openai");
const prompts_1 = require("langchain/prompts");
const output_parsers_1 = require("langchain/output_parsers");
const zod_1 = require("zod");
const types_1 = require("../types");
/**
 * AI Service class that handles the two-step AI translation process
 */
class AIService {
    config;
    classificationModel;
    extractionModel;
    constructor(config) {
        this.config = {
            apiKey: config.apiKey,
            classificationModel: config.classificationModel ?? 'gpt-3.5-turbo',
            extractionModel: config.extractionModel ?? 'gpt-3.5-turbo',
            temperature: config.temperature ?? 0.1,
            maxTokens: config.maxTokens ?? 2000,
            ...(config.baseURL && { baseURL: config.baseURL }),
        };
        // Initialize classification model
        this.classificationModel = new openai_1.ChatOpenAI({
            modelName: this.config.classificationModel,
            temperature: this.config.temperature,
            maxTokens: this.config.maxTokens,
            openAIApiKey: this.config.apiKey,
            ...(this.config.baseURL && { configuration: { baseURL: this.config.baseURL } }),
        });
        // Initialize extraction model
        this.extractionModel = new openai_1.ChatOpenAI({
            modelName: this.config.extractionModel,
            temperature: this.config.temperature,
            maxTokens: this.config.maxTokens,
            openAIApiKey: this.config.apiKey,
            configuration: this.config.baseURL ? { baseURL: this.config.baseURL } : undefined,
        });
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
- document: PDFs, reports, whitepapers, working papers
- thesis: Dissertations, theses, academic projects
- conferencePaper: Conference proceedings, presentations
- report: Technical reports, government documents
- blogPost: Blog entries, online posts
- newspaperArticle: News articles, newspaper content
- magazineArticle: Magazine articles, popular press
- patent: Patent documents
- case: Legal cases, court documents
- statute: Legal statutes, regulations
- hearing: Congressional hearings, testimonies
- bill: Legislative bills, proposed laws
- videoRecording: Videos, documentaries, lectures
- podcast: Audio content, interviews
- presentation: Slides, presentations
- email: Email communications
- letter: Correspondence, personal letters
- manuscript: Unpublished manuscripts, drafts
- map: Maps, geographical content
- artwork: Images, artwork, visual content
- software: Code repositories, applications
- dataset: Data collections, databases

Content Information:
- Title: {title}
- URL: {url}
- Content Type: {contentType}
- Text Preview: {textPreview}
- Metadata: {metadata}

Instructions:
1. Analyze the content characteristics
2. Consider the source (URL, content type, metadata)
3. Look for academic indicators (citations, abstracts, methodology)
4. Identify publication patterns and format clues
5. Choose the SINGLE most appropriate item type
6. Respond with ONLY the item type name (e.g., "journalArticle")

Item Type:`);
            const textPreview = content.text.substring(0, 1000);
            const metadata = JSON.stringify(content.metadata || {});
            const classificationChain = classificationPrompt.pipe(this.classificationModel);
            const result = await classificationChain.invoke({
                title: content.title || 'No title',
                url: content.url || 'No URL',
                contentType: content.contentType || 'text/plain',
                textPreview,
                metadata,
            });
            const itemType = result.content.toString().trim().toLowerCase();
            // Validate that we got a valid item type
            const validItemTypes = [
                'webpage', 'journalarticle', 'book', 'booksection', 'document', 'thesis',
                'conferencepaper', 'report', 'blogpost', 'newspaperarticle', 'magazinearticle',
                'patent', 'case', 'statute', 'hearing', 'bill', 'videorecording', 'podcast',
                'presentation', 'email', 'letter', 'manuscript', 'map', 'artwork', 'software', 'dataset'
            ];
            if (!validItemTypes.includes(itemType)) {
                throw new types_1.AIClassificationError(`Invalid item type returned: ${itemType}`);
            }
            return itemType;
        }
        catch (error) {
            throw new types_1.AIClassificationError('Failed to classify content', error instanceof Error ? error : new Error(String(error)));
        }
    }
    /**
     * Step 2: Extraction - extract structured data using dynamic Zod schema
     */
    async extractStructuredData(content, itemType) {
        try {
            // Get the appropriate Zod schema for the item type
            const schema = this.getSchemaForItemType(itemType);
            // Create structured output parser
            const parser = output_parsers_1.StructuredOutputParser.fromZodSchema(schema);
            // Create output fixing parser for error recovery
            const outputFixingParser = output_parsers_1.OutputFixingParser.fromLLM(this.extractionModel, parser);
            // Create extraction prompt
            const extractionPrompt = prompts_1.PromptTemplate.fromTemplate(`
You are a skilled bibliographic data extraction expert. Extract structured metadata from the given content.

Content Information:
- Title: {title}
- URL: {url}
- Content Type: {contentType}
- Full Text: {fullText}
- Existing Metadata: {metadata}

Target Item Type: {itemType}

Instructions:
1. Carefully analyze the content to extract relevant bibliographic information
2. Focus on accuracy and completeness
3. Use the existing metadata when available and reliable
4. Infer missing information from context when reasonable
5. For dates, use ISO format (YYYY-MM-DD) when possible
6. For creators, separate first and last names properly
7. Extract tags that represent key topics or themes
8. Leave fields empty if information is not available or cannot be reliably inferred

{format_instructions}

Extracted Data:`);
            const extractionChain = extractionPrompt.pipe(this.extractionModel).pipe(outputFixingParser);
            const result = await extractionChain.invoke({
                title: content.title || '',
                url: content.url || '',
                contentType: content.contentType || 'text/plain',
                fullText: content.text,
                metadata: JSON.stringify(content.metadata || {}),
                itemType,
                format_instructions: parser.getFormatInstructions(),
            });
            return result;
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
            const schema = this.getSchemaForItemType(itemType);
            // Use safeParse for validation
            const result = schema.safeParse(extractedData);
            if (!result.success) {
                throw new types_1.AIValidationError(`Validation failed for item type ${itemType}: ${result.error.message}`);
            }
            // Add required fields that might be missing
            const validatedData = result.data;
            // Ensure required fields are present
            const finalItem = {
                ...validatedData,
                itemType,
                dateAdded: validatedData.dateAdded || new Date().toISOString(),
                dateModified: validatedData.dateModified || new Date().toISOString(),
                creators: validatedData.creators || [],
                tags: validatedData.tags || [],
                collections: validatedData.collections || [],
                relations: validatedData.relations || {},
            };
            return finalItem;
        }
        catch (error) {
            throw new types_1.AIValidationError('Failed to validate extracted data', error instanceof Error ? error : new Error(String(error)));
        }
    }
    /**
     * Get the appropriate Zod schema for the given item type
     */
    getSchemaForItemType(itemType) {
        // For now, we'll use a generic schema that works for most item types
        // In a full implementation, this would dynamically select the appropriate schema
        // from @zotero-suite/schema-types based on the item type
        return zod_1.z.object({
            title: zod_1.z.string().optional(),
            creators: zod_1.z.array(zod_1.z.object({
                creatorType: zod_1.z.string(),
                firstName: zod_1.z.string().optional(),
                lastName: zod_1.z.string(),
            })).optional(),
            abstractNote: zod_1.z.string().optional(),
            url: zod_1.z.string().optional(),
            accessDate: zod_1.z.string().optional(),
            date: zod_1.z.string().optional(),
            language: zod_1.z.string().optional(),
            tags: zod_1.z.array(zod_1.z.object({
                tag: zod_1.z.string(),
                type: zod_1.z.number().optional(),
            })).optional(),
            extra: zod_1.z.string().optional(),
            // Add item-type specific fields based on the itemType
            ...(itemType === 'journalarticle' && {
                publicationTitle: zod_1.z.string().optional(),
                volume: zod_1.z.string().optional(),
                issue: zod_1.z.string().optional(),
                pages: zod_1.z.string().optional(),
                DOI: zod_1.z.string().optional(),
                ISSN: zod_1.z.string().optional(),
            }),
            ...(itemType === 'book' && {
                publisher: zod_1.z.string().optional(),
                place: zod_1.z.string().optional(),
                ISBN: zod_1.z.string().optional(),
                numPages: zod_1.z.string().optional(),
                edition: zod_1.z.string().optional(),
            }),
            ...(itemType === 'webpage' && {
                websiteTitle: zod_1.z.string().optional(),
                websiteType: zod_1.z.string().optional(),
            }),
        });
    }
    /**
     * Calculate confidence score based on content and extraction quality
     */
    calculateConfidence(content, item) {
        let confidence = 0.5; // Base confidence
        // Increase confidence based on available data
        if (item.title)
            confidence += 0.2;
        if (item.creators && item.creators.length > 0)
            confidence += 0.1;
        if (item.date)
            confidence += 0.1;
        if (item.abstractNote)
            confidence += 0.1;
        if (content.url)
            confidence += 0.1;
        // Decrease confidence for very short content
        if (content.text.length < 100)
            confidence -= 0.2;
        // Ensure confidence is between 0 and 1
        return Math.max(0, Math.min(1, confidence));
    }
}
exports.AIService = AIService;
