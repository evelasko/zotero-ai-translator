/**
 * Custom error classes for the Zotero Web API client
 */

export class ZoteroAPIError extends Error {
  public readonly statusCode?: number;
  public readonly response?: Response;
  public readonly body?: unknown;

  constructor(message: string, statusCode?: number, response?: Response, body?: unknown) {
    super(message);
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

export class ZoteroAuthenticationError extends ZoteroAPIError {
  constructor(
    message: string = 'Authentication failed',
    statusCode?: number,
    response?: Response,
    body?: unknown,
  ) {
    super(message, statusCode, response, body);
    this.name = 'ZoteroAuthenticationError';
  }
}

export class ZoteroNotFoundError extends ZoteroAPIError {
  constructor(
    message: string = 'Resource not found',
    statusCode?: number,
    response?: Response,
    body?: unknown,
  ) {
    super(message, statusCode, response, body);
    this.name = 'ZoteroNotFoundError';
  }
}

export class ZoteroRateLimitError extends ZoteroAPIError {
  public readonly retryAfter?: number;
  public readonly backoff?: number;

  constructor(
    message: string = 'Rate limit exceeded',
    statusCode?: number,
    response?: Response,
    body?: unknown,
    retryAfter?: number,
    backoff?: number,
  ) {
    super(message, statusCode, response, body);
    this.name = 'ZoteroRateLimitError';
    this.retryAfter = retryAfter;
    this.backoff = backoff;
  }
}

export class ZoteroValidationError extends ZoteroAPIError {
  public readonly validationErrors?: unknown[];

  constructor(
    message: string = 'Validation failed',
    statusCode?: number,
    response?: Response,
    body?: unknown,
    validationErrors?: unknown[],
  ) {
    super(message, statusCode, response, body);
    this.name = 'ZoteroValidationError';
    this.validationErrors = validationErrors;
  }
}

export class ZoteroConflictError extends ZoteroAPIError {
  constructor(
    message: string = 'Resource conflict',
    statusCode?: number,
    response?: Response,
    body?: unknown,
  ) {
    super(message, statusCode, response, body);
    this.name = 'ZoteroConflictError';
  }
}

export class ZoteroForbiddenError extends ZoteroAPIError {
  constructor(
    message: string = 'Access forbidden',
    statusCode?: number,
    response?: Response,
    body?: unknown,
  ) {
    super(message, statusCode, response, body);
    this.name = 'ZoteroForbiddenError';
  }
}

export class ZoteroBadRequestError extends ZoteroAPIError {
  constructor(
    message: string = 'Bad request',
    statusCode?: number,
    response?: Response,
    body?: unknown,
  ) {
    super(message, statusCode, response, body);
    this.name = 'ZoteroBadRequestError';
  }
}

export class ZoteroServerError extends ZoteroAPIError {
  constructor(
    message: string = 'Server error',
    statusCode?: number,
    response?: Response,
    body?: unknown,
  ) {
    super(message, statusCode, response, body);
    this.name = 'ZoteroServerError';
  }
}

export class ZoteroNetworkError extends ZoteroAPIError {
  public readonly cause?: Error;

  constructor(message: string = 'Network error', originalError?: Error) {
    super(message);
    this.name = 'ZoteroNetworkError';
    this.cause = originalError;
  }
}

/**
 * Creates appropriate error instance based on HTTP status code
 */
export function createErrorFromResponse(
  response: Response,
  body?: unknown,
  message?: string,
): ZoteroAPIError {
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
      return new ZoteroRateLimitError(
        errorMessage,
        statusCode,
        response,
        body,
        retryAfter ? parseInt(retryAfter, 10) : undefined,
        backoff ? parseInt(backoff, 10) : undefined,
      );
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
export function isZoteroAPIError(error: unknown): error is ZoteroAPIError {
  return error instanceof ZoteroAPIError;
}

/**
 * Type guard to check if error is a rate limit error
 */
export function isRateLimitError(error: unknown): error is ZoteroRateLimitError {
  return error instanceof ZoteroRateLimitError;
}

/**
 * Type guard to check if error is an authentication error
 */
export function isAuthenticationError(error: unknown): error is ZoteroAuthenticationError {
  return error instanceof ZoteroAuthenticationError;
}

/**
 * Type guard to check if error is a validation error
 */
export function isValidationError(error: unknown): error is ZoteroValidationError {
  return error instanceof ZoteroValidationError;
}

/**
 * Type guard to check if error is a network error
 */
export function isNetworkError(error: unknown): error is ZoteroNetworkError {
  return error instanceof ZoteroNetworkError;
}
