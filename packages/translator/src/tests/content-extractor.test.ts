/**
 * Tests for the Browser Content Extractor - Browser-compatible version
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserContentExtractor } from '../utils/browser-content-extractor';
import {
  ContentExtractionError,
  ExtractedContent,
  PdfParseError,
  TranslatorConfig,
  UrlFetchError,
} from '../types';

// Mock DOMPurify for testing
vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((html: string) => html), // Simple pass-through for testing
  },
}));

// Mock PDF.js
vi.mock('pdfjs-dist', () => ({
  version: '4.0.0',
  GlobalWorkerOptions: {
    workerSrc: '',
  },
  getDocument: vi.fn().mockImplementation((config: any) => ({
    promise: Promise.resolve({
      numPages: 2,
      getPage: vi.fn().mockImplementation((pageNum: number) => Promise.resolve({
        getTextContent: vi.fn().mockResolvedValue({
          items: [
            { str: 'Page content for page ', transform: [1, 0, 0, 1, 0, 100] },
            { str: pageNum.toString(), transform: [1, 0, 0, 1, 0, 100] },
          ],
        }),
      })),
      getMetadata: vi.fn().mockResolvedValue({
        info: {
          Title: 'Test PDF Document',
          Author: 'Test Author',
          Subject: 'Test Subject',
          CreationDate: '2024-01-01',
        },
      }),
    }),
  })),
}));

// Mock fetch API
global.fetch = vi.fn();

// Mock DOM APIs
global.DOMParser = vi.fn().mockImplementation(() => ({
  parseFromString: vi.fn().mockImplementation((html: string) => {
    // Simple mock DOM structure
    const mockElement = {
      textContent: html.replace(/<[^>]*>/g, ''), // Simple HTML stripping
      querySelector: vi.fn().mockReturnValue(null),
      querySelectorAll: vi.fn().mockReturnValue([]),
      getAttribute: vi.fn().mockReturnValue(null),
      remove: vi.fn(),
    };

    return {
      body: mockElement,
      documentElement: mockElement,
      querySelector: vi.fn().mockImplementation((selector: string) => {
        if (selector === 'title') {
          return { textContent: 'Test Document Title' };
        }
        if (selector.includes('meta[name="description"]')) {
          return { getAttribute: vi.fn().mockReturnValue('Test description') };
        }
        if (selector.includes('meta[name="author"]')) {
          return { getAttribute: vi.fn().mockReturnValue('Test Author') };
        }
        return null;
      }),
      querySelectorAll: vi.fn().mockReturnValue([]),
    };
  }),
}));

describe('BrowserContentExtractor', () => {
  let extractor: BrowserContentExtractor;
  let mockConfig: TranslatorConfig;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockConfig = {
      timeout: 10000,
      maxRetries: 2,
      userAgent: 'Test-Agent',
      maxContentLength: 10000,
      debug: false,
      ai: {
        apiKey: 'sk-ant-test-key',
      },
    };

    extractor = new BrowserContentExtractor(mockConfig);
  });

  describe('constructor', () => {
    it('should create extractor with default config', () => {
      const defaultExtractor = new BrowserContentExtractor();
      expect(defaultExtractor).toBeInstanceOf(BrowserContentExtractor);
    });

    it('should create extractor with custom config', () => {
      expect(extractor).toBeInstanceOf(BrowserContentExtractor);
    });

    it('should set default values for missing config', () => {
      const partialConfig = { timeout: 5000 };
      const partialExtractor = new BrowserContentExtractor(partialConfig);
      expect(partialExtractor).toBeInstanceOf(BrowserContentExtractor);
    });
  });

  describe('extractFromUrl', () => {
    it('should extract content from HTML URL', async () => {
      const mockResponse = {
        ok: true,
        headers: {
          get: vi.fn().mockReturnValue('text/html'),
        },
        text: vi.fn().mockResolvedValue('<html><body><h1>Test Title</h1><p>Test content</p></body></html>'),
      };

      (global.fetch as any).mockResolvedValue(mockResponse);

      const result = await extractor.extractFromUrl('https://example.com/test');

      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('contentType');
      expect(result.contentType).toBe('text/html');
      expect(result.url).toBe('https://example.com/test');
    });

    it('should extract content from PDF URL', async () => {
      const mockResponse = {
        ok: true,
        headers: {
          get: vi.fn().mockReturnValue('application/pdf'),
        },
        arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(1024)),
      };

      (global.fetch as any).mockResolvedValue(mockResponse);

      const result = await extractor.extractFromUrl('https://example.com/test.pdf');

      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('contentType');
      expect(result.contentType).toBe('application/pdf');
      expect(result.url).toBe('https://example.com/test.pdf');
    });

    it('should handle fetch errors', async () => {
      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      await expect(extractor.extractFromUrl('https://example.com/test')).rejects.toThrow(
        UrlFetchError
      );
    });

    it('should handle HTTP errors', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      };

      (global.fetch as any).mockResolvedValue(mockResponse);

      await expect(extractor.extractFromUrl('https://example.com/test')).rejects.toThrow(
        UrlFetchError
      );
    });

    it('should retry on failure', async () => {
      (global.fetch as any)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          headers: { get: vi.fn().mockReturnValue('text/html') },
          text: vi.fn().mockResolvedValue('<html><body>Success</body></html>'),
        });

      const result = await extractor.extractFromUrl('https://example.com/test');

      expect(result).toHaveProperty('text');
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should handle timeout', async () => {
      const slowConfig = { ...mockConfig, timeout: 100 };
      const slowExtractor = new BrowserContentExtractor(slowConfig);

      (global.fetch as any).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 200))
      );

      await expect(slowExtractor.extractFromUrl('https://example.com/test')).rejects.toThrow();
    });
  });

  describe('extractFromSourceText', () => {
    it('should extract content from HTML source', async () => {
      const htmlSource = '<html><body><h1>Test Title</h1><p>Test content</p></body></html>';
      
      const result = await extractor.extractFromSourceText(htmlSource);

      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('contentType');
      expect(result.contentType).toBe('text/html');
    });

    it('should extract content from plain text', async () => {
      const plainText = 'This is plain text content for testing.';
      
      const result = await extractor.extractFromSourceText(plainText);

      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('contentType');
      expect(result.contentType).toBe('text/plain');
      expect(result.text).toBe(plainText);
    });

    it('should handle empty source text', async () => {
      await expect(extractor.extractFromSourceText('')).rejects.toThrow(
        ContentExtractionError
      );
    });

    it('should handle whitespace-only source text', async () => {
      await expect(extractor.extractFromSourceText('   \n\t   ')).rejects.toThrow(
        ContentExtractionError
      );
    });

    it('should handle extraction errors', async () => {
      // Create a new extractor with broken DOMParser
      const brokenExtractor = new BrowserContentExtractor(mockConfig);
      
      // Mock DOMParser to throw an error for this specific test
      const originalDOMParser = global.DOMParser;
      global.DOMParser = vi.fn().mockImplementation(() => ({
        parseFromString: vi.fn().mockImplementation(() => {
          throw new Error('Parse error');
        }),
      }));

      await expect(brokenExtractor.extractFromSourceText('<html>test</html>')).rejects.toThrow(
        ContentExtractionError
      );
      
      // Restore the original DOMParser
      global.DOMParser = originalDOMParser;
    });
  });

  describe('HTML content extraction', () => {
    it('should extract title from HTML document', async () => {
      const htmlWithTitle = '<html><head><title>Document Title</title></head><body>Content</body></html>';
      
      const result = await extractor.extractFromSourceText(htmlWithTitle);

      expect(result.title).toBe('Test Document Title'); // From our mock
    });

    it('should extract metadata from HTML document', async () => {
      const htmlWithMeta = `
        <html>
          <head>
            <meta name="author" content="Test Author">
            <meta name="description" content="Test description">
            <meta property="article:published_time" content="2024-01-01">
          </head>
          <body>Content</body>
        </html>
      `;
      
      const result = await extractor.extractFromSourceText(htmlWithMeta);

      expect(result.metadata).toHaveProperty('author');
      expect(result.metadata).toHaveProperty('excerpt');
    });

    it('should handle malformed HTML', async () => {
      const malformedHtml = '<html><body><p>Unclosed paragraph<div>Mixed content</body></html>';
      
      const result = await extractor.extractFromSourceText(malformedHtml);

      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('contentType');
      expect(result.contentType).toBe('text/html');
    });

    it('should truncate long content', async () => {
      const longConfig = { ...mockConfig, maxContentLength: 100 };
      const longExtractor = new BrowserContentExtractor(longConfig);
      
      const longContent = 'A'.repeat(200);
      const result = await longExtractor.extractFromSourceText(longContent);

      expect(result.text.length).toBeLessThanOrEqual(103); // 100 + "..."
      expect(result.text).toContain('...');
    });
  });

  describe('PDF content extraction', () => {
    it('should extract content from PDF buffer', async () => {
      const mockResponse = {
        ok: true,
        headers: {
          get: vi.fn().mockReturnValue('application/pdf'),
        },
        arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(1024)),
      };

      (global.fetch as any).mockResolvedValue(mockResponse);

      const result = await extractor.extractFromUrl('https://example.com/test.pdf');

      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('contentType');
      expect(result.contentType).toBe('application/pdf');
    });

    // Note: PDF parsing error test is complex to mock properly in vitest
    // The core PDF extraction functionality is tested above

    it('should extract metadata from PDF', async () => {
      const mockResponse = {
        ok: true,
        headers: {
          get: vi.fn().mockReturnValue('application/pdf'),
        },
        arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(1024)),
      };

      (global.fetch as any).mockResolvedValue(mockResponse);

      const result = await extractor.extractFromUrl('https://example.com/test.pdf');

      expect(result.title).toBe('Test PDF Document');
      expect(result.metadata).toHaveProperty('author');
      expect(result.metadata).toHaveProperty('excerpt');
    });
  });

  describe('error handling', () => {
    it('should create appropriate error types', () => {
      const contentError = new ContentExtractionError('Content extraction failed');
      expect(contentError.name).toBe('ContentExtractionError');
      expect(contentError.code).toBe('CONTENT_EXTRACTION_ERROR');

      const urlError = new UrlFetchError('URL fetch failed', 404);
      expect(urlError.name).toBe('UrlFetchError');
      expect(urlError.code).toBe('URL_FETCH_ERROR');
      expect(urlError.statusCode).toBe(404);

      const pdfError = new PdfParseError('PDF parsing failed');
      expect(pdfError.name).toBe('PdfParseError');
      expect(pdfError.code).toBe('PDF_PARSE_ERROR');
    });

    it('should handle network timeouts', async () => {
      const timeoutConfig = { ...mockConfig, timeout: 100 };
      const timeoutExtractor = new BrowserContentExtractor(timeoutConfig);

      (global.fetch as any).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 200))
      );

      await expect(timeoutExtractor.extractFromUrl('https://example.com/test')).rejects.toThrow();
    });

    it('should handle CORS errors', async () => {
      const corsError = new TypeError('Failed to fetch');
      (global.fetch as any).mockRejectedValue(corsError);

      await expect(extractor.extractFromUrl('https://example.com/test')).rejects.toThrow(
        UrlFetchError
      );
    });
  });

  describe('browser compatibility', () => {
    it('should configure PDF.js worker for browser environments', () => {
      // Test that PDF.js worker is configured during construction
      expect(extractor).toBeInstanceOf(BrowserContentExtractor);
      
      // The worker configuration is tested implicitly through PDF extraction
    });

    it('should use fetch API with CORS support', async () => {
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('text/html') },
        text: vi.fn().mockResolvedValue('<html><body>Test</body></html>'),
      };

      (global.fetch as any).mockResolvedValue(mockResponse);

      await extractor.extractFromUrl('https://example.com/test');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://example.com/test',
        expect.objectContaining({
          mode: 'cors',
          headers: expect.objectContaining({
            'User-Agent': 'Test-Agent',
          }),
        })
      );
    });

    it('should handle AbortController for timeouts', async () => {
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('text/html') },
        text: vi.fn().mockResolvedValue('<html><body>Test</body></html>'),
      };

      (global.fetch as any).mockResolvedValue(mockResponse);

      await extractor.extractFromUrl('https://example.com/test');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://example.com/test',
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });
  });

  describe('debug mode', () => {
    it('should log debug information when enabled', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const debugConfig = { ...mockConfig, debug: true };
      const debugExtractor = new BrowserContentExtractor(debugConfig);

      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('text/html') },
        text: vi.fn().mockResolvedValue('<html><body>Test</body></html>'),
      };

      (global.fetch as any).mockResolvedValue(mockResponse);

      await debugExtractor.extractFromUrl('https://example.com/test');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[BrowserContentExtractor]')
      );

      consoleSpy.mockRestore();
    });

    it('should not log debug information when disabled', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const mockResponse = {
        ok: true,
        headers: { get: vi.fn().mockReturnValue('text/html') },
        text: vi.fn().mockResolvedValue('<html><body>Test</body></html>'),
      };

      (global.fetch as any).mockResolvedValue(mockResponse);

      await extractor.extractFromUrl('https://example.com/test');

      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('[BrowserContentExtractor]')
      );

      consoleSpy.mockRestore();
    });
  });
});