/**
 * AI Service for LangChain-powered content translation
 */

import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { ZoteroItemData } from '@zotero-suite/schema-types';
import { z } from 'zod';
import {
    AIClassificationError,
    AIConfig,
    AIExtractionError,
    AIValidationError,
    ExtractedContent,
    RequiredAIConfig
} from '../types';

/**
 * AI Service class that handles the two-step AI translation process
 */
export class AIService {
  private readonly config: RequiredAIConfig;
  private readonly classificationModel: ChatOpenAI;
  private readonly extractionModel: ChatOpenAI;

  constructor(config: AIConfig) {
    this.config = {
      apiKey: config.apiKey,
      classificationModel: config.classificationModel ?? 'gpt-3.5-turbo',
      extractionModel: config.extractionModel ?? 'gpt-3.5-turbo',
      temperature: config.temperature ?? 0.1,
      maxTokens: config.maxTokens ?? 2000,
      ...(config.baseURL && { baseURL: config.baseURL }),
    };

    // Initialize classification model
    this.classificationModel = new ChatOpenAI({
      modelName: this.config.classificationModel,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
      openAIApiKey: this.config.apiKey,
      ...(this.config.baseURL && { configuration: { baseURL: this.config.baseURL } }),
    });

    // Initialize extraction model
    this.extractionModel = new ChatOpenAI({
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
  async translateContent(content: ExtractedContent): Promise<{ item: ZoteroItemData; confidence: number }> {
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
        throw new AIClassificationError(`Invalid item type returned: ${itemType}`);
      }
      
      return itemType;
    } catch (error) {
      throw new AIClassificationError(
        'Failed to classify content',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Step 2: Extraction - extract structured data using dynamic Zod schema
   */
  private async extractStructuredData(content: ExtractedContent, itemType: string): Promise<any> {
    try {
      // Get the appropriate Zod schema for the item type
      const schema = this.getSchemaForItemType(itemType);
      
      // Create structured output parser
      const parser = StructuredOutputParser.fromZodSchema(schema);
      
      // Create extraction prompt
      const extractionPrompt = PromptTemplate.fromTemplate(`
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

      const extractionChain = extractionPrompt.pipe(this.extractionModel).pipe(parser);
      
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
  private async validateExtractedData(extractedData: any, itemType: string): Promise<ZoteroItemData> {
    try {
      const schema = this.getSchemaForItemType(itemType);
      
      // Use safeParse for validation
      const result = schema.safeParse(extractedData);
      
      if (!result.success) {
        throw new AIValidationError(
          `Validation failed for item type ${itemType}: ${result.error.message}`
        );
      }

      // Add required fields that might be missing
      const validatedData = result.data as any;
      
      // Ensure required fields are present
      const finalItem: ZoteroItemData = {
        ...(validatedData as object),
        itemType: itemType as any, // Fix the type assertion
        dateAdded: validatedData.dateAdded || new Date().toISOString(),
        dateModified: validatedData.dateModified || new Date().toISOString(),
        creators: validatedData.creators || [],
        tags: validatedData.tags || [],
        collections: validatedData.collections || [],
        relations: validatedData.relations || {},
      };

      return finalItem;
    } catch (error) {
      throw new AIValidationError(
        'Failed to validate extracted data',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Get the appropriate Zod schema for the given item type
   */
  private getSchemaForItemType(itemType: string): z.ZodSchema {
    // For now, we'll use a generic schema that works for most item types
    // In a full implementation, this would dynamically select the appropriate schema
    // from @zotero-suite/schema-types based on the item type
    
    return z.object({
      title: z.string().optional(),
      creators: z.array(z.object({
        creatorType: z.string(),
        firstName: z.string().optional(),
        lastName: z.string(),
      })).optional(),
      abstractNote: z.string().optional(),
      url: z.string().optional(),
      accessDate: z.string().optional(),
      date: z.string().optional(),
      language: z.string().optional(),
      tags: z.array(z.object({
        tag: z.string(),
        type: z.number().optional(),
      })).optional(),
      extra: z.string().optional(),
      // Add item-type specific fields based on the itemType
      ...(itemType === 'journalarticle' && {
        publicationTitle: z.string().optional(),
        volume: z.string().optional(),
        issue: z.string().optional(),
        pages: z.string().optional(),
        DOI: z.string().optional(),
        ISSN: z.string().optional(),
      }),
      ...(itemType === 'book' && {
        publisher: z.string().optional(),
        place: z.string().optional(),
        ISBN: z.string().optional(),
        numPages: z.string().optional(),
        edition: z.string().optional(),
      }),
      ...(itemType === 'webpage' && {
        websiteTitle: z.string().optional(),
        websiteType: z.string().optional(),
      }),
    });
  }

  /**
   * Calculate confidence score based on content and extraction quality
   */
  private calculateConfidence(content: ExtractedContent, item: ZoteroItemData): number {
    let confidence = 0.5; // Base confidence
    
    // Increase confidence based on available data
    if (item.title) confidence += 0.2;
    if (item.creators && item.creators.length > 0) confidence += 0.1;
    if (item.date) confidence += 0.1;
    if (item.abstractNote) confidence += 0.1;
    if (content.url) confidence += 0.1;
    
    // Decrease confidence for very short content
    if (content.text.length < 100) confidence -= 0.2;
    
    // Ensure confidence is between 0 and 1
    return Math.max(0, Math.min(1, confidence));
  }
}