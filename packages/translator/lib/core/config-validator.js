"use strict";
/**
 * Configuration validation system for all providers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigValidator = void 0;
const types_1 = require("../types");
const provider_factory_1 = require("./provider-factory");
/**
 * Configuration validator for all AI providers
 */
class ConfigValidator {
    /**
     * Validate any provider configuration
     */
    static validateProviderConfig(config) {
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
                throw new types_1.ConfigurationError(`Unknown provider: ${config.provider}`);
        }
    }
    /**
     * Validate base configuration common to all providers
     */
    static validateBaseConfig(config) {
        if (!config.provider) {
            throw new types_1.ConfigurationError('Provider is required');
        }
        if (config.temperature !== undefined) {
            if (typeof config.temperature !== 'number') {
                throw new types_1.ConfigurationError('Temperature must be a number');
            }
            if (config.temperature < 0 || config.temperature > 2) {
                throw new types_1.ConfigurationError('Temperature must be between 0 and 2');
            }
        }
        if (config.maxTokens !== undefined) {
            if (typeof config.maxTokens !== 'number' || !Number.isInteger(config.maxTokens)) {
                throw new types_1.ConfigurationError('Max tokens must be an integer');
            }
            if (config.maxTokens <= 0) {
                throw new types_1.ConfigurationError('Max tokens must be greater than 0');
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
    }
    /**
     * Validate OpenAI-specific configuration
     */
    static validateOpenAIConfig(config) {
        if (!config.apiKey) {
            throw new types_1.ConfigurationError('OpenAI API key is required');
        }
        if (typeof config.apiKey !== 'string') {
            throw new types_1.ConfigurationError('OpenAI API key must be a string');
        }
        if (!config.apiKey.startsWith('sk-')) {
            throw new types_1.ConfigurationError('OpenAI API key must start with "sk-"');
        }
        if (config.baseURL) {
            this.validateUrl(config.baseURL, 'OpenAI base URL');
        }
        if (config.organization && typeof config.organization !== 'string') {
            throw new types_1.ConfigurationError('OpenAI organization must be a string');
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
        if (config.enablePromptCaching !== undefined &&
            typeof config.enablePromptCaching !== 'boolean') {
            throw new types_1.ConfigurationError('Enable prompt caching must be a boolean');
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
        // Anthropic has stricter temperature limits
        if (config.temperature !== undefined && config.temperature > 1) {
            throw new types_1.ConfigurationError('Temperature must be between 0 and 1 for Anthropic models');
        }
        // Anthropic has token output limits
        if (config.maxTokens !== undefined && config.maxTokens > 8192) {
            throw new types_1.ConfigurationError('Max tokens cannot exceed 8192 for Anthropic models');
        }
    }
    /**
     * Validate Vertex AI-specific configuration
     */
    static validateVertexAIConfig(config) {
        if (!config.projectId && !process.env.GOOGLE_CLOUD_PROJECT) {
            throw new types_1.ConfigurationError('Google Cloud project ID is required (either in config or GOOGLE_CLOUD_PROJECT environment variable)');
        }
        if (config.projectId && typeof config.projectId !== 'string') {
            throw new types_1.ConfigurationError('Google Cloud project ID must be a string');
        }
        if (!config.location) {
            throw new types_1.ConfigurationError('Vertex AI location is required');
        }
        if (config.location) {
            if (typeof config.location !== 'string') {
                throw new types_1.ConfigurationError('Vertex AI location must be a string');
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
                throw new types_1.ConfigurationError(`Invalid Vertex AI location: ${config.location}. Valid locations: ${validLocations.join(', ')}`);
            }
        }
        // Validate authentication options
        if (config.authOptions) {
            if (typeof config.authOptions !== 'object') {
                throw new types_1.ConfigurationError('Auth options must be an object');
            }
            if (config.authOptions.keyFilename && config.authOptions.credentials) {
                throw new types_1.ConfigurationError('Cannot specify both keyFilename and credentials in authOptions');
            }
            if (config.authOptions.keyFilename && typeof config.authOptions.keyFilename !== 'string') {
                throw new types_1.ConfigurationError('Key filename must be a string');
            }
        }
        // Validate context caching configuration
        if (config.contextCaching) {
            if (typeof config.contextCaching !== 'object') {
                throw new types_1.ConfigurationError('Context caching configuration must be an object');
            }
            if (config.contextCaching.cachedContentId &&
                typeof config.contextCaching.cachedContentId !== 'string') {
                throw new types_1.ConfigurationError('Cached content ID must be a string');
            }
            if (config.contextCaching.ttlSeconds !== undefined) {
                if (typeof config.contextCaching.ttlSeconds !== 'number' ||
                    !Number.isInteger(config.contextCaching.ttlSeconds)) {
                    throw new types_1.ConfigurationError('Context caching TTL must be an integer');
                }
                if (config.contextCaching.ttlSeconds <= 0) {
                    throw new types_1.ConfigurationError('Context caching TTL must be greater than 0');
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
    static validateOllamaConfig(config) {
        if (config.baseUrl) {
            this.validateUrl(config.baseUrl, 'Ollama base URL');
        }
        if (config.enableMultimodal !== undefined && typeof config.enableMultimodal !== 'boolean') {
            throw new types_1.ConfigurationError('Enable multimodal must be a boolean');
        }
        // Validate request options
        if (config.requestOptions) {
            if (typeof config.requestOptions !== 'object') {
                throw new types_1.ConfigurationError('Request options must be an object');
            }
            const { useMmap, numThread, numGpu } = config.requestOptions;
            if (useMmap !== undefined && typeof useMmap !== 'boolean') {
                throw new types_1.ConfigurationError('Use mmap must be a boolean');
            }
            if (numThread !== undefined) {
                if (typeof numThread !== 'number' || !Number.isInteger(numThread)) {
                    throw new types_1.ConfigurationError('Number of threads must be an integer');
                }
                if (numThread <= 0) {
                    throw new types_1.ConfigurationError('Number of threads must be positive');
                }
            }
            if (numGpu !== undefined) {
                if (typeof numGpu !== 'number' || !Number.isInteger(numGpu)) {
                    throw new types_1.ConfigurationError('Number of GPU layers must be an integer');
                }
                if (numGpu < 0) {
                    throw new types_1.ConfigurationError('Number of GPU layers must be non-negative');
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
    static validateUrl(url, fieldName) {
        if (typeof url !== 'string') {
            throw new types_1.ConfigurationError(`${fieldName} must be a string`);
        }
        try {
            new URL(url);
        }
        catch (error) {
            throw new types_1.ConfigurationError(`Invalid ${fieldName}: ${url}`);
        }
    }
    /**
     * Validate OpenAI model name
     */
    static validateOpenAIModel(model, modelType) {
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
            throw new types_1.ConfigurationError(`Invalid OpenAI ${modelType} model: ${model}. Valid models: ${validModels.join(', ')}`);
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
     * Validate Vertex AI model name
     */
    static validateVertexAIModel(model, modelType) {
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
            throw new types_1.ConfigurationError(`Invalid Vertex AI ${modelType} model: ${model}. Valid models: ${validModels.join(', ')}`);
        }
    }
    /**
     * Validate Ollama model name
     */
    static validateOllamaModel(model, modelType) {
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
            throw new types_1.ConfigurationError(`Invalid Ollama ${modelType} model: ${model}. Valid models: ${validModels.join(', ')}`);
        }
    }
    /**
     * Check if a provider is available for use
     */
    static validateProviderAvailability(provider) {
        if (!provider_factory_1.ProviderDetector.isProviderInstalled(provider)) {
            const installCommand = provider_factory_1.ProviderDetector.getInstallationInstructions(provider);
            throw new types_1.ConfigurationError(`Provider '${provider}' is not available. Please install the required package: ${installCommand}`);
        }
    }
    /**
     * Get configuration recommendations for a provider
     */
    static getConfigurationRecommendations(provider) {
        const recommendations = {
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
exports.ConfigValidator = ConfigValidator;
