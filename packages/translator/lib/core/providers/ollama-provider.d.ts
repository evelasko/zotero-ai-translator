/**
 * Ollama provider implementation
 */
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AIProviderConfig, LLMProvider, ModelCapabilities, OllamaModel } from '../../types/providers';
/**
 * Ollama provider implementation
 */
export declare class OllamaProvider implements LLMProvider {
    readonly name: "ollama";
    /**
     * Create a chat model instance for classification
     */
    createClassificationModel(config: AIProviderConfig): BaseChatModel;
    /**
     * Create a chat model instance for extraction
     */
    createExtractionModel(config: AIProviderConfig): BaseChatModel;
    /**
     * Validate Ollama-specific configuration
     */
    validateConfig(config: AIProviderConfig): void;
    /**
     * Get model capabilities for a specific Ollama model
     */
    getModelCapabilities(modelName: string): ModelCapabilities;
    /**
     * Check if the Ollama provider is available
     */
    isAvailable(): boolean;
    /**
     * Check if a model name is valid for Ollama
     */
    private isValidModel;
    /**
     * Check if a model supports multimodal input
     */
    private isMultimodalModel;
    /**
     * Check if a model supports tool calling
     */
    private isToolCapableModel;
    /**
     * Get recommended models for different use cases
     */
    static getRecommendedModels(): {
        classification: OllamaModel;
        extraction: OllamaModel;
        highAccuracy: OllamaModel;
        costEffective: OllamaModel;
        coding: OllamaModel;
        multimodal: OllamaModel;
        lightweight: OllamaModel;
    };
    /**
     * Get model size information
     */
    static getModelInfo(model: OllamaModel): {
        size: string;
        parameters: string;
        diskSpace: string;
        description: string;
    };
    /**
     * Get installation command for a specific model
     */
    static getModelInstallCommand(model: OllamaModel): string;
}
