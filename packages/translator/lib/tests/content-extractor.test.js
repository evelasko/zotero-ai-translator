"use strict";
/**
 * Tests for the ContentExtractor class
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const content_extractor_1 = require("../utils/content-extractor");
const types_1 = require("../types");
(0, vitest_1.describe)('ContentExtractor', () => {
    let extractor;
    (0, vitest_1.beforeEach)(() => {
        extractor = new content_extractor_1.ContentExtractor({
            debug: false,
            timeout: 5000,
            maxRetries: 1,
        });
    });
    (0, vitest_1.describe)('constructor', () => {
        (0, vitest_1.it)('should create extractor with default config', () => {
            const defaultExtractor = new content_extractor_1.ContentExtractor();
            (0, vitest_1.expect)(defaultExtractor).toBeInstanceOf(content_extractor_1.ContentExtractor);
        });
        (0, vitest_1.it)('should create extractor with custom config', () => {
            const customExtractor = new content_extractor_1.ContentExtractor({
                timeout: 10000,
                maxRetries: 5,
                debug: true,
            });
            (0, vitest_1.expect)(customExtractor).toBeInstanceOf(content_extractor_1.ContentExtractor);
        });
    });
    (0, vitest_1.describe)('extractFromSourceText', () => {
        (0, vitest_1.it)('should extract content from plain text', async () => {
            const sourceText = 'This is a test document.\n\nIt contains multiple paragraphs with some content.';
            const result = await extractor.extractFromSourceText(sourceText);
            (0, vitest_1.expect)(result).toHaveProperty('text');
            (0, vitest_1.expect)(result).toHaveProperty('title');
            (0, vitest_1.expect)(result).toHaveProperty('contentType');
            (0, vitest_1.expect)(result).toHaveProperty('metadata');
            (0, vitest_1.expect)(result.text).toBe(sourceText);
            (0, vitest_1.expect)(result.title).toBe('This is a test document.');
            (0, vitest_1.expect)(result.contentType).toBe('text/plain');
            (0, vitest_1.expect)(result.url).toBeUndefined();
        });
        (0, vitest_1.it)('should extract content from HTML source', async () => {
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
            (0, vitest_1.expect)(result).toHaveProperty('text');
            (0, vitest_1.expect)(result).toHaveProperty('title');
            (0, vitest_1.expect)(result).toHaveProperty('contentType');
            (0, vitest_1.expect)(result).toHaveProperty('metadata');
            (0, vitest_1.expect)(result.contentType).toBe('text/html');
            (0, vitest_1.expect)(result.title).toBe('Test Page');
            (0, vitest_1.expect)(result.text).toContain('Main Heading');
            (0, vitest_1.expect)(result.text).toContain('main content');
            (0, vitest_1.expect)(result.metadata?.author).toBe('Test Author');
            (0, vitest_1.expect)(result.metadata?.excerpt).toBe('Test description');
        });
        (0, vitest_1.it)('should handle empty source text', async () => {
            await (0, vitest_1.expect)(extractor.extractFromSourceText('')).rejects.toThrow(types_1.ContentExtractionError);
        });
        (0, vitest_1.it)('should handle malformed HTML gracefully', async () => {
            const malformedHtml = '<html><head><title>Test</title><body><p>Content</p></html>';
            const result = await extractor.extractFromSourceText(malformedHtml);
            (0, vitest_1.expect)(result).toHaveProperty('text');
            (0, vitest_1.expect)(result).toHaveProperty('title');
            (0, vitest_1.expect)(result.contentType).toBe('text/html');
        });
        (0, vitest_1.it)('should truncate long content', async () => {
            const longText = 'A'.repeat(60000); // Longer than default maxContentLength
            const result = await extractor.extractFromSourceText(longText);
            (0, vitest_1.expect)(result.text.length).toBeLessThanOrEqual(50003); // 50000 + '...'
            (0, vitest_1.expect)(result.text.endsWith('...')).toBe(true);
        });
        (0, vitest_1.it)('should extract title from first line of plain text', async () => {
            const textWithTitle = 'This is the title\n\nThis is the content that follows the title.';
            const result = await extractor.extractFromSourceText(textWithTitle);
            (0, vitest_1.expect)(result.title).toBe('This is the title');
            (0, vitest_1.expect)(result.text).toBe(textWithTitle);
        });
        (0, vitest_1.it)('should not extract title from very long first line', async () => {
            const longFirstLine = 'A'.repeat(250); // Too long to be a title
            const textWithLongFirstLine = `${longFirstLine}\n\nThis is the actual content.`;
            const result = await extractor.extractFromSourceText(textWithLongFirstLine);
            (0, vitest_1.expect)(result.title).toBeUndefined();
            (0, vitest_1.expect)(result.text).toBe(textWithLongFirstLine);
        });
    });
    (0, vitest_1.describe)('extractFromUrl', () => {
        // Note: These tests would require mocking HTTP requests
        // For now, we'll just test that the method exists and has correct signature
        (0, vitest_1.it)('should have extractFromUrl method', () => {
            (0, vitest_1.expect)(typeof extractor.extractFromUrl).toBe('function');
        });
        // TODO: Add proper tests with mocked HTTP requests
        // This would require setting up MSW or similar mocking
    });
});
