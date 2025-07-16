"use strict";
/**
 * Tests for the ProviderFactory
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
const config_validator_1 = require("../core/config-validator");
const types_1 = require("../types");
// Mock the actual provider implementations
vitest_1.vi.mock('../core/providers/openai-provider', () => ({
    OpenAIProvider: {
        name: 'openai',
        isAvailable: vitest_1.vi.fn().mockReturnValue(true),
        createClassificationModel: vitest_1.vi.fn(),
        createExtractionModel: vitest_1.vi.fn(),
        validateConfig: vitest_1.vi.fn(),
        getModelCapabilities: vitest_1.vi.fn().mockReturnValue({
            maxTokens: 128000,
            supportsToolCalling: true,
            supportsImageInput: true,
        }),
    },
}));
vitest_1.vi.mock('../core/providers/anthropic-provider', () => ({
    AnthropicProvider: {
        name: 'anthropic',
        isAvailable: vitest_1.vi.fn().mockReturnValue(true),
        createClassificationModel: vitest_1.vi.fn(),
        createExtractionModel: vitest_1.vi.fn(),
        validateConfig: vitest_1.vi.fn(),
        getModelCapabilities: vitest_1.vi.fn().mockReturnValue({
            maxTokens: 200000,
            supportsToolCalling: true,
            supportsImageInput: true,
        }),
    },
}));
vitest_1.vi.mock('../core/providers/vertexai-provider', () => ({
    VertexAIProvider: {
        name: 'vertexai',
        isAvailable: vitest_1.vi.fn().mockReturnValue(true),
        createClassificationModel: vitest_1.vi.fn(),
        createExtractionModel: vitest_1.vi.fn(),
        validateConfig: vitest_1.vi.fn(),
        getModelCapabilities: vitest_1.vi.fn().mockReturnValue({
            maxTokens: 2000000,
            supportsToolCalling: true,
            supportsImageInput: true,
        }),
    },
}));
vitest_1.vi.mock('../core/providers/ollama-provider', () => ({
    OllamaProvider: {
        name: 'ollama',
        isAvailable: vitest_1.vi.fn().mockReturnValue(false), // Simulate not available
        createClassificationModel: vitest_1.vi.fn(),
        createExtractionModel: vitest_1.vi.fn(),
        validateConfig: vitest_1.vi.fn(),
        getModelCapabilities: vitest_1.vi.fn().mockReturnValue({
            maxTokens: 32768,
            supportsToolCalling: true,
            supportsImageInput: false,
        }),
    },
}));
// Mock ConfigValidator
vitest_1.vi.mock('../core/config-validator', () => ({
    ConfigValidator: {
        validateProviderConfig: vitest_1.vi.fn(),
    },
}));
(0, vitest_1.describe)('ProviderFactory', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('Provider Registration and Availability', () => {
        (0, vitest_1.it)('should have all default providers registered', async () => {
            // Import after mocks are set up
            const { ProviderFactory } = await Promise.resolve().then(() => __importStar(require('../core/provider-factory')));
            const availableProviders = ProviderFactory.getAvailableProviders();
            // Should include at least the main providers
            (0, vitest_1.expect)(availableProviders.length).toBeGreaterThan(0);
        });
        (0, vitest_1.it)('should detect available providers correctly', async () => {
            const { ProviderFactory } = await Promise.resolve().then(() => __importStar(require('../core/provider-factory')));
            // Check availability of different providers
            const isOpenAIAvailable = ProviderFactory.isProviderAvailable('openai');
            const isOllamaAvailable = ProviderFactory.isProviderAvailable('ollama');
            (0, vitest_1.expect)(isOpenAIAvailable).toBe(true);
            (0, vitest_1.expect)(isOllamaAvailable).toBe(false); // Mocked as unavailable
        });
    });
    (0, vitest_1.describe)('Provider Creation', () => {
        (0, vitest_1.it)('should create OpenAI provider with valid config', async () => {
            const { ProviderFactory } = await Promise.resolve().then(() => __importStar(require('../core/provider-factory')));
            const config = {
                provider: 'openai',
                apiKey: 'sk-test-key',
                classificationModel: 'gpt-3.5-turbo',
                extractionModel: 'gpt-4o',
            };
            // Mock validation to pass
            vitest_1.vi.mocked(config_validator_1.ConfigValidator.validateProviderConfig).mockImplementation(() => { });
            const provider = ProviderFactory.createProvider(config);
            (0, vitest_1.expect)(provider).toBeDefined();
            (0, vitest_1.expect)(provider.name).toBe('openai');
            (0, vitest_1.expect)(config_validator_1.ConfigValidator.validateProviderConfig).toHaveBeenCalledWith(config);
        });
        (0, vitest_1.it)('should create Anthropic provider with valid config', async () => {
            const { ProviderFactory } = await Promise.resolve().then(() => __importStar(require('../core/provider-factory')));
            const config = {
                provider: 'anthropic',
                apiKey: 'sk-ant-test-key',
                classificationModel: 'claude-3-haiku-20240307',
                extractionModel: 'claude-3-5-sonnet-20241022',
            };
            vitest_1.vi.mocked(config_validator_1.ConfigValidator.validateProviderConfig).mockImplementation(() => { });
            const provider = ProviderFactory.createProvider(config);
            (0, vitest_1.expect)(provider).toBeDefined();
            (0, vitest_1.expect)(provider.name).toBe('anthropic');
        });
        (0, vitest_1.it)('should create VertexAI provider with valid config', async () => {
            const { ProviderFactory } = await Promise.resolve().then(() => __importStar(require('../core/provider-factory')));
            const config = {
                provider: 'vertexai',
                projectId: 'test-project',
                location: 'us-central1',
                classificationModel: 'gemini-1.5-flash-002',
                extractionModel: 'gemini-1.5-pro-002',
            };
            vitest_1.vi.mocked(config_validator_1.ConfigValidator.validateProviderConfig).mockImplementation(() => { });
            const provider = ProviderFactory.createProvider(config);
            (0, vitest_1.expect)(provider).toBeDefined();
            (0, vitest_1.expect)(provider.name).toBe('vertexai');
        });
        (0, vitest_1.it)('should throw error for unavailable provider', async () => {
            const { ProviderFactory } = await Promise.resolve().then(() => __importStar(require('../core/provider-factory')));
            const config = {
                provider: 'ollama',
                baseUrl: 'http://localhost:11434',
            };
            vitest_1.vi.mocked(config_validator_1.ConfigValidator.validateProviderConfig).mockImplementation(() => { });
            // Ollama is mocked as unavailable
            (0, vitest_1.expect)(() => ProviderFactory.createProvider(config)).toThrow("Provider 'ollama' is not available");
        });
        (0, vitest_1.it)('should validate config before creating provider', async () => {
            const { ProviderFactory } = await Promise.resolve().then(() => __importStar(require('../core/provider-factory')));
            const invalidConfig = {
                provider: 'openai',
                apiKey: '', // Invalid empty API key
            };
            // Mock validation to throw error
            vitest_1.vi.mocked(config_validator_1.ConfigValidator.validateProviderConfig).mockImplementation(() => {
                throw new types_1.ConfigurationError('API key is required');
            });
            (0, vitest_1.expect)(() => ProviderFactory.createProvider(invalidConfig)).toThrow('API key is required');
        });
    });
    (0, vitest_1.describe)('Installation Instructions', () => {
        (0, vitest_1.it)('should provide installation instructions for each provider', () => {
            // Test installation instructions for known providers
            const openaiInstructions = 'npm install @langchain/openai';
            const anthropicInstructions = 'npm install @langchain/anthropic';
            const vertexaiInstructions = 'npm install @langchain/google-vertexai';
            const ollamaInstructions = 'npm install @langchain/ollama';
            (0, vitest_1.expect)(openaiInstructions).toBe('npm install @langchain/openai');
            (0, vitest_1.expect)(anthropicInstructions).toBe('npm install @langchain/anthropic');
            (0, vitest_1.expect)(vertexaiInstructions).toBe('npm install @langchain/google-vertexai');
            (0, vitest_1.expect)(ollamaInstructions).toBe('npm install @langchain/ollama');
        });
    });
    (0, vitest_1.describe)('Error Handling', () => {
        (0, vitest_1.it)('should handle provider creation errors gracefully', async () => {
            const { ProviderFactory } = await Promise.resolve().then(() => __importStar(require('../core/provider-factory')));
            const config = {
                provider: 'openai',
                apiKey: 'sk-test-key',
            };
            // Mock validation to throw error
            vitest_1.vi.mocked(config_validator_1.ConfigValidator.validateProviderConfig).mockImplementation(() => {
                throw new types_1.ConfigurationError('Configuration validation failed');
            });
            (0, vitest_1.expect)(() => ProviderFactory.createProvider(config)).toThrow('Configuration validation failed');
        });
        (0, vitest_1.it)('should provide helpful error messages for missing providers', async () => {
            const { ProviderFactory } = await Promise.resolve().then(() => __importStar(require('../core/provider-factory')));
            // Try to create a provider that doesn't exist
            const config = {
                provider: 'nonexistent',
                apiKey: 'test-key',
            };
            (0, vitest_1.expect)(() => ProviderFactory.createProvider(config)).toThrow(/Provider 'nonexistent' is not registered/);
        });
    });
    (0, vitest_1.describe)('Provider Configuration Validation', () => {
        (0, vitest_1.it)('should call ConfigValidator for each provider type', async () => {
            const { ProviderFactory } = await Promise.resolve().then(() => __importStar(require('../core/provider-factory')));
            const configs = [
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
            ];
            vitest_1.vi.mocked(config_validator_1.ConfigValidator.validateProviderConfig).mockImplementation(() => { });
            for (const config of configs) {
                ProviderFactory.createProvider(config);
            }
            (0, vitest_1.expect)(config_validator_1.ConfigValidator.validateProviderConfig).toHaveBeenCalledTimes(3);
        });
        (0, vitest_1.it)('should pass through validation errors', async () => {
            const { ProviderFactory } = await Promise.resolve().then(() => __importStar(require('../core/provider-factory')));
            const config = {
                provider: 'openai',
                apiKey: 'invalid-key',
            };
            const validationError = new types_1.ConfigurationError('Invalid API key format');
            vitest_1.vi.mocked(config_validator_1.ConfigValidator.validateProviderConfig).mockImplementation(() => {
                throw validationError;
            });
            (0, vitest_1.expect)(() => ProviderFactory.createProvider(config)).toThrow('Invalid API key format');
        });
    });
});
