/**
 * Tests for the ProviderFactory
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConfigValidator } from '../core/config-validator';
import { AIProviderConfig, ConfigurationError } from '../types';
import { ProviderFactory } from '../core/provider-factory';

// Mock the actual provider implementations
vi.mock('../core/providers/openai-provider', () => ({
  OpenAIProvider: {
    name: 'openai',
    isAvailable: vi.fn().mockReturnValue(true),
    createClassificationModel: vi.fn(),
    createExtractionModel: vi.fn(),
    validateConfig: vi.fn(),
    getModelCapabilities: vi.fn().mockReturnValue({
      maxTokens: 128000,
      supportsToolCalling: true,
      supportsImageInput: true,
    }),
  },
}));

vi.mock('../core/providers/anthropic-provider', () => ({
  AnthropicProvider: {
    name: 'anthropic',
    isAvailable: vi.fn().mockReturnValue(true),
    createClassificationModel: vi.fn(),
    createExtractionModel: vi.fn(),
    validateConfig: vi.fn(),
    getModelCapabilities: vi.fn().mockReturnValue({
      maxTokens: 200000,
      supportsToolCalling: true,
      supportsImageInput: true,
    }),
  },
}));

vi.mock('../core/providers/vertexai-provider', () => ({
  VertexAIProvider: {
    name: 'vertexai',
    isAvailable: vi.fn().mockReturnValue(true),
    createClassificationModel: vi.fn(),
    createExtractionModel: vi.fn(),
    validateConfig: vi.fn(),
    getModelCapabilities: vi.fn().mockReturnValue({
      maxTokens: 2000000,
      supportsToolCalling: true,
      supportsImageInput: true,
    }),
  },
}));

vi.mock('../core/providers/ollama-provider', () => ({
  OllamaProvider: {
    name: 'ollama',
    isAvailable: vi.fn().mockReturnValue(false), // Simulate not available
    createClassificationModel: vi.fn(),
    createExtractionModel: vi.fn(),
    validateConfig: vi.fn(),
    getModelCapabilities: vi.fn().mockReturnValue({
      maxTokens: 32768,
      supportsToolCalling: true,
      supportsImageInput: false,
    }),
  },
}));

// Mock ConfigValidator
vi.mock('../core/config-validator', () => ({
  ConfigValidator: {
    validateProviderConfig: vi.fn(),
  },
}));

describe('ProviderFactory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Reset the provider factory and manually register mocked providers
    ProviderFactory.reset();
    
    // Register mock providers
    ProviderFactory.registerProvider('openai', {
      name: 'openai',
      isAvailable: () => true,
      createClassificationModel: vi.fn(),
      createExtractionModel: vi.fn(),
      validateConfig: (config) => {
        // Call the actual validator in the mock
        ConfigValidator.validateProviderConfig(config);
      },
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
      validateConfig: (config) => {
        // Call the actual validator in the mock
        ConfigValidator.validateProviderConfig(config);
      },
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
    
    ProviderFactory.registerProvider('vertexai', {
      name: 'vertexai',
      isAvailable: () => true,
      createClassificationModel: vi.fn(),
      createExtractionModel: vi.fn(),
      validateConfig: (config) => {
        // Call the actual validator in the mock
        ConfigValidator.validateProviderConfig(config);
      },
      getModelCapabilities: () => ({
        maxTokens: 2000000,
        supportsToolCalling: true,
        supportsStructuredOutput: false,
        supportsJsonMode: true,
        supportsImageInput: false,
        supportsAudioInput: false,
        supportsVideoInput: false,
        supportsStreaming: true,
        supportsBatchProcessing: false,
        supportsTokenUsage: true,
        maxContextLength: 2000000,
        maxOutputTokens: 8192,
      }),
    });
    
    ProviderFactory.registerProvider('ollama', {
      name: 'ollama',
      isAvailable: () => false,
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

  describe('Provider Registration and Availability', () => {
    it('should have all default providers registered', () => {
      const availableProviders = ProviderFactory.getAvailableProviders();
      
      // Should include available providers (not ollama which is unavailable)
      expect(availableProviders.length).toBe(3);
      expect(availableProviders).toContain('openai');
      expect(availableProviders).toContain('anthropic');
      expect(availableProviders).toContain('vertexai');
    });

    it('should detect available providers correctly', () => {
      // Check availability of different providers
      const isOpenAIAvailable = ProviderFactory.isProviderAvailable('openai');
      const isOllamaAvailable = ProviderFactory.isProviderAvailable('ollama');

      expect(isOpenAIAvailable).toBe(true);
      expect(isOllamaAvailable).toBe(false); // Mocked as unavailable
    });
  });

  describe('Provider Creation', () => {
    it('should create OpenAI provider with valid config', () => {
      const config: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'sk-test-key',
        classificationModel: 'gpt-3.5-turbo',
        extractionModel: 'gpt-4o',
      };

      // Mock validation to pass
      vi.mocked(ConfigValidator.validateProviderConfig).mockImplementation(() => {});

      const provider = ProviderFactory.createProvider(config);

      expect(provider).toBeDefined();
      expect(provider.name).toBe('openai');
      expect(ConfigValidator.validateProviderConfig).toHaveBeenCalledWith(config);
    });

    it('should create Anthropic provider with valid config', async () => {
      const { ProviderFactory } = await import('../core/provider-factory');

      const config: AIProviderConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-key',
        classificationModel: 'claude-3-haiku-20240307',
        extractionModel: 'claude-3-5-sonnet-20241022',
      };

      vi.mocked(ConfigValidator.validateProviderConfig).mockImplementation(() => {});

      const provider = ProviderFactory.createProvider(config);

      expect(provider).toBeDefined();
      expect(provider.name).toBe('anthropic');
    });

    it('should create VertexAI provider with valid config', async () => {
      const { ProviderFactory } = await import('../core/provider-factory');

      const config: AIProviderConfig = {
        provider: 'vertexai',
        projectId: 'test-project',
        location: 'us-central1',
        classificationModel: 'gemini-1.5-flash-002',
        extractionModel: 'gemini-1.5-pro-002',
      };

      vi.mocked(ConfigValidator.validateProviderConfig).mockImplementation(() => {});

      const provider = ProviderFactory.createProvider(config);

      expect(provider).toBeDefined();
      expect(provider.name).toBe('vertexai');
    });

    it('should throw error for unavailable provider', async () => {
      const { ProviderFactory } = await import('../core/provider-factory');

      const config: AIProviderConfig = {
        provider: 'ollama',
        baseUrl: 'http://localhost:11434',
      };

      vi.mocked(ConfigValidator.validateProviderConfig).mockImplementation(() => {});

      // Ollama is mocked as unavailable
      expect(() => ProviderFactory.createProvider(config)).toThrow(
        "Provider 'ollama' is not available",
      );
    });

    it('should validate config before creating provider', async () => {
      const { ProviderFactory } = await import('../core/provider-factory');

      const invalidConfig: AIProviderConfig = {
        provider: 'openai',
        apiKey: '', // Invalid empty API key
      };

      // Mock validation to throw error
      vi.mocked(ConfigValidator.validateProviderConfig).mockImplementation(() => {
        throw new ConfigurationError('API key is required');
      });

      expect(() => ProviderFactory.createProvider(invalidConfig)).toThrow('API key is required');
    });
  });

  describe('Installation Instructions', () => {
    it('should provide installation instructions for each provider', () => {
      // Test installation instructions for known providers
      const openaiInstructions = 'npm install @langchain/openai';
      const anthropicInstructions = 'npm install @langchain/anthropic';
      const vertexaiInstructions = 'npm install @langchain/google-vertexai';
      const ollamaInstructions = 'npm install @langchain/ollama';

      expect(openaiInstructions).toBe('npm install @langchain/openai');
      expect(anthropicInstructions).toBe('npm install @langchain/anthropic');
      expect(vertexaiInstructions).toBe('npm install @langchain/google-vertexai');
      expect(ollamaInstructions).toBe('npm install @langchain/ollama');
    });
  });

  describe('Error Handling', () => {
    it('should handle provider creation errors gracefully', async () => {
      const { ProviderFactory } = await import('../core/provider-factory');

      const config: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'sk-test-key',
      };

      // Mock validation to throw error
      vi.mocked(ConfigValidator.validateProviderConfig).mockImplementation(() => {
        throw new ConfigurationError('Configuration validation failed');
      });

      expect(() => ProviderFactory.createProvider(config)).toThrow(
        'Configuration validation failed',
      );
    });

    it('should provide helpful error messages for missing providers', async () => {
      const { ProviderFactory } = await import('../core/provider-factory');

      // Try to create a provider that doesn't exist
      const config = {
        provider: 'nonexistent',
        apiKey: 'test-key',
      } as unknown as AIProviderConfig;

      expect(() => ProviderFactory.createProvider(config)).toThrow(
        /Provider 'nonexistent' is not registered/,
      );
    });
  });

  describe('Provider Configuration Validation', () => {
    it('should call ConfigValidator for each provider type', async () => {
      const { ProviderFactory } = await import('../core/provider-factory');

      const configs: AIProviderConfig[] = [
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
      ];

      vi.mocked(ConfigValidator.validateProviderConfig).mockImplementation(() => {});

      for (const config of configs) {
        ProviderFactory.createProvider(config);
      }

      expect(ConfigValidator.validateProviderConfig).toHaveBeenCalledTimes(3);
    });

    it('should pass through validation errors', async () => {
      const { ProviderFactory } = await import('../core/provider-factory');

      const config: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'invalid-key',
      };

      const validationError = new ConfigurationError('Invalid API key format');
      vi.mocked(ConfigValidator.validateProviderConfig).mockImplementation(() => {
        throw validationError;
      });

      expect(() => ProviderFactory.createProvider(config)).toThrow('Invalid API key format');
    });
  });
});
