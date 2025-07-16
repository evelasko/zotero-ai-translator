/**
 * Provider factory implementation for managing LLM providers
 */
import { AIProviderConfig, ProviderFactory as IProviderFactory, LLMProvider, ProviderName } from '../types/providers';
/**
 * Concrete implementation of the provider factory
 */
declare class ProviderFactoryImpl implements IProviderFactory {
    private providers;
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
    /**
     * Get a registered provider by name
     */
    getProvider(name: ProviderName): LLMProvider | undefined;
    /**
     * Get all registered provider names (including unavailable ones)
     */
    getRegisteredProviders(): ProviderName[];
}
/**
 * Global provider factory instance
 */
export declare const ProviderFactory: ProviderFactoryImpl;
/**
 * Utility function to detect available providers by checking dependencies
 */
export declare class ProviderDetector {
    /**
     * Detect which provider packages are installed
     */
    static detectInstalledProviders(): ProviderName[];
    /**
     * Check if a specific provider package is installed
     */
    static isProviderInstalled(provider: ProviderName): boolean;
    /**
     * Get installation instructions for a provider
     */
    static getInstallationInstructions(provider: ProviderName): string;
}
export {};
