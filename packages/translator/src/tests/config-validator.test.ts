/**
 * Tests for the ConfigValidator class - Anthropic-only version
 */

import { describe, expect, it } from 'vitest';
import { ConfigValidator } from '../core/config-validator';
import {
  AnthropicConfig,
  ConfigurationError,
} from '../types';

describe('ConfigValidator', () => {
  describe('Anthropic Configuration Validation', () => {
    it('should validate valid Anthropic configuration', () => {
      const validConfig: AnthropicConfig = {
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
        apiKey: 'sk-ant-test-key',
      };

      expect(() => ConfigValidator.validateProviderConfig(minimalConfig)).not.toThrow();
    });

    it('should throw error for missing Anthropic API key', () => {
      const invalidConfig = {
        // Missing apiKey
      } as AnthropicConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for empty Anthropic API key', () => {
      const invalidConfig: AnthropicConfig = {
        apiKey: '',
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for invalid Anthropic API key format', () => {
      const invalidConfig: AnthropicConfig = {
        apiKey: 'invalid-key-format',
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for non-string API key', () => {
      const invalidConfig = {
        apiKey: 123,
      } as unknown as AnthropicConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should validate Anthropic with custom headers', () => {
      const configWithHeaders: AnthropicConfig = {
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
        apiKey: 'sk-ant-test-key',
        enablePromptCaching: true,
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithCaching)).not.toThrow();
    });

    it('should validate Anthropic with browser access enabled', () => {
      const configWithBrowserAccess: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        enableDangerousBrowserAccess: true,
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithBrowserAccess)).not.toThrow();
    });

    it('should throw error for invalid temperature', () => {
      const invalidLowConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        temperature: -1,
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidLowConfig)).toThrow(
        ConfigurationError,
      );

      const invalidHighConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        temperature: 2,
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidHighConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for non-number temperature', () => {
      const invalidConfig = {
        apiKey: 'sk-ant-test-key',
        temperature: 'invalid',
      } as unknown as AnthropicConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for invalid max tokens', () => {
      const invalidConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        maxTokens: 0,
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );

      const tooHighConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        maxTokens: 10000,
      };

      expect(() => ConfigValidator.validateProviderConfig(tooHighConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for non-integer max tokens', () => {
      const invalidConfig = {
        apiKey: 'sk-ant-test-key',
        maxTokens: 'invalid',
      } as unknown as AnthropicConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );

      const floatConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        maxTokens: 1000.5,
      };

      expect(() => ConfigValidator.validateProviderConfig(floatConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for invalid max retries', () => {
      const invalidConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        maxRetries: -1,
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );

      const nonIntegerConfig = {
        apiKey: 'sk-ant-test-key',
        maxRetries: 'invalid',
      } as unknown as AnthropicConfig;

      expect(() => ConfigValidator.validateProviderConfig(nonIntegerConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for invalid timeout', () => {
      const invalidConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        timeout: 0,
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );

      const nonIntegerConfig = {
        apiKey: 'sk-ant-test-key',
        timeout: 'invalid',
      } as unknown as AnthropicConfig;

      expect(() => ConfigValidator.validateProviderConfig(nonIntegerConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for invalid boolean fields', () => {
      const invalidCachingConfig = {
        apiKey: 'sk-ant-test-key',
        enablePromptCaching: 'invalid',
      } as unknown as AnthropicConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidCachingConfig)).toThrow(
        ConfigurationError,
      );

      const invalidBrowserConfig = {
        apiKey: 'sk-ant-test-key',
        enableDangerousBrowserAccess: 'invalid',
      } as unknown as AnthropicConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidBrowserConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should throw error for invalid custom headers', () => {
      const invalidConfig = {
        apiKey: 'sk-ant-test-key',
        customHeaders: 'invalid',
      } as unknown as AnthropicConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        ConfigurationError,
      );

      const arrayConfig = {
        apiKey: 'sk-ant-test-key',
        customHeaders: ['invalid'],
      } as unknown as AnthropicConfig;

      expect(() => ConfigValidator.validateProviderConfig(arrayConfig)).toThrow(
        ConfigurationError,
      );
    });

    it('should validate valid Anthropic model names', () => {
      const validModels = [
        'claude-3-5-sonnet-20241022',
        'claude-3-5-sonnet-20240620',
        'claude-3-5-haiku-20241022',
        'claude-3-opus-20240229',
        'claude-3-sonnet-20240229',
        'claude-3-haiku-20240307',
      ];

      for (const model of validModels) {
        const config: AnthropicConfig = {
          apiKey: 'sk-ant-test-key',
          classificationModel: model,
          extractionModel: model,
        };

        expect(() => ConfigValidator.validateProviderConfig(config)).not.toThrow();
      }
    });

    it('should throw error for invalid Anthropic model names', () => {
      const invalidModel = 'invalid-model-name';

      const configWithInvalidClassificationModel: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        classificationModel: invalidModel,
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithInvalidClassificationModel)).toThrow(
        ConfigurationError,
      );

      const configWithInvalidExtractionModel: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        extractionModel: invalidModel,
      };

      expect(() => ConfigValidator.validateProviderConfig(configWithInvalidExtractionModel)).toThrow(
        ConfigurationError,
      );
    });

    it('should accept valid configuration with all optional fields', () => {
      const fullConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        classificationModel: 'claude-3-haiku-20240307',
        extractionModel: 'claude-3-5-sonnet-20241022',
        temperature: 0.2,
        maxTokens: 4000,
        maxRetries: 3,
        timeout: 60000,
        enablePromptCaching: true,
        enableDangerousBrowserAccess: true,
        customHeaders: {
          'User-Agent': 'ZoteroAI/1.0',
          'X-Custom-Header': 'test-value',
        },
      };

      expect(() => ConfigValidator.validateProviderConfig(fullConfig)).not.toThrow();
    });
  });

  describe('Configuration Recommendations', () => {
    it('should provide valid configuration recommendations', () => {
      const recommendations = ConfigValidator.getConfigurationRecommendations();
      
      expect(recommendations).toHaveProperty('classificationModel');
      expect(recommendations).toHaveProperty('extractionModel');
      expect(recommendations).toHaveProperty('temperature');
      expect(recommendations).toHaveProperty('maxTokens');
      expect(recommendations).toHaveProperty('maxRetries');
      expect(recommendations).toHaveProperty('timeout');
      expect(recommendations).toHaveProperty('enablePromptCaching');
      expect(recommendations).toHaveProperty('enableDangerousBrowserAccess');
      
      // Verify that recommendations are valid
      const recommendedConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        ...recommendations,
      };
      
      expect(() => ConfigValidator.validateProviderConfig(recommendedConfig)).not.toThrow();
    });

    it('should recommend appropriate models', () => {
      const recommendations = ConfigValidator.getConfigurationRecommendations();
      
      expect(recommendations.classificationModel).toBe('claude-3-haiku-20240307');
      expect(recommendations.extractionModel).toBe('claude-3-5-sonnet-20241022');
    });

    it('should recommend browser-safe defaults', () => {
      const recommendations = ConfigValidator.getConfigurationRecommendations();
      
      expect(recommendations.enableDangerousBrowserAccess).toBe(false);
      expect(recommendations.enablePromptCaching).toBe(false);
    });
  });

  describe('Error Messages', () => {
    it('should provide helpful error messages for missing API key', () => {
      const invalidConfig = {} as AnthropicConfig;

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        expect.objectContaining({
          message: expect.stringContaining('API key'),
        }),
      );
    });

    it('should provide helpful error messages for invalid API key format', () => {
      const invalidConfig: AnthropicConfig = {
        apiKey: 'invalid-format',
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        expect.objectContaining({
          message: expect.stringContaining('sk-ant-'),
        }),
      );
    });

    it('should provide helpful error messages for invalid model names', () => {
      const invalidConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        classificationModel: 'invalid-model',
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        expect.objectContaining({
          message: expect.stringContaining('classification'),
        }),
      );
    });

    it('should provide helpful error messages for invalid temperature', () => {
      const invalidConfig: AnthropicConfig = {
        apiKey: 'sk-ant-test-key',
        temperature: 2.5,
      };

      expect(() => ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(
        expect.objectContaining({
          message: expect.stringContaining('Temperature'),
        }),
      );
    });
  });
});