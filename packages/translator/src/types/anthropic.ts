/**
 * Anthropic-specific type definitions for browser-compatible AI translation
 */

/**
 * Configuration for the Anthropic AI provider
 */
export interface AnthropicConfig {
  /**
   * Anthropic API key
   */
  apiKey: string;

  /**
   * Model to use for classification tasks
   * @default 'claude-3-haiku-20240307'
   */
  classificationModel?: AnthropicModel;

  /**
   * Model to use for extraction tasks
   * @default 'claude-3-5-sonnet-20241022'
   */
  extractionModel?: AnthropicModel;

  /**
   * Maximum tokens to generate
   * @default 4096
   */
  maxTokens?: number;

  /**
   * Temperature for response generation (0-1)
   * @default 0.1
   */
  temperature?: number;

  /**
   * Enable dangerous browser access for CORS support
   * WARNING: Only use in trusted environments
   * @default false
   */
  enableDangerousBrowserAccess?: boolean;

  /**
   * Custom headers to send with requests
   */
  customHeaders?: Record<string, string>;

  /**
   * Enable prompt caching (if supported)
   * @default false
   */
  enablePromptCaching?: boolean;

  /**
   * Maximum retries for failed requests
   * @default 2
   */
  maxRetries?: number;

  /**
   * Request timeout in milliseconds
   * @default 30000
   */
  timeout?: number;
}

/**
 * Available Anthropic models
 */
export type AnthropicModel =
  | 'claude-3-5-sonnet-20241022'
  | 'claude-3-5-sonnet-20240620'
  | 'claude-3-5-haiku-20241022'
  | 'claude-3-opus-20240229'
  | 'claude-3-sonnet-20240229'
  | 'claude-3-haiku-20240307';

/**
 * Anthropic message response
 */
export interface AnthropicResponse {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

/**
 * Options for Anthropic client initialization
 */
export interface AnthropicClientOptions {
  classificationModel: string;
  extractionModel: string;
  maxTokens: number;
  temperature: number;
  enableDangerousBrowserAccess: boolean;
  customHeaders?: Record<string, string>;
  enablePromptCaching: boolean;
  maxRetries: number;
  timeout: number;
}