/**
 * Comprehensive tests for URL input path with mocked network requests
 */

import axios from 'axios';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { Translator } from '../core/translator';
import { ContentExtractionError, PdfParseError, UrlFetchError } from '../types';

// Mock axios
vi.mock('axios');
const mockedAxiosGet = vi.mocked(axios.get);

// Mock LangChain modules for AI testing
vi.mock('@langchain/openai', () => ({
  ChatOpenAI: vi.fn().mockImplementation(() => ({
    invoke: vi.fn().mockResolvedValue({
      content: JSON.stringify({
        itemType: 'journalArticle',
        title: 'AI-Extracted Article Title',
        creators: [{ firstName: 'AI', lastName: 'Author', creatorType: 'author' }],
        abstractNote: 'AI-extracted abstract',
      }),
    }),
  })),
}));

vi.mock('@langchain/anthropic', () => ({
  ChatAnthropic: vi.fn().mockImplementation(() => ({
    invoke: vi.fn().mockResolvedValue({
      content: JSON.stringify({
        itemType: 'journalArticle',
        title: 'AI-Extracted Article Title',
        creators: [{ firstName: 'AI', lastName: 'Author', creatorType: 'author' }],
        abstractNote: 'AI-extracted abstract',
      }),
    }),
  })),
}));

vi.mock('@langchain/google-vertexai', () => ({
  ChatVertexAI: vi.fn().mockImplementation(() => ({
    invoke: vi.fn().mockResolvedValue({
      content: JSON.stringify({
        itemType: 'journalArticle',
        title: 'AI-Extracted Article Title',
        creators: [{ firstName: 'AI', lastName: 'Author', creatorType: 'author' }],
        abstractNote: 'AI-extracted abstract',
      }),
    }),
  })),
}));

vi.mock('@langchain/ollama', () => ({
  ChatOllama: vi.fn().mockImplementation(() => ({
    invoke: vi.fn().mockResolvedValue({
      content: JSON.stringify({
        itemType: 'journalArticle',
        title: 'AI-Extracted Article Title',
        creators: [{ firstName: 'AI', lastName: 'Author', creatorType: 'author' }],
        abstractNote: 'AI-extracted abstract',
      }),
    }),
  })),
}));

// Mock @mozilla/readability
vi.mock('@mozilla/readability', () => ({
  Readability: vi.fn().mockImplementation(() => ({
    parse: vi.fn().mockReturnValue({
      title: 'Test Article Title',
      content: '<p>This is extracted content from Readability.</p>',
      textContent: 'This is extracted content from Readability.',
      excerpt: 'This is an excerpt from the article.',
      byline: 'By Test Author',
      dir: 'ltr',
      lang: 'en',
    }),
  })),
}));

// Mock pdf-parse
vi.mock('pdf-parse', () => ({
  default: vi.fn(),
}));

// Mock JSDOM
vi.mock('jsdom', () => ({
  JSDOM: vi.fn().mockImplementation(_html => ({
    window: {
      document: {
        title: 'Test Page Title',
        querySelector: vi.fn(selector => {
          if (selector === 'meta[name="author"]') {
            return { getAttribute: () => 'John Doe' };
          }
          if (selector === 'meta[name="description"]') {
            return { getAttribute: () => 'Test article description' };
          }
          return null;
        }),
        querySelectorAll: vi.fn(() => []),
      },
    },
  })),
}));

// Mock LangChain output parsers
vi.mock('@langchain/core/output_parsers', () => ({
  StructuredOutputParser: {
    fromZodSchema: vi.fn().mockReturnValue({
      getFormatInstructions: vi.fn().mockReturnValue('Format instructions'),
    }),
  },
  OutputFixingParser: {
    fromLLM: vi.fn().mockReturnValue({
      // Mock parser
    }),
  },
}));

describe('Translator - URL Input Path', () => {
  let translator: Translator;
  let translatorWithOpenAI: Translator;
  let translatorWithAnthropic: Translator;

  beforeAll(() => {
    // Mock console methods to avoid noise during tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    translator = new Translator({
      timeout: 5000,
      maxRetries: 1,
      debug: false,
    });

    translatorWithOpenAI = new Translator({
      timeout: 5000,
      maxRetries: 1,
      debug: false,
      ai: {
        provider: 'openai',
        apiKey: 'sk-test-api-key',
        classificationModel: 'gpt-3.5-turbo',
        extractionModel: 'gpt-3.5-turbo',
        temperature: 0.1,
        maxTokens: 2000,
      },
    });

    translatorWithAnthropic = new Translator({
      timeout: 5000,
      maxRetries: 1,
      debug: false,
      ai: {
        provider: 'anthropic',
        apiKey: 'sk-ant-test-api-key',
        classificationModel: 'claude-3-haiku-20240307',
        extractionModel: 'claude-3-5-sonnet-20241022',
        temperature: 0.1,
        maxTokens: 2000,
      },
    });

    // Reset all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('HTML Content Fetching', () => {
    it('should successfully fetch and translate HTML content', async () => {
      const mockHtmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Test Article</title>
          <meta name="author" content="John Doe">
          <meta name="description" content="Test article description">
        </head>
        <body>
          <article>
            <h1>Test Article Title</h1>
            <p>This is the main content of the test article.</p>
            <p>It contains multiple paragraphs with meaningful content.</p>
          </article>
        </body>
        </html>
      `;

      mockedAxiosGet.mockResolvedValue({
        data: mockHtmlContent,
        headers: { 'content-type': 'text/html' },
        status: 200,
      });

      const result = await translator.translate({ url: 'https://example.com/article' });

      expect(mockedAxiosGet).toHaveBeenCalledWith('https://example.com/article', {
        timeout: 5000,
        maxRedirects: 5,
        headers: {
          'User-Agent': 'Zotero-AI-Translator/1.0.0',
        },
      });

      expect(result).toHaveProperty('item');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('extractedContent');
      expect(result).toHaveProperty('processing');

      expect(result.item.itemType).toBe('webpage');
      expect(result.item.title).toBe('Test Article Title');
      expect(result.item.url).toBe('https://example.com/article');
      expect(result.processing.ingestionMethod).toBe('url');
      expect(result.extractedContent.contentType).toBe('text/html');
    });

    it('should successfully fetch and translate HTML content with OpenAI', async () => {
      const mockHtmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Research Paper</title>
          <meta name="author" content="Dr. Jane Smith">
        </head>
        <body>
          <article>
            <h1>Advanced Machine Learning Techniques</h1>
            <p>This paper explores cutting-edge machine learning algorithms.</p>
          </article>
        </body>
        </html>
      `;

      mockedAxiosGet.mockResolvedValue({
        data: mockHtmlContent,
        headers: { 'content-type': 'text/html' },
        status: 200,
      });

      const result = await translatorWithOpenAI.translate({ url: 'https://example.com/research' });

      expect(result).toHaveProperty('item');
      expect(result.item.itemType).toBe('journalArticle'); // Should be classified by AI
      expect(result.item.title).toBe('AI-Extracted Article Title');
      expect(result.processing.ingestionMethod).toBe('url');
      expect(result.processing.aiProvider).toBe('openai');
    });

    it('should successfully fetch and translate HTML content with Anthropic', async () => {
      const mockHtmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Research Paper</title>
          <meta name="author" content="Dr. Jane Smith">
        </head>
        <body>
          <article>
            <h1>Advanced Machine Learning Techniques</h1>
            <p>This paper explores cutting-edge machine learning algorithms.</p>
          </article>
        </body>
        </html>
      `;

      mockedAxiosGet.mockResolvedValue({
        data: mockHtmlContent,
        headers: { 'content-type': 'text/html' },
        status: 200,
      });

      const result = await translatorWithAnthropic.translate({
        url: 'https://example.com/research',
      });

      expect(result).toHaveProperty('item');
      expect(result.item.itemType).toBe('journalArticle'); // Should be classified by AI
      expect(result.item.title).toBe('AI-Extracted Article Title');
      expect(result.processing.ingestionMethod).toBe('url');
      expect(result.processing.aiProvider).toBe('anthropic');
    });

    it('should handle HTML with missing title gracefully', async () => {
      const mockHtmlContent = `
        <!DOCTYPE html>
        <html>
        <body>
          <p>Content without title</p>
        </body>
        </html>
      `;

      mockedAxiosGet.mockResolvedValue({
        data: mockHtmlContent,
        headers: { 'content-type': 'text/html' },
        status: 200,
      });

      const result = await translator.translate({ url: 'https://example.com/notitle' });

      expect(result.item.title).toBe('Test Article Title'); // From Readability mock
      expect(result.item.itemType).toBe('webpage');
    });

    it('should handle HTML with metadata', async () => {
      const mockHtmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Article with Metadata</title>
          <meta name="author" content="John Doe">
          <meta name="description" content="Article description">
          <meta name="keywords" content="test, article, metadata">
          <meta property="article:published_time" content="2023-01-01T10:00:00Z">
        </head>
        <body>
          <article>
            <h1>Article Title</h1>
            <p>Article content here.</p>
          </article>
        </body>
        </html>
      `;

      mockedAxiosGet.mockResolvedValue({
        data: mockHtmlContent,
        headers: { 'content-type': 'text/html' },
        status: 200,
      });

      const result = await translator.translate({ url: 'https://example.com/metadata' });

      expect(result.extractedContent.metadata?.author).toBe('John Doe');
      expect(result.extractedContent.metadata?.excerpt).toBe(
        'This is an excerpt from the article.',
      );
      expect(result.extractedContent.metadata?.language).toBe('en');
    });
  });

  describe('PDF Content Fetching', () => {
    it('should successfully fetch and translate PDF content', async () => {
      const mockPdfBuffer = Buffer.from('PDF content');
      const mockPdfParse = await import('pdf-parse');

      mockedAxiosGet.mockResolvedValue({
        data: mockPdfBuffer,
        headers: { 'content-type': 'application/pdf' },
        status: 200,
      });

      (mockPdfParse.default as any).mockResolvedValue({
        text: 'This is extracted text from the PDF document. It contains research findings and conclusions.',
        info: {
          Title: 'Research Paper PDF',
          Author: 'Dr. Smith',
          Subject: 'Machine Learning Research',
          CreationDate: new Date('2023-01-01'),
        },
        metadata: {
          _metadata: {
            'dc:title': 'Research Paper PDF',
            'dc:creator': 'Dr. Smith',
          },
        },
      });

      const result = await translator.translate({ url: 'https://example.com/paper.pdf' });

      expect(mockedAxiosGet).toHaveBeenCalledWith('https://example.com/paper.pdf', {
        timeout: 5000,
        maxRedirects: 5,
        headers: {
          'User-Agent': 'Zotero-AI-Translator/1.0.0',
        },
        responseType: 'arraybuffer',
      });

      expect(result.item.itemType).toBe('document');
      expect(result.item.title).toBe('Research Paper PDF');
      expect(result.extractedContent.contentType).toBe('application/pdf');
      expect(result.processing.ingestionMethod).toBe('url');
    });

    it('should handle PDF parsing errors gracefully', async () => {
      const mockPdfBuffer = Buffer.from('Invalid PDF content');
      const mockPdfParse = await import('pdf-parse');

      mockedAxiosGet.mockResolvedValue({
        data: mockPdfBuffer,
        headers: { 'content-type': 'application/pdf' },
        status: 200,
      });

      (mockPdfParse.default as any).mockRejectedValue(new Error('PDF parsing failed'));

      await expect(
        translator.translate({ url: 'https://example.com/invalid.pdf' }),
      ).rejects.toThrow(PdfParseError);
    });
  });

  describe('Network Error Handling', () => {
    it('should handle network timeouts', async () => {
      mockedAxiosGet.mockRejectedValue({
        code: 'ECONNABORTED',
        message: 'timeout of 5000ms exceeded',
      });

      await expect(
        translator.translate({ url: 'https://slow-server.com/article' }),
      ).rejects.toThrow(UrlFetchError);
    });

    it('should handle HTTP error responses', async () => {
      mockedAxiosGet.mockRejectedValue({
        response: {
          status: 404,
          statusText: 'Not Found',
          data: 'Page not found',
        },
      });

      await expect(translator.translate({ url: 'https://example.com/notfound' })).rejects.toThrow(
        UrlFetchError,
      );
    });

    it('should handle DNS resolution errors', async () => {
      mockedAxiosGet.mockRejectedValue({
        code: 'ENOTFOUND',
        message: 'getaddrinfo ENOTFOUND invalid-domain.com',
      });

      await expect(
        translator.translate({ url: 'https://invalid-domain.com/article' }),
      ).rejects.toThrow(UrlFetchError);
    });

    it('should handle connection refused errors', async () => {
      mockedAxiosGet.mockRejectedValue({
        code: 'ECONNREFUSED',
        message: 'connect ECONNREFUSED 127.0.0.1:80',
      });

      await expect(translator.translate({ url: 'https://localhost/article' })).rejects.toThrow(
        UrlFetchError,
      );
    });
  });

  describe('Content Type Detection', () => {
    it('should handle plain text content', async () => {
      const mockTextContent = 'This is plain text content from a .txt file or plain text response.';

      mockedAxiosGet.mockResolvedValue({
        data: mockTextContent,
        headers: { 'content-type': 'text/plain' },
        status: 200,
      });

      const result = await translator.translate({ url: 'https://example.com/text-file.txt' });

      expect(result.extractedContent.contentType).toBe('text/plain');
      expect(result.extractedContent.text).toBe(mockTextContent);
      expect(result.item.itemType).toBe('document');
    });

    it('should handle unsupported content types', async () => {
      mockedAxiosGet.mockResolvedValue({
        data: 'Binary content',
        headers: { 'content-type': 'application/octet-stream' },
        status: 200,
      });

      await expect(
        translator.translate({ url: 'https://example.com/binary-file' }),
      ).rejects.toThrow(ContentExtractionError);
    });

    it('should handle missing content-type header', async () => {
      const mockHtmlContent =
        '<html><body><p>Content without content-type header</p></body></html>';

      mockedAxiosGet.mockResolvedValue({
        data: mockHtmlContent,
        headers: {},
        status: 200,
      });

      const result = await translator.translate({ url: 'https://example.com/no-content-type' });

      expect(result.extractedContent.contentType).toBe('text/html'); // Should default to HTML
      expect(result.item.itemType).toBe('webpage');
    });
  });

  describe('Retry Logic', () => {
    it('should retry failed requests up to maxRetries', async () => {
      const retryTranslator = new Translator({
        timeout: 5000,
        maxRetries: 2,
        debug: false,
      });

      // First two calls fail, third succeeds
      mockedAxiosGet
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValue({
          data: '<html><body><p>Success after retries</p></body></html>',
          headers: { 'content-type': 'text/html' },
          status: 200,
        });

      const result = await retryTranslator.translate({ url: 'https://flaky-server.com/article' });

      expect(mockedAxiosGet).toHaveBeenCalledTimes(3);
      expect(result.item.itemType).toBe('webpage');
    });

    it('should fail after exceeding maxRetries', async () => {
      const retryTranslator = new Translator({
        timeout: 5000,
        maxRetries: 1,
        debug: false,
      });

      mockedAxiosGet
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'));

      await expect(
        retryTranslator.translate({ url: 'https://always-failing.com/article' }),
      ).rejects.toThrow(UrlFetchError);

      expect(mockedAxiosGet).toHaveBeenCalledTimes(2); // Initial + 1 retry
    });
  });

  describe('Content Length Limits', () => {
    it('should handle content that exceeds maxContentLength', async () => {
      const shortContentTranslator = new Translator({
        maxContentLength: 100,
        debug: false,
      });

      const longContent = 'A'.repeat(200);
      mockedAxiosGet.mockResolvedValue({
        data: `<html><body><p>${longContent}</p></body></html>`,
        headers: { 'content-type': 'text/html' },
        status: 200,
      });

      const result = await shortContentTranslator.translate({
        url: 'https://example.com/long-article',
      });

      expect(result.extractedContent.text.length).toBeLessThanOrEqual(100);
      expect(result.item.itemType).toBe('webpage');
    });
  });

  describe('URL Validation', () => {
    it('should validate URL format', async () => {
      await expect(translator.translate({ url: 'invalid-url' })).rejects.toThrow(
        'Invalid URL format',
      );
    });

    it('should accept valid URLs', async () => {
      mockedAxiosGet.mockResolvedValue({
        data: '<html><body><p>Valid URL content</p></body></html>',
        headers: { 'content-type': 'text/html' },
        status: 200,
      });

      const validUrls = [
        'https://example.com',
        'http://example.com',
        'https://subdomain.example.com/path',
        'https://example.com:8080/path?query=value',
      ];

      for (const url of validUrls) {
        const result = await translator.translate({ url });
        expect(result.item.url).toBe(url);
      }
    });
  });
});
