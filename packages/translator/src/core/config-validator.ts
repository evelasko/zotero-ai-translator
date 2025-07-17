/**
 * Configuration validation system for Anthropic AI provider
 */

import { ConfigurationError, AnthropicConfig } from '../types';

/**
 * Configuration validator for Anthropic AI provider
 */
export class ConfigValidator {
  /**
   * Validate Anthropic provider configuration
   */
  static validateProviderConfig(config: AnthropicConfig): void {
    this.validateAnthropicConfig(config);
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

    if (config.temperature !== undefined) {
      if (typeof config.temperature !== 'number') {
        throw new ConfigurationError('Temperature must be a number');
      }
      if (config.temperature < 0 || config.temperature > 1) {
        throw new ConfigurationError('Temperature must be between 0 and 1 for Anthropic models');
      }
    }

    if (config.maxTokens !== undefined) {
      if (typeof config.maxTokens !== 'number' || !Number.isInteger(config.maxTokens)) {
        throw new ConfigurationError('Max tokens must be an integer');
      }
      if (config.maxTokens <= 0) {
        throw new ConfigurationError('Max tokens must be greater than 0');
      }
      if (config.maxTokens > 8192) {
        throw new ConfigurationError('Max tokens cannot exceed 8192 for Anthropic models');
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

    if (config.timeout !== undefined) {
      if (typeof config.timeout !== 'number' || !Number.isInteger(config.timeout)) {
        throw new ConfigurationError('Timeout must be an integer');
      }
      if (config.timeout <= 0) {
        throw new ConfigurationError('Timeout must be greater than 0');
      }
    }

    if (
      config.enablePromptCaching !== undefined &&
      typeof config.enablePromptCaching !== 'boolean'
    ) {
      throw new ConfigurationError('Enable prompt caching must be a boolean');
    }

    if (
      config.enableDangerousBrowserAccess !== undefined &&
      typeof config.enableDangerousBrowserAccess !== 'boolean'
    ) {
      throw new ConfigurationError('Enable dangerous browser access must be a boolean');
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
        `Invalid Anthropic ${modelType} model: ${model}. Valid models: ${validModels.join(', ')}`
      );
    }
  }

  /**
   * Get configuration recommendations for Anthropic
   */
  static getConfigurationRecommendations(): Record<string, string | number | boolean> {
    return {
      classificationModel: 'claude-3-haiku-20240307',
      extractionModel: 'claude-3-5-sonnet-20241022',
      temperature: 0.1,
      maxTokens: 4096,
      maxRetries: 2,
      timeout: 30000,
      enablePromptCaching: false,
      enableDangerousBrowserAccess: false,
    };
  }
}