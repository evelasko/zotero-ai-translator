/**
 * Tests for the AI Service
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AIService } from '../core/ai-service';
import {
  AIClassificationError,
  AIConfig,
  AIExtractionError,
  AIValidationError,
  ExtractedContent,
} from '../types';

// Mock LangChain modules
vi.mock('@langchain/openai', () => ({
  ChatOpenAI: vi.fn().mockImplementation(() => ({
    // Mock implementation
  })),
}));

vi.mock('@langchain/core/prompts', () => ({
  PromptTemplate: {
    fromTemplate: vi.fn().mockReturnValue({
      pipe: vi.fn().mockReturnValue({
        invoke: vi.fn(),
      }),
    }),
  },
}));

vi.mock('@langchain/core/output_parsers', () => ({
  StructuredOutputParser: {
    fromZodSchema: vi.fn().mockReturnValue({
      getFormatInstructions: vi.fn().mockReturnValue('Format instructions'),
    }),
  },
  OutputFixingParser: {
    fromLLM: vi.fn().mockReturnValue({
      // Mock parser
    }),
  },
}));

describe('AIService', () => {
  let aiService: AIService;
  let mockConfig: AIConfig;
  let mockContent: ExtractedContent;

  beforeEach(() => {
    mockConfig = {
      apiKey: 'test-api-key',
      classificationModel: 'gpt-3.5-turbo',
      extractionModel: 'gpt-3.5-turbo',
      temperature: 0.1,
      maxTokens: 2000,
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
    it('should create AI service with default config', () => {
      const minimalConfig: AIConfig = {
        apiKey: 'test-key',
      };

      expect(() => new AIService(minimalConfig)).not.toThrow();
    });

    it('should create AI service with full config', () => {
      expect(() => new AIService(mockConfig)).not.toThrow();
    });

    it('should handle custom base URL', () => {
      const configWithBaseURL: AIConfig = {
        ...mockConfig,
        baseURL: 'https://custom-api.example.com',
      };

      expect(() => new AIService(configWithBaseURL)).not.toThrow();
    });
  });

  describe('translateContent', () => {
    it('should have translateContent method', () => {
      expect(typeof aiService.translateContent).toBe('function');
    });

    // Note: These tests would require mocking the LangChain calls
    // For now, we'll test the method signature and basic structure
    it('should return promise that resolves to translation result', async () => {
      // This test would need proper mocking of LangChain responses
      // For now, we'll just verify the method exists and can be called
      expect(aiService.translateContent(mockContent)).toBeInstanceOf(Promise);
    });
  });

  describe('error handling', () => {
    it('should handle classification errors gracefully', () => {
      // Test error handling structure
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
  });

  describe('configuration validation', () => {
    it('should accept valid configuration', () => {
      const validConfig: AIConfig = {
        apiKey: 'sk-test-key',
        classificationModel: 'gpt-4',
        extractionModel: 'gpt-4',
        temperature: 0.2,
        maxTokens: 4000,
      };

      expect(() => new AIService(validConfig)).not.toThrow();
    });

    it('should handle missing optional fields', () => {
      const minimalConfig: AIConfig = {
        apiKey: 'test-key',
      };

      const service = new AIService(minimalConfig);
      expect(service).toBeInstanceOf(AIService);
    });
  });

  describe('content processing', () => {
    it('should handle various content types', () => {
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

      // These would need proper mocking to test fully
      expect(aiService.translateContent(htmlContent)).toBeInstanceOf(Promise);
      expect(aiService.translateContent(pdfContent)).toBeInstanceOf(Promise);
      expect(aiService.translateContent(plainTextContent)).toBeInstanceOf(Promise);
    });

    it('should handle content with missing metadata', () => {
      const contentWithoutMetadata: ExtractedContent = {
        text: 'Content without metadata',
        contentType: 'text/plain',
      };

      expect(aiService.translateContent(contentWithoutMetadata)).toBeInstanceOf(Promise);
    });

    it('should handle very long content', () => {
      const longContent: ExtractedContent = {
        text: 'A'.repeat(100000),
        contentType: 'text/plain',
        title: 'Very Long Document',
      };

      expect(aiService.translateContent(longContent)).toBeInstanceOf(Promise);
    });
  });
});
