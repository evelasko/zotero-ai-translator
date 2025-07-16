/**
 * Provider factory implementation for managing LLM providers
 */

import { ConfigurationError } from '../types';
import {
  AIProviderConfig,
  ProviderFactory as IProviderFactory,
  LLMProvider,
  ProviderName,
} from '../types/providers';

/**
 * Concrete implementation of the provider factory
 */
class ProviderFactoryImpl implements IProviderFactory {
  private providers = new Map<ProviderName, LLMProvider>();

  /**
   * Register a provider implementation
   */
  registerProvider(name: ProviderName, provider: LLMProvider): void {
    this.providers.set(name, provider);
  }

  /**
   * Create a provider instance from configuration
   */
  createProvider(config: AIProviderConfig): LLMProvider {
    const provider = this.providers.get(config.provider);

    if (!provider) {
      throw new ConfigurationError(
        `Provider '${config.provider}' is not registered. Available providers: ${this.getAvailableProviders().join(', ')}`,
      );
    }

    if (!provider.isAvailable()) {
      throw new ConfigurationError(
        `Provider '${config.provider}' is not available. Please install the required dependencies.`,
      );
    }

    // Validate configuration before creating provider
    provider.validateConfig(config);

    return provider;
  }

  /**
   * Get list of available providers
   */
  getAvailableProviders(): ProviderName[] {
    return Array.from(this.providers.keys()).filter(name => {
      const provider = this.providers.get(name);
      return provider?.isAvailable() || false;
    });
  }

  /**
   * Check if a provider is registered and available
   */
  isProviderAvailable(name: ProviderName): boolean {
    const provider = this.providers.get(name);
    return provider ? provider.isAvailable() : false;
  }

  /**
   * Get a registered provider by name
   */
  getProvider(name: ProviderName): LLMProvider | undefined {
    return this.providers.get(name);
  }

  /**
   * Get all registered provider names (including unavailable ones)
   */
  getRegisteredProviders(): ProviderName[] {
    return Array.from(this.providers.keys());
  }
}

/**
 * Global provider factory instance
 */
export const ProviderFactory = new ProviderFactoryImpl();

/**
 * Utility function to detect available providers by checking dependencies
 */
export class ProviderDetector {
  /**
   * Detect which provider packages are installed
   */
  static detectInstalledProviders(): ProviderName[] {
    const available: ProviderName[] = [];

    // Check for OpenAI
    try {
      require('@langchain/openai');
      available.push('openai');
    } catch (error) {
      // Package not installed
    }

    // Check for Anthropic
    try {
      require('@langchain/anthropic');
      available.push('anthropic');
    } catch (error) {
      // Package not installed
    }

    // Check for Google Vertex AI
    try {
      require('@langchain/google-vertexai');
      available.push('vertexai');
    } catch (error) {
      // Package not installed
    }

    // Check for Ollama
    try {
      require('@langchain/ollama');
      available.push('ollama');
    } catch (error) {
      // Package not installed
    }

    return available;
  }

  /**
   * Check if a specific provider package is installed
   */
  static isProviderInstalled(provider: ProviderName): boolean {
    const packageMap: Record<ProviderName, string> = {
      openai: '@langchain/openai',
      anthropic: '@langchain/anthropic',
      vertexai: '@langchain/google-vertexai',
      ollama: '@langchain/ollama',
    };

    try {
      require(packageMap[provider]);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get installation instructions for a provider
   */
  static getInstallationInstructions(provider: ProviderName): string {
    const instructions: Record<ProviderName, string> = {
      openai: 'npm install @langchain/openai',
      anthropic: 'npm install @langchain/anthropic',
      vertexai: 'npm install @langchain/google-vertexai',
      ollama: 'npm install @langchain/ollama',
    };

    return instructions[provider] || 'Provider not recognized';
  }
}
