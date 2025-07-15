/**
 * Tests for the ContentExtractor class
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ContentExtractor } from '../utils/content-extractor';
import { ContentExtractionError } from '../types';

describe('ContentExtractor', () => {
  let extractor: ContentExtractor;

  beforeEach(() => {
    extractor = new ContentExtractor({
      debug: false,
      timeout: 5000,
      maxRetries: 1,
    });
  });

  describe('constructor', () => {
    it('should create extractor with default config', () => {
      const defaultExtractor = new ContentExtractor();
      expect(defaultExtractor).toBeInstanceOf(ContentExtractor);
    });

    it('should create extractor with custom config', () => {
      const customExtractor = new ContentExtractor({
        timeout: 10000,
        maxRetries: 5,
        debug: true,
      });
      expect(customExtractor).toBeInstanceOf(ContentExtractor);
    });
  });

  describe('extractFromSourceText', () => {
    it('should extract content from plain text', async () => {
      const sourceText = 'This is a test document.\n\nIt contains multiple paragraphs with some content.';
      
      const result = await extractor.extractFromSourceText(sourceText);
      
      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('contentType');
      expect(result).toHaveProperty('metadata');
      
      expect(result.text).toBe(sourceText);
      expect(result.title).toBe('This is a test document.');
      expect(result.contentType).toBe('text/plain');
      expect(result.url).toBeUndefined();
    });

    it('should extract content from HTML source', async () => {
      const htmlSource = `
        <html>
          <head>
            <title>Test Page</title>
            <meta name="author" content="Test Author">
            <meta name="description" content="Test description">
          </head>
          <body>
            <h1>Main Heading</h1>
            <p>This is the main content of the page.</p>
            <p>Another paragraph with more content.</p>
          </body>
        </html>
      `;
      
      const result = await extractor.extractFromSourceText(htmlSource);
      
      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('contentType');
      expect(result).toHaveProperty('metadata');
      
      expect(result.contentType).toBe('text/html');
      expect(result.title).toBe('Test Page');
      expect(result.text).toContain('Main Heading');
      expect(result.text).toContain('main content');
      expect(result.metadata?.author).toBe('Test Author');
      expect(result.metadata?.excerpt).toBe('Test description');
    });

    it('should handle empty source text', async () => {
      await expect(extractor.extractFromSourceText('')).rejects.toThrow(ContentExtractionError);
    });

    it('should handle malformed HTML gracefully', async () => {
      const malformedHtml = '<html><head><title>Test</title><body><p>Content</p></html>';
      
      const result = await extractor.extractFromSourceText(malformedHtml);
      
      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('title');
      expect(result.contentType).toBe('text/html');
    });

    it('should truncate long content', async () => {
      const longText = 'A'.repeat(60000); // Longer than default maxContentLength
      
      const result = await extractor.extractFromSourceText(longText);
      
      expect(result.text.length).toBeLessThanOrEqual(50003); // 50000 + '...'
      expect(result.text.endsWith('...')).toBe(true);
    });

    it('should extract title from first line of plain text', async () => {
      const textWithTitle = 'This is the title\n\nThis is the content that follows the title.';
      
      const result = await extractor.extractFromSourceText(textWithTitle);
      
      expect(result.title).toBe('This is the title');
      expect(result.text).toBe(textWithTitle);
    });

    it('should not extract title from very long first line', async () => {
      const longFirstLine = 'A'.repeat(250); // Too long to be a title
      const textWithLongFirstLine = `${longFirstLine  }\n\nThis is the actual content.`;
      
      const result = await extractor.extractFromSourceText(textWithLongFirstLine);
      
      expect(result.title).toBeUndefined();
      expect(result.text).toBe(textWithLongFirstLine);
    });
  });

  describe('extractFromUrl', () => {
    // Note: These tests would require mocking HTTP requests
    // For now, we'll just test that the method exists and has correct signature
    it('should have extractFromUrl method', () => {
      expect(typeof extractor.extractFromUrl).toBe('function');
    });

    // TODO: Add proper tests with mocked HTTP requests
    // This would require setting up MSW or similar mocking
  });
});