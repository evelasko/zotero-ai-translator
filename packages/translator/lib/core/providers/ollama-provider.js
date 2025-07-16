"use strict";
/**
 * Ollama provider implementation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaProvider = void 0;
const types_1 = require("../../types");
const provider_factory_1 = require("../provider-factory");
/**
 * Ollama provider implementation
 */
class OllamaProvider {
    name = 'ollama';
    /**
     * Create a chat model instance for classification
     */
    createClassificationModel(config) {
        if (config.provider !== 'ollama') {
            throw new types_1.ConfigurationError('Invalid provider configuration for Ollama');
        }
        const { ChatOllama } = require('@langchain/ollama');
        const modelConfig = {
            model: config.classificationModel || 'llama3.1:8b',
            temperature: config.temperature || 0.1,
            numPredict: config.maxTokens || 2000,
            numRetry: config.maxRetries || 2,
            baseUrl: config.baseUrl || 'http://localhost:11434',
        };
        // Add custom request options if provided
        if (config.requestOptions) {
            const requestOptions = {};
            if (config.requestOptions.useMmap !== undefined) {
                requestOptions.use_mmap = config.requestOptions.useMmap;
            }
            if (config.requestOptions.numThread !== undefined) {
                requestOptions.num_thread = config.requestOptions.numThread;
            }
            if (config.requestOptions.numGpu !== undefined) {
                requestOptions.num_gpu = config.requestOptions.numGpu;
            }
            if (Object.keys(requestOptions).length > 0) {
                modelConfig.requestOptions = requestOptions;
            }
        }
        return new ChatOllama(modelConfig);
    }
    /**
     * Create a chat model instance for extraction
     */
    createExtractionModel(config) {
        if (config.provider !== 'ollama') {
            throw new types_1.ConfigurationError('Invalid provider configuration for Ollama');
        }
        const { ChatOllama } = require('@langchain/ollama');
        const modelConfig = {
            model: config.extractionModel || 'llama3.1:8b',
            temperature: config.temperature || 0.1,
            numPredict: config.maxTokens || 2000,
            numRetry: config.maxRetries || 2,
            baseUrl: config.baseUrl || 'http://localhost:11434',
        };
        // Add custom request options if provided
        if (config.requestOptions) {
            const requestOptions = {};
            if (config.requestOptions.useMmap !== undefined) {
                requestOptions.use_mmap = config.requestOptions.useMmap;
            }
            if (config.requestOptions.numThread !== undefined) {
                requestOptions.num_thread = config.requestOptions.numThread;
            }
            if (config.requestOptions.numGpu !== undefined) {
                requestOptions.num_gpu = config.requestOptions.numGpu;
            }
            if (Object.keys(requestOptions).length > 0) {
                modelConfig.requestOptions = requestOptions;
            }
        }
        return new ChatOllama(modelConfig);
    }
    /**
     * Validate Ollama-specific configuration
     */
    validateConfig(config) {
        if (config.provider !== 'ollama') {
            throw new types_1.ConfigurationError('Invalid provider configuration for Ollama');
        }
        const ollamaConfig = config;
        if (ollamaConfig.classificationModel && !this.isValidModel(ollamaConfig.classificationModel)) {
            throw new types_1.ConfigurationError(`Invalid Ollama classification model: ${ollamaConfig.classificationModel}`);
        }
        if (ollamaConfig.extractionModel && !this.isValidModel(ollamaConfig.extractionModel)) {
            throw new types_1.ConfigurationError(`Invalid Ollama extraction model: ${ollamaConfig.extractionModel}`);
        }
        if (ollamaConfig.temperature !== undefined &&
            (ollamaConfig.temperature < 0 || ollamaConfig.temperature > 2)) {
            throw new types_1.ConfigurationError('Temperature must be between 0 and 2');
        }
        if (ollamaConfig.maxTokens !== undefined && ollamaConfig.maxTokens <= 0) {
            throw new types_1.ConfigurationError('Max tokens must be greater than 0');
        }
        if (ollamaConfig.maxRetries !== undefined && ollamaConfig.maxRetries < 0) {
            throw new types_1.ConfigurationError('Max retries must be non-negative');
        }
        // Validate base URL format
        if (ollamaConfig.baseUrl) {
            try {
                new URL(ollamaConfig.baseUrl);
            }
            catch (error) {
                throw new types_1.ConfigurationError(`Invalid Ollama base URL: ${ollamaConfig.baseUrl}`);
            }
        }
        // Validate request options
        if (ollamaConfig.requestOptions) {
            const { numThread, numGpu } = ollamaConfig.requestOptions;
            if (numThread !== undefined && (numThread <= 0 || !Number.isInteger(numThread))) {
                throw new types_1.ConfigurationError('Number of threads must be a positive integer');
            }
            if (numGpu !== undefined && (numGpu < 0 || !Number.isInteger(numGpu))) {
                throw new types_1.ConfigurationError('Number of GPU layers must be a non-negative integer');
            }
        }
    }
    /**
     * Get model capabilities for a specific Ollama model
     */
    getModelCapabilities(modelName) {
        const ollamaModel = modelName;
        // Base capabilities for Ollama models
        const baseCapabilities = {
            supportsToolCalling: false,
            supportsStructuredOutput: true,
            supportsJsonMode: true,
            supportsImageInput: false,
            supportsAudioInput: false,
            supportsVideoInput: false,
            supportsStreaming: true,
            supportsTokenUsage: true,
            maxContextLength: 4096,
            maxOutputTokens: 2048,
        };
        // Model-specific overrides based on known capabilities
        if (this.isMultimodalModel(ollamaModel)) {
            baseCapabilities.supportsImageInput = true;
        }
        if (this.isToolCapableModel(ollamaModel)) {
            baseCapabilities.supportsToolCalling = true;
        }
        // Context length adjustments based on model size
        if (ollamaModel.includes('70b')) {
            return {
                ...baseCapabilities,
                maxContextLength: 8192,
                maxOutputTokens: 4096,
            };
        }
        if (ollamaModel.includes('13b') || ollamaModel.includes('14b')) {
            return {
                ...baseCapabilities,
                maxContextLength: 6144,
                maxOutputTokens: 3072,
            };
        }
        if (ollamaModel.includes('8b') || ollamaModel.includes('7b')) {
            return {
                ...baseCapabilities,
                maxContextLength: 4096,
                maxOutputTokens: 2048,
            };
        }
        if (ollamaModel.includes('3b') || ollamaModel.includes('2b') || ollamaModel.includes('1b')) {
            return {
                ...baseCapabilities,
                maxContextLength: 2048,
                maxOutputTokens: 1024,
            };
        }
        return baseCapabilities;
    }
    /**
     * Check if the Ollama provider is available
     */
    isAvailable() {
        return provider_factory_1.ProviderDetector.isProviderInstalled('ollama');
    }
    /**
     * Check if a model name is valid for Ollama
     */
    isValidModel(model) {
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
        return validModels.includes(model);
    }
    /**
     * Check if a model supports multimodal input
     */
    isMultimodalModel(model) {
        // Models with vision capabilities
        const multimodalModels = [
            'llama3.2',
            'llama3.2:1b',
            'llama3.2:3b',
            // Add other multimodal models as they become available
        ];
        return multimodalModels.some(mm => model.includes(mm));
    }
    /**
     * Check if a model supports tool calling
     */
    isToolCapableModel(model) {
        // Models with tool calling capabilities
        const toolCapableModels = [
            'llama3.1',
            'llama3.1:8b',
            'llama3.1:70b',
            'mixtral',
            'mixtral:8x7b',
            'mixtral:8x22b',
            // Add other tool-capable models as they become available
        ];
        return toolCapableModels.some(tc => model.includes(tc));
    }
    /**
     * Get recommended models for different use cases
     */
    static getRecommendedModels() {
        return {
            classification: 'llama3.1:8b',
            extraction: 'llama3.1:8b',
            highAccuracy: 'llama3.1:70b',
            costEffective: 'llama3.2:3b',
            coding: 'codellama:13b',
            multimodal: 'llama3.2',
            lightweight: 'phi3:mini',
        };
    }
    /**
     * Get model size information
     */
    static getModelInfo(model) {
        // Approximate information for common models
        const modelInfo = {
            'llama3:8b': { size: '4.7GB', parameters: '8B', description: 'General purpose model' },
            'llama3:70b': { size: '40GB', parameters: '70B', description: 'Large general purpose model' },
            'llama3.1:8b': {
                size: '4.7GB',
                parameters: '8B',
                description: 'Enhanced Llama 3 with tool calling',
            },
            'llama3.1:70b': {
                size: '40GB',
                parameters: '70B',
                description: 'Large enhanced model with tool calling',
            },
            'llama3.2:1b': { size: '1.3GB', parameters: '1B', description: 'Compact multimodal model' },
            'llama3.2:3b': { size: '2.0GB', parameters: '3B', description: 'Small multimodal model' },
            'codellama:7b': { size: '3.8GB', parameters: '7B', description: 'Code generation model' },
            'codellama:13b': {
                size: '7.3GB',
                parameters: '13B',
                description: 'Larger code generation model',
            },
            'mistral:7b': { size: '4.1GB', parameters: '7B', description: 'Fast and efficient model' },
            'phi3:mini': {
                size: '2.3GB',
                parameters: '3.8B',
                description: 'Compact high-performance model',
            },
            'gemma:2b': { size: '1.4GB', parameters: '2B', description: "Google's lightweight model" },
            'qwen:7b': { size: '4.0GB', parameters: '7B', description: 'Multilingual model' },
        };
        return (modelInfo[model] || {
            size: 'Unknown',
            parameters: 'Unknown',
            diskSpace: 'Unknown',
            description: 'Model information not available',
        });
    }
    /**
     * Get installation command for a specific model
     */
    static getModelInstallCommand(model) {
        return `ollama pull ${model}`;
    }
}
exports.OllamaProvider = OllamaProvider;
