/**
 * Provider exports and registration
 */
export { AnthropicProvider } from './anthropic-provider';
export { OllamaProvider } from './ollama-provider';
export { OpenAIProvider } from './openai-provider';
export { VertexAIProvider } from './vertexai-provider';
export { ProviderDetector, ProviderFactory } from '../provider-factory';
/**
 * Initialize and register all available providers
 */
export declare function registerAllProviders(): void;
/**
 * Get provider registration status and available models
 */
export declare function getProviderStatus(): {
    registered: ("openai" | "anthropic" | "vertexai" | "ollama")[];
    available: ("openai" | "anthropic" | "vertexai" | "ollama")[];
    recommendations: {
        openai: {
            classification: import("../..").OpenAIModel;
            extraction: import("../..").OpenAIModel;
            highAccuracy: import("../..").OpenAIModel;
            costEffective: import("../..").OpenAIModel;
        } | null;
        anthropic: {
            classification: import("../..").AnthropicModel;
            extraction: import("../..").AnthropicModel;
            highAccuracy: import("../..").AnthropicModel;
            costEffective: import("../..").AnthropicModel;
            balanced: import("../..").AnthropicModel;
        } | null;
        vertexai: {
            classification: import("../..").VertexAIModel;
            extraction: import("../..").VertexAIModel;
            highAccuracy: import("../..").VertexAIModel;
            costEffective: import("../..").VertexAIModel;
            multimodal: import("../..").VertexAIModel;
            experimental: import("../..").VertexAIModel;
        } | null;
        ollama: {
            classification: import("../..").OllamaModel;
            extraction: import("../..").OllamaModel;
            highAccuracy: import("../..").OllamaModel;
            costEffective: import("../..").OllamaModel;
            coding: import("../..").OllamaModel;
            multimodal: import("../..").OllamaModel;
            lightweight: import("../..").OllamaModel;
        } | null;
    };
};
