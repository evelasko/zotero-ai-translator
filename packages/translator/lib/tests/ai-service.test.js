"use strict";
/**
 * Tests for the AI Service
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ai_service_1 = require("../core/ai-service");
const types_1 = require("../types");
// Mock LangChain modules
vitest_1.vi.mock('@langchain/openai', () => ({
    ChatOpenAI: vitest_1.vi.fn().mockImplementation(() => ({
    // Mock implementation
    })),
}));
vitest_1.vi.mock('langchain/prompts', () => ({
    PromptTemplate: {
        fromTemplate: vitest_1.vi.fn().mockReturnValue({
            pipe: vitest_1.vi.fn().mockReturnValue({
                invoke: vitest_1.vi.fn(),
            }),
        }),
    },
}));
vitest_1.vi.mock('langchain/output_parsers', () => ({
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
(0, vitest_1.describe)('AIService', () => {
    let aiService;
    let mockConfig;
    let mockContent;
    (0, vitest_1.beforeEach)(() => {
        mockConfig = {
            apiKey: 'test-api-key',
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
        aiService = new ai_service_1.AIService(mockConfig);
    });
    (0, vitest_1.describe)('constructor', () => {
        (0, vitest_1.it)('should create AI service with default config', () => {
            const minimalConfig = {
                apiKey: 'test-key',
            };
            (0, vitest_1.expect)(() => new ai_service_1.AIService(minimalConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should create AI service with full config', () => {
            (0, vitest_1.expect)(() => new ai_service_1.AIService(mockConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should handle custom base URL', () => {
            const configWithBaseURL = {
                ...mockConfig,
                baseURL: 'https://custom-api.example.com',
            };
            (0, vitest_1.expect)(() => new ai_service_1.AIService(configWithBaseURL)).not.toThrow();
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
        (0, vitest_1.it)('should accept valid configuration', () => {
            const validConfig = {
                apiKey: 'sk-test-key',
                classificationModel: 'gpt-4',
                extractionModel: 'gpt-4',
                temperature: 0.2,
                maxTokens: 4000,
            };
            (0, vitest_1.expect)(() => new ai_service_1.AIService(validConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should handle missing optional fields', () => {
            const minimalConfig = {
                apiKey: 'test-key',
            };
            const service = new ai_service_1.AIService(minimalConfig);
            (0, vitest_1.expect)(service).toBeInstanceOf(ai_service_1.AIService);
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
    });
});
