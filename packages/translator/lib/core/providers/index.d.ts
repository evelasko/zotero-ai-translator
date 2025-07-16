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
        openai: any;
        anthropic: any;
        vertexai: any;
        ollama: any;
    };
};
