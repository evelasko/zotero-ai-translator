/**
 * Tests for the ConfigValidator class
 */

import { describe, expect, it } from 'vitest';
import { ConfigValidator } from '../core/config-validator';
import {
  AIProviderConfig,
  AnthropicConfig,
  ConfigurationError,
  OllamaConfig,
  OpenAIConfig,
  VertexAIConfig,
} from '../types';

describe('ConfigValidator', () => {
  describe('OpenAI Configuration Validation', () => {
    it('should validate valid OpenAI configuration', () => {
      const validConfig: OpenAIConfig = {
        provider: 'openai',
        apiKey: 'sk-test-key-1234567890abcdef',
        classificationModel: 'gpt-3.5-turbo',
        extractionModel: 'gpt-4o',
        temperature: 0.1,
        maxTokens: 2000,
      };

      expect(() => ConfigValidator.validateProviderConfig(validConfig)).not.toThrow();
    });

    it('should validate minimal OpenAI configuration', () => {
      const minimalConfig: OpenAIConfig = {
        provider: 'openai',
        apiKey: 'sk-test-key',
      };

      expect(() => ConfigValidator.validateProviderConfig(minimalConfig)).not.toThrow();
    });

    it('should throw error for missing OpenAI API key', () => {
      const invalidConfig = {
        provider: 'openai',
      } as OpenAIConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for empty OpenAI API key', () => {
      const invalidConfig: OpenAIConfig = {
        provider: 'openai',
        apiKey: '',
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for invalid OpenAI temperature', () => {
      const invalidConfig: OpenAIConfig = {
        provider: 'openai',
        apiKey: 'sk-test-key',
        temperature: -1,
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );

      const invalidConfig2: OpenAIConfig = {
        provider: 'openai',
        apiKey: 'sk-test-key',
        temperature: 3,
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig2)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for invalid OpenAI max tokens', () => {
      const invalidConfig: OpenAIConfig = {
        provider: 'openai',
        apiKey: 'sk-test-key',
        maxTokens: 0,
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should validate OpenAI with custom base URL', () => {
      const configWithBaseURL: OpenAIConfig = {
        provider: 'openai',
        apiKey: 'sk-test-key',
        baseURL: 'https://custom-api.example.com',
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithBaseURL)).not.toThrow();
    });

    it('should validate OpenAI with organization', () => {
      const configWithOrg: OpenAIConfig = {
        provider: 'openai',
        apiKey: 'sk-test-key',
        organization: 'org-123456',
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithOrg)).not.toThrow();
    });
  });

  describe('Anthropic Configuration Validation', () => {
    it('should validate valid Anthropic configuration', () => {
      const validConfig: AnthropicConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-key-1234567890abcdef',
        classificationModel: 'claude-3-haiku-20240307',
        extractionModel: 'claude-3-5-sonnet-20241022',
        temperature: 0.1,
        maxTokens: 2000,
      };

      expect(() => ConfigValidator.validateProviderConfig(validConfig)).not.toThrow();
    });

    it('should validate minimal Anthropic configuration', () => {
      const minimalConfig: AnthropicConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-key',
      };

      expect(() => ConfigValidator.validateProviderConfig(minimalConfig)).not.toThrow();
    });

    it('should throw error for missing Anthropic API key', () => {
      const invalidConfig = {
        provider: 'anthropic',
      } as AnthropicConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for empty Anthropic API key', () => {
      const invalidConfig: AnthropicConfig = {
        provider: 'anthropic',
        apiKey: '',
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should validate Anthropic with custom headers', () => {
      const configWithHeaders: AnthropicConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-key',
        customHeaders: {
          'Custom-Header': 'test-value',
          'Another-Header': 'another-value',
        },
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithHeaders)).not.toThrow();
    });

    it('should validate Anthropic with prompt caching enabled', () => {
      const configWithCaching: AnthropicConfig = {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-key',
        enablePromptCaching: true,
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithCaching)).not.toThrow();
    });
  });

  describe('VertexAI Configuration Validation', () => {
    it('should validate valid VertexAI configuration', () => {
      const validConfig: VertexAIConfig = {
        provider: 'vertexai',
        projectId: 'test-project-123',
        location: 'us-central1',
        classificationModel: 'gemini-1.5-flash-002',
        extractionModel: 'gemini-1.5-pro-002',
        temperature: 0.1,
        maxTokens: 2000,
      };

      expect(() => ConfigValidator.validateProviderConfig(validConfig)).not.toThrow();
    });

    it('should validate minimal VertexAI configuration', () => {
      const minimalConfig: VertexAIConfig = {
        provider: 'vertexai',
        projectId: 'test-project',
        location: 'us-central1',
      };

      expect(() => ConfigValidator.validateProviderConfig(minimalConfig)).not.toThrow();
    });

    it('should throw error for missing VertexAI project ID', () => {
      const invalidConfig = {
        provider: 'vertexai',
        location: 'us-central1',
      } as VertexAIConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for missing VertexAI location', () => {
      const invalidConfig = {
        provider: 'vertexai',
        projectId: 'test-project',
      } as VertexAIConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for empty VertexAI project ID', () => {
      const invalidConfig: VertexAIConfig = {
        provider: 'vertexai',
        projectId: '',
        location: 'us-central1',
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should validate VertexAI with authentication options', () => {
      const configWithAuth: VertexAIConfig = {
        provider: 'vertexai',
        projectId: 'test-project',
        location: 'us-central1',
        authOptions: {
          credentials: {
            client_email: 'test@example.com',
            private_key: 'test-private-key',
          },
        },
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithAuth)).not.toThrow();
    });

    it('should validate VertexAI with context caching enabled', () => {
      const configWithCaching: VertexAIConfig = {
        provider: 'vertexai',
        projectId: 'test-project',
        location: 'us-central1',
        contextCaching: {
          cachedContentId: 'cache-123',
          ttlSeconds: 3600,
        },
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithCaching)).not.toThrow();
    });
  });

  describe('Ollama Configuration Validation', () => {
    it('should validate valid Ollama configuration', () => {
      const validConfig: OllamaConfig = {
        provider: 'ollama',
        baseUrl: 'http://localhost:11434',
        classificationModel: 'llama3.1:8b',
        extractionModel: 'llama3.1:70b',
        temperature: 0.1,
        maxTokens: 2000,
      };

      expect(() => ConfigValidator.validateProviderConfig(validConfig)).not.toThrow();
    });

    it('should validate minimal Ollama configuration with default URL', () => {
      const minimalConfig: OllamaConfig = {
        provider: 'ollama',
      };

      expect(() => ConfigValidator.validateProviderConfig(minimalConfig)).not.toThrow();
    });

    it('should validate Ollama with custom base URL', () => {
      const configWithCustomURL: OllamaConfig = {
        provider: 'ollama',
        baseUrl: 'http://custom-ollama-server:11434',
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithCustomURL)).not.toThrow();
    });

    it('should throw error for invalid Ollama base URL', () => {
      const invalidConfig: OllamaConfig = {
        provider: 'ollama',
        baseUrl: 'invalid-url',
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should validate Ollama with performance options', () => {
      const configWithPerformance: OllamaConfig = {
        provider: 'ollama',
        baseUrl: 'http://localhost:11434',
        requestOptions: {
          numGpu: 1,
          numThread: 8,
          useMmap: true,
        },
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithPerformance)).not.toThrow();
    });

    it('should validate Ollama with multimodal support', () => {
      const configWithMultimodal: OllamaConfig = {
        provider: 'ollama',
        baseUrl: 'http://localhost:11434',
        enableMultimodal: true,
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithMultimodal)).not.toThrow();
    });
  });

  describe('General Configuration Validation', () => {
    it('should throw error for unknown provider', () => {
      const invalidConfig = {
        provider: 'unknown-provider',
        apiKey: 'test-key',
      } as unknown as AIProviderConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for missing provider field', () => {
      const invalidConfig = {
        apiKey: 'test-key',
      } as AIProviderConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should validate temperature range for all providers', () => {
      const providers = ['openai', 'anthropic', 'vertexai', 'ollama'] as const;

      for (const provider of providers) {
        let baseConfig: AIProviderConfig;

        switch (provider) {
          case 'openai':
            baseConfig = { provider, apiKey: 'sk-test' };
            break;
          case 'anthropic':
            baseConfig = { provider, apiKey: 'sk-ant-test' };
            break;
          case 'vertexai':
            baseConfig = { provider, projectId: 'test', location: 'us-central1' };
            break;
          case 'ollama':
            baseConfig = { provider };
            break;
        }

        // Valid temperature
        const validConfig = { ...baseConfig, temperature: 0.5 };
        expect(() => ConfigValidator.validateProviderConfig(validConfig)).not.toThrow();

        // Invalid temperature (too low)
        const invalidLowConfig = { ...baseConfig, temperature: -0.1 };
        expect(() => ConfigValidator.validateProviderConfig(invalidLowConfig)).toThrow(
          ConfigurationError,
        );

        // Invalid temperature (too high)
        const invalidHighConfig = { ...baseConfig, temperature: 2.1 };
        expect(() => ConfigValidator.validateProviderConfig(invalidHighConfig)).toThrow(
          ConfigurationError,
        );
      }
    });

    it('should validate max tokens for all providers', () => {
      const providers = ['openai', 'anthropic', 'vertexai', 'ollama'] as const;

      for (const provider of providers) {
        let baseConfig: AIProviderConfig;

        switch (provider) {
          case 'openai':
            baseConfig = { provider, apiKey: 'sk-test' };
            break;
          case 'anthropic':
            baseConfig = { provider, apiKey: 'sk-ant-test' };
            break;
          case 'vertexai':
            baseConfig = { provider, projectId: 'test', location: 'us-central1' };
            break;
          case 'ollama':
            baseConfig = { provider };
            break;
        }

        // Valid max tokens
        const validConfig = { ...baseConfig, maxTokens: 1000 };
        expect(() => ConfigValidator.validateProviderConfig(validConfig)).not.toThrow();

        // Invalid max tokens (too low)
        const invalidConfig = { ...baseConfig, maxTokens: 0 };
        expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
          ConfigurationError,
        );
      }
    });

    it('should validate model names when provided', () => {
      const configs: AIProviderConfig[] = [
        {
          provider: 'openai',
          apiKey: 'sk-test',
          classificationModel: 'gpt-3.5-turbo',
          extractionModel: 'gpt-4o',
        },
        {
          provider: 'anthropic',
          apiKey: 'sk-ant-test',
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
          classificationModel: 'llama3.1:8b',
          extractionModel: 'llama3.1:70b',
        },
      ];

      for (const config of configs) {
        expect(() => ConfigValidator.validateProviderConfig(config)).not.toThrow();
      }
    });
  });

  describe('Error Messages', () => {
    it('should provide helpful error messages', () => {
      const invalidConfig: OpenAIConfig = {
        provider: 'openai',
        apiKey: '',
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        expect.objectContaining({
          message: expect.stringContaining('API key'),
        }),
      );
    });

    it('should include provider context in error messages', () => {
      const invalidConfig: VertexAIConfig = {
        provider: 'vertexai',
        projectId: '',
        location: 'us-central1',
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        expect.objectContaining({
          message: expect.stringContaining('project'),
        }),
      );
    });
  });
});
