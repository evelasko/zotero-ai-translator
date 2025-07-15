/**
 * Custom error classes for the Zotero Web API client
 */
export declare class ZoteroAPIError extends Error {
    readonly statusCode?: number;
    readonly response?: Response;
    readonly body?: unknown;
    constructor(message: string, statusCode?: number, response?: Response, body?: unknown);
}
export declare class ZoteroAuthenticationError extends ZoteroAPIError {
    constructor(message?: string, statusCode?: number, response?: Response, body?: unknown);
}
export declare class ZoteroNotFoundError extends ZoteroAPIError {
    constructor(message?: string, statusCode?: number, response?: Response, body?: unknown);
}
export declare class ZoteroRateLimitError extends ZoteroAPIError {
    readonly retryAfter?: number;
    readonly backoff?: number;
    constructor(message?: string, statusCode?: number, response?: Response, body?: unknown, retryAfter?: number, backoff?: number);
}
export declare class ZoteroValidationError extends ZoteroAPIError {
    readonly validationErrors?: unknown[];
    constructor(message?: string, statusCode?: number, response?: Response, body?: unknown, validationErrors?: unknown[]);
}
export declare class ZoteroConflictError extends ZoteroAPIError {
    constructor(message?: string, statusCode?: number, response?: Response, body?: unknown);
}
export declare class ZoteroForbiddenError extends ZoteroAPIError {
    constructor(message?: string, statusCode?: number, response?: Response, body?: unknown);
}
export declare class ZoteroBadRequestError extends ZoteroAPIError {
    constructor(message?: string, statusCode?: number, response?: Response, body?: unknown);
}
export declare class ZoteroServerError extends ZoteroAPIError {
    constructor(message?: string, statusCode?: number, response?: Response, body?: unknown);
}
export declare class ZoteroNetworkError extends ZoteroAPIError {
    readonly cause?: Error;
    constructor(message?: string, originalError?: Error);
}
/**
 * Creates appropriate error instance based on HTTP status code
 */
export declare function createErrorFromResponse(response: Response, body?: unknown, message?: string): ZoteroAPIError;
/**
 * Type guard to check if error is a Zotero API error
 */
export declare function isZoteroAPIError(error: unknown): error is ZoteroAPIError;
/**
 * Type guard to check if error is a rate limit error
 */
export declare function isRateLimitError(error: unknown): error is ZoteroRateLimitError;
/**
 * Type guard to check if error is an authentication error
 */
export declare function isAuthenticationError(error: unknown): error is ZoteroAuthenticationError;
/**
 * Type guard to check if error is a validation error
 */
export declare function isValidationError(error: unknown): error is ZoteroValidationError;
/**
 * Type guard to check if error is a network error
 */
export declare function isNetworkError(error: unknown): error is ZoteroNetworkError;
//# sourceMappingURL=errors.d.ts.map