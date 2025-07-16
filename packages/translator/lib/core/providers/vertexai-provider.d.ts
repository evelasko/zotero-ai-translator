/**
 * Google Vertex AI provider implementation
 */
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AIProviderConfig, LLMProvider, ModelCapabilities, VertexAIModel } from '../../types/providers';
/**
 * Google Vertex AI provider implementation
 */
export declare class VertexAIProvider implements LLMProvider {
    readonly name: "vertexai";
    /**
     * Create a chat model instance for classification
     */
    createClassificationModel(config: AIProviderConfig): BaseChatModel;
    /**
     * Create a chat model instance for extraction
     */
    createExtractionModel(config: AIProviderConfig): BaseChatModel;
    /**
     * Validate Vertex AI-specific configuration
     */
    validateConfig(config: AIProviderConfig): void;
    /**
     * Get model capabilities for a specific Vertex AI model
     */
    getModelCapabilities(modelName: string): ModelCapabilities;
    /**
     * Check if the Vertex AI provider is available
     */
    isAvailable(): boolean;
    /**
     * Check if a model name is valid for Vertex AI
     */
    private isValidModel;
    /**
     * Check if a location is valid for Vertex AI
     */
    private isValidLocation;
    /**
     * Get recommended models for different use cases
     */
    static getRecommendedModels(): {
        classification: VertexAIModel;
        extraction: VertexAIModel;
        highAccuracy: VertexAIModel;
        costEffective: VertexAIModel;
        multimodal: VertexAIModel;
        experimental: VertexAIModel;
    };
    /**
     * Get available locations for Vertex AI
     */
    static getAvailableLocations(): {
        'us-central1': string;
        'us-east1': string;
        'us-east4': string;
        'us-west1': string;
        'us-west4': string;
        'europe-west1': string;
        'europe-west2': string;
        'europe-west3': string;
        'europe-west4': string;
        'asia-east1': string;
        'asia-northeast1': string;
        'asia-southeast1': string;
        'australia-southeast1': string;
    };
    /**
     * Get model pricing tier information
     */
    static getModelPricing(model: VertexAIModel): {
        tier: 'low' | 'medium' | 'high';
        description: string;
    };
}
