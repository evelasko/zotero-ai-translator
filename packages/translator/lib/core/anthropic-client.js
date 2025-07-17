"use strict";
/**
 * Browser-compatible Anthropic client for AI-powered translation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicClient = void 0;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const zod_1 = require("zod");
const types_1 = require("../types");
/**
 * Direct Anthropic client implementation for browser environments
 */
class AnthropicClient {
    client;
    config;
    constructor(config) {
        // Validate configuration
        this.validateConfig(config);
        // Set default values
        this.config = {
            classificationModel: config.classificationModel || 'claude-3-haiku-20240307',
            extractionModel: config.extractionModel || 'claude-3-5-sonnet-20241022',
            maxTokens: config.maxTokens || 4096,
            temperature: config.temperature || 0.1,
            enableDangerousBrowserAccess: config.enableDangerousBrowserAccess || false,
            customHeaders: config.customHeaders,
            enablePromptCaching: config.enablePromptCaching || false,
            maxRetries: config.maxRetries || 2,
            timeout: config.timeout || 30000,
        };
        // Initialize Anthropic client
        const clientConfig = {
            apiKey: config.apiKey,
            maxRetries: this.config.maxRetries,
            timeout: this.config.timeout,
        };
        // Enable browser access if configured
        if (this.config.enableDangerousBrowserAccess) {
            clientConfig.dangerouslyAllowBrowser = true;
        }
        // Add custom headers if provided
        if (this.config.customHeaders || this.config.enablePromptCaching) {
            clientConfig.defaultHeaders = {
                ...(this.config.enablePromptCaching && {
                    'anthropic-beta': 'prompt-caching-2024-07-31',
                }),
                ...this.config.customHeaders,
            };
        }
        this.client = new sdk_1.default(clientConfig);
    }
    /**
     * Classify content to determine the appropriate Zotero item type
     */
    async classify(content) {
        try {
            const prompt = this.buildClassificationPrompt(content);
            const response = await this.client.messages.create({
                model: this.config.classificationModel,
                max_tokens: 1024,
                temperature: this.config.temperature,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            });
            return this.parseClassificationResponse(response);
        }
        catch (error) {
            throw new types_1.AIClassificationError('Failed to classify content', error instanceof Error ? error : new Error(String(error)));
        }
    }
    /**
     * Extract structured data from content based on item type
     */
    async extract(content, itemType) {
        try {
            const prompt = this.buildExtractionPrompt(content, itemType);
            const schema = this.getSchemaForItemType(itemType);
            const response = await this.client.messages.create({
                model: this.config.extractionModel,
                max_tokens: this.config.maxTokens,
                temperature: this.config.temperature,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            });
            return this.parseExtractionResponse(response, schema);
        }
        catch (error) {
            throw new types_1.AIExtractionError('Failed to extract structured data', error instanceof Error ? error : new Error(String(error)));
        }
    }
    /**
     * Build classification prompt
     */
    buildClassificationPrompt(content) {
        return `You are a bibliographic expert who specializes in classifying content into appropriate Zotero item types.

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

Title: ${content.title || 'Unknown'}
URL: ${content.url || 'Unknown'}
Content Type: ${content.contentType || 'Unknown'}
Content Preview: ${content.text.substring(0, 1000)}

Item Type:`;
    }
    /**
     * Build extraction prompt with structured output instructions
     */
    buildExtractionPrompt(content, itemType) {
        const schema = this.getSchemaForItemType(itemType);
        const schemaDescription = this.generateSchemaDescription(schema);
        return `You are a bibliographic data extraction expert. Extract structured metadata from the given content for a Zotero item of type "${itemType}".

Extract as much relevant information as possible, but only include fields that you can confidently determine from the content. Leave fields empty if the information is not available or uncertain.

You must respond with a valid JSON object that matches this structure:
${schemaDescription}

Important guidelines:
- For dates, use the format "YYYY-MM-DD" or "YYYY-MM" or "YYYY"
- For creators, use the format: {"firstName": "John", "lastName": "Doe", "creatorType": "author"}
- If you can't determine a creator's first/last name split, put the full name in lastName
- For URLs, ensure they are complete and valid
- For tags, extract relevant keywords as an array of strings

Title: ${content.title || ''}
URL: ${content.url || ''}
Content Type: ${content.contentType || ''}
Full Content: ${content.text}

Respond ONLY with a valid JSON object:`;
    }
    /**
     * Parse classification response
     */
    parseClassificationResponse(response) {
        const content = response.content[0];
        if (content.type !== 'text') {
            throw new types_1.AIClassificationError('Unexpected response type from classification');
        }
        const itemType = content.text.trim().toLowerCase();
        // Validate that the returned item type is valid
        const validItemTypes = [
            'webpage',
            'journalarticle',
            'book',
            'booksection',
            'document',
            'conferencepaper',
            'thesis',
            'newspaperarticle',
            'magazinearticle',
            'blogpost',
            'forumpost',
            'podcast',
            'videorecording',
        ];
        if (!validItemTypes.includes(itemType)) {
            throw new types_1.AIClassificationError(`Invalid item type returned: ${itemType}`);
        }
        return itemType;
    }
    /**
     * Parse extraction response and validate against schema
     */
    parseExtractionResponse(response, schema) {
        const content = response.content[0];
        if (content.type !== 'text') {
            throw new types_1.AIExtractionError('Unexpected response type from extraction');
        }
        try {
            // Parse JSON response
            const jsonStr = content.text.trim();
            // Extract JSON if wrapped in markdown code blocks
            const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            const cleanJson = jsonMatch ? jsonMatch[1] : jsonStr;
            const parsedData = JSON.parse(cleanJson);
            // Validate against schema
            const validationResult = schema.safeParse(parsedData);
            if (!validationResult.success) {
                console.warn('Schema validation warnings:', validationResult.error);
                // Return parsed data even if validation has warnings
                // The AI service will handle strict validation
                return parsedData;
            }
            return validationResult.data;
        }
        catch (error) {
            throw new types_1.AIExtractionError('Failed to parse extraction response', error instanceof Error ? error : new Error(String(error)));
        }
    }
    /**
     * Get Zod schema for item type
     */
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
     * Generate human-readable schema description
     */
    generateSchemaDescription(schema) {
        const shape = schema.shape;
        const fields = Object.entries(shape).map(([key, value]) => {
            const isOptional = value.isOptional();
            const type = this.getZodTypeString(value);
            return `  "${key}": ${type}${isOptional ? ' (optional)' : ''}`;
        });
        return `{
${fields.join(',\n')}
}`;
    }
    /**
     * Get string representation of Zod type
     */
    getZodTypeString(zodType) {
        if (zodType._def.typeName === 'ZodOptional') {
            return this.getZodTypeString(zodType._def.innerType);
        }
        if (zodType._def.typeName === 'ZodString')
            return 'string';
        if (zodType._def.typeName === 'ZodArray')
            return 'array';
        if (zodType._def.typeName === 'ZodObject')
            return 'object';
        return 'any';
    }
    /**
     * Validate configuration
     */
    validateConfig(config) {
        if (!config.apiKey) {
            throw new types_1.ConfigurationError('Anthropic API key is required');
        }
        if (!config.apiKey.startsWith('sk-ant-')) {
            throw new types_1.ConfigurationError('Anthropic API key must start with "sk-ant-"');
        }
        if (config.temperature !== undefined && (config.temperature < 0 || config.temperature > 1)) {
            throw new types_1.ConfigurationError('Temperature must be between 0 and 1');
        }
        if (config.maxTokens !== undefined && config.maxTokens <= 0) {
            throw new types_1.ConfigurationError('Max tokens must be greater than 0');
        }
        if (config.maxRetries !== undefined && config.maxRetries < 0) {
            throw new types_1.ConfigurationError('Max retries must be non-negative');
        }
        if (config.timeout !== undefined && config.timeout <= 0) {
            throw new types_1.ConfigurationError('Timeout must be greater than 0');
        }
    }
    /**
     * Get classification model name
     */
    getClassificationModel() {
        return this.config.classificationModel;
    }
    /**
     * Get extraction model name
     */
    getExtractionModel() {
        return this.config.extractionModel;
    }
}
exports.AnthropicClient = AnthropicClient;
