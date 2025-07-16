/**
 * Provider abstraction types for multi-LLM support
 */
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
/**
 * Base configuration shared by all providers
 */
export interface BaseProviderConfig {
    /**
     * Temperature for AI responses (0-2)
     * @default 0.1
     */
    temperature?: number;
    /**
     * Maximum tokens for AI responses
     * @default 2000
     */
    maxTokens?: number;
    /**
     * Maximum number of retries for failed requests
     * @default 2
     */
    maxRetries?: number;
}
/**
 * OpenAI model types with comprehensive model support
 */
export type OpenAIModel = 'gpt-4o' | 'gpt-4o-2024-08-06' | 'gpt-4o-2024-05-13' | 'gpt-4o-mini' | 'gpt-4o-mini-2024-07-18' | 'gpt-4-turbo' | 'gpt-4-turbo-2024-04-09' | 'gpt-4' | 'gpt-4-0613' | 'gpt-4-0314' | 'gpt-3.5-turbo' | 'gpt-3.5-turbo-0125' | 'gpt-3.5-turbo-1106';
/**
 * Anthropic model types with latest Claude models
 */
export type AnthropicModel = 'claude-3-5-sonnet-20241022' | 'claude-3-5-sonnet-20240620' | 'claude-3-5-haiku-20241022' | 'claude-3-opus-20240229' | 'claude-3-sonnet-20240229' | 'claude-3-haiku-20240307';
/**
 * Google Vertex AI model types
 */
export type VertexAIModel = 'gemini-1.5-pro' | 'gemini-1.5-pro-002' | 'gemini-1.5-pro-001' | 'gemini-1.5-flash' | 'gemini-1.5-flash-002' | 'gemini-1.5-flash-001' | 'gemini-1.0-pro' | 'gemini-1.0-pro-001' | 'gemini-2.0-flash-exp';
/**
 * Ollama model types (commonly available models)
 */
export type OllamaModel = 'llama3' | 'llama3:8b' | 'llama3:70b' | 'llama3.1' | 'llama3.1:8b' | 'llama3.1:70b' | 'llama3.2' | 'llama3.2:1b' | 'llama3.2:3b' | 'mixtral' | 'mixtral:8x7b' | 'mixtral:8x22b' | 'codellama' | 'codellama:7b' | 'codellama:13b' | 'codellama:34b' | 'mistral' | 'mistral:7b' | 'mistral-nemo' | 'qwen' | 'qwen:7b' | 'qwen:14b' | 'qwen2.5' | 'gemma' | 'gemma:2b' | 'gemma:7b' | 'gemma2' | 'phi' | 'phi3' | 'phi3:mini' | 'phi3:medium';
/**
 * OpenAI provider configuration
 */
export interface OpenAIConfig extends BaseProviderConfig {
    provider: 'openai';
    /**
     * OpenAI API key
     */
    apiKey: string;
    /**
     * Model to use for classification step
     * @default 'gpt-4o-mini'
     */
    classificationModel?: OpenAIModel;
    /**
     * Model to use for extraction step
     * @default 'gpt-4o-mini'
     */
    extractionModel?: OpenAIModel;
    /**
     * Custom base URL for OpenAI API (for OpenAI-compatible services)
     */
    baseURL?: string;
    /**
     * Organization ID (optional)
     */
    organization?: string;
}
/**
 * Anthropic provider configuration
 */
export interface AnthropicConfig extends BaseProviderConfig {
    provider: 'anthropic';
    /**
     * Anthropic API key
     */
    apiKey: string;
    /**
     * Model to use for classification step
     * @default 'claude-3-haiku-20240307'
     */
    classificationModel?: AnthropicModel;
    /**
     * Model to use for extraction step
     * @default 'claude-3-5-sonnet-20241022'
     */
    extractionModel?: AnthropicModel;
    /**
     * Enable prompt caching for repeated content
     * @default false
     */
    enablePromptCaching?: boolean;
    /**
     * Custom headers for API requests
     */
    customHeaders?: Record<string, string>;
}
/**
 * Google Vertex AI provider configuration
 */
export interface VertexAIConfig extends BaseProviderConfig {
    provider: 'vertexai';
    /**
     * Google Cloud project ID
     */
    projectId: string;
    /**
     * Google Cloud location/region
     * @default 'us-central1'
     */
    location?: string;
    /**
     * Model to use for classification step
     * @default 'gemini-1.5-flash'
     */
    classificationModel?: VertexAIModel;
    /**
     * Model to use for extraction step
     * @default 'gemini-1.5-pro'
     */
    extractionModel?: VertexAIModel;
    /**
     * Authentication options for Google Cloud
     */
    authOptions?: {
        /**
         * Path to service account key file
         */
        keyFilename?: string;
        /**
         * Service account credentials object
         */
        credentials?: Record<string, any>;
    };
    /**
     * Context caching configuration
     */
    contextCaching?: {
        /**
         * Cached content ID for reuse
         */
        cachedContentId?: string;
        /**
         * TTL for cached content in seconds
         */
        ttlSeconds?: number;
    };
}
/**
 * Ollama provider configuration
 */
export interface OllamaConfig extends BaseProviderConfig {
    provider: 'ollama';
    /**
     * Ollama server base URL
     * @default 'http://localhost:11434'
     */
    baseUrl?: string;
    /**
     * Model to use for classification step
     * @default 'llama3.1:8b'
     */
    classificationModel?: OllamaModel;
    /**
     * Model to use for extraction step
     * @default 'llama3.1:8b'
     */
    extractionModel?: OllamaModel;
    /**
     * Enable multimodal support for capable models
     * @default false
     */
    enableMultimodal?: boolean;
    /**
     * Custom request options for Ollama
     */
    requestOptions?: {
        /**
         * Use memory mapping
         */
        useMmap?: boolean;
        /**
         * Number of CPU threads to use
         */
        numThread?: number;
        /**
         * Number of GPU layers to use
         */
        numGpu?: number;
    };
}
/**
 * Union type for all supported provider configurations
 */
export type AIProviderConfig = OpenAIConfig | AnthropicConfig | VertexAIConfig | OllamaConfig;
/**
 * Provider names
 */
export type ProviderName = AIProviderConfig['provider'];
/**
 * Model capabilities for feature detection
 */
export interface ModelCapabilities {
    /**
     * Supports function/tool calling
     */
    supportsToolCalling: boolean;
    /**
     * Supports structured output
     */
    supportsStructuredOutput: boolean;
    /**
     * Supports JSON mode
     */
    supportsJsonMode: boolean;
    /**
     * Supports image input
     */
    supportsImageInput: boolean;
    /**
     * Supports audio input
     */
    supportsAudioInput: boolean;
    /**
     * Supports video input
     */
    supportsVideoInput: boolean;
    /**
     * Supports token-level streaming
     */
    supportsStreaming: boolean;
    /**
     * Supports token usage tracking
     */
    supportsTokenUsage: boolean;
    /**
     * Maximum context length in tokens
     */
    maxContextLength: number;
    /**
     * Maximum output tokens
     */
    maxOutputTokens: number;
}
/**
 * Abstract provider interface
 */
export interface LLMProvider {
    /**
     * Provider name
     */
    readonly name: ProviderName;
    /**
     * Create a chat model instance for classification
     */
    createClassificationModel(config: AIProviderConfig): BaseChatModel;
    /**
     * Create a chat model instance for extraction
     */
    createExtractionModel(config: AIProviderConfig): BaseChatModel;
    /**
     * Validate provider-specific configuration
     */
    validateConfig(config: AIProviderConfig): void;
    /**
     * Get model capabilities for a specific model
     */
    getModelCapabilities(modelName: string): ModelCapabilities;
    /**
     * Check if the provider is available (dependencies installed)
     */
    isAvailable(): boolean;
}
/**
 * Provider factory interface
 */
export interface ProviderFactory {
    /**
     * Register a provider implementation
     */
    registerProvider(name: ProviderName, provider: LLMProvider): void;
    /**
     * Create a provider instance from configuration
     */
    createProvider(config: AIProviderConfig): LLMProvider;
    /**
     * Get list of available providers
     */
    getAvailableProviders(): ProviderName[];
    /**
     * Check if a provider is registered and available
     */
    isProviderAvailable(name: ProviderName): boolean;
}
