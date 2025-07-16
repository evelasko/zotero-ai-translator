/**
 * Configuration validation system for all providers
 */

import { ConfigurationError } from '../types';
import {
  AIProviderConfig,
  AnthropicConfig,
  OllamaConfig,
  OpenAIConfig,
  ProviderName,
  VertexAIConfig,
} from '../types/providers';
import { ProviderDetector } from './provider-factory';

/**
 * Configuration validator for all AI providers
 */
export class ConfigValidator {
  /**
   * Validate any provider configuration
   */
  static validateProviderConfig(config: AIProviderConfig): void {
    // Basic validation for all providers
    this.validateBaseConfig(config);

    // Provider-specific validation
    switch (config.provider) {
      case 'openai':
        this.validateOpenAIConfig(config);
        break;
      case 'anthropic':
        this.validateAnthropicConfig(config);
        break;
      case 'vertexai':
        this.validateVertexAIConfig(config);
        break;
      case 'ollama':
        this.validateOllamaConfig(config);
        break;
      default:
        throw new ConfigurationError(
          `Unknown provider: ${(config as Record<string, unknown>).provider}`,
        );
    }
  }

  /**
   * Validate base configuration common to all providers
   */
  private static validateBaseConfig(config: AIProviderConfig): void {
    if (!config.provider) {
      throw new ConfigurationError('Provider is required');
    }

    if (config.temperature !== undefined) {
      if (typeof config.temperature !== 'number') {
        throw new ConfigurationError('Temperature must be a number');
      }
      if (config.temperature < 0 || config.temperature > 2) {
        throw new ConfigurationError('Temperature must be between 0 and 2');
      }
    }

    if (config.maxTokens !== undefined) {
      if (typeof config.maxTokens !== 'number' || !Number.isInteger(config.maxTokens)) {
        throw new ConfigurationError('Max tokens must be an integer');
      }
      if (config.maxTokens <= 0) {
        throw new ConfigurationError('Max tokens must be greater than 0');
      }
    }

    if (config.maxRetries !== undefined) {
      if (typeof config.maxRetries !== 'number' || !Number.isInteger(config.maxRetries)) {
        throw new ConfigurationError('Max retries must be an integer');
      }
      if (config.maxRetries < 0) {
        throw new ConfigurationError('Max retries must be non-negative');
      }
    }
  }

  /**
   * Validate OpenAI-specific configuration
   */
  private static validateOpenAIConfig(config: OpenAIConfig): void {
    if (!config.apiKey) {
      throw new ConfigurationError('OpenAI API key is required');
    }

    if (typeof config.apiKey !== 'string') {
      throw new ConfigurationError('OpenAI API key must be a string');
    }

    if (!config.apiKey.startsWith('sk-')) {
      throw new ConfigurationError('OpenAI API key must start with "sk-"');
    }

    if (config.baseURL) {
      this.validateUrl(config.baseURL, 'OpenAI base URL');
    }

    if (config.organization && typeof config.organization !== 'string') {
      throw new ConfigurationError('OpenAI organization must be a string');
    }

    // Validate model names if provided
    if (config.classificationModel) {
      this.validateOpenAIModel(config.classificationModel, 'classification');
    }

    if (config.extractionModel) {
      this.validateOpenAIModel(config.extractionModel, 'extraction');
    }
  }

  /**
   * Validate Anthropic-specific configuration
   */
  private static validateAnthropicConfig(config: AnthropicConfig): void {
    if (!config.apiKey) {
      throw new ConfigurationError('Anthropic API key is required');
    }

    if (typeof config.apiKey !== 'string') {
      throw new ConfigurationError('Anthropic API key must be a string');
    }

    if (!config.apiKey.startsWith('sk-ant-')) {
      throw new ConfigurationError('Anthropic API key must start with "sk-ant-"');
    }

    if (
      config.enablePromptCaching !== undefined &&
      typeof config.enablePromptCaching !== 'boolean'
    ) {
      throw new ConfigurationError('Enable prompt caching must be a boolean');
    }

    if (config.customHeaders) {
      if (typeof config.customHeaders !== 'object' || Array.isArray(config.customHeaders)) {
        throw new ConfigurationError('Custom headers must be an object');
      }
    }

    // Validate model names if provided
    if (config.classificationModel) {
      this.validateAnthropicModel(config.classificationModel, 'classification');
    }

    if (config.extractionModel) {
      this.validateAnthropicModel(config.extractionModel, 'extraction');
    }

    // Anthropic has stricter temperature limits
    if (config.temperature !== undefined && config.temperature > 1) {
      throw new ConfigurationError('Temperature must be between 0 and 1 for Anthropic models');
    }

    // Anthropic has token output limits
    if (config.maxTokens !== undefined && config.maxTokens > 8192) {
      throw new ConfigurationError('Max tokens cannot exceed 8192 for Anthropic models');
    }
  }

  /**
   * Validate Vertex AI-specific configuration
   */
  private static validateVertexAIConfig(config: VertexAIConfig): void {
    if (!config.projectId && !process.env.GOOGLE_CLOUD_PROJECT) {
      throw new ConfigurationError(
        'Google Cloud project ID is required (either in config or GOOGLE_CLOUD_PROJECT environment variable)',
      );
    }

    if (config.projectId && typeof config.projectId !== 'string') {
      throw new ConfigurationError('Google Cloud project ID must be a string');
    }

    if (config.location) {
      if (typeof config.location !== 'string') {
        throw new ConfigurationError('Vertex AI location must be a string');
      }

      const validLocations = [
        'us-central1',
        'us-east1',
        'us-east4',
        'us-west1',
        'us-west4',
        'europe-west1',
        'europe-west2',
        'europe-west3',
        'europe-west4',
        'asia-east1',
        'asia-northeast1',
        'asia-southeast1',
        'australia-southeast1',
      ];

      if (!validLocations.includes(config.location)) {
        throw new ConfigurationError(
          `Invalid Vertex AI location: ${config.location}. Valid locations: ${validLocations.join(', ')}`,
        );
      }
    }

    // Validate authentication options
    if (config.authOptions) {
      if (typeof config.authOptions !== 'object') {
        throw new ConfigurationError('Auth options must be an object');
      }

      if (config.authOptions.keyFilename && config.authOptions.credentials) {
        throw new ConfigurationError(
          'Cannot specify both keyFilename and credentials in authOptions',
        );
      }

      if (config.authOptions.keyFilename && typeof config.authOptions.keyFilename !== 'string') {
        throw new ConfigurationError('Key filename must be a string');
      }
    }

    // Validate context caching configuration
    if (config.contextCaching) {
      if (typeof config.contextCaching !== 'object') {
        throw new ConfigurationError('Context caching configuration must be an object');
      }

      if (
        config.contextCaching.cachedContentId &&
        typeof config.contextCaching.cachedContentId !== 'string'
      ) {
        throw new ConfigurationError('Cached content ID must be a string');
      }

      if (config.contextCaching.ttlSeconds !== undefined) {
        if (
          typeof config.contextCaching.ttlSeconds !== 'number' ||
          !Number.isInteger(config.contextCaching.ttlSeconds)
        ) {
          throw new ConfigurationError('Context caching TTL must be an integer');
        }
        if (config.contextCaching.ttlSeconds <= 0) {
          throw new ConfigurationError('Context caching TTL must be greater than 0');
        }
      }
    }

    // Validate model names if provided
    if (config.classificationModel) {
      this.validateVertexAIModel(config.classificationModel, 'classification');
    }

    if (config.extractionModel) {
      this.validateVertexAIModel(config.extractionModel, 'extraction');
    }
  }

  /**
   * Validate Ollama-specific configuration
   */
  private static validateOllamaConfig(config: OllamaConfig): void {
    if (config.baseUrl) {
      this.validateUrl(config.baseUrl, 'Ollama base URL');
    }

    if (config.enableMultimodal !== undefined && typeof config.enableMultimodal !== 'boolean') {
      throw new ConfigurationError('Enable multimodal must be a boolean');
    }

    // Validate request options
    if (config.requestOptions) {
      if (typeof config.requestOptions !== 'object') {
        throw new ConfigurationError('Request options must be an object');
      }

      const { useMmap, numThread, numGpu } = config.requestOptions;

      if (useMmap !== undefined && typeof useMmap !== 'boolean') {
        throw new ConfigurationError('Use mmap must be a boolean');
      }

      if (numThread !== undefined) {
        if (typeof numThread !== 'number' || !Number.isInteger(numThread)) {
          throw new ConfigurationError('Number of threads must be an integer');
        }
        if (numThread <= 0) {
          throw new ConfigurationError('Number of threads must be positive');
        }
      }

      if (numGpu !== undefined) {
        if (typeof numGpu !== 'number' || !Number.isInteger(numGpu)) {
          throw new ConfigurationError('Number of GPU layers must be an integer');
        }
        if (numGpu < 0) {
          throw new ConfigurationError('Number of GPU layers must be non-negative');
        }
      }
    }

    // Validate model names if provided
    if (config.classificationModel) {
      this.validateOllamaModel(config.classificationModel, 'classification');
    }

    if (config.extractionModel) {
      this.validateOllamaModel(config.extractionModel, 'extraction');
    }
  }

  /**
   * Validate URL format
   */
  private static validateUrl(url: string, fieldName: string): void {
    if (typeof url !== 'string') {
      throw new ConfigurationError(`${fieldName} must be a string`);
    }

    try {
      new URL(url);
    } catch (error) {
      throw new ConfigurationError(`Invalid ${fieldName}: ${url}`);
    }
  }

  /**
   * Validate OpenAI model name
   */
  private static validateOpenAIModel(model: string, modelType: string): void {
    const validModels = [
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

    if (!validModels.includes(model)) {
      throw new ConfigurationError(
        `Invalid OpenAI ${modelType} model: ${model}. Valid models: ${validModels.join(', ')}`,
      );
    }
  }

  /**
   * Validate Anthropic model name
   */
  private static validateAnthropicModel(model: string, modelType: string): void {
    const validModels = [
      'claude-3-5-sonnet-20241022',
      'claude-3-5-sonnet-20240620',
      'claude-3-5-haiku-20241022',
      'claude-3-opus-20240229',
      'claude-3-sonnet-20240229',
      'claude-3-haiku-20240307',
    ];

    if (!validModels.includes(model)) {
      throw new ConfigurationError(
        `Invalid Anthropic ${modelType} model: ${model}. Valid models: ${validModels.join(', ')}`,
      );
    }
  }

  /**
   * Validate Vertex AI model name
   */
  private static validateVertexAIModel(model: string, modelType: string): void {
    const validModels = [
      'gemini-1.5-pro',
      'gemini-1.5-pro-002',
      'gemini-1.5-pro-001',
      'gemini-1.5-flash',
      'gemini-1.5-flash-002',
      'gemini-1.5-flash-001',
      'gemini-1.0-pro',
      'gemini-1.0-pro-001',
      'gemini-2.0-flash-exp',
    ];

    if (!validModels.includes(model)) {
      throw new ConfigurationError(
        `Invalid Vertex AI ${modelType} model: ${model}. Valid models: ${validModels.join(', ')}`,
      );
    }
  }

  /**
   * Validate Ollama model name
   */
  private static validateOllamaModel(model: string, modelType: string): void {
    const validModels = [
      'llama3',
      'llama3:8b',
      'llama3:70b',
      'llama3.1',
      'llama3.1:8b',
      'llama3.1:70b',
      'llama3.2',
      'llama3.2:1b',
      'llama3.2:3b',
      'mixtral',
      'mixtral:8x7b',
      'mixtral:8x22b',
      'codellama',
      'codellama:7b',
      'codellama:13b',
      'codellama:34b',
      'mistral',
      'mistral:7b',
      'mistral-nemo',
      'qwen',
      'qwen:7b',
      'qwen:14b',
      'qwen2.5',
      'gemma',
      'gemma:2b',
      'gemma:7b',
      'gemma2',
      'phi',
      'phi3',
      'phi3:mini',
      'phi3:medium',
    ];

    if (!validModels.includes(model)) {
      throw new ConfigurationError(
        `Invalid Ollama ${modelType} model: ${model}. Valid models: ${validModels.join(', ')}`,
      );
    }
  }

  /**
   * Check if a provider is available for use
   */
  static validateProviderAvailability(provider: ProviderName): void {
    if (!ProviderDetector.isProviderInstalled(provider)) {
      const installCommand = ProviderDetector.getInstallationInstructions(provider);
      throw new ConfigurationError(
        `Provider '${provider}' is not available. Please install the required package: ${installCommand}`,
      );
    }
  }

  /**
   * Get configuration recommendations for a provider
   */
  static getConfigurationRecommendations(
    provider: ProviderName,
  ): Record<string, string | number | boolean> {
    const recommendations: Record<ProviderName, Record<string, string | number | boolean>> = {
      openai: {
        classification: 'gpt-4o-mini',
        extraction: 'gpt-4o-mini',
        temperature: 0.1,
        maxTokens: 2000,
        maxRetries: 2,
      },
      anthropic: {
        classification: 'claude-3-haiku-20240307',
        extraction: 'claude-3-5-sonnet-20241022',
        temperature: 0.1,
        maxTokens: 2000,
        maxRetries: 2,
        enablePromptCaching: false,
      },
      vertexai: {
        classification: 'gemini-1.5-flash',
        extraction: 'gemini-1.5-pro',
        temperature: 0.1,
        maxTokens: 2000,
        maxRetries: 2,
        location: 'us-central1',
      },
      ollama: {
        classification: 'llama3.1:8b',
        extraction: 'llama3.1:8b',
        temperature: 0.1,
        maxTokens: 2000,
        maxRetries: 2,
        baseUrl: 'http://localhost:11434',
        enableMultimodal: false,
      },
    };

    return recommendations[provider] || {};
  }
}
