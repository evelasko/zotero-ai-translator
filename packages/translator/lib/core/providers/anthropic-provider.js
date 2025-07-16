"use strict";
/**
 * Anthropic provider implementation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicProvider = void 0;
const types_1 = require("../../types");
const provider_factory_1 = require("../provider-factory");
/**
 * Anthropic provider implementation
 */
class AnthropicProvider {
    name = 'anthropic';
    /**
     * Create a chat model instance for classification
     */
    createClassificationModel(config) {
        if (config.provider !== 'anthropic') {
            throw new types_1.ConfigurationError('Invalid provider configuration for Anthropic');
        }
        const { ChatAnthropic } = require('@langchain/anthropic');
        const clientOptions = {};
        // Add prompt caching header if enabled
        if (config.enablePromptCaching) {
            clientOptions.defaultHeaders = {
                'anthropic-beta': 'prompt-caching-2024-07-31',
                ...config.customHeaders,
            };
        }
        else if (config.customHeaders) {
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
    createExtractionModel(config) {
        if (config.provider !== 'anthropic') {
            throw new types_1.ConfigurationError('Invalid provider configuration for Anthropic');
        }
        const { ChatAnthropic } = require('@langchain/anthropic');
        const clientOptions = {};
        // Add prompt caching header if enabled
        if (config.enablePromptCaching) {
            clientOptions.defaultHeaders = {
                'anthropic-beta': 'prompt-caching-2024-07-31',
                ...config.customHeaders,
            };
        }
        else if (config.customHeaders) {
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
    validateConfig(config) {
        if (config.provider !== 'anthropic') {
            throw new types_1.ConfigurationError('Invalid provider configuration for Anthropic');
        }
        const anthropicConfig = config;
        if (!anthropicConfig.apiKey) {
            throw new types_1.ConfigurationError('Anthropic API key is required');
        }
        if (!anthropicConfig.apiKey.startsWith('sk-ant-')) {
            throw new types_1.ConfigurationError('Anthropic API key must start with "sk-ant-"');
        }
        if (anthropicConfig.classificationModel &&
            !this.isValidModel(anthropicConfig.classificationModel)) {
            throw new types_1.ConfigurationError(`Invalid Anthropic classification model: ${anthropicConfig.classificationModel}`);
        }
        if (anthropicConfig.extractionModel && !this.isValidModel(anthropicConfig.extractionModel)) {
            throw new types_1.ConfigurationError(`Invalid Anthropic extraction model: ${anthropicConfig.extractionModel}`);
        }
        if (anthropicConfig.temperature !== undefined &&
            (anthropicConfig.temperature < 0 || anthropicConfig.temperature > 1)) {
            throw new types_1.ConfigurationError('Temperature must be between 0 and 1 for Anthropic models');
        }
        if (anthropicConfig.maxTokens !== undefined && anthropicConfig.maxTokens <= 0) {
            throw new types_1.ConfigurationError('Max tokens must be greater than 0');
        }
        if (anthropicConfig.maxTokens !== undefined && anthropicConfig.maxTokens > 8192) {
            throw new types_1.ConfigurationError('Max tokens cannot exceed 8192 for Anthropic models');
        }
        if (anthropicConfig.maxRetries !== undefined && anthropicConfig.maxRetries < 0) {
            throw new types_1.ConfigurationError('Max retries must be non-negative');
        }
    }
    /**
     * Get model capabilities for a specific Anthropic model
     */
    getModelCapabilities(modelName) {
        const anthropicModel = modelName;
        // Base capabilities for all Anthropic models
        const baseCapabilities = {
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
    isAvailable() {
        return provider_factory_1.ProviderDetector.isProviderInstalled('anthropic');
    }
    /**
     * Check if a model name is valid for Anthropic
     */
    isValidModel(model) {
        const validModels = [
            'claude-3-5-sonnet-20241022',
            'claude-3-5-sonnet-20240620',
            'claude-3-5-haiku-20241022',
            'claude-3-opus-20240229',
            'claude-3-sonnet-20240229',
            'claude-3-haiku-20240307',
        ];
        return validModels.includes(model);
    }
    /**
     * Get recommended models for different use cases
     */
    static getRecommendedModels() {
        return {
            classification: 'claude-3-haiku-20240307',
            extraction: 'claude-3-5-sonnet-20241022',
            highAccuracy: 'claude-3-5-sonnet-20241022',
            costEffective: 'claude-3-haiku-20240307',
            balanced: 'claude-3-sonnet-20240229',
        };
    }
    /**
     * Get model pricing tier information
     */
    static getModelPricing(model) {
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
exports.AnthropicProvider = AnthropicProvider;
