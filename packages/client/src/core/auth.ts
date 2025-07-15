/**
 * Authentication configuration and utilities for the Zotero Web API client
 */

export interface ZoteroAuthConfig {
  /**
   * The Zotero API key for authentication
   */
  apiKey: string;
  
  /**
   * Authentication method preference
   * @default 'header'
   */
  method?: 'header' | 'bearer';
}

export class ZoteroAuth {
  private readonly apiKey: string;
  private readonly method: 'header' | 'bearer';

  constructor(config: ZoteroAuthConfig) {
    if (!config.apiKey || config.apiKey.trim() === '') {
      throw new Error('API key is required for authentication');
    }
    
    this.apiKey = config.apiKey.trim();
    this.method = config.method || 'header';
  }

  /**
   * Get the authentication headers for API requests
   */
  getAuthHeaders(): Record<string, string> {
    switch (this.method) {
      case 'bearer':
        return {
          'Authorization': `Bearer ${this.apiKey}`
        };
      case 'header':
      default:
        return {
          'Zotero-API-Key': this.apiKey
        };
    }
  }

  /**
   * Get the API key (for query parameter authentication if needed)
   */
  getApiKey(): string {
    return this.apiKey;
  }

  /**
   * Check if authentication is configured
   */
  isAuthenticated(): boolean {
    return this.apiKey.length > 0;
  }

  /**
   * Validate API key format (basic validation)
   */
  validateApiKey(): boolean {
    // Basic validation - Zotero API keys are typically 32 characters
    const keyRegex = /^[a-zA-Z0-9]{32}$/;
    return keyRegex.test(this.apiKey);
  }
}

/**
 * Create authentication instance from API key string
 */
export function createAuth(apiKey: string, method?: 'header' | 'bearer'): ZoteroAuth {
  return new ZoteroAuth({ apiKey, method: method || 'header' });
}

/**
 * Type guard to check if auth config is valid
 */
export function isValidAuthConfig(config: unknown): config is ZoteroAuthConfig {
  return (
    typeof config === 'object' &&
    config !== null &&
    typeof (config as ZoteroAuthConfig).apiKey === 'string' &&
    (config as ZoteroAuthConfig).apiKey.trim().length > 0
  );
}