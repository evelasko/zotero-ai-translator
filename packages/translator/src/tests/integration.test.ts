/**
 * Integration tests for the multi-provider translation system
 * 
 * These tests focus on system integration and robustness rather than specific AI responses.
 * They test the core functionality including configuration validation, content extraction,
 * and graceful fallback behavior when AI providers are not available.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Translator } from '../core/translator';
import { AIProviderConfig, TranslationResult } from '../types';
import { ProviderFactory } from '../core/provider-factory';

// Mock ContentExtractor to avoid network calls
vi.mock('../utils/content-extractor', () => ({
  ContentExtractor: vi.fn().mockImplementation(() => ({
    extractFromUrl: vi.fn().mockResolvedValue({
      text: 'Machine Learning Applications in Healthcare. This research paper explores...',
      title: 'Machine Learning Applications in Healthcare',
      url: 'https://example.com/article',
      contentType: 'text/html',
      metadata: {
        author: 'Research Author',
        publishedDate: '2024-01-01',
        excerpt: 'This research paper explores machine learning applications.',
        language: 'en',
      },
    }),
    extractFromSourceText: vi.fn().mockResolvedValue({
      text: 'Machine Learning Applications in Healthcare. This research paper explores...',
      title: 'Machine Learning Applications in Healthcare',
      contentType: 'text/plain',
      metadata: {
        language: 'en',
      },
    }),
  })),
}));

// Mock all LangChain providers
vi.mock('@langchain/openai', () => ({
  ChatOpenAI: vi.fn().mockImplementation(() => {
    let callCount = 0;
    return {
      invoke: vi.fn().mockImplementation(async () => {
        callCount++;
        if (callCount % 2 === 1) {
          // Odd calls: classification
          return { content: 'journalArticle' };
        } else {
          // Even calls: extraction
          return {
            content: JSON.stringify({
              itemType: 'journalArticle',
              title: 'OpenAI Extracted Article',
              creators: [{ firstName: 'OpenAI', lastName: 'Author', creatorType: 'author' }],
              abstractNote: 'Article extracted using OpenAI GPT model',
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
          // Odd calls: classification
          return { content: 'journalArticle' };
        } else {
          // Even calls: extraction
          return {
            content: JSON.stringify({
              itemType: 'journalArticle',
              title: 'Anthropic Extracted Article',
              creators: [{ firstName: 'Claude', lastName: 'Author', creatorType: 'author' }],
              abstractNote: 'Article extracted using Anthropic Claude model',
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
          // Odd calls: classification
          return { content: 'journalArticle' };
        } else {
          // Even calls: extraction
          return {
            content: JSON.stringify({
              itemType: 'journalArticle',
              title: 'Gemini Extracted Article',
              creators: [{ firstName: 'Gemini', lastName: 'Author', creatorType: 'author' }],
              abstractNote: 'Article extracted using Google Gemini model',
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
          // Odd calls: classification
          return { content: 'journalArticle' };
        } else {
          // Even calls: extraction
          return {
            content: JSON.stringify({
              itemType: 'journalArticle',
              title: 'Llama Extracted Article',
              creators: [{ firstName: 'Llama', lastName: 'Author', creatorType: 'author' }],
              abstractNote: 'Article extracted using Llama model',
              date: '2024-01-01',
              url: 'https://example.com/article',
            }),
          };
        }
      }),
    };
  }),
}));

// Mock output parsers
vi.mock('@langchain/core/output_parsers', () => ({
  StructuredOutputParser: {
    fromZodSchema: vi.fn().mockReturnValue({
      getFormatInstructions: vi.fn().mockReturnValue('Format instructions'),
      parse: vi.fn().mockImplementation(async (text) => {
        try {
          return JSON.parse(text);
        } catch {
          return {
            itemType: 'journalArticle',
            title: 'Test Article',
            creators: [{ firstName: 'Test', lastName: 'Author', creatorType: 'author' }],
            abstractNote: 'Test abstract',
            date: '2024-01-01',
            url: 'https://example.com/article',
          };
        }
      }),
    }),
  },
  OutputFixingParser: {
    fromLLM: vi.fn().mockReturnValue({
      // Mock parser
    }),
  },
}));

describe('Multi-Provider Translation Integration', () => {
  beforeEach(() => {
    // Reset provider factory and register mock providers
    ProviderFactory.reset();
    
    // Register mock providers for testing
    ProviderFactory.registerProvider('openai', {
      name: 'openai',
      isAvailable: () => true,
      createClassificationModel: vi.fn(),
      createExtractionModel: vi.fn(),
      validateConfig: vi.fn(),
      getModelCapabilities: () => ({
        maxTokens: 128000,
        supportsToolCalling: true,
        supportsStructuredOutput: true,
        supportsJsonMode: true,
        supportsImageInput: true,
        supportsAudioInput: false,
        supportsVideoInput: false,
        supportsStreaming: true,
        supportsBatchProcessing: false,
        supportsTokenUsage: true,
        maxContextLength: 128000,
        maxOutputTokens: 4096,
      }),
    });
    
    ProviderFactory.registerProvider('anthropic', {
      name: 'anthropic',
      isAvailable: () => true,
      createClassificationModel: vi.fn(),
      createExtractionModel: vi.fn(),
      validateConfig: vi.fn(),
      getModelCapabilities: () => ({
        maxTokens: 200000,
        supportsToolCalling: true,
        supportsStructuredOutput: true,
        supportsJsonMode: true,
        supportsImageInput: true,
        supportsAudioInput: false,
        supportsVideoInput: false,
        supportsStreaming: true,
        supportsBatchProcessing: false,
        supportsTokenUsage: true,
        maxContextLength: 200000,
        maxOutputTokens: 8192,
      }),
    });
    
    ProviderFactory.registerProvider('ollama', {
      name: 'ollama',
      isAvailable: () => false, // Mark as unavailable to skip network calls
      createClassificationModel: vi.fn(),
      createExtractionModel: vi.fn(),
      validateConfig: vi.fn(),
      getModelCapabilities: () => ({
        maxTokens: 128000,
        supportsToolCalling: false,
        supportsStructuredOutput: false,
        supportsJsonMode: false,
        supportsImageInput: false,
        supportsAudioInput: false,
        supportsVideoInput: false,
        supportsStreaming: true,
        supportsBatchProcessing: false,
        supportsTokenUsage: false,
        maxContextLength: 128000,
        maxOutputTokens: 2048,
      }),
    });
  });
  
  const testContent = {
    sourceText: `
      Machine Learning Applications in Healthcare
      
      This research paper explores the applications of machine learning 
      algorithms in modern healthcare systems. The study analyzes various 
      ML techniques including supervised learning, unsupervised learning, 
      and reinforcement learning in medical diagnosis, treatment 
      recommendation, and patient monitoring.
      
      Authors: Dr. Jane Smith, Dr. John Doe
      Published: 2024
      Journal: AI in Medicine
    `,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('OpenAI Provider Integration', () => {
    it('should successfully translate content using OpenAI', async () => {
      const config: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'sk-test-openai-key',
        classificationModel: 'gpt-3.5-turbo',
        extractionModel: 'gpt-4o',
        temperature: 0.1,
        maxTokens: 2000,
      };

      const translator = new Translator({
        ai: config,
        timeout: 10000,
        maxRetries: 1,
        debug: false,
      });

      const result = await translator.translate(testContent);

      // Test basic functionality - the system should handle AI failures gracefully
      expect(result).toMatchObject({
        item: {
          itemType: expect.any(String),
          title: expect.any(String),
          url: expect.any(String),
          creators: expect.any(Array),
        },
        confidence: expect.any(Number),
        processing: {
          ingestionMethod: 'sourceText',
          totalTime: expect.any(Number),
          extractionTime: expect.any(Number),
          translationTime: expect.any(Number),
        },
      });
      
      // Verify the result has required properties
      expect(result.item.title).toBeTruthy();
      expect(result.confidence).toBeGreaterThan(0);

      expect(result.confidence).toBeGreaterThan(0.5);
    });

    it('should handle OpenAI with custom configuration', async () => {
      const config: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'sk-test-openai-key',
        classificationModel: 'gpt-4o-mini',
        extractionModel: 'gpt-4o',
        organization: 'org-123456',
        baseURL: 'https://custom-openai-api.example.com',
        temperature: 0.2,
        maxTokens: 4000,
        maxRetries: 2,
      };

      const translator = new Translator({ ai: config, debug: false });
      const result = await translator.translate(testContent);

      expect(result.item.title).toBeTruthy();
      expect(result.processing.aiProvider).toBe('openai');
    });
  });

  describe('Anthropic Provider Integration', () => {
    it('should successfully translate content using Anthropic', async () => {
      const config: AIProviderConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-key',
        classificationModel: 'claude-3-haiku-20240307',
        extractionModel: 'claude-3-5-sonnet-20241022',
        temperature: 0.1,
        maxTokens: 2000,
      };

      const translator = new Translator({
        ai: config,
        timeout: 10000,
        maxRetries: 1,
        debug: false,
      });

      const result = await translator.translate(testContent);

      expect(result).toMatchObject({
        item: {
          itemType: 'journalArticle',
          title: 'Anthropic Extracted Article',
          creators: expect.arrayContaining([
            expect.objectContaining({
              firstName: 'Claude',
              lastName: 'Author',
              creatorType: 'author',
            }),
          ]),
        },
        confidence: expect.any(Number),
        processing: {
          ingestionMethod: 'sourceText',
          aiProvider: 'anthropic',
          modelsUsed: {
            classification: 'claude-3-haiku-20240307',
            extraction: 'claude-3-5-sonnet-20241022',
          },
        },
      });
    });

    it('should handle Anthropic with prompt caching', async () => {
      const config: AIProviderConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-key',
        classificationModel: 'claude-3-5-sonnet-20241022',
        extractionModel: 'claude-3-5-sonnet-20241022',
        enablePromptCaching: true,
        customHeaders: {
          'X-Custom-Header': 'test-value',
        },
      };

      const translator = new Translator({ ai: config, debug: false });
      const result = await translator.translate(testContent);

      expect(result.item.title).toBe('Anthropic Extracted Article');
      expect(result.processing.aiProvider).toBe('anthropic');
    });
  });

  describe('VertexAI Provider Integration', () => {
    it('should successfully translate content using VertexAI', async () => {
      const config: AIProviderConfig = {
        provider: 'vertexai',
        projectId: 'test-project-123',
        location: 'us-central1',
        classificationModel: 'gemini-1.5-flash-002',
        extractionModel: 'gemini-1.5-pro-002',
        temperature: 0.1,
        maxTokens: 2000,
      };

      const translator = new Translator({
        ai: config,
        timeout: 10000,
        maxRetries: 1,
        debug: false,
      });

      const result = await translator.translate(testContent);

      expect(result).toMatchObject({
        item: {
          itemType: 'journalArticle',
          title: 'Gemini Extracted Article',
          creators: expect.arrayContaining([
            expect.objectContaining({
              firstName: 'Gemini',
              lastName: 'Author',
              creatorType: 'author',
            }),
          ]),
        },
        confidence: expect.any(Number),
        processing: {
          ingestionMethod: 'sourceText',
          aiProvider: 'vertexai',
          modelsUsed: {
            classification: 'gemini-1.5-flash-002',
            extraction: 'gemini-1.5-pro-002',
          },
        },
      });
    });

    it('should handle VertexAI with authentication', async () => {
      const config: AIProviderConfig = {
        provider: 'vertexai',
        projectId: 'test-project-123',
        location: 'europe-west1',
        classificationModel: 'gemini-1.5-pro-002',
        extractionModel: 'gemini-1.5-pro-002',
        authOptions: {
          keyFilename: '/path/to/service-account.json',
        },
        contextCaching: {
          cachedContentId: 'cache-123',
          ttlSeconds: 3600,
        },
      };

      const translator = new Translator({ ai: config, debug: false });
      const result = await translator.translate(testContent);

      expect(result.item.title).toBe('Gemini Extracted Article');
      expect(result.processing.aiProvider).toBe('vertexai');
    });
  });

  describe('Ollama Provider Integration', () => {
    it('should successfully translate content using Ollama', async () => {
      const config: AIProviderConfig = {
        provider: 'ollama',
        baseUrl: 'http://localhost:11434',
        classificationModel: 'llama3.1:8b',
        extractionModel: 'llama3.1:70b',
        temperature: 0.1,
        maxTokens: 2000,
      };

      const translator = new Translator({
        ai: config,
        timeout: 10000,
        maxRetries: 1,
        debug: false,
      });

      const result = await translator.translate(testContent);

      expect(result).toMatchObject({
        item: {
          itemType: 'journalArticle',
          title: 'Llama Extracted Article',
          creators: expect.arrayContaining([
            expect.objectContaining({
              firstName: 'Llama',
              lastName: 'Author',
              creatorType: 'author',
            }),
          ]),
        },
        confidence: expect.any(Number),
        processing: {
          ingestionMethod: 'sourceText',
          aiProvider: 'ollama',
          modelsUsed: {
            classification: 'llama3.1:8b',
            extraction: 'llama3.1:70b',
          },
        },
      });
    });

    it('should handle Ollama with custom server and options', async () => {
      const config: AIProviderConfig = {
        provider: 'ollama',
        baseUrl: 'http://custom-ollama-server:11434',
        classificationModel: 'codellama:7b',
        extractionModel: 'llama3.1:8b',
        enableMultimodal: true,
        requestOptions: {
          numGpu: 1,
          numThread: 8,
          useMmap: true,
        },
      };

      const translator = new Translator({ ai: config, debug: false });
      const result = await translator.translate(testContent);

      expect(result.item.title).toBe('Llama Extracted Article');
      expect(result.processing.aiProvider).toBe('ollama');
    });
  });

  describe('Cross-Provider Consistency', () => {
    it('should produce consistent metadata across all providers', async () => {
      const providers: AIProviderConfig[] = [
        {
          provider: 'openai',
          apiKey: 'sk-test-openai-key',
          classificationModel: 'gpt-3.5-turbo',
          extractionModel: 'gpt-4o',
        },
        {
          provider: 'anthropic',
          apiKey: 'sk-ant-test-key',
          classificationModel: 'claude-3-haiku-20240307',
          extractionModel: 'claude-3-5-sonnet-20241022',
        },
        {
          provider: 'vertexai',
          projectId: 'test-project',
          location: 'us-central1',
          classificationModel: 'gemini-1.5-flash-002',
          extractionModel: 'gemini-1.5-pro-002',
        },
        {
          provider: 'ollama',
          baseUrl: 'http://localhost:11434',
          classificationModel: 'llama3.1:8b',
          extractionModel: 'llama3.1:70b',
        },
      ];

      const results: TranslationResult[] = [];

      for (const config of providers) {
        const translator = new Translator({ ai: config, debug: false });
        const result = await translator.translate(testContent);
        results.push(result);
      }

      // All results should have the same structure
      for (const result of results) {
        expect(result).toHaveProperty('item');
        expect(result).toHaveProperty('confidence');
        expect(result).toHaveProperty('extractedContent');
        expect(result).toHaveProperty('processing');

        expect(result.item).toHaveProperty('itemType', 'journalArticle');
        expect(result.item).toHaveProperty('title');
        expect(result.item).toHaveProperty('creators');
        expect(result.item).toHaveProperty('abstractNote');

        expect(result.processing).toHaveProperty('ingestionMethod', 'sourceText');
        expect(result.processing).toHaveProperty('aiProvider');
        expect(result.processing).toHaveProperty('modelsUsed');
        expect(result.processing.modelsUsed).toHaveProperty('classification');
        expect(result.processing.modelsUsed).toHaveProperty('extraction');
      }

      // Each result should have the correct provider
      expect(results[0].processing.aiProvider).toBe('openai');
      expect(results[1].processing.aiProvider).toBe('anthropic');
      expect(results[2].processing.aiProvider).toBe('vertexai');
      expect(results[3].processing.aiProvider).toBe('ollama');
    });
  });

  describe('Error Handling and Fallbacks', () => {
    it('should handle provider-specific errors gracefully', async () => {
      // Mock one provider to fail
      const { ChatOpenAI } = await import('@langchain/openai');
      vi.mocked(ChatOpenAI).mockImplementationOnce(() => {
        throw new Error('OpenAI API rate limit exceeded');
      });

      const config: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'sk-test-openai-key',
        classificationModel: 'gpt-3.5-turbo',
        extractionModel: 'gpt-4o',
      };

      const translator = new Translator({ ai: config, debug: false });

      // Should fall back to basic extraction instead of throwing
      const result = await translator.translate(testContent);

      expect(result).toHaveProperty('item');
      expect(result.item).toHaveProperty('itemType');
      expect(result.item).toHaveProperty('title');
      // Processing should not include AI provider info since it failed
      expect(result.processing.aiProvider).toBeUndefined();
    });

    it('should validate configuration before translation', async () => {
      const invalidConfig: AIProviderConfig = {
        provider: 'openai',
        apiKey: '', // Invalid empty API key
      };

      expect(() => new Translator({ ai: invalidConfig })).toThrow('API key is required');
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle concurrent translations with the same provider', async () => {
      const config: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'sk-test-openai-key',
        classificationModel: 'gpt-3.5-turbo',
        extractionModel: 'gpt-4o',
      };

      const translator = new Translator({ ai: config, debug: false });

      // Execute multiple translations concurrently
      const promises = Array(3)
        .fill(null)
        .map(() => translator.translate(testContent));

      const results = await Promise.all(promises);

      // All should succeed
      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result.item.itemType).toBe('journalArticle');
        expect(result.processing.aiProvider).toBe('openai');
      });
    });

    it('should handle different content sizes across providers', async () => {
      const smallContent = { sourceText: 'Short article about AI.' };
      const largeContent = {
        sourceText: `${'A'.repeat(10000)} This is a very large article about artificial intelligence and machine learning.`,
      };

      const config: AIProviderConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-key',
        classificationModel: 'claude-3-haiku-20240307',
        extractionModel: 'claude-3-5-sonnet-20241022',
      };

      const translator = new Translator({ ai: config, debug: false });

      const smallResult = await translator.translate(smallContent);
      const largeResult = await translator.translate(largeContent);

      expect(smallResult.item.itemType).toBe('journalArticle');
      expect(largeResult.item.itemType).toBe('journalArticle');

      expect(smallResult.processing.aiProvider).toBe('anthropic');
      expect(largeResult.processing.aiProvider).toBe('anthropic');
    });
  });

  describe('Translation Quality and Metadata', () => {
    it('should preserve source content metadata in extraction', async () => {
      const config: AIProviderConfig = {
        provider: 'vertexai',
        projectId: 'test-project',
        location: 'us-central1',
        classificationModel: 'gemini-1.5-flash-002',
        extractionModel: 'gemini-1.5-pro-002',
      };

      const translator = new Translator({ ai: config, debug: false });
      const result = await translator.translate(testContent);

      expect(result.extractedContent).toHaveProperty('text');
      expect(result.extractedContent).toHaveProperty('contentType', 'text/plain');
      expect(result.extractedContent.text).toContain('Machine Learning Applications');
    });

    it('should provide accurate confidence scores', async () => {
      const config: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'sk-test-openai-key',
        classificationModel: 'gpt-4o',
        extractionModel: 'gpt-4o',
      };

      const translator = new Translator({ ai: config, debug: false });
      const result = await translator.translate(testContent);

      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(1);

      // AI-powered extraction should have high confidence
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });
});
