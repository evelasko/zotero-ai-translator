/**
 * Main Translator class for AI-powered Zotero metadata extraction
 */

import { ZoteroItemData, ZoteroItemType } from '@zotero-suite/schema-types';
import {
    ConfigurationError,
    ExtractedContent,
    TranslationInput,
    TranslationResult,
    TranslatorConfig,
    TranslatorError
} from '../types';
import { ContentExtractor } from '../utils/content-extractor';
import { AIService } from './ai-service';

/**
 * Main Translator class that orchestrates content ingestion and AI-powered translation
 */
export class Translator {
  private readonly config: Required<Omit<TranslatorConfig, 'ai'>> & { ai?: TranslatorConfig['ai'] };
  private readonly contentExtractor: ContentExtractor;
  private readonly aiService?: AIService;

  constructor(config: TranslatorConfig = {}) {
    this.config = {
      timeout: config.timeout ?? 30000,
      maxRetries: config.maxRetries ?? 3,
      userAgent: config.userAgent ?? 'Zotero-AI-Translator/1.0.0',
      maxContentLength: config.maxContentLength ?? 50000,
      debug: config.debug ?? false,
      ai: config.ai,
    };

    this.validateConfig();
    this.contentExtractor = new ContentExtractor(this.config);
    
    // Initialize AI service if configuration is provided
    if (this.config.ai) {
      this.aiService = new AIService(this.config.ai);
    }

    if (this.config.debug) {
      console.log('[Translator] Initialized with config:', { 
        ...this.config, 
        ai: this.config.ai ? { ...this.config.ai, apiKey: '[REDACTED]' } : undefined 
      });
    }
  }

  /**
   * Main translation method that processes input and returns Zotero item data
   * 
   * @param input - Either URL or source text input
   * @returns Promise resolving to translation result with Zotero item data
   */
  async translate(input: TranslationInput): Promise<TranslationResult> {
    const startTime = Date.now();
    
    if (this.config.debug) {
      console.log('[Translator] Starting translation process');
    }

    try {
      // Validate input
      this.validateInput(input);

      // Step 1: Content Ingestion Pipeline
      const extractedContent = await this.ingestContent(input);
      const extractionTime = Date.now() - startTime;

      if (this.config.debug) {
        console.log(`[Translator] Content extracted in ${extractionTime}ms`);
        console.log(`[Translator] Content length: ${extractedContent.text.length} chars`);
      }

      // Step 2: AI Translation Pipeline
      const translationStartTime = Date.now();
      const translationResult = await this.translateToZoteroItem(extractedContent);
      const translationTime = Date.now() - translationStartTime;

      const totalTime = Date.now() - startTime;

      if (this.config.debug) {
        console.log(`[Translator] Translation completed in ${translationTime}ms`);
        console.log(`[Translator] Total processing time: ${totalTime}ms`);
      }

      return {
        item: translationResult.item,
        confidence: translationResult.confidence,
        extractedContent,
        processing: {
          extractionTime,
          translationTime,
          totalTime,
          ingestionMethod: 'url' in input ? 'url' : 'sourceText',
          aiProvider: translationResult.aiProvider,
          modelsUsed: translationResult.modelsUsed,
        },
      };
    } catch (error) {
      if (this.config.debug) {
        console.error('[Translator] Translation failed:', error);
      }
      
      if (error instanceof TranslatorError) {
        throw error;
      }
      
      throw new TranslatorError(
        'Translation process failed',
        'TRANSLATION_ERROR',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Content Ingestion Pipeline - handles both URL and source text inputs
   */
  private async ingestContent(input: TranslationInput): Promise<ExtractedContent> {
    if ('url' in input && input.url) {
      // URL-based ingestion path
      if (this.config.debug) {
        console.log(`[Translator] Ingesting content from URL: ${input.url}`);
      }
      return this.contentExtractor.extractFromUrl(input.url);
    } else if ('sourceText' in input && input.sourceText) {
      // Source text ingestion path
      if (this.config.debug) {
        console.log(`[Translator] Ingesting content from source text (${input.sourceText.length} chars)`);
      }
      return this.contentExtractor.extractFromSourceText(input.sourceText);
    } else {
      throw new TranslatorError('Invalid input: missing url or sourceText', 'INVALID_INPUT');
    }
  }

  /**
   * AI Translation Pipeline - converts extracted content to Zotero item data
   * 
   * This method implements the two-step AI translation process:
   * 1. Classification: Determine the appropriate Zotero item type
   * 2. Extraction: Extract structured metadata using LangChain with dynamic schemas
   * 3. Validation: Validate the result using Zod safeParse
   */
  private async translateToZoteroItem(content: ExtractedContent): Promise<{
    item: ZoteroItemData;
    confidence: number;
    aiProvider?: string;
    modelsUsed?: {
      classification: string;
      extraction: string;
    };
  }> {
    if (this.config.debug) {
      console.log('[Translator] Starting AI translation pipeline');
    }

    // Use AI service if available, otherwise fall back to basic extraction
    if (this.aiService) {
      try {
        const result = await this.aiService.translateContent(content);
        
        if (this.config.debug) {
          console.log(`[Translator] AI translation completed with confidence: ${result.confidence}`);
          console.log(`[Translator] Used provider: ${result.provider}`);
          console.log(`[Translator] Models used:`, result.modelsUsed);
        }
        
        return {
          item: result.item,
          confidence: result.confidence,
          aiProvider: result.provider,
          modelsUsed: result.modelsUsed,
        };
      } catch (error) {
        if (this.config.debug) {
          console.warn('[Translator] AI translation failed, falling back to basic extraction:', error);
        }
        
        // Fall back to basic extraction if AI fails
        const fallbackItem = this.basicFallbackExtraction(content);
        return {
          item: fallbackItem,
          confidence: 0.3, // Lower confidence for fallback
        };
      }
    } else {
      if (this.config.debug) {
        console.log('[Translator] No AI configuration provided, using basic extraction');
      }
      
      const fallbackItem = this.basicFallbackExtraction(content);
      return {
        item: fallbackItem,
        confidence: 0.3, // Lower confidence for fallback
      };
    }
  }

  /**
   * Basic fallback extraction when AI is not available or fails
   */
  private basicFallbackExtraction(content: ExtractedContent): ZoteroItemData {
    const item: ZoteroItemData = {
      itemType: this.inferItemType(content),
      title: content.title || 'Untitled',
      url: content.url,
      accessDate: new Date().toISOString().split('T')[0],
      abstractNote: content.metadata?.excerpt || this.extractExcerpt(content.text),
      language: content.metadata?.language || 'en',
      creators: content.metadata?.author ? [{
        creatorType: 'author',
        firstName: '',
        lastName: content.metadata.author
      }] : [],
      tags: [],
      collections: [],
      relations: {},
      dateAdded: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    };

    // Add date if available
    if (content.metadata?.publishedDate) {
      item.date = content.metadata.publishedDate;
    }

    return item;
  }

  /**
   * Infer item type based on content characteristics
   */
  private inferItemType(content: ExtractedContent): ZoteroItemType {
    if (content.contentType === 'application/pdf') {
      return 'document';
    }
    
    if (content.url) {
      return 'webpage';
    }
    
    return 'document';
  }

  /**
   * Extract excerpt from content text
   */
  private extractExcerpt(text: string, maxLength = 300): string {
    if (text.length <= maxLength) {
      return text;
    }
    
    const excerpt = text.substring(0, maxLength);
    const lastSpaceIndex = excerpt.lastIndexOf(' ');
    
    if (lastSpaceIndex > maxLength * 0.8) {
      return `${excerpt.substring(0, lastSpaceIndex)  }...`;
    }
    
    return `${excerpt  }...`;
  }

  /**
   * Validate translator configuration
   */
  private validateConfig(): void {
    if (this.config.timeout <= 0) {
      throw new ConfigurationError('Timeout must be greater than 0');
    }
    
    if (this.config.maxRetries < 0) {
      throw new ConfigurationError('Max retries must be non-negative');
    }
    
    if (this.config.maxContentLength <= 0) {
      throw new ConfigurationError('Max content length must be greater than 0');
    }
    
    if (!this.config.userAgent || this.config.userAgent.trim().length === 0) {
      throw new ConfigurationError('User agent must be specified');
    }
    
    // Validate AI configuration if provided
    if (this.config.ai) {
      try {
        // Import ConfigValidator dynamically to avoid circular dependencies
        const { ConfigValidator } = require('./config-validator');
        ConfigValidator.validateProviderConfig(this.config.ai);
      } catch (error) {
        throw new ConfigurationError(
          `AI configuration validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }
  }

  /**
   * Validate translation input
   */
  private validateInput(input: TranslationInput): void {
    if (!input) {
      throw new ConfigurationError('Translation input is required');
    }

    if ('url' in input) {
      if (!input.url || typeof input.url !== 'string' || input.url.trim().length === 0) {
        throw new ConfigurationError('URL must be a non-empty string');
      }
      
      // Basic URL validation
      try {
        new URL(input.url);
      } catch {
        throw new ConfigurationError('Invalid URL format');
      }
    } else if ('sourceText' in input) {
      if (!input.sourceText || typeof input.sourceText !== 'string' || input.sourceText.trim().length === 0) {
        throw new ConfigurationError('Source text must be a non-empty string');
      }
    } else {
      throw new ConfigurationError('Input must contain either "url" or "sourceText" property');
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): Readonly<Required<TranslatorConfig>> {
    return { ...this.config } as Readonly<Required<TranslatorConfig>>;
  }
}