/**
 * Anthropic provider implementation
 */
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AIProviderConfig, AnthropicModel, LLMProvider, ModelCapabilities } from '../../types/providers';
/**
 * Anthropic provider implementation
 */
export declare class AnthropicProvider implements LLMProvider {
    readonly name: "anthropic";
    /**
     * Create a chat model instance for classification
     */
    createClassificationModel(config: AIProviderConfig): BaseChatModel;
    /**
     * Create a chat model instance for extraction
     */
    createExtractionModel(config: AIProviderConfig): BaseChatModel;
    /**
     * Validate Anthropic-specific configuration
     */
    validateConfig(config: AIProviderConfig): void;
    /**
     * Get model capabilities for a specific Anthropic model
     */
    getModelCapabilities(modelName: string): ModelCapabilities;
    /**
     * Check if the Anthropic provider is available
     */
    isAvailable(): boolean;
    /**
     * Check if a model name is valid for Anthropic
     */
    private isValidModel;
    /**
     * Get recommended models for different use cases
     */
    static getRecommendedModels(): {
        classification: AnthropicModel;
        extraction: AnthropicModel;
        highAccuracy: AnthropicModel;
        costEffective: AnthropicModel;
        balanced: AnthropicModel;
    };
    /**
     * Get model pricing tier information
     */
    static getModelPricing(model: AnthropicModel): {
        tier: 'low' | 'medium' | 'high';
        description: string;
    };
}
