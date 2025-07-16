/**
 * AI Service for LangChain-powered content translation with multi-provider support
 */

import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { ZoteroItemData, ZoteroItemType } from '@zotero-suite/schema-types';
import { z } from 'zod';
import {
  AIClassificationError,
  AIExtractionError,
  AIProviderConfig,
  AIValidationError,
  ExtractedContent,
} from '../types';
import { ConfigValidator } from './config-validator';
import { ProviderFactory } from './provider-factory';

/**
 * AI Service class that handles the two-step AI translation process with multi-provider support
 */
export class AIService {
  private readonly config: AIProviderConfig;
  private readonly classificationModel: BaseChatModel;
  private readonly extractionModel: BaseChatModel;
  private readonly provider: string;

  constructor(config: AIProviderConfig) {
    // Validate the configuration
    ConfigValidator.validateProviderConfig(config);
    
    this.config = config;
    this.provider = config.provider;

    // Create provider and models
    const providerInstance = ProviderFactory.createProvider(config);
    
    this.classificationModel = providerInstance.createClassificationModel(config);
    this.extractionModel = providerInstance.createExtractionModel(config);
  }

  /**
   * Main AI translation method that executes the two-step process
   */
  async translateContent(content: ExtractedContent): Promise<{ 
    item: ZoteroItemData; 
    confidence: number;
    provider: string;
    modelsUsed: {
      classification: string;
      extraction: string;
    };
  }> {
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
    } catch (error) {
      if (error instanceof AIClassificationError || 
          error instanceof AIExtractionError || 
          error instanceof AIValidationError) {
        throw error;
      }
      
      throw new AIExtractionError(
        'AI translation process failed',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Step 1: Classification - determine the most appropriate Zotero item type
   */
  private async classifyContent(content: ExtractedContent): Promise<string> {
    try {
      const classificationPrompt = PromptTemplate.fromTemplate(`
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
      
      const result = await this.classificationModel.invoke(
        await classificationPrompt.format({
          title: content.title || 'Unknown',
          url: content.url || 'Unknown',
          contentType: content.contentType || 'Unknown',
          contentPreview,
        })
      );

      const itemType = result.content.toString().trim().toLowerCase();
      
      // Validate that the returned item type is valid
      const validItemTypes = [
        'webpage', 'journalarticle', 'book', 'booksection', 'document',
        'conferencepaper', 'thesis', 'newspaperarticle', 'magazinearticle',
        'blogpost', 'forumpost', 'podcast', 'videorecording'
      ];
      
      if (!validItemTypes.includes(itemType)) {
        throw new AIClassificationError(`Invalid item type returned: ${itemType}`);
      }
      
      return itemType;
    } catch (error) {
      if (error instanceof AIClassificationError) {
        throw error;
      }
      
      throw new AIClassificationError(
        'Failed to classify content',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Step 2: Extraction - extract structured data using dynamic Zod schema
   */
  private async extractStructuredData(content: ExtractedContent, itemType: string): Promise<Record<string, unknown>> {
    try {
      // Get the appropriate schema for the item type
      const schema = this.getSchemaForItemType(itemType);
      
      // Create output parser
      const parser = StructuredOutputParser.fromZodSchema(schema);
      
      // Create extraction prompt
      const extractionPrompt = PromptTemplate.fromTemplate(`
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
    } catch (error) {
      throw new AIExtractionError(
        'Failed to extract structured data',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Step 3: Validation - validate extracted data using Zod schema
   */
  private async validateExtractedData(extractedData: unknown, itemType: string): Promise<ZoteroItemData> {
    try {
      // Get the appropriate schema for validation
      const schema = this.getSchemaForItemType(itemType);
      
      // Validate the extracted data
      const validationResult = schema.safeParse(extractedData);
      
      if (!validationResult.success) {
        throw new AIValidationError(
          `Validation failed: ${validationResult.error.message}`
        );
      }
      
      // Ensure the item type is set correctly
      const validatedData = {
        ...validationResult.data,
        itemType: itemType as ZoteroItemType,
      };
      
      return validatedData as ZoteroItemData;
    } catch (error) {
      if (error instanceof AIValidationError) {
        throw error;
      }
      
      throw new AIValidationError(
        'Failed to validate extracted data',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Get the appropriate Zod schema for the given item type
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getSchemaForItemType(itemType: string): z.ZodObject<any> {
    // Base schema with common fields
    const baseSchema = {
      title: z.string().optional(),
      creators: z.array(z.object({
        firstName: z.string().optional(),
        lastName: z.string(),
        creatorType: z.string().default('author'),
      })).optional(),
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
   * Calculate confidence score based on content and extraction quality
   */
  private calculateConfidence(content: ExtractedContent, item: ZoteroItemData): number {
    let confidence = 0.5; // Base confidence
    
    // Increase confidence based on available metadata
    if (item.title) confidence += 0.2;
    if (item.creators && item.creators.length > 0) confidence += 0.15;
    if (item.date) confidence += 0.1;
    if (item.url) confidence += 0.05;
    
    // Increase confidence based on content quality
    if (content.title) confidence += 0.1;
    if (content.metadata?.author) confidence += 0.1;
    if (content.metadata?.publishedDate) confidence += 0.1;
    
    // Cap confidence at 1.0
    return Math.min(confidence, 1.0);
  }

  /**
   * Get the model name for a specific purpose
   */
  private getModelName(purpose: 'classification' | 'extraction'): string {
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
  getProviderInfo(): {
    provider: string;
    classificationModel: string;
    extractionModel: string;
  } {
    return {
      provider: this.provider,
      classificationModel: this.getModelName('classification'),
      extractionModel: this.getModelName('extraction'),
    };
  }
}