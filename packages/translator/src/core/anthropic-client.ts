/**
 * Browser-compatible Anthropic client for AI-powered translation
 */

import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import {
  AIClassificationError,
  AIExtractionError,
  AnthropicClientOptions,
  AnthropicConfig,
  ConfigurationError,
  ExtractedContent,
} from '../types';

/**
 * Direct Anthropic client implementation for browser environments
 */
export class AnthropicClient {
  private client: Anthropic;
  private config: AnthropicClientOptions;

  constructor(config: AnthropicConfig) {
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
    const clientConfig: any = {
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

    this.client = new Anthropic(clientConfig);
  }

  /**
   * Classify content to determine the appropriate Zotero item type
   */
  async classify(content: ExtractedContent): Promise<string> {
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
    } catch (error) {
      throw new AIClassificationError(
        'Failed to classify content',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Extract structured data from content based on item type
   */
  async extract(content: ExtractedContent, itemType: string): Promise<Record<string, unknown>> {
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
    } catch (error) {
      throw new AIExtractionError(
        'Failed to extract structured data',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Build classification prompt
   */
  private buildClassificationPrompt(content: ExtractedContent): string {
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
  private buildExtractionPrompt(content: ExtractedContent, itemType: string): string {
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
  private parseClassificationResponse(response: Anthropic.Message): string {
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new AIClassificationError('Unexpected response type from classification');
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
      throw new AIClassificationError(`Invalid item type returned: ${itemType}`);
    }

    return itemType;
  }

  /**
   * Parse extraction response and validate against schema
   */
  private parseExtractionResponse(
    response: Anthropic.Message,
    schema: z.ZodObject<any>
  ): Record<string, unknown> {
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new AIExtractionError('Unexpected response type from extraction');
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
    } catch (error) {
      throw new AIExtractionError(
        'Failed to parse extraction response',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Get Zod schema for item type
   */
  private getSchemaForItemType(itemType: string): z.ZodObject<any> {
    // Base schema with common fields
    const baseSchema = {
      title: z.string().optional(),
      creators: z
        .array(
          z.object({
            firstName: z.string().optional(),
            lastName: z.string(),
            creatorType: z.string().default('author'),
          })
        )
        .optional(),
      date: z.string().optional(),
      url: z.string().optional(),
      accessDate: z.string().optional(),
      abstractNote: z.string().optional(),
      tags: z.array(z.string()).optional(),
      notes: z.array(z.string()).optional(),
    };

    // Extend base schema based on item type
    switch (itemType) {
      case 'journalarticle':
        return z.object({
          ...baseSchema,
          publicationTitle: z.string().optional(),
          volume: z.string().optional(),
          issue: z.string().optional(),
          pages: z.string().optional(),
          DOI: z.string().optional(),
          ISSN: z.string().optional(),
        });

      case 'book':
        return z.object({
          ...baseSchema,
          publisher: z.string().optional(),
          place: z.string().optional(),
          ISBN: z.string().optional(),
          edition: z.string().optional(),
          numPages: z.string().optional(),
        });

      case 'booksection':
        return z.object({
          ...baseSchema,
          bookTitle: z.string().optional(),
          publisher: z.string().optional(),
          place: z.string().optional(),
          pages: z.string().optional(),
          ISBN: z.string().optional(),
        });

      case 'conferencepaper':
        return z.object({
          ...baseSchema,
          proceedingsTitle: z.string().optional(),
          conferenceName: z.string().optional(),
          place: z.string().optional(),
          pages: z.string().optional(),
          DOI: z.string().optional(),
        });

      case 'thesis':
        return z.object({
          ...baseSchema,
          university: z.string().optional(),
          place: z.string().optional(),
          thesisType: z.string().optional(),
          numPages: z.string().optional(),
        });

      case 'newspaperarticle':
        return z.object({
          ...baseSchema,
          publicationTitle: z.string().optional(),
          section: z.string().optional(),
          place: z.string().optional(),
          edition: z.string().optional(),
        });

      case 'magazinearticle':
        return z.object({
          ...baseSchema,
          publicationTitle: z.string().optional(),
          volume: z.string().optional(),
          issue: z.string().optional(),
          pages: z.string().optional(),
          ISSN: z.string().optional(),
        });

      case 'blogpost':
        return z.object({
          ...baseSchema,
          blogTitle: z.string().optional(),
          websiteType: z.string().default('Blog'),
        });

      case 'podcast':
        return z.object({
          ...baseSchema,
          seriesTitle: z.string().optional(),
          episodeNumber: z.string().optional(),
          audioRecordingFormat: z.string().optional(),
          runningTime: z.string().optional(),
        });

      case 'videorecording':
        return z.object({
          ...baseSchema,
          studio: z.string().optional(),
          runningTime: z.string().optional(),
          videoRecordingFormat: z.string().optional(),
        });

      case 'document':
        return z.object({
          ...baseSchema,
          publisher: z.string().optional(),
          place: z.string().optional(),
          reportNumber: z.string().optional(),
          institution: z.string().optional(),
        });

      case 'webpage':
      default:
        return z.object({
          ...baseSchema,
          websiteTitle: z.string().optional(),
          websiteType: z.string().optional(),
        });
    }
  }

  /**
   * Generate human-readable schema description
   */
  private generateSchemaDescription(schema: z.ZodObject<any>): string {
    const shape = schema.shape;
    const fields = Object.entries(shape).map(([key, value]: [string, any]) => {
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
  private getZodTypeString(zodType: any): string {
    if (zodType._def.typeName === 'ZodOptional') {
      return this.getZodTypeString(zodType._def.innerType);
    }
    if (zodType._def.typeName === 'ZodString') return 'string';
    if (zodType._def.typeName === 'ZodArray') return 'array';
    if (zodType._def.typeName === 'ZodObject') return 'object';
    return 'any';
  }

  /**
   * Validate configuration
   */
  private validateConfig(config: AnthropicConfig): void {
    if (!config.apiKey) {
      throw new ConfigurationError('Anthropic API key is required');
    }

    if (!config.apiKey.startsWith('sk-ant-')) {
      throw new ConfigurationError('Anthropic API key must start with "sk-ant-"');
    }

    if (config.temperature !== undefined && (config.temperature < 0 || config.temperature > 1)) {
      throw new ConfigurationError('Temperature must be between 0 and 1');
    }

    if (config.maxTokens !== undefined && config.maxTokens <= 0) {
      throw new ConfigurationError('Max tokens must be greater than 0');
    }

    if (config.maxRetries !== undefined && config.maxRetries < 0) {
      throw new ConfigurationError('Max retries must be non-negative');
    }

    if (config.timeout !== undefined && config.timeout <= 0) {
      throw new ConfigurationError('Timeout must be greater than 0');
    }
  }

  /**
   * Get classification model name
   */
  getClassificationModel(): string {
    return this.config.classificationModel;
  }

  /**
   * Get extraction model name
   */
  getExtractionModel(): string {
    return this.config.extractionModel;
  }
}