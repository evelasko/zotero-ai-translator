/**
 * Provider exports and registration
 */

import { ProviderFactory } from '../provider-factory';
import { AnthropicProvider } from './anthropic-provider';
import { OllamaProvider } from './ollama-provider';
import { OpenAIProvider } from './openai-provider';
import { VertexAIProvider } from './vertexai-provider';

// Provider implementations
export { AnthropicProvider } from './anthropic-provider';
export { OllamaProvider } from './ollama-provider';
export { OpenAIProvider } from './openai-provider';
export { VertexAIProvider } from './vertexai-provider';

// Re-export factory and detector
export { ProviderDetector, ProviderFactory } from '../provider-factory';

/**
 * Initialize and register all available providers
 */
export function registerAllProviders(): void {
  // Import and register providers dynamically to avoid import errors
  // when optional dependencies are not installed

  // Register OpenAI provider if available
  try {
    ProviderFactory.registerProvider('openai', new OpenAIProvider());
  } catch (error) {
    // OpenAI provider not available
  }

  // Register Anthropic provider if available
  try {
    ProviderFactory.registerProvider('anthropic', new AnthropicProvider());
  } catch (error) {
    // Anthropic provider not available
  }

  // Register Vertex AI provider if available
  try {
    ProviderFactory.registerProvider('vertexai', new VertexAIProvider());
  } catch (error) {
    // Vertex AI provider not available
  }

  // Register Ollama provider if available
  try {
    ProviderFactory.registerProvider('ollama', new OllamaProvider());
  } catch (error) {
    // Ollama provider not available
  }
}

/**
 * Get provider registration status and available models
 */
export function getProviderStatus() {
  const status = {
    registered: ProviderFactory.getRegisteredProviders(),
    available: ProviderFactory.getAvailableProviders(),
    recommendations: {
      openai: (() => {
        try {
          return OpenAIProvider.getRecommendedModels();
        } catch {
          return null;
        }
      })(),
      anthropic: (() => {
        try {
          return AnthropicProvider.getRecommendedModels();
        } catch {
          return null;
        }
      })(),
      vertexai: (() => {
        try {
          return VertexAIProvider.getRecommendedModels();
        } catch {
          return null;
        }
      })(),
      ollama: (() => {
        try {
          return OllamaProvider.getRecommendedModels();
        } catch {
          return null;
        }
      })(),
    },
  };

  return status;
}

// Auto-register providers when this module is imported
registerAllProviders();
