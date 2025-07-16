/**
 * Anthropic provider implementation
 */

import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { ConfigurationError } from '../../types';
import {
  AIProviderConfig,
  AnthropicConfig,
  AnthropicModel,
  LLMProvider,
  ModelCapabilities,
} from '../../types/providers';
import { ProviderDetector } from '../provider-factory';

/**
 * Anthropic provider implementation
 */
export class AnthropicProvider implements LLMProvider {
  readonly name = 'anthropic' as const;

  /**
   * Create a chat model instance for classification
   */
  createClassificationModel(config: AIProviderConfig): BaseChatModel {
    if (config.provider !== 'anthropic') {
      throw new ConfigurationError('Invalid provider configuration for Anthropic');
    }

    const { ChatAnthropic } = require('@langchain/anthropic');

    const clientOptions: Record<string, any> = {};

    // Add prompt caching header if enabled
    if (config.enablePromptCaching) {
      clientOptions.defaultHeaders = {
        'anthropic-beta': 'prompt-caching-2024-07-31',
        ...config.customHeaders,
      };
    } else if (config.customHeaders) {
      clientOptions.defaultHeaders = config.customHeaders;
    }

    return new ChatAnthropic({
      model: config.classificationModel || 'claude-3-haiku-20240307',
      temperature: config.temperature || 0.1,
      maxTokens: config.maxTokens || 2000,
      maxRetries: config.maxRetries || 2,
      apiKey: config.apiKey,
      ...(Object.keys(clientOptions).length > 0 && { clientOptions }),
    });
  }

  /**
   * Create a chat model instance for extraction
   */
  createExtractionModel(config: AIProviderConfig): BaseChatModel {
    if (config.provider !== 'anthropic') {
      throw new ConfigurationError('Invalid provider configuration for Anthropic');
    }

    const { ChatAnthropic } = require('@langchain/anthropic');

    const clientOptions: Record<string, any> = {};

    // Add prompt caching header if enabled
    if (config.enablePromptCaching) {
      clientOptions.defaultHeaders = {
        'anthropic-beta': 'prompt-caching-2024-07-31',
        ...config.customHeaders,
      };
    } else if (config.customHeaders) {
      clientOptions.defaultHeaders = config.customHeaders;
    }

    return new ChatAnthropic({
      model: config.extractionModel || 'claude-3-5-sonnet-20241022',
      temperature: config.temperature || 0.1,
      maxTokens: config.maxTokens || 2000,
      maxRetries: config.maxRetries || 2,
      apiKey: config.apiKey,
      ...(Object.keys(clientOptions).length > 0 && { clientOptions }),
    });
  }

  /**
   * Validate Anthropic-specific configuration
   */
  validateConfig(config: AIProviderConfig): void {
    if (config.provider !== 'anthropic') {
      throw new ConfigurationError('Invalid provider configuration for Anthropic');
    }

    const anthropicConfig = config as AnthropicConfig;

    if (!anthropicConfig.apiKey) {
      throw new ConfigurationError('Anthropic API key is required');
    }

    if (!anthropicConfig.apiKey.startsWith('sk-ant-')) {
      throw new ConfigurationError('Anthropic API key must start with "sk-ant-"');
    }

    if (
      anthropicConfig.classificationModel &&
      !this.isValidModel(anthropicConfig.classificationModel)
    ) {
      throw new ConfigurationError(
        `Invalid Anthropic classification model: ${anthropicConfig.classificationModel}`,
      );
    }

    if (anthropicConfig.extractionModel && !this.isValidModel(anthropicConfig.extractionModel)) {
      throw new ConfigurationError(
        `Invalid Anthropic extraction model: ${anthropicConfig.extractionModel}`,
      );
    }

    if (
      anthropicConfig.temperature !== undefined &&
      (anthropicConfig.temperature < 0 || anthropicConfig.temperature > 1)
    ) {
      throw new ConfigurationError('Temperature must be between 0 and 1 for Anthropic models');
    }

    if (anthropicConfig.maxTokens !== undefined && anthropicConfig.maxTokens <= 0) {
      throw new ConfigurationError('Max tokens must be greater than 0');
    }

    if (anthropicConfig.maxTokens !== undefined && anthropicConfig.maxTokens > 8192) {
      throw new ConfigurationError('Max tokens cannot exceed 8192 for Anthropic models');
    }

    if (anthropicConfig.maxRetries !== undefined && anthropicConfig.maxRetries < 0) {
      throw new ConfigurationError('Max retries must be non-negative');
    }
  }

  /**
   * Get model capabilities for a specific Anthropic model
   */
  getModelCapabilities(modelName: string): ModelCapabilities {
    const anthropicModel = modelName as AnthropicModel;

    // Base capabilities for all Anthropic models
    const baseCapabilities: ModelCapabilities = {
      supportsToolCalling: true,
      supportsStructuredOutput: true,
      supportsJsonMode: false, // Anthropic doesn't have explicit JSON mode
      supportsImageInput: true,
      supportsAudioInput: false,
      supportsVideoInput: false,
      supportsStreaming: true,
      supportsTokenUsage: true,
      maxContextLength: 200000,
      maxOutputTokens: 8192,
    };

    // Model-specific overrides
    switch (anthropicModel) {
      case 'claude-3-5-sonnet-20241022':
      case 'claude-3-5-sonnet-20240620':
        return {
          ...baseCapabilities,
          maxContextLength: 200000,
          maxOutputTokens: 8192,
        };

      case 'claude-3-5-haiku-20241022':
        return {
          ...baseCapabilities,
          maxContextLength: 200000,
          maxOutputTokens: 8192,
        };

      case 'claude-3-opus-20240229':
        return {
          ...baseCapabilities,
          maxContextLength: 200000,
          maxOutputTokens: 4096,
        };

      case 'claude-3-sonnet-20240229':
        return {
          ...baseCapabilities,
          maxContextLength: 200000,
          maxOutputTokens: 4096,
        };

      case 'claude-3-haiku-20240307':
        return {
          ...baseCapabilities,
          maxContextLength: 200000,
          maxOutputTokens: 4096,
        };

      default:
        return baseCapabilities;
    }
  }

  /**
   * Check if the Anthropic provider is available
   */
  isAvailable(): boolean {
    return ProviderDetector.isProviderInstalled('anthropic');
  }

  /**
   * Check if a model name is valid for Anthropic
   */
  private isValidModel(model: string): boolean {
    const validModels: AnthropicModel[] = [
      'claude-3-5-sonnet-20241022',
      'claude-3-5-sonnet-20240620',
      'claude-3-5-haiku-20241022',
      'claude-3-opus-20240229',
      'claude-3-sonnet-20240229',
      'claude-3-haiku-20240307',
    ];

    return validModels.includes(model as AnthropicModel);
  }

  /**
   * Get recommended models for different use cases
   */
  static getRecommendedModels() {
    return {
      classification: 'claude-3-haiku-20240307' as AnthropicModel,
      extraction: 'claude-3-5-sonnet-20241022' as AnthropicModel,
      highAccuracy: 'claude-3-5-sonnet-20241022' as AnthropicModel,
      costEffective: 'claude-3-haiku-20240307' as AnthropicModel,
      balanced: 'claude-3-sonnet-20240229' as AnthropicModel,
    };
  }

  /**
   * Get model pricing tier information
   */
  static getModelPricing(model: AnthropicModel): {
    tier: 'low' | 'medium' | 'high';
    description: string;
  } {
    switch (model) {
      case 'claude-3-haiku-20240307':
        return { tier: 'low', description: 'Fastest and most cost-effective model' };
      case 'claude-3-sonnet-20240229':
        return { tier: 'medium', description: 'Balanced performance and cost' };
      case 'claude-3-5-sonnet-20241022':
      case 'claude-3-5-sonnet-20240620':
        return { tier: 'medium', description: 'Enhanced Sonnet with improved capabilities' };
      case 'claude-3-5-haiku-20241022':
        return { tier: 'low', description: 'Enhanced Haiku with improved speed' };
      case 'claude-3-opus-20240229':
        return { tier: 'high', description: 'Most capable model with highest accuracy' };
      default:
        return { tier: 'medium', description: 'Standard pricing' };
    }
  }
}
