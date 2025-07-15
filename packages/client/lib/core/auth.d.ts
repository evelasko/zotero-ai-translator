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
export declare class ZoteroAuth {
    private readonly apiKey;
    private readonly method;
    constructor(config: ZoteroAuthConfig);
    /**
     * Get the authentication headers for API requests
     */
    getAuthHeaders(): Record<string, string>;
    /**
     * Get the API key (for query parameter authentication if needed)
     */
    getApiKey(): string;
    /**
     * Check if authentication is configured
     */
    isAuthenticated(): boolean;
    /**
     * Validate API key format (basic validation)
     */
    validateApiKey(): boolean;
}
/**
 * Create authentication instance from API key string
 */
export declare function createAuth(apiKey: string, method?: 'header' | 'bearer'): ZoteroAuth;
/**
 * Type guard to check if auth config is valid
 */
export declare function isValidAuthConfig(config: unknown): config is ZoteroAuthConfig;
//# sourceMappingURL=auth.d.ts.map