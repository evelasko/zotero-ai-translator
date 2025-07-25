"use strict";
/**
 * Configuration validation system for Anthropic AI provider
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigValidator = void 0;
const types_1 = require("../types");
/**
 * Configuration validator for Anthropic AI provider
 */
class ConfigValidator {
    /**
     * Validate Anthropic provider configuration
     */
    static validateProviderConfig(config) {
        this.validateAnthropicConfig(config);
    }
    /**
     * Validate Anthropic-specific configuration
     */
    static validateAnthropicConfig(config) {
        if (!config.apiKey) {
            throw new types_1.ConfigurationError('Anthropic API key is required');
        }
        if (typeof config.apiKey !== 'string') {
            throw new types_1.ConfigurationError('Anthropic API key must be a string');
        }
        if (!config.apiKey.startsWith('sk-ant-')) {
            throw new types_1.ConfigurationError('Anthropic API key must start with "sk-ant-"');
        }
        if (config.temperature !== undefined) {
            if (typeof config.temperature !== 'number') {
                throw new types_1.ConfigurationError('Temperature must be a number');
            }
            if (config.temperature < 0 || config.temperature > 1) {
                throw new types_1.ConfigurationError('Temperature must be between 0 and 1 for Anthropic models');
            }
        }
        if (config.maxTokens !== undefined) {
            if (typeof config.maxTokens !== 'number' || !Number.isInteger(config.maxTokens)) {
                throw new types_1.ConfigurationError('Max tokens must be an integer');
            }
            if (config.maxTokens <= 0) {
                throw new types_1.ConfigurationError('Max tokens must be greater than 0');
            }
            if (config.maxTokens > 8192) {
                throw new types_1.ConfigurationError('Max tokens cannot exceed 8192 for Anthropic models');
            }
        }
        if (config.maxRetries !== undefined) {
            if (typeof config.maxRetries !== 'number' || !Number.isInteger(config.maxRetries)) {
                throw new types_1.ConfigurationError('Max retries must be an integer');
            }
            if (config.maxRetries < 0) {
                throw new types_1.ConfigurationError('Max retries must be non-negative');
            }
        }
        if (config.timeout !== undefined) {
            if (typeof config.timeout !== 'number' || !Number.isInteger(config.timeout)) {
                throw new types_1.ConfigurationError('Timeout must be an integer');
            }
            if (config.timeout <= 0) {
                throw new types_1.ConfigurationError('Timeout must be greater than 0');
            }
        }
        if (config.enablePromptCaching !== undefined &&
            typeof config.enablePromptCaching !== 'boolean') {
            throw new types_1.ConfigurationError('Enable prompt caching must be a boolean');
        }
        if (config.enableDangerousBrowserAccess !== undefined &&
            typeof config.enableDangerousBrowserAccess !== 'boolean') {
            throw new types_1.ConfigurationError('Enable dangerous browser access must be a boolean');
        }
        if (config.customHeaders) {
            if (typeof config.customHeaders !== 'object' || Array.isArray(config.customHeaders)) {
                throw new types_1.ConfigurationError('Custom headers must be an object');
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
    static validateAnthropicModel(model, modelType) {
        const validModels = [
            'claude-3-5-sonnet-20241022',
            'claude-3-5-sonnet-20240620',
            'claude-3-5-haiku-20241022',
            'claude-3-opus-20240229',
            'claude-3-sonnet-20240229',
            'claude-3-haiku-20240307',
        ];
        if (!validModels.includes(model)) {
            throw new types_1.ConfigurationError(`Invalid Anthropic ${modelType} model: ${model}. Valid models: ${validModels.join(', ')}`);
        }
    }
    /**
     * Get configuration recommendations for Anthropic
     */
    static getConfigurationRecommendations() {
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
exports.ConfigValidator = ConfigValidator;
