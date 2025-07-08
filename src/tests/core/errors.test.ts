/**
 * Tests for error handling functionality
 */

import { describe, it, expect } from 'vitest';
import {
  ZoteroAPIError,
  ZoteroAuthenticationError,
  ZoteroNotFoundError,
  ZoteroRateLimitError,
  ZoteroValidationError,
  ZoteroConflictError,
  ZoteroForbiddenError,
  ZoteroBadRequestError,
  ZoteroServerError,
  ZoteroNetworkError,
  createErrorFromResponse,
  isZoteroAPIError,
  isRateLimitError,
  isAuthenticationError,
  isValidationError,
  isNetworkError,
} from '../../core/errors.js';

describe('Error Classes', () => {
  describe('ZoteroAPIError', () => {
    it('should create basic error', () => {
      const error = new ZoteroAPIError('Test error');
      
      expect(error.name).toBe('ZoteroAPIError');
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBeUndefined();
    });

    it('should create error with status code', () => {
      const error = new ZoteroAPIError('Test error', 404);
      
      expect(error.statusCode).toBe(404);
    });

    it('should create error with response and body', () => {
      const mockResponse = new Response('Not Found', { status: 404 });
      const error = new ZoteroAPIError('Test error', 404, mockResponse, { error: 'Not found' });
      
      expect(error.response).toBe(mockResponse);
      expect(error.body).toEqual({ error: 'Not found' });
    });
  });

  describe('ZoteroAuthenticationError', () => {
    it('should create authentication error', () => {
      const error = new ZoteroAuthenticationError();
      
      expect(error.name).toBe('ZoteroAuthenticationError');
      expect(error.message).toBe('Authentication failed');
    });

    it('should create authentication error with custom message', () => {
      const error = new ZoteroAuthenticationError('Invalid API key');
      
      expect(error.message).toBe('Invalid API key');
    });
  });

  describe('ZoteroNotFoundError', () => {
    it('should create not found error', () => {
      const error = new ZoteroNotFoundError();
      
      expect(error.name).toBe('ZoteroNotFoundError');
      expect(error.message).toBe('Resource not found');
    });
  });

  describe('ZoteroRateLimitError', () => {
    it('should create rate limit error', () => {
      const error = new ZoteroRateLimitError();
      
      expect(error.name).toBe('ZoteroRateLimitError');
      expect(error.message).toBe('Rate limit exceeded');
    });

    it('should create rate limit error with retry info', () => {
      const error = new ZoteroRateLimitError('Rate limited', 429, undefined, undefined, 60, 30);
      
      expect(error.retryAfter).toBe(60);
      expect(error.backoff).toBe(30);
    });
  });

  describe('ZoteroValidationError', () => {
    it('should create validation error', () => {
      const error = new ZoteroValidationError();
      
      expect(error.name).toBe('ZoteroValidationError');
      expect(error.message).toBe('Validation failed');
    });

    it('should create validation error with validation errors', () => {
      const validationErrors = [{ field: 'title', message: 'Required' }];
      const error = new ZoteroValidationError('Invalid data', 400, undefined, undefined, validationErrors);
      
      expect(error.validationErrors).toEqual(validationErrors);
    });
  });

  describe('ZoteroConflictError', () => {
    it('should create conflict error', () => {
      const error = new ZoteroConflictError();
      
      expect(error.name).toBe('ZoteroConflictError');
      expect(error.message).toBe('Resource conflict');
    });
  });

  describe('ZoteroForbiddenError', () => {
    it('should create forbidden error', () => {
      const error = new ZoteroForbiddenError();
      
      expect(error.name).toBe('ZoteroForbiddenError');
      expect(error.message).toBe('Access forbidden');
    });
  });

  describe('ZoteroBadRequestError', () => {
    it('should create bad request error', () => {
      const error = new ZoteroBadRequestError();
      
      expect(error.name).toBe('ZoteroBadRequestError');
      expect(error.message).toBe('Bad request');
    });
  });

  describe('ZoteroServerError', () => {
    it('should create server error', () => {
      const error = new ZoteroServerError();
      
      expect(error.name).toBe('ZoteroServerError');
      expect(error.message).toBe('Server error');
    });
  });

  describe('ZoteroNetworkError', () => {
    it('should create network error', () => {
      const error = new ZoteroNetworkError();
      
      expect(error.name).toBe('ZoteroNetworkError');
      expect(error.message).toBe('Network error');
    });

    it('should create network error with cause', () => {
      const originalError = new Error('Network failed');
      const error = new ZoteroNetworkError('Connection failed', originalError);
      
      expect(error.cause).toBe(originalError);
    });
  });
});

describe('createErrorFromResponse', () => {
  it('should create appropriate error for 400 status', () => {
    const response = new Response('Bad Request', { status: 400, statusText: 'Bad Request' });
    const error = createErrorFromResponse(response);
    
    expect(error).toBeInstanceOf(ZoteroBadRequestError);
    expect(error.statusCode).toBe(400);
  });

  it('should create appropriate error for 401 status', () => {
    const response = new Response('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    const error = createErrorFromResponse(response);
    
    expect(error).toBeInstanceOf(ZoteroAuthenticationError);
    expect(error.statusCode).toBe(401);
  });

  it('should create appropriate error for 403 status', () => {
    const response = new Response('Forbidden', { status: 403, statusText: 'Forbidden' });
    const error = createErrorFromResponse(response);
    
    expect(error).toBeInstanceOf(ZoteroForbiddenError);
    expect(error.statusCode).toBe(403);
  });

  it('should create appropriate error for 404 status', () => {
    const response = new Response('Not Found', { status: 404, statusText: 'Not Found' });
    const error = createErrorFromResponse(response);
    
    expect(error).toBeInstanceOf(ZoteroNotFoundError);
    expect(error.statusCode).toBe(404);
  });

  it('should create appropriate error for 409 status', () => {
    const response = new Response('Conflict', { status: 409, statusText: 'Conflict' });
    const error = createErrorFromResponse(response);
    
    expect(error).toBeInstanceOf(ZoteroConflictError);
    expect(error.statusCode).toBe(409);
  });

  it('should create appropriate error for 412 status', () => {
    const response = new Response('Precondition Failed', { status: 412, statusText: 'Precondition Failed' });
    const error = createErrorFromResponse(response);
    
    expect(error).toBeInstanceOf(ZoteroValidationError);
    expect(error.statusCode).toBe(412);
  });

  it('should create appropriate error for 429 status', () => {
    const response = new Response('Too Many Requests', { 
      status: 429, 
      statusText: 'Too Many Requests',
      headers: {
        'Retry-After': '60',
        'Backoff': '30',
      }
    });
    const error = createErrorFromResponse(response);
    
    expect(error).toBeInstanceOf(ZoteroRateLimitError);
    expect(error.statusCode).toBe(429);
    expect((error as ZoteroRateLimitError).retryAfter).toBe(60);
    expect((error as ZoteroRateLimitError).backoff).toBe(30);
  });

  it('should create appropriate error for 500 status', () => {
    const response = new Response('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    const error = createErrorFromResponse(response);
    
    expect(error).toBeInstanceOf(ZoteroServerError);
    expect(error.statusCode).toBe(500);
  });

  it('should create generic error for unknown status', () => {
    const response = new Response('Unknown Error', { status: 418, statusText: 'I\'m a teapot' });
    const error = createErrorFromResponse(response);
    
    expect(error).toBeInstanceOf(ZoteroAPIError);
    expect(error.statusCode).toBe(418);
  });

  it('should use custom message when provided', () => {
    const response = new Response('Not Found', { status: 404, statusText: 'Not Found' });
    const error = createErrorFromResponse(response, undefined, 'Custom error message');
    
    expect(error.message).toBe('Custom error message');
  });

  it('should include response body', () => {
    const response = new Response('Not Found', { status: 404, statusText: 'Not Found' });
    const body = { error: 'Item not found' };
    const error = createErrorFromResponse(response, body);
    
    expect(error.body).toEqual(body);
  });
});

describe('Type Guards', () => {
  describe('isZoteroAPIError', () => {
    it('should return true for ZoteroAPIError instances', () => {
      const error = new ZoteroAPIError('Test error');
      expect(isZoteroAPIError(error)).toBe(true);
    });

    it('should return true for ZoteroAPIError subclasses', () => {
      const error = new ZoteroNotFoundError('Not found');
      expect(isZoteroAPIError(error)).toBe(true);
    });

    it('should return false for regular Error instances', () => {
      const error = new Error('Regular error');
      expect(isZoteroAPIError(error)).toBe(false);
    });

    it('should return false for non-error values', () => {
      expect(isZoteroAPIError('string')).toBe(false);
      expect(isZoteroAPIError(null)).toBe(false);
      expect(isZoteroAPIError(undefined)).toBe(false);
    });
  });

  describe('isRateLimitError', () => {
    it('should return true for ZoteroRateLimitError instances', () => {
      const error = new ZoteroRateLimitError('Rate limited');
      expect(isRateLimitError(error)).toBe(true);
    });

    it('should return false for other error types', () => {
      const error = new ZoteroNotFoundError('Not found');
      expect(isRateLimitError(error)).toBe(false);
    });
  });

  describe('isAuthenticationError', () => {
    it('should return true for ZoteroAuthenticationError instances', () => {
      const error = new ZoteroAuthenticationError('Auth failed');
      expect(isAuthenticationError(error)).toBe(true);
    });

    it('should return false for other error types', () => {
      const error = new ZoteroNotFoundError('Not found');
      expect(isAuthenticationError(error)).toBe(false);
    });
  });

  describe('isValidationError', () => {
    it('should return true for ZoteroValidationError instances', () => {
      const error = new ZoteroValidationError('Validation failed');
      expect(isValidationError(error)).toBe(true);
    });

    it('should return false for other error types', () => {
      const error = new ZoteroNotFoundError('Not found');
      expect(isValidationError(error)).toBe(false);
    });
  });

  describe('isNetworkError', () => {
    it('should return true for ZoteroNetworkError instances', () => {
      const error = new ZoteroNetworkError('Network failed');
      expect(isNetworkError(error)).toBe(true);
    });

    it('should return false for other error types', () => {
      const error = new ZoteroNotFoundError('Not found');
      expect(isNetworkError(error)).toBe(false);
    });
  });
});