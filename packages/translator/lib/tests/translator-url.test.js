"use strict";
/**
 * Comprehensive tests for URL input path with mocked network requests
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const vitest_1 = require("vitest");
const translator_1 = require("../core/translator");
const types_1 = require("../types");
// Mock axios
vitest_1.vi.mock('axios');
const mockedAxiosGet = vitest_1.vi.mocked(axios_1.default.get);
// Mock LangChain modules for AI testing
vitest_1.vi.mock('@langchain/openai', () => ({
    ChatOpenAI: vitest_1.vi.fn().mockImplementation(() => ({
        invoke: vitest_1.vi.fn().mockResolvedValue({
            content: JSON.stringify({
                itemType: 'journalArticle',
                title: 'AI-Extracted Article Title',
                creators: [{ firstName: 'AI', lastName: 'Author', creatorType: 'author' }],
                abstractNote: 'AI-extracted abstract',
            }),
        }),
    })),
}));
vitest_1.vi.mock('@langchain/anthropic', () => ({
    ChatAnthropic: vitest_1.vi.fn().mockImplementation(() => ({
        invoke: vitest_1.vi.fn().mockResolvedValue({
            content: JSON.stringify({
                itemType: 'journalArticle',
                title: 'AI-Extracted Article Title',
                creators: [{ firstName: 'AI', lastName: 'Author', creatorType: 'author' }],
                abstractNote: 'AI-extracted abstract',
            }),
        }),
    })),
}));
vitest_1.vi.mock('@langchain/google-vertexai', () => ({
    ChatVertexAI: vitest_1.vi.fn().mockImplementation(() => ({
        invoke: vitest_1.vi.fn().mockResolvedValue({
            content: JSON.stringify({
                itemType: 'journalArticle',
                title: 'AI-Extracted Article Title',
                creators: [{ firstName: 'AI', lastName: 'Author', creatorType: 'author' }],
                abstractNote: 'AI-extracted abstract',
            }),
        }),
    })),
}));
vitest_1.vi.mock('@langchain/ollama', () => ({
    ChatOllama: vitest_1.vi.fn().mockImplementation(() => ({
        invoke: vitest_1.vi.fn().mockResolvedValue({
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
vitest_1.vi.mock('@mozilla/readability', () => ({
    Readability: vitest_1.vi.fn().mockImplementation(() => ({
        parse: vitest_1.vi.fn().mockReturnValue({
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
vitest_1.vi.mock('pdf-parse', () => ({
    default: vitest_1.vi.fn(),
}));
// Mock JSDOM
vitest_1.vi.mock('jsdom', () => ({
    JSDOM: vitest_1.vi.fn().mockImplementation(_html => ({
        window: {
            document: {
                title: 'Test Page Title',
                querySelector: vitest_1.vi.fn(selector => {
                    if (selector === 'meta[name="author"]') {
                        return { getAttribute: () => 'John Doe' };
                    }
                    if (selector === 'meta[name="description"]') {
                        return { getAttribute: () => 'Test article description' };
                    }
                    return null;
                }),
                querySelectorAll: vitest_1.vi.fn(() => []),
            },
        },
    })),
}));
// Mock LangChain output parsers
vitest_1.vi.mock('@langchain/core/output_parsers', () => ({
    StructuredOutputParser: {
        fromZodSchema: vitest_1.vi.fn().mockReturnValue({
            getFormatInstructions: vitest_1.vi.fn().mockReturnValue('Format instructions'),
        }),
    },
    OutputFixingParser: {
        fromLLM: vitest_1.vi.fn().mockReturnValue({
        // Mock parser
        }),
    },
}));
(0, vitest_1.describe)('Translator - URL Input Path', () => {
    let translator;
    let translatorWithOpenAI;
    let translatorWithAnthropic;
    (0, vitest_1.beforeAll)(() => {
        // Mock console methods to avoid noise during tests
        vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
        vitest_1.vi.spyOn(console, 'warn').mockImplementation(() => { });
        vitest_1.vi.spyOn(console, 'error').mockImplementation(() => { });
    });
    (0, vitest_1.beforeEach)(() => {
        translator = new translator_1.Translator({
            timeout: 5000,
            maxRetries: 1,
            debug: false,
        });
        translatorWithOpenAI = new translator_1.Translator({
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
        translatorWithAnthropic = new translator_1.Translator({
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
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('HTML Content Fetching', () => {
        (0, vitest_1.it)('should successfully fetch and translate HTML content', async () => {
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
            (0, vitest_1.expect)(mockedAxiosGet).toHaveBeenCalledWith('https://example.com/article', {
                timeout: 5000,
                maxRedirects: 5,
                headers: {
                    'User-Agent': 'Zotero-AI-Translator/1.0.0',
                },
            });
            (0, vitest_1.expect)(result).toHaveProperty('item');
            (0, vitest_1.expect)(result).toHaveProperty('confidence');
            (0, vitest_1.expect)(result).toHaveProperty('extractedContent');
            (0, vitest_1.expect)(result).toHaveProperty('processing');
            (0, vitest_1.expect)(result.item.itemType).toBe('webpage');
            (0, vitest_1.expect)(result.item.title).toBe('Test Article Title');
            (0, vitest_1.expect)(result.item.url).toBe('https://example.com/article');
            (0, vitest_1.expect)(result.processing.ingestionMethod).toBe('url');
            (0, vitest_1.expect)(result.extractedContent.contentType).toBe('text/html');
        });
        (0, vitest_1.it)('should successfully fetch and translate HTML content with OpenAI', async () => {
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
            (0, vitest_1.expect)(result).toHaveProperty('item');
            (0, vitest_1.expect)(result.item.itemType).toBe('journalArticle'); // Should be classified by AI
            (0, vitest_1.expect)(result.item.title).toBe('AI-Extracted Article Title');
            (0, vitest_1.expect)(result.processing.ingestionMethod).toBe('url');
            (0, vitest_1.expect)(result.processing.aiProvider).toBe('openai');
        });
        (0, vitest_1.it)('should successfully fetch and translate HTML content with Anthropic', async () => {
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
            (0, vitest_1.expect)(result).toHaveProperty('item');
            (0, vitest_1.expect)(result.item.itemType).toBe('journalArticle'); // Should be classified by AI
            (0, vitest_1.expect)(result.item.title).toBe('AI-Extracted Article Title');
            (0, vitest_1.expect)(result.processing.ingestionMethod).toBe('url');
            (0, vitest_1.expect)(result.processing.aiProvider).toBe('anthropic');
        });
        (0, vitest_1.it)('should handle HTML with missing title gracefully', async () => {
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
            (0, vitest_1.expect)(result.item.title).toBe('Test Article Title'); // From Readability mock
            (0, vitest_1.expect)(result.item.itemType).toBe('webpage');
        });
        (0, vitest_1.it)('should handle HTML with metadata', async () => {
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
            (0, vitest_1.expect)(result.extractedContent.metadata?.author).toBe('John Doe');
            (0, vitest_1.expect)(result.extractedContent.metadata?.excerpt).toBe('This is an excerpt from the article.');
            (0, vitest_1.expect)(result.extractedContent.metadata?.language).toBe('en');
        });
    });
    (0, vitest_1.describe)('PDF Content Fetching', () => {
        (0, vitest_1.it)('should successfully fetch and translate PDF content', async () => {
            const mockPdfBuffer = Buffer.from('PDF content');
            const mockPdfParse = await Promise.resolve().then(() => __importStar(require('pdf-parse')));
            mockedAxiosGet.mockResolvedValue({
                data: mockPdfBuffer,
                headers: { 'content-type': 'application/pdf' },
                status: 200,
            });
            mockPdfParse.default.mockResolvedValue({
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
            (0, vitest_1.expect)(mockedAxiosGet).toHaveBeenCalledWith('https://example.com/paper.pdf', {
                timeout: 5000,
                maxRedirects: 5,
                headers: {
                    'User-Agent': 'Zotero-AI-Translator/1.0.0',
                },
                responseType: 'arraybuffer',
            });
            (0, vitest_1.expect)(result.item.itemType).toBe('document');
            (0, vitest_1.expect)(result.item.title).toBe('Research Paper PDF');
            (0, vitest_1.expect)(result.extractedContent.contentType).toBe('application/pdf');
            (0, vitest_1.expect)(result.processing.ingestionMethod).toBe('url');
        });
        (0, vitest_1.it)('should handle PDF parsing errors gracefully', async () => {
            const mockPdfBuffer = Buffer.from('Invalid PDF content');
            const mockPdfParse = await Promise.resolve().then(() => __importStar(require('pdf-parse')));
            mockedAxiosGet.mockResolvedValue({
                data: mockPdfBuffer,
                headers: { 'content-type': 'application/pdf' },
                status: 200,
            });
            mockPdfParse.default.mockRejectedValue(new Error('PDF parsing failed'));
            await (0, vitest_1.expect)(translator.translate({ url: 'https://example.com/invalid.pdf' })).rejects.toThrow(types_1.PdfParseError);
        });
    });
    (0, vitest_1.describe)('Network Error Handling', () => {
        (0, vitest_1.it)('should handle network timeouts', async () => {
            mockedAxiosGet.mockRejectedValue({
                code: 'ECONNABORTED',
                message: 'timeout of 5000ms exceeded',
            });
            await (0, vitest_1.expect)(translator.translate({ url: 'https://slow-server.com/article' })).rejects.toThrow(types_1.UrlFetchError);
        });
        (0, vitest_1.it)('should handle HTTP error responses', async () => {
            mockedAxiosGet.mockRejectedValue({
                response: {
                    status: 404,
                    statusText: 'Not Found',
                    data: 'Page not found',
                },
            });
            await (0, vitest_1.expect)(translator.translate({ url: 'https://example.com/notfound' })).rejects.toThrow(types_1.UrlFetchError);
        });
        (0, vitest_1.it)('should handle DNS resolution errors', async () => {
            mockedAxiosGet.mockRejectedValue({
                code: 'ENOTFOUND',
                message: 'getaddrinfo ENOTFOUND invalid-domain.com',
            });
            await (0, vitest_1.expect)(translator.translate({ url: 'https://invalid-domain.com/article' })).rejects.toThrow(types_1.UrlFetchError);
        });
        (0, vitest_1.it)('should handle connection refused errors', async () => {
            mockedAxiosGet.mockRejectedValue({
                code: 'ECONNREFUSED',
                message: 'connect ECONNREFUSED 127.0.0.1:80',
            });
            await (0, vitest_1.expect)(translator.translate({ url: 'https://localhost/article' })).rejects.toThrow(types_1.UrlFetchError);
        });
    });
    (0, vitest_1.describe)('Content Type Detection', () => {
        (0, vitest_1.it)('should handle plain text content', async () => {
            const mockTextContent = 'This is plain text content from a .txt file or plain text response.';
            mockedAxiosGet.mockResolvedValue({
                data: mockTextContent,
                headers: { 'content-type': 'text/plain' },
                status: 200,
            });
            const result = await translator.translate({ url: 'https://example.com/text-file.txt' });
            (0, vitest_1.expect)(result.extractedContent.contentType).toBe('text/plain');
            (0, vitest_1.expect)(result.extractedContent.text).toBe(mockTextContent);
            (0, vitest_1.expect)(result.item.itemType).toBe('document');
        });
        (0, vitest_1.it)('should handle unsupported content types', async () => {
            mockedAxiosGet.mockResolvedValue({
                data: 'Binary content',
                headers: { 'content-type': 'application/octet-stream' },
                status: 200,
            });
            await (0, vitest_1.expect)(translator.translate({ url: 'https://example.com/binary-file' })).rejects.toThrow(types_1.ContentExtractionError);
        });
        (0, vitest_1.it)('should handle missing content-type header', async () => {
            const mockHtmlContent = '<html><body><p>Content without content-type header</p></body></html>';
            mockedAxiosGet.mockResolvedValue({
                data: mockHtmlContent,
                headers: {},
                status: 200,
            });
            const result = await translator.translate({ url: 'https://example.com/no-content-type' });
            (0, vitest_1.expect)(result.extractedContent.contentType).toBe('text/html'); // Should default to HTML
            (0, vitest_1.expect)(result.item.itemType).toBe('webpage');
        });
    });
    (0, vitest_1.describe)('Retry Logic', () => {
        (0, vitest_1.it)('should retry failed requests up to maxRetries', async () => {
            const retryTranslator = new translator_1.Translator({
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
            (0, vitest_1.expect)(mockedAxiosGet).toHaveBeenCalledTimes(3);
            (0, vitest_1.expect)(result.item.itemType).toBe('webpage');
        });
        (0, vitest_1.it)('should fail after exceeding maxRetries', async () => {
            const retryTranslator = new translator_1.Translator({
                timeout: 5000,
                maxRetries: 1,
                debug: false,
            });
            mockedAxiosGet
                .mockRejectedValueOnce(new Error('Network error'))
                .mockRejectedValueOnce(new Error('Network error'));
            await (0, vitest_1.expect)(retryTranslator.translate({ url: 'https://always-failing.com/article' })).rejects.toThrow(types_1.UrlFetchError);
            (0, vitest_1.expect)(mockedAxiosGet).toHaveBeenCalledTimes(2); // Initial + 1 retry
        });
    });
    (0, vitest_1.describe)('Content Length Limits', () => {
        (0, vitest_1.it)('should handle content that exceeds maxContentLength', async () => {
            const shortContentTranslator = new translator_1.Translator({
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
            (0, vitest_1.expect)(result.extractedContent.text.length).toBeLessThanOrEqual(100);
            (0, vitest_1.expect)(result.item.itemType).toBe('webpage');
        });
    });
    (0, vitest_1.describe)('URL Validation', () => {
        (0, vitest_1.it)('should validate URL format', async () => {
            await (0, vitest_1.expect)(translator.translate({ url: 'invalid-url' })).rejects.toThrow('Invalid URL format');
        });
        (0, vitest_1.it)('should accept valid URLs', async () => {
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
                (0, vitest_1.expect)(result.item.url).toBe(url);
            }
        });
    });
});
