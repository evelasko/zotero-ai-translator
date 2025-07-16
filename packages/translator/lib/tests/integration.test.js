"use strict";
/**
 * Integration tests for the multi-provider translation system
 *
 * These tests focus on system integration and robustness rather than specific AI responses.
 * They test the core functionality including configuration validation, content extraction,
 * and graceful fallback behavior when AI providers are not available.
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
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const translator_1 = require("../core/translator");
const provider_factory_1 = require("../core/provider-factory");
// Mock ContentExtractor to avoid network calls
vitest_1.vi.mock('../utils/content-extractor', () => ({
    ContentExtractor: vitest_1.vi.fn().mockImplementation(() => ({
        extractFromUrl: vitest_1.vi.fn().mockResolvedValue({
            text: 'Machine Learning Applications in Healthcare. This research paper explores...',
            title: 'Machine Learning Applications in Healthcare',
            url: 'https://example.com/article',
            contentType: 'text/html',
            metadata: {
                author: 'Research Author',
                publishedDate: '2024-01-01',
                excerpt: 'This research paper explores machine learning applications.',
                language: 'en',
            },
        }),
        extractFromSourceText: vitest_1.vi.fn().mockResolvedValue({
            text: 'Machine Learning Applications in Healthcare. This research paper explores...',
            title: 'Machine Learning Applications in Healthcare',
            contentType: 'text/plain',
            metadata: {
                language: 'en',
            },
        }),
    })),
}));
// Mock all LangChain providers
vitest_1.vi.mock('@langchain/openai', () => ({
    ChatOpenAI: vitest_1.vi.fn().mockImplementation(() => {
        let callCount = 0;
        return {
            invoke: vitest_1.vi.fn().mockImplementation(async () => {
                callCount++;
                if (callCount % 2 === 1) {
                    // Odd calls: classification
                    return { content: 'journalArticle' };
                }
                else {
                    // Even calls: extraction
                    return {
                        content: JSON.stringify({
                            itemType: 'journalArticle',
                            title: 'OpenAI Extracted Article',
                            creators: [{ firstName: 'OpenAI', lastName: 'Author', creatorType: 'author' }],
                            abstractNote: 'Article extracted using OpenAI GPT model',
                            date: '2024-01-01',
                            url: 'https://example.com/article',
                        }),
                    };
                }
            }),
        };
    }),
}));
vitest_1.vi.mock('@langchain/anthropic', () => ({
    ChatAnthropic: vitest_1.vi.fn().mockImplementation(() => {
        let callCount = 0;
        return {
            invoke: vitest_1.vi.fn().mockImplementation(async () => {
                callCount++;
                if (callCount % 2 === 1) {
                    // Odd calls: classification
                    return { content: 'journalArticle' };
                }
                else {
                    // Even calls: extraction
                    return {
                        content: JSON.stringify({
                            itemType: 'journalArticle',
                            title: 'Anthropic Extracted Article',
                            creators: [{ firstName: 'Claude', lastName: 'Author', creatorType: 'author' }],
                            abstractNote: 'Article extracted using Anthropic Claude model',
                            date: '2024-01-01',
                            url: 'https://example.com/article',
                        }),
                    };
                }
            }),
        };
    }),
}));
vitest_1.vi.mock('@langchain/google-vertexai', () => ({
    ChatVertexAI: vitest_1.vi.fn().mockImplementation(() => {
        let callCount = 0;
        return {
            invoke: vitest_1.vi.fn().mockImplementation(async () => {
                callCount++;
                if (callCount % 2 === 1) {
                    // Odd calls: classification
                    return { content: 'journalArticle' };
                }
                else {
                    // Even calls: extraction
                    return {
                        content: JSON.stringify({
                            itemType: 'journalArticle',
                            title: 'Gemini Extracted Article',
                            creators: [{ firstName: 'Gemini', lastName: 'Author', creatorType: 'author' }],
                            abstractNote: 'Article extracted using Google Gemini model',
                            date: '2024-01-01',
                            url: 'https://example.com/article',
                        }),
                    };
                }
            }),
        };
    }),
}));
vitest_1.vi.mock('@langchain/ollama', () => ({
    ChatOllama: vitest_1.vi.fn().mockImplementation(() => {
        let callCount = 0;
        return {
            invoke: vitest_1.vi.fn().mockImplementation(async () => {
                callCount++;
                if (callCount % 2 === 1) {
                    // Odd calls: classification
                    return { content: 'journalArticle' };
                }
                else {
                    // Even calls: extraction
                    return {
                        content: JSON.stringify({
                            itemType: 'journalArticle',
                            title: 'Llama Extracted Article',
                            creators: [{ firstName: 'Llama', lastName: 'Author', creatorType: 'author' }],
                            abstractNote: 'Article extracted using Llama model',
                            date: '2024-01-01',
                            url: 'https://example.com/article',
                        }),
                    };
                }
            }),
        };
    }),
}));
// Mock output parsers
vitest_1.vi.mock('@langchain/core/output_parsers', () => ({
    StructuredOutputParser: {
        fromZodSchema: vitest_1.vi.fn().mockReturnValue({
            getFormatInstructions: vitest_1.vi.fn().mockReturnValue('Format instructions'),
            parse: vitest_1.vi.fn().mockImplementation(async (text) => {
                try {
                    return JSON.parse(text);
                }
                catch {
                    return {
                        itemType: 'journalArticle',
                        title: 'Test Article',
                        creators: [{ firstName: 'Test', lastName: 'Author', creatorType: 'author' }],
                        abstractNote: 'Test abstract',
                        date: '2024-01-01',
                        url: 'https://example.com/article',
                    };
                }
            }),
        }),
    },
    OutputFixingParser: {
        fromLLM: vitest_1.vi.fn().mockReturnValue({
        // Mock parser
        }),
    },
}));
(0, vitest_1.describe)('Multi-Provider Translation Integration', () => {
    (0, vitest_1.beforeEach)(() => {
        // Reset provider factory and register mock providers
        provider_factory_1.ProviderFactory.reset();
        // Register mock providers for testing
        provider_factory_1.ProviderFactory.registerProvider('openai', {
            name: 'openai',
            isAvailable: () => true,
            createClassificationModel: vitest_1.vi.fn(),
            createExtractionModel: vitest_1.vi.fn(),
            validateConfig: vitest_1.vi.fn(),
            getModelCapabilities: () => ({
                maxTokens: 128000,
                supportsToolCalling: true,
                supportsStructuredOutput: true,
                supportsJsonMode: true,
                supportsImageInput: true,
                supportsAudioInput: false,
                supportsVideoInput: false,
                supportsStreaming: true,
                supportsBatchProcessing: false,
                supportsTokenUsage: true,
                maxContextLength: 128000,
                maxOutputTokens: 4096,
            }),
        });
        provider_factory_1.ProviderFactory.registerProvider('anthropic', {
            name: 'anthropic',
            isAvailable: () => true,
            createClassificationModel: vitest_1.vi.fn(),
            createExtractionModel: vitest_1.vi.fn(),
            validateConfig: vitest_1.vi.fn(),
            getModelCapabilities: () => ({
                maxTokens: 200000,
                supportsToolCalling: true,
                supportsStructuredOutput: true,
                supportsJsonMode: true,
                supportsImageInput: true,
                supportsAudioInput: false,
                supportsVideoInput: false,
                supportsStreaming: true,
                supportsBatchProcessing: false,
                supportsTokenUsage: true,
                maxContextLength: 200000,
                maxOutputTokens: 8192,
            }),
        });
        provider_factory_1.ProviderFactory.registerProvider('ollama', {
            name: 'ollama',
            isAvailable: () => false, // Mark as unavailable to skip network calls
            createClassificationModel: vitest_1.vi.fn(),
            createExtractionModel: vitest_1.vi.fn(),
            validateConfig: vitest_1.vi.fn(),
            getModelCapabilities: () => ({
                maxTokens: 128000,
                supportsToolCalling: false,
                supportsStructuredOutput: false,
                supportsJsonMode: false,
                supportsImageInput: false,
                supportsAudioInput: false,
                supportsVideoInput: false,
                supportsStreaming: true,
                supportsBatchProcessing: false,
                supportsTokenUsage: false,
                maxContextLength: 128000,
                maxOutputTokens: 2048,
            }),
        });
    });
    const testContent = {
        sourceText: `
      Machine Learning Applications in Healthcare
      
      This research paper explores the applications of machine learning 
      algorithms in modern healthcare systems. The study analyzes various 
      ML techniques including supervised learning, unsupervised learning, 
      and reinforcement learning in medical diagnosis, treatment 
      recommendation, and patient monitoring.
      
      Authors: Dr. Jane Smith, Dr. John Doe
      Published: 2024
      Journal: AI in Medicine
    `,
    };
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('OpenAI Provider Integration', () => {
        (0, vitest_1.it)('should successfully translate content using OpenAI', async () => {
            const config = {
                provider: 'openai',
                apiKey: 'sk-test-openai-key',
                classificationModel: 'gpt-3.5-turbo',
                extractionModel: 'gpt-4o',
                temperature: 0.1,
                maxTokens: 2000,
            };
            const translator = new translator_1.Translator({
                ai: config,
                timeout: 10000,
                maxRetries: 1,
                debug: false,
            });
            const result = await translator.translate(testContent);
            // Test basic functionality - the system should handle AI failures gracefully
            (0, vitest_1.expect)(result).toMatchObject({
                item: {
                    itemType: vitest_1.expect.any(String),
                    title: vitest_1.expect.any(String),
                    url: vitest_1.expect.any(String),
                    creators: vitest_1.expect.any(Array),
                },
                confidence: vitest_1.expect.any(Number),
                processing: {
                    ingestionMethod: 'sourceText',
                    totalTime: vitest_1.expect.any(Number),
                    extractionTime: vitest_1.expect.any(Number),
                    translationTime: vitest_1.expect.any(Number),
                },
            });
            // Verify the result has required properties
            (0, vitest_1.expect)(result.item.title).toBeTruthy();
            (0, vitest_1.expect)(result.confidence).toBeGreaterThan(0);
            (0, vitest_1.expect)(result.confidence).toBeGreaterThan(0.5);
        });
        (0, vitest_1.it)('should handle OpenAI with custom configuration', async () => {
            const config = {
                provider: 'openai',
                apiKey: 'sk-test-openai-key',
                classificationModel: 'gpt-4o-mini',
                extractionModel: 'gpt-4o',
                organization: 'org-123456',
                baseURL: 'https://custom-openai-api.example.com',
                temperature: 0.2,
                maxTokens: 4000,
                maxRetries: 2,
            };
            const translator = new translator_1.Translator({ ai: config, debug: false });
            const result = await translator.translate(testContent);
            (0, vitest_1.expect)(result.item.title).toBeTruthy();
            (0, vitest_1.expect)(result.processing.aiProvider).toBe('openai');
        });
    });
    (0, vitest_1.describe)('Anthropic Provider Integration', () => {
        (0, vitest_1.it)('should successfully translate content using Anthropic', async () => {
            const config = {
                provider: 'anthropic',
                apiKey: 'sk-ant-test-key',
                classificationModel: 'claude-3-haiku-20240307',
                extractionModel: 'claude-3-5-sonnet-20241022',
                temperature: 0.1,
                maxTokens: 2000,
            };
            const translator = new translator_1.Translator({
                ai: config,
                timeout: 10000,
                maxRetries: 1,
                debug: false,
            });
            const result = await translator.translate(testContent);
            (0, vitest_1.expect)(result).toMatchObject({
                item: {
                    itemType: 'journalArticle',
                    title: 'Anthropic Extracted Article',
                    creators: vitest_1.expect.arrayContaining([
                        vitest_1.expect.objectContaining({
                            firstName: 'Claude',
                            lastName: 'Author',
                            creatorType: 'author',
                        }),
                    ]),
                },
                confidence: vitest_1.expect.any(Number),
                processing: {
                    ingestionMethod: 'sourceText',
                    aiProvider: 'anthropic',
                    modelsUsed: {
                        classification: 'claude-3-haiku-20240307',
                        extraction: 'claude-3-5-sonnet-20241022',
                    },
                },
            });
        });
        (0, vitest_1.it)('should handle Anthropic with prompt caching', async () => {
            const config = {
                provider: 'anthropic',
                apiKey: 'sk-ant-test-key',
                classificationModel: 'claude-3-5-sonnet-20241022',
                extractionModel: 'claude-3-5-sonnet-20241022',
                enablePromptCaching: true,
                customHeaders: {
                    'X-Custom-Header': 'test-value',
                },
            };
            const translator = new translator_1.Translator({ ai: config, debug: false });
            const result = await translator.translate(testContent);
            (0, vitest_1.expect)(result.item.title).toBe('Anthropic Extracted Article');
            (0, vitest_1.expect)(result.processing.aiProvider).toBe('anthropic');
        });
    });
    (0, vitest_1.describe)('VertexAI Provider Integration', () => {
        (0, vitest_1.it)('should successfully translate content using VertexAI', async () => {
            const config = {
                provider: 'vertexai',
                projectId: 'test-project-123',
                location: 'us-central1',
                classificationModel: 'gemini-1.5-flash-002',
                extractionModel: 'gemini-1.5-pro-002',
                temperature: 0.1,
                maxTokens: 2000,
            };
            const translator = new translator_1.Translator({
                ai: config,
                timeout: 10000,
                maxRetries: 1,
                debug: false,
            });
            const result = await translator.translate(testContent);
            (0, vitest_1.expect)(result).toMatchObject({
                item: {
                    itemType: 'journalArticle',
                    title: 'Gemini Extracted Article',
                    creators: vitest_1.expect.arrayContaining([
                        vitest_1.expect.objectContaining({
                            firstName: 'Gemini',
                            lastName: 'Author',
                            creatorType: 'author',
                        }),
                    ]),
                },
                confidence: vitest_1.expect.any(Number),
                processing: {
                    ingestionMethod: 'sourceText',
                    aiProvider: 'vertexai',
                    modelsUsed: {
                        classification: 'gemini-1.5-flash-002',
                        extraction: 'gemini-1.5-pro-002',
                    },
                },
            });
        });
        (0, vitest_1.it)('should handle VertexAI with authentication', async () => {
            const config = {
                provider: 'vertexai',
                projectId: 'test-project-123',
                location: 'europe-west1',
                classificationModel: 'gemini-1.5-pro-002',
                extractionModel: 'gemini-1.5-pro-002',
                authOptions: {
                    keyFilename: '/path/to/service-account.json',
                },
                contextCaching: {
                    cachedContentId: 'cache-123',
                    ttlSeconds: 3600,
                },
            };
            const translator = new translator_1.Translator({ ai: config, debug: false });
            const result = await translator.translate(testContent);
            (0, vitest_1.expect)(result.item.title).toBe('Gemini Extracted Article');
            (0, vitest_1.expect)(result.processing.aiProvider).toBe('vertexai');
        });
    });
    (0, vitest_1.describe)('Ollama Provider Integration', () => {
        (0, vitest_1.it)('should successfully translate content using Ollama', async () => {
            const config = {
                provider: 'ollama',
                baseUrl: 'http://localhost:11434',
                classificationModel: 'llama3.1:8b',
                extractionModel: 'llama3.1:70b',
                temperature: 0.1,
                maxTokens: 2000,
            };
            const translator = new translator_1.Translator({
                ai: config,
                timeout: 10000,
                maxRetries: 1,
                debug: false,
            });
            const result = await translator.translate(testContent);
            (0, vitest_1.expect)(result).toMatchObject({
                item: {
                    itemType: 'journalArticle',
                    title: 'Llama Extracted Article',
                    creators: vitest_1.expect.arrayContaining([
                        vitest_1.expect.objectContaining({
                            firstName: 'Llama',
                            lastName: 'Author',
                            creatorType: 'author',
                        }),
                    ]),
                },
                confidence: vitest_1.expect.any(Number),
                processing: {
                    ingestionMethod: 'sourceText',
                    aiProvider: 'ollama',
                    modelsUsed: {
                        classification: 'llama3.1:8b',
                        extraction: 'llama3.1:70b',
                    },
                },
            });
        });
        (0, vitest_1.it)('should handle Ollama with custom server and options', async () => {
            const config = {
                provider: 'ollama',
                baseUrl: 'http://custom-ollama-server:11434',
                classificationModel: 'codellama:7b',
                extractionModel: 'llama3.1:8b',
                enableMultimodal: true,
                requestOptions: {
                    numGpu: 1,
                    numThread: 8,
                    useMmap: true,
                },
            };
            const translator = new translator_1.Translator({ ai: config, debug: false });
            const result = await translator.translate(testContent);
            (0, vitest_1.expect)(result.item.title).toBe('Llama Extracted Article');
            (0, vitest_1.expect)(result.processing.aiProvider).toBe('ollama');
        });
    });
    (0, vitest_1.describe)('Cross-Provider Consistency', () => {
        (0, vitest_1.it)('should produce consistent metadata across all providers', async () => {
            const providers = [
                {
                    provider: 'openai',
                    apiKey: 'sk-test-openai-key',
                    classificationModel: 'gpt-3.5-turbo',
                    extractionModel: 'gpt-4o',
                },
                {
                    provider: 'anthropic',
                    apiKey: 'sk-ant-test-key',
                    classificationModel: 'claude-3-haiku-20240307',
                    extractionModel: 'claude-3-5-sonnet-20241022',
                },
                {
                    provider: 'vertexai',
                    projectId: 'test-project',
                    location: 'us-central1',
                    classificationModel: 'gemini-1.5-flash-002',
                    extractionModel: 'gemini-1.5-pro-002',
                },
                {
                    provider: 'ollama',
                    baseUrl: 'http://localhost:11434',
                    classificationModel: 'llama3.1:8b',
                    extractionModel: 'llama3.1:70b',
                },
            ];
            const results = [];
            for (const config of providers) {
                const translator = new translator_1.Translator({ ai: config, debug: false });
                const result = await translator.translate(testContent);
                results.push(result);
            }
            // All results should have the same structure
            for (const result of results) {
                (0, vitest_1.expect)(result).toHaveProperty('item');
                (0, vitest_1.expect)(result).toHaveProperty('confidence');
                (0, vitest_1.expect)(result).toHaveProperty('extractedContent');
                (0, vitest_1.expect)(result).toHaveProperty('processing');
                (0, vitest_1.expect)(result.item).toHaveProperty('itemType', 'journalArticle');
                (0, vitest_1.expect)(result.item).toHaveProperty('title');
                (0, vitest_1.expect)(result.item).toHaveProperty('creators');
                (0, vitest_1.expect)(result.item).toHaveProperty('abstractNote');
                (0, vitest_1.expect)(result.processing).toHaveProperty('ingestionMethod', 'sourceText');
                (0, vitest_1.expect)(result.processing).toHaveProperty('aiProvider');
                (0, vitest_1.expect)(result.processing).toHaveProperty('modelsUsed');
                (0, vitest_1.expect)(result.processing.modelsUsed).toHaveProperty('classification');
                (0, vitest_1.expect)(result.processing.modelsUsed).toHaveProperty('extraction');
            }
            // Each result should have the correct provider
            (0, vitest_1.expect)(results[0].processing.aiProvider).toBe('openai');
            (0, vitest_1.expect)(results[1].processing.aiProvider).toBe('anthropic');
            (0, vitest_1.expect)(results[2].processing.aiProvider).toBe('vertexai');
            (0, vitest_1.expect)(results[3].processing.aiProvider).toBe('ollama');
        });
    });
    (0, vitest_1.describe)('Error Handling and Fallbacks', () => {
        (0, vitest_1.it)('should handle provider-specific errors gracefully', async () => {
            // Mock one provider to fail
            const { ChatOpenAI } = await Promise.resolve().then(() => __importStar(require('@langchain/openai')));
            vitest_1.vi.mocked(ChatOpenAI).mockImplementationOnce(() => {
                throw new Error('OpenAI API rate limit exceeded');
            });
            const config = {
                provider: 'openai',
                apiKey: 'sk-test-openai-key',
                classificationModel: 'gpt-3.5-turbo',
                extractionModel: 'gpt-4o',
            };
            const translator = new translator_1.Translator({ ai: config, debug: false });
            // Should fall back to basic extraction instead of throwing
            const result = await translator.translate(testContent);
            (0, vitest_1.expect)(result).toHaveProperty('item');
            (0, vitest_1.expect)(result.item).toHaveProperty('itemType');
            (0, vitest_1.expect)(result.item).toHaveProperty('title');
            // Processing should not include AI provider info since it failed
            (0, vitest_1.expect)(result.processing.aiProvider).toBeUndefined();
        });
        (0, vitest_1.it)('should validate configuration before translation', async () => {
            const invalidConfig = {
                provider: 'openai',
                apiKey: '', // Invalid empty API key
            };
            (0, vitest_1.expect)(() => new translator_1.Translator({ ai: invalidConfig })).toThrow('API key is required');
        });
    });
    (0, vitest_1.describe)('Performance and Scalability', () => {
        (0, vitest_1.it)('should handle concurrent translations with the same provider', async () => {
            const config = {
                provider: 'openai',
                apiKey: 'sk-test-openai-key',
                classificationModel: 'gpt-3.5-turbo',
                extractionModel: 'gpt-4o',
            };
            const translator = new translator_1.Translator({ ai: config, debug: false });
            // Execute multiple translations concurrently
            const promises = Array(3)
                .fill(null)
                .map(() => translator.translate(testContent));
            const results = await Promise.all(promises);
            // All should succeed
            (0, vitest_1.expect)(results).toHaveLength(3);
            results.forEach(result => {
                (0, vitest_1.expect)(result.item.itemType).toBe('journalArticle');
                (0, vitest_1.expect)(result.processing.aiProvider).toBe('openai');
            });
        });
        (0, vitest_1.it)('should handle different content sizes across providers', async () => {
            const smallContent = { sourceText: 'Short article about AI.' };
            const largeContent = {
                sourceText: `${'A'.repeat(10000)} This is a very large article about artificial intelligence and machine learning.`,
            };
            const config = {
                provider: 'anthropic',
                apiKey: 'sk-ant-test-key',
                classificationModel: 'claude-3-haiku-20240307',
                extractionModel: 'claude-3-5-sonnet-20241022',
            };
            const translator = new translator_1.Translator({ ai: config, debug: false });
            const smallResult = await translator.translate(smallContent);
            const largeResult = await translator.translate(largeContent);
            (0, vitest_1.expect)(smallResult.item.itemType).toBe('journalArticle');
            (0, vitest_1.expect)(largeResult.item.itemType).toBe('journalArticle');
            (0, vitest_1.expect)(smallResult.processing.aiProvider).toBe('anthropic');
            (0, vitest_1.expect)(largeResult.processing.aiProvider).toBe('anthropic');
        });
    });
    (0, vitest_1.describe)('Translation Quality and Metadata', () => {
        (0, vitest_1.it)('should preserve source content metadata in extraction', async () => {
            const config = {
                provider: 'vertexai',
                projectId: 'test-project',
                location: 'us-central1',
                classificationModel: 'gemini-1.5-flash-002',
                extractionModel: 'gemini-1.5-pro-002',
            };
            const translator = new translator_1.Translator({ ai: config, debug: false });
            const result = await translator.translate(testContent);
            (0, vitest_1.expect)(result.extractedContent).toHaveProperty('text');
            (0, vitest_1.expect)(result.extractedContent).toHaveProperty('contentType', 'text/plain');
            (0, vitest_1.expect)(result.extractedContent.text).toContain('Machine Learning Applications');
        });
        (0, vitest_1.it)('should provide accurate confidence scores', async () => {
            const config = {
                provider: 'openai',
                apiKey: 'sk-test-openai-key',
                classificationModel: 'gpt-4o',
                extractionModel: 'gpt-4o',
            };
            const translator = new translator_1.Translator({ ai: config, debug: false });
            const result = await translator.translate(testContent);
            (0, vitest_1.expect)(result.confidence).toBeGreaterThan(0);
            (0, vitest_1.expect)(result.confidence).toBeLessThanOrEqual(1);
            // AI-powered extraction should have high confidence
            (0, vitest_1.expect)(result.confidence).toBeGreaterThan(0.7);
        });
    });
});
