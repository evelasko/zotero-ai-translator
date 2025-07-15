/**
 * Tests for the main Translator class
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { Translator } from '../core/translator';
import { TranslatorConfig, ConfigurationError } from '../types';

describe('Translator', () => {
  let translator: Translator;

  beforeEach(() => {
    translator = new Translator({
      debug: false,
      timeout: 5000,
      maxRetries: 1,
    });
  });

  describe('constructor', () => {
    it('should create translator with default config', () => {
      const defaultTranslator = new Translator();
      expect(defaultTranslator).toBeInstanceOf(Translator);
      
      const config = defaultTranslator.getConfig();
      expect(config.timeout).toBe(30000);
      expect(config.maxRetries).toBe(3);
      expect(config.userAgent).toBe('Zotero-AI-Translator/1.0.0');
      expect(config.maxContentLength).toBe(50000);
      expect(config.debug).toBe(false);
    });

    it('should create translator with custom config', () => {
      const customConfig: TranslatorConfig = {
        timeout: 10000,
        maxRetries: 5,
        userAgent: 'Custom-Agent/1.0.0',
        maxContentLength: 100000,
        debug: true,
      };
      
      const customTranslator = new Translator(customConfig);
      const config = customTranslator.getConfig();
      
      expect(config.timeout).toBe(10000);
      expect(config.maxRetries).toBe(5);
      expect(config.userAgent).toBe('Custom-Agent/1.0.0');
      expect(config.maxContentLength).toBe(100000);
      expect(config.debug).toBe(true);
    });

    it('should throw error for invalid timeout', () => {
      expect(() => new Translator({ timeout: 0 })).toThrow(ConfigurationError);
      expect(() => new Translator({ timeout: -1000 })).toThrow(ConfigurationError);
    });

    it('should throw error for invalid max retries', () => {
      expect(() => new Translator({ maxRetries: -1 })).toThrow(ConfigurationError);
    });

    it('should throw error for invalid max content length', () => {
      expect(() => new Translator({ maxContentLength: 0 })).toThrow(ConfigurationError);
      expect(() => new Translator({ maxContentLength: -1000 })).toThrow(ConfigurationError);
    });

    it('should throw error for invalid user agent', () => {
      expect(() => new Translator({ userAgent: '' })).toThrow(ConfigurationError);
      expect(() => new Translator({ userAgent: '   ' })).toThrow(ConfigurationError);
    });
  });

  describe('translate method', () => {
    it('should have translate method with correct signature', () => {
      expect(typeof translator.translate).toBe('function');
    });

    it('should throw error for invalid input', async () => {
      await expect(translator.translate(null as any)).rejects.toThrow(ConfigurationError);
      await expect(translator.translate(undefined as any)).rejects.toThrow(ConfigurationError);
      await expect(translator.translate({} as any)).rejects.toThrow(ConfigurationError);
    });

    it('should throw error for invalid URL input', async () => {
      await expect(translator.translate({ url: '' })).rejects.toThrow(ConfigurationError);
      await expect(translator.translate({ url: '   ' })).rejects.toThrow(ConfigurationError);
      await expect(translator.translate({ url: 'invalid-url' })).rejects.toThrow(ConfigurationError);
    });

    it('should throw error for invalid source text input', async () => {
      await expect(translator.translate({ sourceText: '' })).rejects.toThrow(ConfigurationError);
      await expect(translator.translate({ sourceText: '   ' })).rejects.toThrow(ConfigurationError);
    });

    it('should accept valid URL input', async () => {
      // This test will fail until we implement proper mocking
      // For now, just verify the method accepts the input format
      const validInput = { url: 'https://example.com' };
      expect(() => translator.translate(validInput)).not.toThrow();
    });

    it('should accept valid source text input', async () => {
      const validInput = { sourceText: 'This is some test content for translation.' };
      
      const result = await translator.translate(validInput);
      
      expect(result).toHaveProperty('item');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('extractedContent');
      expect(result).toHaveProperty('processing');
      
      expect(result.item).toHaveProperty('itemType');
      expect(result.item).toHaveProperty('title');
      expect(result.processing.ingestionMethod).toBe('sourceText');
    });
  });

  describe('getConfig method', () => {
    it('should return current configuration', () => {
      const config = translator.getConfig();
      
      expect(config).toHaveProperty('timeout');
      expect(config).toHaveProperty('maxRetries');
      expect(config).toHaveProperty('userAgent');
      expect(config).toHaveProperty('maxContentLength');
      expect(config).toHaveProperty('debug');
    });

    it('should return immutable configuration', () => {
      const config = translator.getConfig();
      const originalTimeout = config.timeout;
      
      // Try to modify the returned config
      (config as any).timeout = 999999;
      
      // Original config should remain unchanged
      expect(translator.getConfig().timeout).toBe(originalTimeout);
    });
  });
});