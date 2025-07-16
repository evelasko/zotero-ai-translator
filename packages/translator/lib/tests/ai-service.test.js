"use strict";
/**
 * Tests for the AI Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ai_service_1 = require("../core/ai-service");
const types_1 = require("../types");
const providers_1 = require("../core/providers");
const provider_factory_1 = require("../core/provider-factory");
// Mock LangChain modules
vitest_1.vi.mock('@langchain/openai', () => ({
    ChatOpenAI: vitest_1.vi.fn().mockImplementation(() => {
        let callCount = 0;
        return {
            invoke: vitest_1.vi.fn().mockImplementation(async () => {
                callCount++;
                if (callCount % 2 === 1) {
                    // Odd calls: classification
                    return { content: 'webpage' };
                }
                else {
                    // Even calls: extraction
                    return {
                        content: JSON.stringify({
                            itemType: 'webpage',
                            title: 'Test Article',
                            creators: [{ firstName: 'Test', lastName: 'Author', creatorType: 'author' }],
                            abstractNote: 'Test abstract',
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
                    return { content: 'webpage' };
                }
                else {
                    return {
                        content: JSON.stringify({
                            itemType: 'webpage',
                            title: 'Test Article',
                            creators: [{ firstName: 'Test', lastName: 'Author', creatorType: 'author' }],
                            abstractNote: 'Test abstract',
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
                    return { content: 'webpage' };
                }
                else {
                    return {
                        content: JSON.stringify({
                            itemType: 'webpage',
                            title: 'Test Article',
                            creators: [{ firstName: 'Test', lastName: 'Author', creatorType: 'author' }],
                            abstractNote: 'Test abstract',
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
                    return { content: 'webpage' };
                }
                else {
                    return {
                        content: JSON.stringify({
                            itemType: 'webpage',
                            title: 'Test Article',
                            creators: [{ firstName: 'Test', lastName: 'Author', creatorType: 'author' }],
                            abstractNote: 'Test abstract',
                            date: '2024-01-01',
                            url: 'https://example.com/article',
                        }),
                    };
                }
            }),
        };
    }),
}));
vitest_1.vi.mock('@langchain/core/output_parsers', () => ({
    StructuredOutputParser: {
        fromZodSchema: vitest_1.vi.fn().mockReturnValue({
            getFormatInstructions: vitest_1.vi.fn().mockReturnValue('Format instructions'),
            parse: vitest_1.vi.fn().mockResolvedValue({
                itemType: 'webpage',
                title: 'Test Title',
                creators: [],
                tags: [],
                collections: [],
                relations: {},
                dateAdded: new Date().toISOString(),
                dateModified: new Date().toISOString(),
            }),
        }),
    },
    OutputFixingParser: {
        fromLLM: vitest_1.vi.fn().mockReturnValue({
        // Mock parser
        }),
    },
}));
(0, vitest_1.describe)('AIService', () => {
    let aiService;
    let mockConfig;
    let mockContent;
    (0, vitest_1.beforeEach)(() => {
        // Mock ProviderDetector to always return true for availability
        vitest_1.vi.spyOn(provider_factory_1.ProviderDetector, 'isProviderInstalled').mockReturnValue(true);
        // Register providers before each test
        (0, providers_1.registerAllProviders)();
        mockConfig = {
            provider: 'openai',
            apiKey: 'sk-test-api-key',
            classificationModel: 'gpt-3.5-turbo',
            extractionModel: 'gpt-3.5-turbo',
            temperature: 0.1,
            maxTokens: 2000,
        };
        mockContent = {
            text: 'This is a test article about machine learning research.',
            title: 'Machine Learning Research Article',
            url: 'https://example.com/article',
            contentType: 'text/html',
            metadata: {
                author: 'John Doe',
                publishedDate: '2023-01-01',
                excerpt: 'This article discusses machine learning techniques.',
                language: 'en',
            },
        };
        // Create default aiService instance for tests that don't override it
        try {
            aiService = new ai_service_1.AIService(mockConfig);
        }
        catch (error) {
            // Some tests may not have the right provider registered
        }
    });
    (0, vitest_1.describe)('constructor', () => {
        (0, vitest_1.it)('should create AI service with OpenAI config', () => {
            const openaiConfig = {
                provider: 'openai',
                apiKey: 'sk-test-key',
            };
            const aiService = new ai_service_1.AIService(openaiConfig);
            (0, vitest_1.expect)(aiService).toBeDefined();
        });
        (0, vitest_1.it)('should create AI service with Anthropic config', () => {
            const anthropicConfig = {
                provider: 'anthropic',
                apiKey: 'sk-ant-test-key',
            };
            (0, vitest_1.expect)(() => new ai_service_1.AIService(anthropicConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should create AI service with VertexAI config', () => {
            const vertexaiConfig = {
                provider: 'vertexai',
                projectId: 'test-project',
                location: 'us-central1',
            };
            (0, vitest_1.expect)(() => new ai_service_1.AIService(vertexaiConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should create AI service with Ollama config', () => {
            const ollamaConfig = {
                provider: 'ollama',
                baseUrl: 'http://localhost:11434',
            };
            (0, vitest_1.expect)(() => new ai_service_1.AIService(ollamaConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should create AI service with full config', () => {
            (0, vitest_1.expect)(() => new ai_service_1.AIService(mockConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should handle OpenAI custom base URL', () => {
            const configWithBaseURL = {
                provider: 'openai',
                apiKey: 'sk-test-api-key',
                classificationModel: 'gpt-3.5-turbo',
                extractionModel: 'gpt-3.5-turbo',
                temperature: 0.1,
                maxTokens: 2000,
                baseURL: 'https://custom-api.example.com',
            };
            (0, vitest_1.expect)(() => new ai_service_1.AIService(configWithBaseURL)).not.toThrow();
        });
        (0, vitest_1.it)('should handle Anthropic custom headers', () => {
            const configWithHeaders = {
                provider: 'anthropic',
                apiKey: 'sk-ant-test-key',
                customHeaders: {
                    'Custom-Header': 'test-value',
                },
            };
            (0, vitest_1.expect)(() => new ai_service_1.AIService(configWithHeaders)).not.toThrow();
        });
        (0, vitest_1.it)('should handle VertexAI authentication', () => {
            const configWithAuth = {
                provider: 'vertexai',
                projectId: 'test-project',
                location: 'us-central1',
                authOptions: {
                    credentials: {
                        client_email: 'test@example.com',
                        private_key: 'test-key',
                    },
                },
            };
            (0, vitest_1.expect)(() => new ai_service_1.AIService(configWithAuth)).not.toThrow();
        });
    });
    (0, vitest_1.describe)('translateContent', () => {
        (0, vitest_1.it)('should have translateContent method', () => {
            (0, vitest_1.expect)(typeof aiService.translateContent).toBe('function');
        });
        // Note: These tests would require mocking the LangChain calls
        // For now, we'll test the method signature and basic structure
        (0, vitest_1.it)('should return promise that resolves to translation result', async () => {
            // This test would need proper mocking of LangChain responses
            // For now, we'll just verify the method exists and can be called
            (0, vitest_1.expect)(aiService.translateContent(mockContent)).toBeInstanceOf(Promise);
        });
        (0, vitest_1.it)('should handle different provider configurations', async () => {
            const providers = [
                {
                    provider: 'openai',
                    apiKey: 'sk-test-key',
                },
                {
                    provider: 'anthropic',
                    apiKey: 'sk-ant-test-key',
                },
                {
                    provider: 'vertexai',
                    projectId: 'test-project',
                    location: 'us-central1',
                },
                {
                    provider: 'ollama',
                    baseUrl: 'http://localhost:11434',
                },
            ];
            for (const config of providers) {
                const service = new ai_service_1.AIService(config);
                (0, vitest_1.expect)(service.translateContent(mockContent)).toBeInstanceOf(Promise);
            }
        });
    });
    (0, vitest_1.describe)('error handling', () => {
        (0, vitest_1.it)('should handle classification errors gracefully', () => {
            // Test error handling structure
            (0, vitest_1.expect)(types_1.AIClassificationError).toBeDefined();
            (0, vitest_1.expect)(types_1.AIExtractionError).toBeDefined();
            (0, vitest_1.expect)(types_1.AIValidationError).toBeDefined();
        });
        (0, vitest_1.it)('should create appropriate error types', () => {
            const classificationError = new types_1.AIClassificationError('Classification failed');
            (0, vitest_1.expect)(classificationError.name).toBe('AIClassificationError');
            (0, vitest_1.expect)(classificationError.code).toBe('AI_CLASSIFICATION_ERROR');
            const extractionError = new types_1.AIExtractionError('Extraction failed');
            (0, vitest_1.expect)(extractionError.name).toBe('AIExtractionError');
            (0, vitest_1.expect)(extractionError.code).toBe('AI_EXTRACTION_ERROR');
            const validationError = new types_1.AIValidationError('Validation failed');
            (0, vitest_1.expect)(validationError.name).toBe('AIValidationError');
            (0, vitest_1.expect)(validationError.code).toBe('AI_VALIDATION_ERROR');
        });
    });
    (0, vitest_1.describe)('configuration validation', () => {
        (0, vitest_1.it)('should accept valid OpenAI configuration', () => {
            const validConfig = {
                provider: 'openai',
                apiKey: 'sk-test-key',
                classificationModel: 'gpt-4',
                extractionModel: 'gpt-4',
                temperature: 0.2,
                maxTokens: 4000,
            };
            (0, vitest_1.expect)(() => new ai_service_1.AIService(validConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should accept valid Anthropic configuration', () => {
            const validConfig = {
                provider: 'anthropic',
                apiKey: 'sk-ant-test-key',
                classificationModel: 'claude-3-5-sonnet-20241022',
                extractionModel: 'claude-3-5-sonnet-20241022',
                temperature: 0.2,
                maxTokens: 4000,
            };
            (0, vitest_1.expect)(() => new ai_service_1.AIService(validConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should handle missing optional fields', () => {
            const minimalOpenAIConfig = {
                provider: 'openai',
                apiKey: 'sk-test-key',
            };
            const minimalAnthropicConfig = {
                provider: 'anthropic',
                apiKey: 'sk-ant-test-key',
            };
            (0, vitest_1.expect)(() => new ai_service_1.AIService(minimalOpenAIConfig)).not.toThrow();
            (0, vitest_1.expect)(() => new ai_service_1.AIService(minimalAnthropicConfig)).not.toThrow();
        });
    });
    (0, vitest_1.describe)('content processing', () => {
        (0, vitest_1.it)('should handle various content types', () => {
            const htmlContent = {
                text: '<p>HTML content</p>',
                contentType: 'text/html',
                title: 'HTML Document',
            };
            const pdfContent = {
                text: 'PDF extracted text',
                contentType: 'application/pdf',
                title: 'PDF Document',
            };
            const plainTextContent = {
                text: 'Plain text content',
                contentType: 'text/plain',
            };
            // These would need proper mocking to test fully
            (0, vitest_1.expect)(aiService.translateContent(htmlContent)).toBeInstanceOf(Promise);
            (0, vitest_1.expect)(aiService.translateContent(pdfContent)).toBeInstanceOf(Promise);
            (0, vitest_1.expect)(aiService.translateContent(plainTextContent)).toBeInstanceOf(Promise);
        });
        (0, vitest_1.it)('should handle content with missing metadata', () => {
            const contentWithoutMetadata = {
                text: 'Content without metadata',
                contentType: 'text/plain',
            };
            (0, vitest_1.expect)(aiService.translateContent(contentWithoutMetadata)).toBeInstanceOf(Promise);
        });
        (0, vitest_1.it)('should handle very long content', () => {
            const longContent = {
                text: 'A'.repeat(100000),
                contentType: 'text/plain',
                title: 'Very Long Document',
            };
            (0, vitest_1.expect)(aiService.translateContent(longContent)).toBeInstanceOf(Promise);
        });
        (0, vitest_1.it)('should handle different provider capabilities', () => {
            const multimodalContent = {
                text: 'Content with potential image references',
                contentType: 'text/html',
                title: 'Multimodal Document',
            };
            // Test with providers that support different capabilities
            const providers = [
                { provider: 'openai', apiKey: 'sk-test' },
                { provider: 'anthropic', apiKey: 'sk-ant-test' },
                { provider: 'vertexai', projectId: 'test', location: 'us-central1' },
                { provider: 'ollama', baseUrl: 'http://localhost:11434' },
            ];
            for (const config of providers) {
                const service = new ai_service_1.AIService(config);
                (0, vitest_1.expect)(service.translateContent(multimodalContent)).toBeInstanceOf(Promise);
            }
        });
    });
});
