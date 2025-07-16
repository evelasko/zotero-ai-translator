/**
 * OpenAI provider implementation
 */

import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { ConfigurationError } from '../../types';
import {
  AIProviderConfig,
  LLMProvider,
  ModelCapabilities,
  OpenAIConfig,
  OpenAIModel,
} from '../../types/providers';
import { ProviderDetector } from '../provider-factory';

/**
 * OpenAI provider implementation
 */
export class OpenAIProvider implements LLMProvider {
  readonly name = 'openai' as const;

  /**
   * Create a chat model instance for classification
   */
  createClassificationModel(config: AIProviderConfig): BaseChatModel {
    if (config.provider !== 'openai') {
      throw new ConfigurationError('Invalid provider configuration for OpenAI');
    }

    try {
      const { ChatOpenAI } = require('@langchain/openai');

      return new ChatOpenAI({
        modelName: config.classificationModel || 'gpt-4o-mini',
        temperature: config.temperature || 0.1,
        maxTokens: config.maxTokens || 2000,
        maxRetries: config.maxRetries || 2,
        openAIApiKey: config.apiKey,
        configuration: {
          ...(config.baseURL && { baseURL: config.baseURL }),
          ...(config.organization && { organization: config.organization }),
        },
      });
    } catch (error) {
      throw new ConfigurationError('OpenAI provider not available. Please install @langchain/openai');
    }
  }

  /**
   * Create a chat model instance for extraction
   */
  createExtractionModel(config: AIProviderConfig): BaseChatModel {
    if (config.provider !== 'openai') {
      throw new ConfigurationError('Invalid provider configuration for OpenAI');
    }

    try {
      const { ChatOpenAI } = require('@langchain/openai');

      return new ChatOpenAI({
        modelName: config.extractionModel || 'gpt-4o-mini',
        temperature: config.temperature || 0.1,
        maxTokens: config.maxTokens || 2000,
        maxRetries: config.maxRetries || 2,
        openAIApiKey: config.apiKey,
        configuration: {
          ...(config.baseURL && { baseURL: config.baseURL }),
          ...(config.organization && { organization: config.organization }),
        },
      });
    } catch (error) {
      throw new ConfigurationError('OpenAI provider not available. Please install @langchain/openai');
    }
  }

  /**
   * Validate OpenAI-specific configuration
   */
  validateConfig(config: AIProviderConfig): void {
    if (config.provider !== 'openai') {
      throw new ConfigurationError('Invalid provider configuration for OpenAI');
    }

    const openaiConfig = config as OpenAIConfig;

    if (!openaiConfig.apiKey) {
      throw new ConfigurationError('OpenAI API key is required');
    }

    if (!openaiConfig.apiKey.startsWith('sk-')) {
      throw new ConfigurationError('OpenAI API key must start with "sk-"');
    }

    if (openaiConfig.classificationModel && !this.isValidModel(openaiConfig.classificationModel)) {
      throw new ConfigurationError(
        `Invalid OpenAI classification model: ${openaiConfig.classificationModel}`,
      );
    }

    if (openaiConfig.extractionModel && !this.isValidModel(openaiConfig.extractionModel)) {
      throw new ConfigurationError(
        `Invalid OpenAI extraction model: ${openaiConfig.extractionModel}`,
      );
    }

    if (
      openaiConfig.temperature !== undefined &&
      (openaiConfig.temperature < 0 || openaiConfig.temperature > 2)
    ) {
      throw new ConfigurationError('Temperature must be between 0 and 2');
    }

    if (openaiConfig.maxTokens !== undefined && openaiConfig.maxTokens <= 0) {
      throw new ConfigurationError('Max tokens must be greater than 0');
    }

    if (openaiConfig.maxRetries !== undefined && openaiConfig.maxRetries < 0) {
      throw new ConfigurationError('Max retries must be non-negative');
    }
  }

  /**
   * Get model capabilities for a specific OpenAI model
   */
  getModelCapabilities(modelName: string): ModelCapabilities {
    const openaiModel = modelName as OpenAIModel;

    // Base capabilities for all OpenAI models
    const baseCapabilities: ModelCapabilities = {
      supportsToolCalling: true,
      supportsStructuredOutput: true,
      supportsJsonMode: true,
      supportsImageInput: false,
      supportsAudioInput: false,
      supportsVideoInput: false,
      supportsStreaming: true,
      supportsTokenUsage: true,
      maxContextLength: 4096,
      maxOutputTokens: 4096,
    };

    // Model-specific overrides
    switch (openaiModel) {
      case 'gpt-4o':
      case 'gpt-4o-2024-08-06':
      case 'gpt-4o-2024-05-13':
        return {
          ...baseCapabilities,
          supportsImageInput: true,
          supportsAudioInput: true,
          maxContextLength: 128000,
          maxOutputTokens: 16384,
        };

      case 'gpt-4o-mini':
      case 'gpt-4o-mini-2024-07-18':
        return {
          ...baseCapabilities,
          supportsImageInput: true,
          maxContextLength: 128000,
          maxOutputTokens: 16384,
        };

      case 'gpt-4-turbo':
      case 'gpt-4-turbo-2024-04-09':
        return {
          ...baseCapabilities,
          supportsImageInput: true,
          maxContextLength: 128000,
          maxOutputTokens: 4096,
        };

      case 'gpt-4':
      case 'gpt-4-0613':
      case 'gpt-4-0314':
        return {
          ...baseCapabilities,
          maxContextLength: 8192,
          maxOutputTokens: 4096,
        };

      case 'gpt-3.5-turbo':
      case 'gpt-3.5-turbo-0125':
      case 'gpt-3.5-turbo-1106':
        return {
          ...baseCapabilities,
          maxContextLength: 16385,
          maxOutputTokens: 4096,
        };

      default:
        return baseCapabilities;
    }
  }

  /**
   * Check if the OpenAI provider is available
   */
  isAvailable(): boolean {
    return ProviderDetector.isProviderInstalled('openai');
  }

  /**
   * Check if a model name is valid for OpenAI
   */
  private isValidModel(model: string): boolean {
    const validModels: OpenAIModel[] = [
      'gpt-4o',
      'gpt-4o-2024-08-06',
      'gpt-4o-2024-05-13',
      'gpt-4o-mini',
      'gpt-4o-mini-2024-07-18',
      'gpt-4-turbo',
      'gpt-4-turbo-2024-04-09',
      'gpt-4',
      'gpt-4-0613',
      'gpt-4-0314',
      'gpt-3.5-turbo',
      'gpt-3.5-turbo-0125',
      'gpt-3.5-turbo-1106',
    ];

    return validModels.includes(model as OpenAIModel);
  }

  /**
   * Get recommended models for different use cases
   */
  static getRecommendedModels() {
    return {
      classification: 'gpt-4o-mini' as OpenAIModel,
      extraction: 'gpt-4o-mini' as OpenAIModel,
      highAccuracy: 'gpt-4o' as OpenAIModel,
      costEffective: 'gpt-3.5-turbo' as OpenAIModel,
    };
  }
}
