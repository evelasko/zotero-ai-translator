"use strict";
/**
 * Google Vertex AI provider implementation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VertexAIProvider = void 0;
const types_1 = require("../../types");
const provider_factory_1 = require("../provider-factory");
/**
 * Google Vertex AI provider implementation
 */
class VertexAIProvider {
    name = 'vertexai';
    /**
     * Create a chat model instance for classification
     */
    createClassificationModel(config) {
        if (config.provider !== 'vertexai') {
            throw new types_1.ConfigurationError('Invalid provider configuration for Vertex AI');
        }
        const { ChatVertexAI } = require('@langchain/google-vertexai');
        const modelConfig = {
            model: config.classificationModel || 'gemini-1.5-flash',
            temperature: config.temperature || 0.1,
            maxOutputTokens: config.maxTokens || 2000,
            maxRetries: config.maxRetries || 2,
            location: config.location || 'us-central1',
        };
        // Add authentication options if provided
        if (config.authOptions) {
            modelConfig.authOptions = config.authOptions;
        }
        // Add context caching if configured
        if (config.contextCaching?.cachedContentId) {
            modelConfig.cachedContent = config.contextCaching.cachedContentId;
        }
        // Set project ID from environment or config
        if (process.env.GOOGLE_CLOUD_PROJECT) {
            modelConfig.projectId = process.env.GOOGLE_CLOUD_PROJECT;
        }
        else {
            modelConfig.projectId = config.projectId;
        }
        return new ChatVertexAI(modelConfig);
    }
    /**
     * Create a chat model instance for extraction
     */
    createExtractionModel(config) {
        if (config.provider !== 'vertexai') {
            throw new types_1.ConfigurationError('Invalid provider configuration for Vertex AI');
        }
        const { ChatVertexAI } = require('@langchain/google-vertexai');
        const modelConfig = {
            model: config.extractionModel || 'gemini-1.5-pro',
            temperature: config.temperature || 0.1,
            maxOutputTokens: config.maxTokens || 2000,
            maxRetries: config.maxRetries || 2,
            location: config.location || 'us-central1',
        };
        // Add authentication options if provided
        if (config.authOptions) {
            modelConfig.authOptions = config.authOptions;
        }
        // Add context caching if configured
        if (config.contextCaching?.cachedContentId) {
            modelConfig.cachedContent = config.contextCaching.cachedContentId;
        }
        // Set project ID from environment or config
        if (process.env.GOOGLE_CLOUD_PROJECT) {
            modelConfig.projectId = process.env.GOOGLE_CLOUD_PROJECT;
        }
        else {
            modelConfig.projectId = config.projectId;
        }
        return new ChatVertexAI(modelConfig);
    }
    /**
     * Validate Vertex AI-specific configuration
     */
    validateConfig(config) {
        if (config.provider !== 'vertexai') {
            throw new types_1.ConfigurationError('Invalid provider configuration for Vertex AI');
        }
        const vertexConfig = config;
        if (!vertexConfig.projectId && !process.env.GOOGLE_CLOUD_PROJECT) {
            throw new types_1.ConfigurationError('Google Cloud project ID is required (either in config or GOOGLE_CLOUD_PROJECT environment variable)');
        }
        if (vertexConfig.classificationModel && !this.isValidModel(vertexConfig.classificationModel)) {
            throw new types_1.ConfigurationError(`Invalid Vertex AI classification model: ${vertexConfig.classificationModel}`);
        }
        if (vertexConfig.extractionModel && !this.isValidModel(vertexConfig.extractionModel)) {
            throw new types_1.ConfigurationError(`Invalid Vertex AI extraction model: ${vertexConfig.extractionModel}`);
        }
        if (vertexConfig.temperature !== undefined &&
            (vertexConfig.temperature < 0 || vertexConfig.temperature > 2)) {
            throw new types_1.ConfigurationError('Temperature must be between 0 and 2');
        }
        if (vertexConfig.maxTokens !== undefined && vertexConfig.maxTokens <= 0) {
            throw new types_1.ConfigurationError('Max tokens must be greater than 0');
        }
        if (vertexConfig.maxRetries !== undefined && vertexConfig.maxRetries < 0) {
            throw new types_1.ConfigurationError('Max retries must be non-negative');
        }
        // Validate location if provided
        if (vertexConfig.location && !this.isValidLocation(vertexConfig.location)) {
            throw new types_1.ConfigurationError(`Invalid Vertex AI location: ${vertexConfig.location}`);
        }
        // Validate authentication options
        if (vertexConfig.authOptions) {
            if (vertexConfig.authOptions.keyFilename && vertexConfig.authOptions.credentials) {
                throw new types_1.ConfigurationError('Cannot specify both keyFilename and credentials in authOptions');
            }
        }
        // Validate context caching configuration
        if (vertexConfig.contextCaching) {
            if (vertexConfig.contextCaching.ttlSeconds !== undefined &&
                vertexConfig.contextCaching.ttlSeconds <= 0) {
                throw new types_1.ConfigurationError('Context caching TTL must be greater than 0');
            }
        }
    }
    /**
     * Get model capabilities for a specific Vertex AI model
     */
    getModelCapabilities(modelName) {
        const vertexModel = modelName;
        // Base capabilities for all Vertex AI models
        const baseCapabilities = {
            supportsToolCalling: true,
            supportsStructuredOutput: true,
            supportsJsonMode: false,
            supportsImageInput: true,
            supportsAudioInput: true,
            supportsVideoInput: true,
            supportsStreaming: true,
            supportsTokenUsage: true,
            maxContextLength: 32768,
            maxOutputTokens: 8192,
        };
        // Model-specific overrides
        switch (vertexModel) {
            case 'gemini-1.5-pro':
            case 'gemini-1.5-pro-002':
            case 'gemini-1.5-pro-001':
                return {
                    ...baseCapabilities,
                    maxContextLength: 2097152, // 2M tokens
                    maxOutputTokens: 8192,
                };
            case 'gemini-1.5-flash':
            case 'gemini-1.5-flash-002':
            case 'gemini-1.5-flash-001':
                return {
                    ...baseCapabilities,
                    maxContextLength: 1048576, // 1M tokens
                    maxOutputTokens: 8192,
                };
            case 'gemini-2.0-flash-exp':
                return {
                    ...baseCapabilities,
                    maxContextLength: 1048576, // 1M tokens
                    maxOutputTokens: 8192,
                };
            case 'gemini-1.0-pro':
            case 'gemini-1.0-pro-001':
                return {
                    ...baseCapabilities,
                    supportsImageInput: false,
                    supportsAudioInput: false,
                    supportsVideoInput: false,
                    maxContextLength: 32768,
                    maxOutputTokens: 2048,
                };
            default:
                return baseCapabilities;
        }
    }
    /**
     * Check if the Vertex AI provider is available
     */
    isAvailable() {
        return provider_factory_1.ProviderDetector.isProviderInstalled('vertexai');
    }
    /**
     * Check if a model name is valid for Vertex AI
     */
    isValidModel(model) {
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
        return validModels.includes(model);
    }
    /**
     * Check if a location is valid for Vertex AI
     */
    isValidLocation(location) {
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
        return validLocations.includes(location);
    }
    /**
     * Get recommended models for different use cases
     */
    static getRecommendedModels() {
        return {
            classification: 'gemini-1.5-flash',
            extraction: 'gemini-1.5-pro',
            highAccuracy: 'gemini-1.5-pro-002',
            costEffective: 'gemini-1.5-flash',
            multimodal: 'gemini-1.5-pro',
            experimental: 'gemini-2.0-flash-exp',
        };
    }
    /**
     * Get available locations for Vertex AI
     */
    static getAvailableLocations() {
        return {
            'us-central1': 'Iowa, USA',
            'us-east1': 'South Carolina, USA',
            'us-east4': 'Northern Virginia, USA',
            'us-west1': 'Oregon, USA',
            'us-west4': 'Las Vegas, USA',
            'europe-west1': 'Belgium',
            'europe-west2': 'London, UK',
            'europe-west3': 'Frankfurt, Germany',
            'europe-west4': 'Netherlands',
            'asia-east1': 'Taiwan',
            'asia-northeast1': 'Tokyo, Japan',
            'asia-southeast1': 'Singapore',
            'australia-southeast1': 'Sydney, Australia',
        };
    }
    /**
     * Get model pricing tier information
     */
    static getModelPricing(model) {
        switch (model) {
            case 'gemini-1.5-flash':
            case 'gemini-1.5-flash-002':
            case 'gemini-1.5-flash-001':
                return { tier: 'low', description: 'Fast and cost-effective model' };
            case 'gemini-1.0-pro':
            case 'gemini-1.0-pro-001':
                return { tier: 'low', description: 'Basic text-only model' };
            case 'gemini-1.5-pro':
            case 'gemini-1.5-pro-002':
            case 'gemini-1.5-pro-001':
                return { tier: 'medium', description: 'Advanced multimodal model with large context' };
            case 'gemini-2.0-flash-exp':
                return { tier: 'medium', description: 'Experimental next-generation model' };
            default:
                return { tier: 'medium', description: 'Standard pricing' };
        }
    }
}
exports.VertexAIProvider = VertexAIProvider;
