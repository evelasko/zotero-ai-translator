/**
 * AI Service for Anthropic-powered content translation
 */

import { z } from 'zod';
import { ZoteroItemData, ZoteroItemType } from 'zotero-schema-types';
import {
  AIClassificationError,
  AIExtractionError,
  AIValidationError,
  AnthropicConfig,
  ExtractedContent,
} from '../types';
import { AnthropicClient } from './anthropic-client';
import { ConfigValidator } from './config-validator';

/**
 * AI Service class that handles the two-step AI translation process using Anthropic
 */
export class AIService {
  private readonly anthropicClient: AnthropicClient;

  constructor(config: AnthropicConfig) {
    // Validate the configuration
    ConfigValidator.validateProviderConfig(config);

    this.anthropicClient = new AnthropicClient(config);
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
    } catch (error) {
      if (
        error instanceof AIClassificationError ||
        error instanceof AIExtractionError ||
        error instanceof AIValidationError
      ) {
        throw error;
      }

      throw new AIExtractionError(
        'AI translation process failed',
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  }

  /**
   * Validate extracted data using Zod schema
   */
  private async validateExtractedData(
    extractedData: unknown,
    itemType: string,
  ): Promise<ZoteroItemData> {
    try {
      // Get the appropriate schema for validation
      const schema = this.getSchemaForItemType(itemType);

      // Validate the extracted data
      const validationResult = schema.safeParse(extractedData);

      if (!validationResult.success) {
        throw new AIValidationError(`Validation failed: ${validationResult.error.message}`);
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
        error instanceof Error ? error : new Error(String(error)),
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
      creators: z
        .array(
          z.object({
            firstName: z.string().optional(),
            lastName: z.string(),
            creatorType: z.string().default('author'),
          }),
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
   * Get provider information for debugging
   */
  getProviderInfo(): {
    provider: string;
    classificationModel: string;
    extractionModel: string;
  } {
    return {
      provider: 'anthropic',
      classificationModel: this.anthropicClient.getClassificationModel(),
      extractionModel: this.anthropicClient.getExtractionModel(),
    };
  }
}
