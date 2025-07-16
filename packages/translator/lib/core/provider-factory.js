"use strict";
/**
 * Provider factory implementation for managing LLM providers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderDetector = exports.ProviderFactory = void 0;
const types_1 = require("../types");
/**
 * Concrete implementation of the provider factory
 */
class ProviderFactoryImpl {
    providers = new Map();
    /**
     * Register a provider implementation
     */
    registerProvider(name, provider) {
        this.providers.set(name, provider);
    }
    /**
     * Create a provider instance from configuration
     */
    createProvider(config) {
        const provider = this.providers.get(config.provider);
        if (!provider) {
            throw new types_1.ConfigurationError(`Provider '${config.provider}' is not registered. Available providers: ${this.getAvailableProviders().join(', ')}`);
        }
        if (!provider.isAvailable()) {
            throw new types_1.ConfigurationError(`Provider '${config.provider}' is not available. Please install the required dependencies.`);
        }
        // Validate configuration before creating provider
        provider.validateConfig(config);
        return provider;
    }
    /**
     * Get list of available providers
     */
    getAvailableProviders() {
        return Array.from(this.providers.keys()).filter(name => {
            const provider = this.providers.get(name);
            return provider?.isAvailable() || false;
        });
    }
    /**
     * Check if a provider is registered and available
     */
    isProviderAvailable(name) {
        const provider = this.providers.get(name);
        return provider ? provider.isAvailable() : false;
    }
    /**
     * Get a registered provider by name
     */
    getProvider(name) {
        return this.providers.get(name);
    }
    /**
     * Get all registered provider names (including unavailable ones)
     */
    getRegisteredProviders() {
        return Array.from(this.providers.keys());
    }
}
/**
 * Global provider factory instance
 */
exports.ProviderFactory = new ProviderFactoryImpl();
/**
 * Utility function to detect available providers by checking dependencies
 */
class ProviderDetector {
    /**
     * Detect which provider packages are installed
     */
    static detectInstalledProviders() {
        const available = [];
        // Check for OpenAI
        try {
            require('@langchain/openai');
            available.push('openai');
        }
        catch (error) {
            // Package not installed
        }
        // Check for Anthropic
        try {
            require('@langchain/anthropic');
            available.push('anthropic');
        }
        catch (error) {
            // Package not installed
        }
        // Check for Google Vertex AI
        try {
            require('@langchain/google-vertexai');
            available.push('vertexai');
        }
        catch (error) {
            // Package not installed
        }
        // Check for Ollama
        try {
            require('@langchain/ollama');
            available.push('ollama');
        }
        catch (error) {
            // Package not installed
        }
        return available;
    }
    /**
     * Check if a specific provider package is installed
     */
    static isProviderInstalled(provider) {
        const packageMap = {
            openai: '@langchain/openai',
            anthropic: '@langchain/anthropic',
            vertexai: '@langchain/google-vertexai',
            ollama: '@langchain/ollama',
        };
        try {
            require(packageMap[provider]);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Get installation instructions for a provider
     */
    static getInstallationInstructions(provider) {
        const instructions = {
            openai: 'npm install @langchain/openai',
            anthropic: 'npm install @langchain/anthropic',
            vertexai: 'npm install @langchain/google-vertexai',
            ollama: 'npm install @langchain/ollama',
        };
        return instructions[provider] || 'Provider not recognized';
    }
}
exports.ProviderDetector = ProviderDetector;
