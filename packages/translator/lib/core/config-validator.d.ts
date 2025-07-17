/**
 * Configuration validation system for Anthropic AI provider
 */
import { AnthropicConfig } from '../types';
/**
 * Configuration validator for Anthropic AI provider
 */
export declare class ConfigValidator {
    /**
     * Validate Anthropic provider configuration
     */
    static validateProviderConfig(config: AnthropicConfig): void;
    /**
     * Validate Anthropic-specific configuration
     */
    private static validateAnthropicConfig;
    /**
     * Validate Anthropic model name
     */
    private static validateAnthropicModel;
    /**
     * Get configuration recommendations for Anthropic
     */
    static getConfigurationRecommendations(): Record<string, string | number | boolean>;
}
