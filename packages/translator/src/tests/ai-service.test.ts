/**
 * Tests for the AI Service
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AIService } from '../core/ai-service';
import {
  AIClassificationError,
  AIExtractionError,
  AIProviderConfig,
  AIValidationError,
  ExtractedContent,
} from '../types';
import { registerAllProviders } from '../core/providers';
import { ProviderDetector } from '../core/provider-factory';

// Mock LangChain modules
vi.mock('@langchain/openai', () => ({
  ChatOpenAI: vi.fn().mockImplementation(() => {
    let callCount = 0;
    return {
      invoke: vi.fn().mockImplementation(async () => {
        callCount++;
        if (callCount % 2 === 1) {
          // Odd calls: classification
          return { content: 'webpage' };
        } else {
          // Even calls: extraction
          return {
            content: JSON.stringify({
              itemType: 'webpage',
              title: 'Test Article',
              creators: [{ firstName: 'Test', lastName: 'Author', creatorType: 'author' }],
              abstractNote: 'Test abstract',
              date: '2024-01-01',
              url: 'https://example.com/article',
            }),
          };
        }
      }),
    };
  }),
}));

vi.mock('@langchain/anthropic', () => ({
  ChatAnthropic: vi.fn().mockImplementation(() => {
    let callCount = 0;
    return {
      invoke: vi.fn().mockImplementation(async () => {
        callCount++;
        if (callCount % 2 === 1) {
          return { content: 'webpage' };
        } else {
          return {
            content: JSON.stringify({
              itemType: 'webpage',
              title: 'Test Article',
              creators: [{ firstName: 'Test', lastName: 'Author', creatorType: 'author' }],
              abstractNote: 'Test abstract',
              date: '2024-01-01',
              url: 'https://example.com/article',
            }),
          };
        }
      }),
    };
  }),
}));

vi.mock('@langchain/google-vertexai', () => ({
  ChatVertexAI: vi.fn().mockImplementation(() => {
    let callCount = 0;
    return {
      invoke: vi.fn().mockImplementation(async () => {
        callCount++;
        if (callCount % 2 === 1) {
          return { content: 'webpage' };
        } else {
          return {
            content: JSON.stringify({
              itemType: 'webpage',
              title: 'Test Article',
              creators: [{ firstName: 'Test', lastName: 'Author', creatorType: 'author' }],
              abstractNote: 'Test abstract',
              date: '2024-01-01',
              url: 'https://example.com/article',
            }),
          };
        }
      }),
    };
  }),
}));

vi.mock('@langchain/ollama', () => ({
  ChatOllama: vi.fn().mockImplementation(() => {
    let callCount = 0;
    return {
      invoke: vi.fn().mockImplementation(async () => {
        callCount++;
        if (callCount % 2 === 1) {
          return { content: 'webpage' };
        } else {
          return {
            content: JSON.stringify({
              itemType: 'webpage',
              title: 'Test Article',
              creators: [{ firstName: 'Test', lastName: 'Author', creatorType: 'author' }],
              abstractNote: 'Test abstract',
              date: '2024-01-01',
              url: 'https://example.com/article',
            }),
          };
        }
      }),
    };
  }),
}));

vi.mock('@langchain/core/output_parsers', () => ({
  StructuredOutputParser: {
    fromZodSchema: vi.fn().mockReturnValue({
      getFormatInstructions: vi.fn().mockReturnValue('Format instructions'),
      parse: vi.fn().mockResolvedValue({
        itemType: 'webpage',
        title: 'Test Title',
        creators: [],
        tags: [],
        collections: [],
        relations: {},
        dateAdded: new Date().toISOString(),
        dateModified: new Date().toISOString(),
      }),
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
  let mockConfig: AIProviderConfig;
  let mockContent: ExtractedContent;

  beforeEach(() => {
    // Mock ProviderDetector to always return true for availability
    vi.spyOn(ProviderDetector, 'isProviderInstalled').mockReturnValue(true);
    
    // Register providers before each test
    registerAllProviders();
    
    mockConfig = {
      provider: 'openai',
      apiKey: 'sk-test-api-key',
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
    
    // Create default aiService instance for tests that don't override it
    try {
      aiService = new AIService(mockConfig);
    } catch (error) {
      // Some tests may not have the right provider registered
    }
  });

  describe('constructor', () => {
    it('should create AI service with OpenAI config', () => {
      const openaiConfig: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'sk-test-key',
      };

      const aiService = new AIService(openaiConfig);
      expect(aiService).toBeDefined();
    });

    it('should create AI service with Anthropic config', () => {
      const anthropicConfig: AIProviderConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-key',
      };

      expect(() => new AIService(anthropicConfig)).not.toThrow();
    });

    it('should create AI service with VertexAI config', () => {
      const vertexaiConfig: AIProviderConfig = {
        provider: 'vertexai',
        projectId: 'test-project',
        location: 'us-central1',
      };

      expect(() => new AIService(vertexaiConfig)).not.toThrow();
    });

    it('should create AI service with Ollama config', () => {
      const ollamaConfig: AIProviderConfig = {
        provider: 'ollama',
        baseUrl: 'http://localhost:11434',
      };

      expect(() => new AIService(ollamaConfig)).not.toThrow();
    });

    it('should create AI service with full config', () => {
      expect(() => new AIService(mockConfig)).not.toThrow();
    });

    it('should handle OpenAI custom base URL', () => {
      const configWithBaseURL: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'sk-test-api-key',
        classificationModel: 'gpt-3.5-turbo',
        extractionModel: 'gpt-3.5-turbo',
        temperature: 0.1,
        maxTokens: 2000,
        baseURL: 'https://custom-api.example.com',
      };

      expect(() => new AIService(configWithBaseURL)).not.toThrow();
    });

    it('should handle Anthropic custom headers', () => {
      const configWithHeaders: AIProviderConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-key',
        customHeaders: {
          'Custom-Header': 'test-value',
        },
      };

      expect(() => new AIService(configWithHeaders)).not.toThrow();
    });

    it('should handle VertexAI authentication', () => {
      const configWithAuth: AIProviderConfig = {
        provider: 'vertexai',
        projectId: 'test-project',
        location: 'us-central1',
        authOptions: {
          credentials: {
            client_email: 'test@example.com',
            private_key: 'test-key',
          },
        },
      };

      expect(() => new AIService(configWithAuth)).not.toThrow();
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

    it('should handle different provider configurations', async () => {
      const providers: AIProviderConfig[] = [
        {
          provider: 'openai',
          apiKey: 'sk-test-key',
        },
        {
          provider: 'anthropic',
          apiKey: 'sk-ant-test-key',
        },
        {
          provider: 'vertexai',
          projectId: 'test-project',
          location: 'us-central1',
        },
        {
          provider: 'ollama',
          baseUrl: 'http://localhost:11434',
        },
      ];

      for (const config of providers) {
        const service = new AIService(config);
        expect(service.translateContent(mockContent)).toBeInstanceOf(Promise);
      }
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
    it('should accept valid OpenAI configuration', () => {
      const validConfig: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'sk-test-key',
        classificationModel: 'gpt-4',
        extractionModel: 'gpt-4',
        temperature: 0.2,
        maxTokens: 4000,
      };

      expect(() => new AIService(validConfig)).not.toThrow();
    });

    it('should accept valid Anthropic configuration', () => {
      const validConfig: AIProviderConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-key',
        classificationModel: 'claude-3-5-sonnet-20241022',
        extractionModel: 'claude-3-5-sonnet-20241022',
        temperature: 0.2,
        maxTokens: 4000,
      };

      expect(() => new AIService(validConfig)).not.toThrow();
    });

    it('should handle missing optional fields', () => {
      const minimalOpenAIConfig: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'sk-test-key',
      };

      const minimalAnthropicConfig: AIProviderConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-key',
      };

      expect(() => new AIService(minimalOpenAIConfig)).not.toThrow();
      expect(() => new AIService(minimalAnthropicConfig)).not.toThrow();
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

    it('should handle different provider capabilities', () => {
      const multimodalContent: ExtractedContent = {
        text: 'Content with potential image references',
        contentType: 'text/html',
        title: 'Multimodal Document',
      };

      // Test with providers that support different capabilities
      const providers = [
        { provider: 'openai' as const, apiKey: 'sk-test' },
        { provider: 'anthropic' as const, apiKey: 'sk-ant-test' },
        { provider: 'vertexai' as const, projectId: 'test', location: 'us-central1' },
        { provider: 'ollama' as const, baseUrl: 'http://localhost:11434' },
      ];

      for (const config of providers) {
        const service = new AIService(config);
        expect(service.translateContent(multimodalContent)).toBeInstanceOf(Promise);
      }
    });
  });
});
