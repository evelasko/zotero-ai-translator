/**
 * OpenAI provider implementation
 */
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AIProviderConfig, LLMProvider, ModelCapabilities, OpenAIModel } from '../../types/providers';
/**
 * OpenAI provider implementation
 */
export declare class OpenAIProvider implements LLMProvider {
    readonly name: "openai";
    /**
     * Create a chat model instance for classification
     */
    createClassificationModel(config: AIProviderConfig): BaseChatModel;
    /**
     * Create a chat model instance for extraction
     */
    createExtractionModel(config: AIProviderConfig): BaseChatModel;
    /**
     * Validate OpenAI-specific configuration
     */
    validateConfig(config: AIProviderConfig): void;
    /**
     * Get model capabilities for a specific OpenAI model
     */
    getModelCapabilities(modelName: string): ModelCapabilities;
    /**
     * Check if the OpenAI provider is available
     */
    isAvailable(): boolean;
    /**
     * Check if a model name is valid for OpenAI
     */
    private isValidModel;
    /**
     * Get recommended models for different use cases
     */
    static getRecommendedModels(): {
        classification: OpenAIModel;
        extraction: OpenAIModel;
        highAccuracy: OpenAIModel;
        costEffective: OpenAIModel;
    };
}
