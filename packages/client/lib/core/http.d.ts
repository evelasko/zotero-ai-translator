/**
 * HTTP client wrapper for the Zotero Web API
 */
import { ZoteroAuth } from './auth';
export interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    headers?: Record<string, string>;
    body?: unknown;
    params?: Record<string, unknown>;
    timeout?: number;
    retries?: number;
}
export interface ZoteroResponse<T = unknown> {
    data: T;
    response: Response;
    headers: Headers;
    status: number;
    statusText: string;
}
export interface PaginationInfo {
    totalResults?: number;
    links?: {
        self?: string;
        next?: string;
        prev?: string;
        first?: string;
        last?: string;
    };
}
export interface ZoteroHttpClientConfig {
    baseURL?: string;
    defaultHeaders?: Record<string, string>;
    timeout?: number;
    retries?: number;
    auth?: ZoteroAuth;
}
export declare class ZoteroHttpClient {
    private readonly baseURL;
    private readonly defaultHeaders;
    private readonly timeout;
    private readonly retries;
    private auth?;
    constructor(config?: ZoteroHttpClientConfig);
    /**
     * Make an HTTP request to the Zotero API
     */
    request<T = unknown>(endpoint: string, options?: RequestOptions): Promise<ZoteroResponse<T>>;
    /**
     * GET request
     */
    get<T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ZoteroResponse<T>>;
    /**
     * POST request
     */
    post<T = unknown>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ZoteroResponse<T>>;
    /**
     * PUT request
     */
    put<T = unknown>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ZoteroResponse<T>>;
    /**
     * PATCH request
     */
    patch<T = unknown>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ZoteroResponse<T>>;
    /**
     * DELETE request
     */
    delete<T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ZoteroResponse<T>>;
    /**
     * Extract pagination information from response headers
     */
    extractPaginationInfo(response: Response): PaginationInfo;
    /**
     * Set authentication for the client
     */
    setAuth(auth: ZoteroAuth): void;
    /**
     * Build full URL with query parameters
     */
    private buildURL;
    /**
     * Build request headers
     */
    private buildHeaders;
    /**
     * Create abort signal for request timeout
     */
    private createAbortSignal;
    /**
     * Execute HTTP request with retry logic
     */
    private executeRequest;
    /**
     * Parse response body based on content type
     */
    private parseResponseBody;
    /**
     * Parse Link header for pagination
     */
    private parseLinkHeader;
    /**
     * Delay utility for retry logic
     */
    private delay;
}
//# sourceMappingURL=http.d.ts.map