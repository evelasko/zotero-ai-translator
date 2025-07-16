/**
 * Google Vertex AI provider implementation
 */

import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { ConfigurationError } from '../../types';
import {
  AIProviderConfig,
  LLMProvider,
  ModelCapabilities,
  VertexAIConfig,
  VertexAIModel,
} from '../../types/providers';
import { ProviderDetector } from '../provider-factory';

/**
 * Google Vertex AI provider implementation
 */
export class VertexAIProvider implements LLMProvider {
  readonly name = 'vertexai' as const;

  /**
   * Create a chat model instance for classification
   */
  createClassificationModel(config: AIProviderConfig): BaseChatModel {
    if (config.provider !== 'vertexai') {
      throw new ConfigurationError('Invalid provider configuration for Vertex AI');
    }

    const { ChatVertexAI } = require('@langchain/google-vertexai');

    const modelConfig: any = {
      model: config.classificationModel || 'gemini-1.5-flash',
      temperature: config.temperature || 0.1,
      maxOutputTokens: config.maxTokens || 2000,
      maxRetries: config.maxRetries || 2,
      location: config.location || 'us-central1',
    };

    // Add authentication options if provided
    if (config.authOptions) {
      modelConfig.authOptions = config.authOptions;
    }

    // Add context caching if configured
    if (config.contextCaching?.cachedContentId) {
      modelConfig.cachedContent = config.contextCaching.cachedContentId;
    }

    // Set project ID from environment or config
    if (process.env.GOOGLE_CLOUD_PROJECT) {
      modelConfig.projectId = process.env.GOOGLE_CLOUD_PROJECT;
    } else {
      modelConfig.projectId = config.projectId;
    }

    return new ChatVertexAI(modelConfig);
  }

  /**
   * Create a chat model instance for extraction
   */
  createExtractionModel(config: AIProviderConfig): BaseChatModel {
    if (config.provider !== 'vertexai') {
      throw new ConfigurationError('Invalid provider configuration for Vertex AI');
    }

    const { ChatVertexAI } = require('@langchain/google-vertexai');

    const modelConfig: any = {
      model: config.extractionModel || 'gemini-1.5-pro',
      temperature: config.temperature || 0.1,
      maxOutputTokens: config.maxTokens || 2000,
      maxRetries: config.maxRetries || 2,
      location: config.location || 'us-central1',
    };

    // Add authentication options if provided
    if (config.authOptions) {
      modelConfig.authOptions = config.authOptions;
    }

    // Add context caching if configured
    if (config.contextCaching?.cachedContentId) {
      modelConfig.cachedContent = config.contextCaching.cachedContentId;
    }

    // Set project ID from environment or config
    if (process.env.GOOGLE_CLOUD_PROJECT) {
      modelConfig.projectId = process.env.GOOGLE_CLOUD_PROJECT;
    } else {
      modelConfig.projectId = config.projectId;
    }

    return new ChatVertexAI(modelConfig);
  }

  /**
   * Validate Vertex AI-specific configuration
   */
  validateConfig(config: AIProviderConfig): void {
    if (config.provider !== 'vertexai') {
      throw new ConfigurationError('Invalid provider configuration for Vertex AI');
    }

    const vertexConfig = config as VertexAIConfig;

    if (!vertexConfig.projectId && !process.env.GOOGLE_CLOUD_PROJECT) {
      throw new ConfigurationError(
        'Google Cloud project ID is required (either in config or GOOGLE_CLOUD_PROJECT environment variable)',
      );
    }

    if (vertexConfig.classificationModel && !this.isValidModel(vertexConfig.classificationModel)) {
      throw new ConfigurationError(
        `Invalid Vertex AI classification model: ${vertexConfig.classificationModel}`,
      );
    }

    if (vertexConfig.extractionModel && !this.isValidModel(vertexConfig.extractionModel)) {
      throw new ConfigurationError(
        `Invalid Vertex AI extraction model: ${vertexConfig.extractionModel}`,
      );
    }

    if (
      vertexConfig.temperature !== undefined &&
      (vertexConfig.temperature < 0 || vertexConfig.temperature > 2)
    ) {
      throw new ConfigurationError('Temperature must be between 0 and 2');
    }

    if (vertexConfig.maxTokens !== undefined && vertexConfig.maxTokens <= 0) {
      throw new ConfigurationError('Max tokens must be greater than 0');
    }

    if (vertexConfig.maxRetries !== undefined && vertexConfig.maxRetries < 0) {
      throw new ConfigurationError('Max retries must be non-negative');
    }

    // Validate location if provided
    if (vertexConfig.location && !this.isValidLocation(vertexConfig.location)) {
      throw new ConfigurationError(`Invalid Vertex AI location: ${vertexConfig.location}`);
    }

    // Validate authentication options
    if (vertexConfig.authOptions) {
      if (vertexConfig.authOptions.keyFilename && vertexConfig.authOptions.credentials) {
        throw new ConfigurationError(
          'Cannot specify both keyFilename and credentials in authOptions',
        );
      }
    }

    // Validate context caching configuration
    if (vertexConfig.contextCaching) {
      if (
        vertexConfig.contextCaching.ttlSeconds !== undefined &&
        vertexConfig.contextCaching.ttlSeconds <= 0
      ) {
        throw new ConfigurationError('Context caching TTL must be greater than 0');
      }
    }
  }

  /**
   * Get model capabilities for a specific Vertex AI model
   */
  getModelCapabilities(modelName: string): ModelCapabilities {
    const vertexModel = modelName as VertexAIModel;

    // Base capabilities for all Vertex AI models
    const baseCapabilities: ModelCapabilities = {
      supportsToolCalling: true,
      supportsStructuredOutput: true,
      supportsJsonMode: false,
      supportsImageInput: true,
      supportsAudioInput: true,
      supportsVideoInput: true,
      supportsStreaming: true,
      supportsTokenUsage: true,
      maxContextLength: 32768,
      maxOutputTokens: 8192,
    };

    // Model-specific overrides
    switch (vertexModel) {
      case 'gemini-1.5-pro':
      case 'gemini-1.5-pro-002':
      case 'gemini-1.5-pro-001':
        return {
          ...baseCapabilities,
          maxContextLength: 2097152, // 2M tokens
          maxOutputTokens: 8192,
        };

      case 'gemini-1.5-flash':
      case 'gemini-1.5-flash-002':
      case 'gemini-1.5-flash-001':
        return {
          ...baseCapabilities,
          maxContextLength: 1048576, // 1M tokens
          maxOutputTokens: 8192,
        };

      case 'gemini-2.0-flash-exp':
        return {
          ...baseCapabilities,
          maxContextLength: 1048576, // 1M tokens
          maxOutputTokens: 8192,
        };

      case 'gemini-1.0-pro':
      case 'gemini-1.0-pro-001':
        return {
          ...baseCapabilities,
          supportsImageInput: false,
          supportsAudioInput: false,
          supportsVideoInput: false,
          maxContextLength: 32768,
          maxOutputTokens: 2048,
        };

      default:
        return baseCapabilities;
    }
  }

  /**
   * Check if the Vertex AI provider is available
   */
  isAvailable(): boolean {
    return ProviderDetector.isProviderInstalled('vertexai');
  }

  /**
   * Check if a model name is valid for Vertex AI
   */
  private isValidModel(model: string): boolean {
    const validModels: VertexAIModel[] = [
      'gemini-1.5-pro',
      'gemini-1.5-pro-002',
      'gemini-1.5-pro-001',
      'gemini-1.5-flash',
      'gemini-1.5-flash-002',
      'gemini-1.5-flash-001',
      'gemini-1.0-pro',
      'gemini-1.0-pro-001',
      'gemini-2.0-flash-exp',
    ];

    return validModels.includes(model as VertexAIModel);
  }

  /**
   * Check if a location is valid for Vertex AI
   */
  private isValidLocation(location: string): boolean {
    const validLocations = [
      'us-central1',
      'us-east1',
      'us-east4',
      'us-west1',
      'us-west4',
      'europe-west1',
      'europe-west2',
      'europe-west3',
      'europe-west4',
      'asia-east1',
      'asia-northeast1',
      'asia-southeast1',
      'australia-southeast1',
    ];

    return validLocations.includes(location);
  }

  /**
   * Get recommended models for different use cases
   */
  static getRecommendedModels() {
    return {
      classification: 'gemini-1.5-flash' as VertexAIModel,
      extraction: 'gemini-1.5-pro' as VertexAIModel,
      highAccuracy: 'gemini-1.5-pro-002' as VertexAIModel,
      costEffective: 'gemini-1.5-flash' as VertexAIModel,
      multimodal: 'gemini-1.5-pro' as VertexAIModel,
      experimental: 'gemini-2.0-flash-exp' as VertexAIModel,
    };
  }

  /**
   * Get available locations for Vertex AI
   */
  static getAvailableLocations() {
    return {
      'us-central1': 'Iowa, USA',
      'us-east1': 'South Carolina, USA',
      'us-east4': 'Northern Virginia, USA',
      'us-west1': 'Oregon, USA',
      'us-west4': 'Las Vegas, USA',
      'europe-west1': 'Belgium',
      'europe-west2': 'London, UK',
      'europe-west3': 'Frankfurt, Germany',
      'europe-west4': 'Netherlands',
      'asia-east1': 'Taiwan',
      'asia-northeast1': 'Tokyo, Japan',
      'asia-southeast1': 'Singapore',
      'australia-southeast1': 'Sydney, Australia',
    };
  }

  /**
   * Get model pricing tier information
   */
  static getModelPricing(model: VertexAIModel): {
    tier: 'low' | 'medium' | 'high';
    description: string;
  } {
    switch (model) {
      case 'gemini-1.5-flash':
      case 'gemini-1.5-flash-002':
      case 'gemini-1.5-flash-001':
        return { tier: 'low', description: 'Fast and cost-effective model' };
      case 'gemini-1.0-pro':
      case 'gemini-1.0-pro-001':
        return { tier: 'low', description: 'Basic text-only model' };
      case 'gemini-1.5-pro':
      case 'gemini-1.5-pro-002':
      case 'gemini-1.5-pro-001':
        return { tier: 'medium', description: 'Advanced multimodal model with large context' };
      case 'gemini-2.0-flash-exp':
        return { tier: 'medium', description: 'Experimental next-generation model' };
      default:
        return { tier: 'medium', description: 'Standard pricing' };
    }
  }
}
