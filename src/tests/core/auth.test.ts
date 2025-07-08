/**
 * Tests for authentication functionality
 */

import { describe, it, expect } from 'vitest';
import { ZoteroAuth, createAuth, isValidAuthConfig } from '../../core/auth.js';

describe('ZoteroAuth', () => {
  const validApiKey = 'abcdef1234567890abcdef1234567890';
  const invalidApiKey = 'invalid-key';

  describe('constructor', () => {
    it('should create instance with valid API key', () => {
      const auth = new ZoteroAuth({ apiKey: validApiKey });
      expect(auth.isAuthenticated()).toBe(true);
    });

    it('should throw error with empty API key', () => {
      expect(() => new ZoteroAuth({ apiKey: '' })).toThrow('API key is required');
    });

    it('should throw error with whitespace-only API key', () => {
      expect(() => new ZoteroAuth({ apiKey: '   ' })).toThrow('API key is required');
    });

    it('should trim API key', () => {
      const auth = new ZoteroAuth({ apiKey: `  ${validApiKey}  ` });
      expect(auth.getApiKey()).toBe(validApiKey);
    });
  });

  describe('getAuthHeaders', () => {
    it('should return Zotero-API-Key header by default', () => {
      const auth = new ZoteroAuth({ apiKey: validApiKey });
      const headers = auth.getAuthHeaders();
      
      expect(headers).toEqual({
        'Zotero-API-Key': validApiKey,
      });
    });

    it('should return Bearer token when method is bearer', () => {
      const auth = new ZoteroAuth({ apiKey: validApiKey, method: 'bearer' });
      const headers = auth.getAuthHeaders();
      
      expect(headers).toEqual({
        'Authorization': `Bearer ${validApiKey}`,
      });
    });

    it('should return Zotero-API-Key header when method is header', () => {
      const auth = new ZoteroAuth({ apiKey: validApiKey, method: 'header' });
      const headers = auth.getAuthHeaders();
      
      expect(headers).toEqual({
        'Zotero-API-Key': validApiKey,
      });
    });
  });

  describe('getApiKey', () => {
    it('should return the API key', () => {
      const auth = new ZoteroAuth({ apiKey: validApiKey });
      expect(auth.getApiKey()).toBe(validApiKey);
    });
  });

  describe('isAuthenticated', () => {
    it('should return true for valid API key', () => {
      const auth = new ZoteroAuth({ apiKey: validApiKey });
      expect(auth.isAuthenticated()).toBe(true);
    });

    it('should return false for empty API key (after trim)', () => {
      // This should throw, but if it didn't, it would be false
      expect(() => new ZoteroAuth({ apiKey: '' })).toThrow();
    });
  });

  describe('validateApiKey', () => {
    it('should return true for valid API key format', () => {
      const auth = new ZoteroAuth({ apiKey: validApiKey });
      expect(auth.validateApiKey()).toBe(true);
    });

    it('should return false for invalid API key format', () => {
      const auth = new ZoteroAuth({ apiKey: invalidApiKey });
      expect(auth.validateApiKey()).toBe(false);
    });

    it('should return false for too short API key', () => {
      const auth = new ZoteroAuth({ apiKey: 'abc123' });
      expect(auth.validateApiKey()).toBe(false);
    });

    it('should return false for too long API key', () => {
      const auth = new ZoteroAuth({ apiKey: validApiKey + 'extra' });
      expect(auth.validateApiKey()).toBe(false);
    });
  });
});

describe('createAuth', () => {
  const validApiKey = 'abcdef1234567890abcdef1234567890';

  it('should create auth instance with API key', () => {
    const auth = createAuth(validApiKey);
    expect(auth).toBeInstanceOf(ZoteroAuth);
    expect(auth.getApiKey()).toBe(validApiKey);
  });

  it('should create auth instance with method', () => {
    const auth = createAuth(validApiKey, 'bearer');
    const headers = auth.getAuthHeaders();
    expect(headers).toEqual({
      'Authorization': `Bearer ${validApiKey}`,
    });
  });
});

describe('isValidAuthConfig', () => {
  it('should return true for valid config', () => {
    const config = { apiKey: 'abcdef1234567890abcdef1234567890' };
    expect(isValidAuthConfig(config)).toBe(true);
  });

  it('should return false for null config', () => {
    expect(isValidAuthConfig(null)).toBe(false);
  });

  it('should return false for undefined config', () => {
    expect(isValidAuthConfig(undefined)).toBe(false);
  });

  it('should return false for config without apiKey', () => {
    const config = { method: 'header' };
    expect(isValidAuthConfig(config)).toBe(false);
  });

  it('should return false for config with empty apiKey', () => {
    const config = { apiKey: '' };
    expect(isValidAuthConfig(config)).toBe(false);
  });

  it('should return false for config with whitespace-only apiKey', () => {
    const config = { apiKey: '   ' };
    expect(isValidAuthConfig(config)).toBe(false);
  });

  it('should return false for non-object config', () => {
    expect(isValidAuthConfig('string')).toBe(false);
    expect(isValidAuthConfig(123)).toBe(false);
    expect(isValidAuthConfig(true)).toBe(false);
  });
});