/**
 * Tests for the AI Service - Anthropic-only version
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AIService } from '../core/ai-service';
import {
  AIClassificationError,
  AIExtractionError,
  AIValidationError,
  AnthropicConfig,
  ExtractedContent,
} from '../types';
import { AnthropicClient } from '../core/anthropic-client';

// Mock the Anthropic SDK
vi.mock('@anthropic-ai/sdk', () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: {
      create: vi.fn().mockImplementation(async ({ messages }) => {
        const userMessage = messages[0]?.content;
        
        // Check if this is a classification request
        if (typeof userMessage === 'string' && userMessage.includes('Item Type:')) {
          return {
            content: [{ type: 'text', text: 'webpage' }],
          };
        }
        
        // Otherwise, this is an extraction request
        return {
          content: [{ 
            type: 'text', 
            text: JSON.stringify({
              title: 'Test Article',
              creators: [{ firstName: 'Test', lastName: 'Author', creatorType: 'author' }],
              abstractNote: 'Test abstract',
              date: '2024-01-01',
              url: 'https://example.com/article',
              websiteTitle: 'Test Website',
            })
          }],
        };
      }),
    },
  })),
}));

describe('AIService', () => {
  let aiService: AIService;
  let mockConfig: AnthropicConfig;
  let mockContent: ExtractedContent;

  beforeEach(() => {
    mockConfig = {
      apiKey: 'sk-ant-test-api-key',
      classificationModel: 'claude-3-haiku-20240307',
      extractionModel: 'claude-3-5-sonnet-20241022',
      temperature: 0.1,
      maxTokens: 2000,
      enableDangerousBrowserAccess: true,
    };

    mockContent = {
      text: 'This is a test article about machine learning research.',
      title: 'Machine Learning Research Article',
      url: 'https://example.com/article',
      contentType: 'text/html',
      metadata: {
        author: 'John Doe',
        publishedDate: '2023-01-01',
        excerpt: 'This article discusses machine learning techniques.',
        language: 'en',
      },
    };
    
    aiService = new AIService(mockConfig);
  });

  describe('constructor', () => {
    it('should create AI service with Anthropic config', () => {
      const anthropicConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
      };

      const service = new AIService(anthropicConfig);
      expect(service).toBeDefined();
    });

    it('should create AI service with full config', () => {
      expect(() => new AIService(mockConfig)).not.toThrow();
    });

    it('should handle Anthropic custom headers', () => {
      const configWithHeaders: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        customHeaders: {
          'Custom-Header': 'test-value',
        },
      };

      expect(() => new AIService(configWithHeaders)).not.toThrow();
    });

    it('should handle browser access configuration', () => {
      const configWithBrowserAccess: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        enableDangerousBrowserAccess: true,
      };

      expect(() => new AIService(configWithBrowserAccess)).not.toThrow();
    });

    it('should handle prompt caching configuration', () => {
      const configWithCaching: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        enablePromptCaching: true,
      };

      expect(() => new AIService(configWithCaching)).not.toThrow();
    });
  });

  describe('translateContent', () => {
    it('should have translateContent method', () => {
      expect(typeof aiService.translateContent).toBe('function');
    });

    it('should successfully translate content', async () => {
      const result = await aiService.translateContent(mockContent);
      
      expect(result).toHaveProperty('item');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('provider');
      expect(result).toHaveProperty('modelsUsed');
      
      expect(result.provider).toBe('anthropic');
      expect(result.modelsUsed).toHaveProperty('classification');
      expect(result.modelsUsed).toHaveProperty('extraction');
      expect(result.item).toHaveProperty('title');
      expect(result.item).toHaveProperty('itemType');
    });

    it('should return correct provider information', async () => {
      const result = await aiService.translateContent(mockContent);
      
      expect(result.provider).toBe('anthropic');
      expect(result.modelsUsed.classification).toBe('claude-3-haiku-20240307');
      expect(result.modelsUsed.extraction).toBe('claude-3-5-sonnet-20241022');
    });

    it('should handle different content types', async () => {
      const htmlContent: ExtractedContent = {
        text: '<p>HTML content</p>',
        contentType: 'text/html',
        title: 'HTML Document',
      };

      const pdfContent: ExtractedContent = {
        text: 'PDF extracted text',
        contentType: 'application/pdf',
        title: 'PDF Document',
      };

      const plainTextContent: ExtractedContent = {
        text: 'Plain text content',
        contentType: 'text/plain',
      };

      const htmlResult = await aiService.translateContent(htmlContent);
      const pdfResult = await aiService.translateContent(pdfContent);
      const plainTextResult = await aiService.translateContent(plainTextContent);

      expect(htmlResult.provider).toBe('anthropic');
      expect(pdfResult.provider).toBe('anthropic');
      expect(plainTextResult.provider).toBe('anthropic');
    });

    it('should handle content with missing metadata', async () => {
      const contentWithoutMetadata: ExtractedContent = {
        text: 'Content without metadata',
        contentType: 'text/plain',
      };

      const result = await aiService.translateContent(contentWithoutMetadata);
      expect(result.provider).toBe('anthropic');
      expect(result.item).toHaveProperty('title');
    });

    it('should handle very long content', async () => {
      const longContent: ExtractedContent = {
        text: 'A'.repeat(100000),
        contentType: 'text/plain',
        title: 'Very Long Document',
      };

      const result = await aiService.translateContent(longContent);
      expect(result.provider).toBe('anthropic');
    });

    it('should calculate confidence scores', async () => {
      const result = await aiService.translateContent(mockContent);
      
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });
  });

  describe('error handling', () => {
    it('should handle classification errors gracefully', () => {
      expect(AIClassificationError).toBeDefined();
      expect(AIExtractionError).toBeDefined();
      expect(AIValidationError).toBeDefined();
    });

    it('should create appropriate error types', () => {
      const classificationError = new AIClassificationError('Classification failed');
      expect(classificationError.name).toBe('AIClassificationError');
      expect(classificationError.code).toBe('AI_CLASSIFICATION_ERROR');

      const extractionError = new AIExtractionError('Extraction failed');
      expect(extractionError.name).toBe('AIExtractionError');
      expect(extractionError.code).toBe('AI_EXTRACTION_ERROR');

      const validationError = new AIValidationError('Validation failed');
      expect(validationError.name).toBe('AIValidationError');
      expect(validationError.code).toBe('AI_VALIDATION_ERROR');
    });

    it('should handle Anthropic client errors', async () => {
      // Mock the Anthropic client to throw an error
      const mockError = new Error('Anthropic API error');
      vi.spyOn(AnthropicClient.prototype, 'classify').mockRejectedValue(mockError);

      await expect(aiService.translateContent(mockContent)).rejects.toThrow(
        AIExtractionError
      );
    });
  });

  describe('configuration validation', () => {
    it('should accept valid Anthropic configuration', () => {
      const validConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        classificationModel: 'claude-3-5-sonnet-20241022',
        extractionModel: 'claude-3-5-sonnet-20241022',
        temperature: 0.2,
        maxTokens: 4000,
      };

      expect(() => new AIService(validConfig)).not.toThrow();
    });

    it('should handle missing optional fields', () => {
      const minimalConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
      };

      expect(() => new AIService(minimalConfig)).not.toThrow();
    });

    it('should validate API key format', () => {
      const invalidConfig: AnthropicConfig = {
        apiKey: 'invalid-key',
      };

      expect(() => new AIService(invalidConfig)).toThrow();
    });
  });

  describe('provider information', () => {
    it('should return correct provider information', () => {
      const providerInfo = aiService.getProviderInfo();
      
      expect(providerInfo.provider).toBe('anthropic');
      expect(providerInfo.classificationModel).toBe('claude-3-haiku-20240307');
      expect(providerInfo.extractionModel).toBe('claude-3-5-sonnet-20241022');
    });

    it('should handle default models', () => {
      const minimalConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
      };

      const service = new AIService(minimalConfig);
      const providerInfo = service.getProviderInfo();
      
      expect(providerInfo.provider).toBe('anthropic');
      expect(providerInfo.classificationModel).toBeDefined();
      expect(providerInfo.extractionModel).toBeDefined();
    });
  });

  describe('content processing', () => {
    it('should handle different item types', async () => {
      const itemTypes = ['webpage', 'journalarticle', 'book', 'booksection'];
      
      for (const itemType of itemTypes) {
        // Mock the classification to return the specific item type
        vi.spyOn(AnthropicClient.prototype, 'classify').mockResolvedValue(itemType);
        
        const result = await aiService.translateContent(mockContent);
        expect(result.item.itemType).toBe(itemType);
      }
    });

    it('should validate extracted data', async () => {
      const result = await aiService.translateContent(mockContent);
      
      // Should have validated the data and added itemType
      expect(result.item).toHaveProperty('itemType');
      expect(result.item).toHaveProperty('title');
    });
  });
});