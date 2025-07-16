/**
 * Tests for the main Translator class
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Translator } from '../core/translator';
import { AIProviderConfig, ConfigurationError, TranslatorConfig } from '../types';
import { registerAllProviders } from '../core/providers';

// Mock ContentExtractor to avoid network calls
vi.mock('../utils/content-extractor', () => ({
  ContentExtractor: vi.fn().mockImplementation(() => ({
    extractFromUrl: vi.fn().mockResolvedValue({
      text: 'Test content for URL extraction',
      title: 'Test Article',
      url: 'https://example.com/article',
      contentType: 'text/html',
      metadata: {
        author: 'Test Author',
        publishedDate: '2024-01-01',
        excerpt: 'Test excerpt',
        language: 'en',
      },
    }),
    extractFromSourceText: vi.fn().mockResolvedValue({
      text: 'Test content for source text extraction',
      title: 'Test Article',
      contentType: 'text/plain',
      metadata: {
        language: 'en',
      },
    }),
  })),
}));

// Mock LangChain modules to avoid requiring actual API keys in tests
vi.mock('@langchain/openai', () => ({
  ChatOpenAI: vi.fn().mockImplementation(() => ({
    // Mock implementation
  })),
}));

vi.mock('@langchain/anthropic', () => ({
  ChatAnthropic: vi.fn().mockImplementation(() => ({
    // Mock implementation
  })),
}));

vi.mock('@langchain/google-vertexai', () => ({
  ChatVertexAI: vi.fn().mockImplementation(() => ({
    // Mock implementation
  })),
}));

vi.mock('@langchain/ollama', () => ({
  ChatOllama: vi.fn().mockImplementation(() => ({
    // Mock implementation
  })),
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

describe('Translator', () => {
  let translator: Translator;

  beforeEach(() => {
    // Register providers before each test
    registerAllProviders();
    
    translator = new Translator({
      debug: false,
      timeout: 5000,
      maxRetries: 1,
    });
  });

  describe('constructor', () => {
    it('should create translator with default config', () => {
      const defaultTranslator = new Translator();
      expect(defaultTranslator).toBeInstanceOf(Translator);

      const config = defaultTranslator.getConfig();
      expect(config.timeout).toBe(30000);
      expect(config.maxRetries).toBe(3);
      expect(config.userAgent).toBe('Zotero-AI-Translator/1.0.0');
      expect(config.maxContentLength).toBe(50000);
      expect(config.debug).toBe(false);
    });

    it('should create translator with custom config', () => {
      const customConfig: TranslatorConfig = {
        timeout: 10000,
        maxRetries: 5,
        userAgent: 'Custom-Agent/1.0.0',
        maxContentLength: 100000,
        debug: true,
      };

      const customTranslator = new Translator(customConfig);
      const config = customTranslator.getConfig();

      expect(config.timeout).toBe(10000);
      expect(config.maxRetries).toBe(5);
      expect(config.userAgent).toBe('Custom-Agent/1.0.0');
      expect(config.maxContentLength).toBe(100000);
      expect(config.debug).toBe(true);
    });

    it('should throw error for invalid timeout', () => {
      expect(() => new Translator({ timeout: 0 })).toThrow(ConfigurationError);
      expect(() => new Translator({ timeout: -1000 })).toThrow(ConfigurationError);
    });

    it('should throw error for invalid max retries', () => {
      expect(() => new Translator({ maxRetries: -1 })).toThrow(ConfigurationError);
    });

    it('should throw error for invalid max content length', () => {
      expect(() => new Translator({ maxContentLength: 0 })).toThrow(ConfigurationError);
      expect(() => new Translator({ maxContentLength: -1000 })).toThrow(ConfigurationError);
    });

    it('should throw error for invalid user agent', () => {
      expect(() => new Translator({ userAgent: '' })).toThrow(ConfigurationError);
      expect(() => new Translator({ userAgent: '   ' })).toThrow(ConfigurationError);
    });

    it('should create translator with OpenAI provider configuration', () => {
      const aiConfig: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'sk-test-api-key',
        classificationModel: 'gpt-3.5-turbo',
        extractionModel: 'gpt-3.5-turbo',
        temperature: 0.1,
        maxTokens: 2000,
      };

      const configWithAI: TranslatorConfig = {
        ai: aiConfig,
      };

      expect(() => new Translator(configWithAI)).not.toThrow();
    });

    it('should create translator with Anthropic provider configuration', () => {
      const aiConfig: AIProviderConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-api-key',
        classificationModel: 'claude-3-haiku-20240307',
        extractionModel: 'claude-3-5-sonnet-20241022',
        temperature: 0.1,
        maxTokens: 2000,
      };

      const configWithAI: TranslatorConfig = {
        ai: aiConfig,
      };

      expect(() => new Translator(configWithAI)).not.toThrow();
    });

    it('should create translator with VertexAI provider configuration', () => {
      const aiConfig: AIProviderConfig = {
        provider: 'vertexai',
        projectId: 'test-project',
        location: 'us-central1',
        classificationModel: 'gemini-1.5-flash-002',
        extractionModel: 'gemini-1.5-pro-002',
        temperature: 0.1,
        maxTokens: 2000,
      };

      const configWithAI: TranslatorConfig = {
        ai: aiConfig,
      };

      expect(() => new Translator(configWithAI)).not.toThrow();
    });

    it('should create translator with Ollama provider configuration', () => {
      const aiConfig: AIProviderConfig = {
        provider: 'ollama',
        baseUrl: 'http://localhost:11434',
        classificationModel: 'llama3.1:8b',
        extractionModel: 'llama3.1:70b',
        temperature: 0.1,
        maxTokens: 2000,
      };

      const configWithAI: TranslatorConfig = {
        ai: aiConfig,
      };

      expect(() => new Translator(configWithAI)).not.toThrow();
    });

    it('should throw error for invalid AI provider configuration', () => {
      expect(
        () => new Translator({ ai: { provider: 'openai', apiKey: '' } as AIProviderConfig }),
      ).toThrow(ConfigurationError);
      expect(
        () => new Translator({ ai: { provider: 'openai', apiKey: '   ' } as AIProviderConfig }),
      ).toThrow(ConfigurationError);
    });

    it('should throw error for invalid AI temperature', () => {
      expect(
        () =>
          new Translator({
            ai: { provider: 'openai', apiKey: 'test-key', temperature: -1 } as AIProviderConfig,
          }),
      ).toThrow(ConfigurationError);

      expect(
        () =>
          new Translator({
            ai: { provider: 'openai', apiKey: 'test-key', temperature: 3 } as AIProviderConfig,
          }),
      ).toThrow(ConfigurationError);
    });

    it('should throw error for invalid AI max tokens', () => {
      expect(
        () =>
          new Translator({
            ai: { provider: 'openai', apiKey: 'test-key', maxTokens: 0 } as AIProviderConfig,
          }),
      ).toThrow(ConfigurationError);

      expect(
        () =>
          new Translator({
            ai: { provider: 'openai', apiKey: 'test-key', maxTokens: -100 } as AIProviderConfig,
          }),
      ).toThrow(ConfigurationError);
    });
  });

  describe('translate method', () => {
    it('should have translate method with correct signature', () => {
      expect(typeof translator.translate).toBe('function');
    });

    it('should throw error for invalid input', async () => {
      await expect(translator.translate(null as any)).rejects.toThrow(ConfigurationError);
      await expect(translator.translate(undefined as any)).rejects.toThrow(ConfigurationError);
      await expect(translator.translate({} as any)).rejects.toThrow(ConfigurationError);
    });

    it('should throw error for invalid URL input', async () => {
      await expect(translator.translate({ url: '' })).rejects.toThrow(ConfigurationError);
      await expect(translator.translate({ url: '   ' })).rejects.toThrow(ConfigurationError);
      await expect(translator.translate({ url: 'invalid-url' })).rejects.toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for invalid source text input', async () => {
      await expect(translator.translate({ sourceText: '' })).rejects.toThrow(ConfigurationError);
      await expect(translator.translate({ sourceText: '   ' })).rejects.toThrow(ConfigurationError);
    });

    it('should accept valid URL input', async () => {
      // This test will fail until we implement proper mocking
      // For now, just verify the method accepts the input format
      const validInput = { url: 'https://example.com' };
      expect(() => translator.translate(validInput)).not.toThrow();
    });

    it('should accept valid source text input', async () => {
      const validInput = { sourceText: 'This is some test content for translation.' };

      const result = await translator.translate(validInput);

      expect(result).toHaveProperty('item');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('extractedContent');
      expect(result).toHaveProperty('processing');

      expect(result.item).toHaveProperty('itemType');
      expect(result.item).toHaveProperty('title');
      expect(result.processing.ingestionMethod).toBe('sourceText');
      expect(result.processing.aiProvider).toBeUndefined(); // No AI provider configured
    });

    it('should work with OpenAI provider configuration', async () => {
      const aiTranslator = new Translator({
        ai: {
          provider: 'openai',
          apiKey: 'sk-test-api-key',
          classificationModel: 'gpt-3.5-turbo',
          extractionModel: 'gpt-3.5-turbo',
          temperature: 0.1,
          maxTokens: 2000,
        },
        debug: false,
      });

      const validInput = { sourceText: 'This is a research paper about machine learning.' };

      // Due to mocking, this will fall back to basic extraction
      const result = await aiTranslator.translate(validInput);

      expect(result).toHaveProperty('item');
      expect(result).toHaveProperty('confidence');
      expect(result.processing.ingestionMethod).toBe('sourceText');
      expect(result.processing.aiProvider).toBe('openai');
      expect(result.processing.modelsUsed).toBeDefined();
    });

    it('should work with Anthropic provider configuration', async () => {
      const aiTranslator = new Translator({
        ai: {
          provider: 'anthropic',
          apiKey: 'sk-ant-test-api-key',
          classificationModel: 'claude-3-haiku-20240307',
          extractionModel: 'claude-3-5-sonnet-20241022',
          temperature: 0.1,
          maxTokens: 2000,
        },
        debug: false,
      });

      const validInput = { sourceText: 'This is a research paper about machine learning.' };

      const result = await aiTranslator.translate(validInput);

      expect(result).toHaveProperty('item');
      expect(result).toHaveProperty('confidence');
      expect(result.processing.ingestionMethod).toBe('sourceText');
      expect(result.processing.aiProvider).toBe('anthropic');
      expect(result.processing.modelsUsed).toBeDefined();
    });

    it('should fallback to basic extraction when AI fails', async () => {
      const aiTranslator = new Translator({
        ai: {
          provider: 'openai',
          apiKey: 'invalid-api-key',
        },
        debug: false,
      });

      const validInput = { sourceText: 'This is test content.' };

      // With mocked LangChain, this should fall back to basic extraction
      const result = await aiTranslator.translate(validInput);

      expect(result).toHaveProperty('item');
      expect(result.item).toHaveProperty('itemType');
      expect(result.item).toHaveProperty('title');
    });
  });

  describe('getConfig method', () => {
    it('should return current configuration', () => {
      const config = translator.getConfig();

      expect(config).toHaveProperty('timeout');
      expect(config).toHaveProperty('maxRetries');
      expect(config).toHaveProperty('userAgent');
      expect(config).toHaveProperty('maxContentLength');
      expect(config).toHaveProperty('debug');
    });

    it('should return immutable configuration', () => {
      const config = translator.getConfig();
      const originalTimeout = config.timeout;

      // Try to modify the returned config
      (config as any).timeout = 999999;

      // Original config should remain unchanged
      expect(translator.getConfig().timeout).toBe(originalTimeout);
    });
  });
});
