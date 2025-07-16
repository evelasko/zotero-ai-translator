"use strict";
/**
 * OpenAI provider implementation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIProvider = void 0;
const types_1 = require("../../types");
const provider_factory_1 = require("../provider-factory");
/**
 * OpenAI provider implementation
 */
class OpenAIProvider {
    name = 'openai';
    /**
     * Create a chat model instance for classification
     */
    createClassificationModel(config) {
        if (config.provider !== 'openai') {
            throw new types_1.ConfigurationError('Invalid provider configuration for OpenAI');
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
        }
        catch (error) {
            throw new types_1.ConfigurationError('OpenAI provider not available. Please install @langchain/openai');
        }
    }
    /**
     * Create a chat model instance for extraction
     */
    createExtractionModel(config) {
        if (config.provider !== 'openai') {
            throw new types_1.ConfigurationError('Invalid provider configuration for OpenAI');
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
        }
        catch (error) {
            throw new types_1.ConfigurationError('OpenAI provider not available. Please install @langchain/openai');
        }
    }
    /**
     * Validate OpenAI-specific configuration
     */
    validateConfig(config) {
        if (config.provider !== 'openai') {
            throw new types_1.ConfigurationError('Invalid provider configuration for OpenAI');
        }
        const openaiConfig = config;
        if (!openaiConfig.apiKey) {
            throw new types_1.ConfigurationError('OpenAI API key is required');
        }
        if (!openaiConfig.apiKey.startsWith('sk-')) {
            throw new types_1.ConfigurationError('OpenAI API key must start with "sk-"');
        }
        if (openaiConfig.classificationModel && !this.isValidModel(openaiConfig.classificationModel)) {
            throw new types_1.ConfigurationError(`Invalid OpenAI classification model: ${openaiConfig.classificationModel}`);
        }
        if (openaiConfig.extractionModel && !this.isValidModel(openaiConfig.extractionModel)) {
            throw new types_1.ConfigurationError(`Invalid OpenAI extraction model: ${openaiConfig.extractionModel}`);
        }
        if (openaiConfig.temperature !== undefined &&
            (openaiConfig.temperature < 0 || openaiConfig.temperature > 2)) {
            throw new types_1.ConfigurationError('Temperature must be between 0 and 2');
        }
        if (openaiConfig.maxTokens !== undefined && openaiConfig.maxTokens <= 0) {
            throw new types_1.ConfigurationError('Max tokens must be greater than 0');
        }
        if (openaiConfig.maxRetries !== undefined && openaiConfig.maxRetries < 0) {
            throw new types_1.ConfigurationError('Max retries must be non-negative');
        }
    }
    /**
     * Get model capabilities for a specific OpenAI model
     */
    getModelCapabilities(modelName) {
        const openaiModel = modelName;
        // Base capabilities for all OpenAI models
        const baseCapabilities = {
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
    isAvailable() {
        return provider_factory_1.ProviderDetector.isProviderInstalled('openai');
    }
    /**
     * Check if a model name is valid for OpenAI
     */
    isValidModel(model) {
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
        return validModels.includes(model);
    }
    /**
     * Get recommended models for different use cases
     */
    static getRecommendedModels() {
        return {
            classification: 'gpt-4o-mini',
            extraction: 'gpt-4o-mini',
            highAccuracy: 'gpt-4o',
            costEffective: 'gpt-3.5-turbo',
        };
    }
}
exports.OpenAIProvider = OpenAIProvider;
