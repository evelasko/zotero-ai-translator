/**
 * Configuration validation system for all providers
 */
import { AIProviderConfig, ProviderName } from '../types/providers';
/**
 * Configuration validator for all AI providers
 */
export declare class ConfigValidator {
    /**
     * Validate any provider configuration
     */
    static validateProviderConfig(config: AIProviderConfig): void;
    /**
     * Validate base configuration common to all providers
     */
    private static validateBaseConfig;
    /**
     * Validate OpenAI-specific configuration
     */
    private static validateOpenAIConfig;
    /**
     * Validate Anthropic-specific configuration
     */
    private static validateAnthropicConfig;
    /**
     * Validate Vertex AI-specific configuration
     */
    private static validateVertexAIConfig;
    /**
     * Validate Ollama-specific configuration
     */
    private static validateOllamaConfig;
    /**
     * Validate URL format
     */
    private static validateUrl;
    /**
     * Validate OpenAI model name
     */
    private static validateOpenAIModel;
    /**
     * Validate Anthropic model name
     */
    private static validateAnthropicModel;
    /**
     * Validate Vertex AI model name
     */
    private static validateVertexAIModel;
    /**
     * Validate Ollama model name
     */
    private static validateOllamaModel;
    /**
     * Check if a provider is available for use
     */
    static validateProviderAvailability(provider: ProviderName): void;
    /**
     * Get configuration recommendations for a provider
     */
    static getConfigurationRecommendations(provider: ProviderName): Record<string, string | number | boolean>;
}
