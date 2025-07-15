"use strict";
/**
 * Custom error classes for the Zotero Web API client
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoteroNetworkError = exports.ZoteroServerError = exports.ZoteroBadRequestError = exports.ZoteroForbiddenError = exports.ZoteroConflictError = exports.ZoteroValidationError = exports.ZoteroRateLimitError = exports.ZoteroNotFoundError = exports.ZoteroAuthenticationError = exports.ZoteroAPIError = void 0;
exports.createErrorFromResponse = createErrorFromResponse;
exports.isZoteroAPIError = isZoteroAPIError;
exports.isRateLimitError = isRateLimitError;
exports.isAuthenticationError = isAuthenticationError;
exports.isValidationError = isValidationError;
exports.isNetworkError = isNetworkError;
class ZoteroAPIError extends Error {
    constructor(message, statusCode, response, body) {
        super(message);
        Object.defineProperty(this, "statusCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'ZoteroAPIError';
        this.statusCode = statusCode;
        this.response = response;
        this.body = body;
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ZoteroAPIError);
        }
    }
}
exports.ZoteroAPIError = ZoteroAPIError;
class ZoteroAuthenticationError extends ZoteroAPIError {
    constructor(message = 'Authentication failed', statusCode, response, body) {
        super(message, statusCode, response, body);
        this.name = 'ZoteroAuthenticationError';
    }
}
exports.ZoteroAuthenticationError = ZoteroAuthenticationError;
class ZoteroNotFoundError extends ZoteroAPIError {
    constructor(message = 'Resource not found', statusCode, response, body) {
        super(message, statusCode, response, body);
        this.name = 'ZoteroNotFoundError';
    }
}
exports.ZoteroNotFoundError = ZoteroNotFoundError;
class ZoteroRateLimitError extends ZoteroAPIError {
    constructor(message = 'Rate limit exceeded', statusCode, response, body, retryAfter, backoff) {
        super(message, statusCode, response, body);
        Object.defineProperty(this, "retryAfter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "backoff", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'ZoteroRateLimitError';
        this.retryAfter = retryAfter;
        this.backoff = backoff;
    }
}
exports.ZoteroRateLimitError = ZoteroRateLimitError;
class ZoteroValidationError extends ZoteroAPIError {
    constructor(message = 'Validation failed', statusCode, response, body, validationErrors) {
        super(message, statusCode, response, body);
        Object.defineProperty(this, "validationErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'ZoteroValidationError';
        this.validationErrors = validationErrors;
    }
}
exports.ZoteroValidationError = ZoteroValidationError;
class ZoteroConflictError extends ZoteroAPIError {
    constructor(message = 'Resource conflict', statusCode, response, body) {
        super(message, statusCode, response, body);
        this.name = 'ZoteroConflictError';
    }
}
exports.ZoteroConflictError = ZoteroConflictError;
class ZoteroForbiddenError extends ZoteroAPIError {
    constructor(message = 'Access forbidden', statusCode, response, body) {
        super(message, statusCode, response, body);
        this.name = 'ZoteroForbiddenError';
    }
}
exports.ZoteroForbiddenError = ZoteroForbiddenError;
class ZoteroBadRequestError extends ZoteroAPIError {
    constructor(message = 'Bad request', statusCode, response, body) {
        super(message, statusCode, response, body);
        this.name = 'ZoteroBadRequestError';
    }
}
exports.ZoteroBadRequestError = ZoteroBadRequestError;
class ZoteroServerError extends ZoteroAPIError {
    constructor(message = 'Server error', statusCode, response, body) {
        super(message, statusCode, response, body);
        this.name = 'ZoteroServerError';
    }
}
exports.ZoteroServerError = ZoteroServerError;
class ZoteroNetworkError extends ZoteroAPIError {
    constructor(message = 'Network error', originalError) {
        super(message);
        Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'ZoteroNetworkError';
        this.cause = originalError;
    }
}
exports.ZoteroNetworkError = ZoteroNetworkError;
/**
 * Creates appropriate error instance based on HTTP status code
 */
function createErrorFromResponse(response, body, message) {
    const statusCode = response.status;
    const defaultMessage = `HTTP ${statusCode}: ${response.statusText}`;
    const errorMessage = message ?? defaultMessage;
    switch (statusCode) {
        case 400:
            return new ZoteroBadRequestError(errorMessage, statusCode, response, body);
        case 401:
            return new ZoteroAuthenticationError(errorMessage, statusCode, response, body);
        case 403:
            return new ZoteroForbiddenError(errorMessage, statusCode, response, body);
        case 404:
            return new ZoteroNotFoundError(errorMessage, statusCode, response, body);
        case 409:
            return new ZoteroConflictError(errorMessage, statusCode, response, body);
        case 412:
            return new ZoteroValidationError(errorMessage, statusCode, response, body);
        case 429: {
            const retryAfter = response.headers.get('Retry-After');
            const backoff = response.headers.get('Backoff');
            return new ZoteroRateLimitError(errorMessage, statusCode, response, body, retryAfter ? parseInt(retryAfter, 10) : undefined, backoff ? parseInt(backoff, 10) : undefined);
        }
        case 500:
        case 502:
        case 503:
        case 504:
            return new ZoteroServerError(errorMessage, statusCode, response, body);
        default:
            return new ZoteroAPIError(errorMessage, statusCode, response, body);
    }
}
/**
 * Type guard to check if error is a Zotero API error
 */
function isZoteroAPIError(error) {
    return error instanceof ZoteroAPIError;
}
/**
 * Type guard to check if error is a rate limit error
 */
function isRateLimitError(error) {
    return error instanceof ZoteroRateLimitError;
}
/**
 * Type guard to check if error is an authentication error
 */
function isAuthenticationError(error) {
    return error instanceof ZoteroAuthenticationError;
}
/**
 * Type guard to check if error is a validation error
 */
function isValidationError(error) {
    return error instanceof ZoteroValidationError;
}
/**
 * Type guard to check if error is a network error
 */
function isNetworkError(error) {
    return error instanceof ZoteroNetworkError;
}
//# sourceMappingURL=errors.js.map