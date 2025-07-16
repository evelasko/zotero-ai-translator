"use strict";
/**
 * Tests for the ConfigValidator class
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const config_validator_1 = require("../core/config-validator");
const types_1 = require("../types");
(0, vitest_1.describe)('ConfigValidator', () => {
    (0, vitest_1.describe)('OpenAI Configuration Validation', () => {
        (0, vitest_1.it)('should validate valid OpenAI configuration', () => {
            const validConfig = {
                provider: 'openai',
                apiKey: 'sk-test-key-1234567890abcdef',
                classificationModel: 'gpt-3.5-turbo',
                extractionModel: 'gpt-4o',
                temperature: 0.1,
                maxTokens: 2000,
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(validConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should validate minimal OpenAI configuration', () => {
            const minimalConfig = {
                provider: 'openai',
                apiKey: 'sk-test-key',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(minimalConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should throw error for missing OpenAI API key', () => {
            const invalidConfig = {
                provider: 'openai',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
        });
        (0, vitest_1.it)('should throw error for empty OpenAI API key', () => {
            const invalidConfig = {
                provider: 'openai',
                apiKey: '',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
        });
        (0, vitest_1.it)('should throw error for invalid OpenAI temperature', () => {
            const invalidConfig = {
                provider: 'openai',
                apiKey: 'sk-test-key',
                temperature: -1,
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
            const invalidConfig2 = {
                provider: 'openai',
                apiKey: 'sk-test-key',
                temperature: 3,
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig2)).toThrow(types_1.ConfigurationError);
        });
        (0, vitest_1.it)('should throw error for invalid OpenAI max tokens', () => {
            const invalidConfig = {
                provider: 'openai',
                apiKey: 'sk-test-key',
                maxTokens: 0,
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
        });
        (0, vitest_1.it)('should validate OpenAI with custom base URL', () => {
            const configWithBaseURL = {
                provider: 'openai',
                apiKey: 'sk-test-key',
                baseURL: 'https://custom-api.example.com',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(configWithBaseURL)).not.toThrow();
        });
        (0, vitest_1.it)('should validate OpenAI with organization', () => {
            const configWithOrg = {
                provider: 'openai',
                apiKey: 'sk-test-key',
                organization: 'org-123456',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(configWithOrg)).not.toThrow();
        });
    });
    (0, vitest_1.describe)('Anthropic Configuration Validation', () => {
        (0, vitest_1.it)('should validate valid Anthropic configuration', () => {
            const validConfig = {
                provider: 'anthropic',
                apiKey: 'sk-ant-test-key-1234567890abcdef',
                classificationModel: 'claude-3-haiku-20240307',
                extractionModel: 'claude-3-5-sonnet-20241022',
                temperature: 0.1,
                maxTokens: 2000,
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(validConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should validate minimal Anthropic configuration', () => {
            const minimalConfig = {
                provider: 'anthropic',
                apiKey: 'sk-ant-test-key',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(minimalConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should throw error for missing Anthropic API key', () => {
            const invalidConfig = {
                provider: 'anthropic',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
        });
        (0, vitest_1.it)('should throw error for empty Anthropic API key', () => {
            const invalidConfig = {
                provider: 'anthropic',
                apiKey: '',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
        });
        (0, vitest_1.it)('should validate Anthropic with custom headers', () => {
            const configWithHeaders = {
                provider: 'anthropic',
                apiKey: 'sk-ant-test-key',
                customHeaders: {
                    'Custom-Header': 'test-value',
                    'Another-Header': 'another-value',
                },
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(configWithHeaders)).not.toThrow();
        });
        (0, vitest_1.it)('should validate Anthropic with prompt caching enabled', () => {
            const configWithCaching = {
                provider: 'anthropic',
                apiKey: 'sk-ant-test-key',
                enablePromptCaching: true,
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(configWithCaching)).not.toThrow();
        });
    });
    (0, vitest_1.describe)('VertexAI Configuration Validation', () => {
        (0, vitest_1.it)('should validate valid VertexAI configuration', () => {
            const validConfig = {
                provider: 'vertexai',
                projectId: 'test-project-123',
                location: 'us-central1',
                classificationModel: 'gemini-1.5-flash-002',
                extractionModel: 'gemini-1.5-pro-002',
                temperature: 0.1,
                maxTokens: 2000,
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(validConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should validate minimal VertexAI configuration', () => {
            const minimalConfig = {
                provider: 'vertexai',
                projectId: 'test-project',
                location: 'us-central1',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(minimalConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should throw error for missing VertexAI project ID', () => {
            const invalidConfig = {
                provider: 'vertexai',
                location: 'us-central1',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
        });
        (0, vitest_1.it)('should throw error for missing VertexAI location', () => {
            const invalidConfig = {
                provider: 'vertexai',
                projectId: 'test-project',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
        });
        (0, vitest_1.it)('should throw error for empty VertexAI project ID', () => {
            const invalidConfig = {
                provider: 'vertexai',
                projectId: '',
                location: 'us-central1',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
        });
        (0, vitest_1.it)('should validate VertexAI with authentication options', () => {
            const configWithAuth = {
                provider: 'vertexai',
                projectId: 'test-project',
                location: 'us-central1',
                authOptions: {
                    credentials: {
                        client_email: 'test@example.com',
                        private_key: 'test-private-key',
                    },
                },
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(configWithAuth)).not.toThrow();
        });
        (0, vitest_1.it)('should validate VertexAI with context caching enabled', () => {
            const configWithCaching = {
                provider: 'vertexai',
                projectId: 'test-project',
                location: 'us-central1',
                contextCaching: {
                    cachedContentId: 'cache-123',
                    ttlSeconds: 3600,
                },
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(configWithCaching)).not.toThrow();
        });
    });
    (0, vitest_1.describe)('Ollama Configuration Validation', () => {
        (0, vitest_1.it)('should validate valid Ollama configuration', () => {
            const validConfig = {
                provider: 'ollama',
                baseUrl: 'http://localhost:11434',
                classificationModel: 'llama3.1:8b',
                extractionModel: 'llama3.1:70b',
                temperature: 0.1,
                maxTokens: 2000,
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(validConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should validate minimal Ollama configuration with default URL', () => {
            const minimalConfig = {
                provider: 'ollama',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(minimalConfig)).not.toThrow();
        });
        (0, vitest_1.it)('should validate Ollama with custom base URL', () => {
            const configWithCustomURL = {
                provider: 'ollama',
                baseUrl: 'http://custom-ollama-server:11434',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(configWithCustomURL)).not.toThrow();
        });
        (0, vitest_1.it)('should throw error for invalid Ollama base URL', () => {
            const invalidConfig = {
                provider: 'ollama',
                baseUrl: 'invalid-url',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
        });
        (0, vitest_1.it)('should validate Ollama with performance options', () => {
            const configWithPerformance = {
                provider: 'ollama',
                baseUrl: 'http://localhost:11434',
                requestOptions: {
                    numGpu: 1,
                    numThread: 8,
                    useMmap: true,
                },
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(configWithPerformance)).not.toThrow();
        });
        (0, vitest_1.it)('should validate Ollama with multimodal support', () => {
            const configWithMultimodal = {
                provider: 'ollama',
                baseUrl: 'http://localhost:11434',
                enableMultimodal: true,
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(configWithMultimodal)).not.toThrow();
        });
    });
    (0, vitest_1.describe)('General Configuration Validation', () => {
        (0, vitest_1.it)('should throw error for unknown provider', () => {
            const invalidConfig = {
                provider: 'unknown-provider',
                apiKey: 'test-key',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
        });
        (0, vitest_1.it)('should throw error for missing provider field', () => {
            const invalidConfig = {
                apiKey: 'test-key',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
        });
        (0, vitest_1.it)('should validate temperature range for all providers', () => {
            const providers = ['openai', 'anthropic', 'vertexai', 'ollama'];
            for (const provider of providers) {
                let baseConfig;
                switch (provider) {
                    case 'openai':
                        baseConfig = { provider, apiKey: 'sk-test' };
                        break;
                    case 'anthropic':
                        baseConfig = { provider, apiKey: 'sk-ant-test' };
                        break;
                    case 'vertexai':
                        baseConfig = { provider, projectId: 'test', location: 'us-central1' };
                        break;
                    case 'ollama':
                        baseConfig = { provider };
                        break;
                }
                // Valid temperature
                const validConfig = { ...baseConfig, temperature: 0.5 };
                (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(validConfig)).not.toThrow();
                // Invalid temperature (too low)
                const invalidLowConfig = { ...baseConfig, temperature: -0.1 };
                (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidLowConfig)).toThrow(types_1.ConfigurationError);
                // Invalid temperature (too high)
                const invalidHighConfig = { ...baseConfig, temperature: 2.1 };
                (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidHighConfig)).toThrow(types_1.ConfigurationError);
            }
        });
        (0, vitest_1.it)('should validate max tokens for all providers', () => {
            const providers = ['openai', 'anthropic', 'vertexai', 'ollama'];
            for (const provider of providers) {
                let baseConfig;
                switch (provider) {
                    case 'openai':
                        baseConfig = { provider, apiKey: 'sk-test' };
                        break;
                    case 'anthropic':
                        baseConfig = { provider, apiKey: 'sk-ant-test' };
                        break;
                    case 'vertexai':
                        baseConfig = { provider, projectId: 'test', location: 'us-central1' };
                        break;
                    case 'ollama':
                        baseConfig = { provider };
                        break;
                }
                // Valid max tokens
                const validConfig = { ...baseConfig, maxTokens: 1000 };
                (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(validConfig)).not.toThrow();
                // Invalid max tokens (too low)
                const invalidConfig = { ...baseConfig, maxTokens: 0 };
                (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(types_1.ConfigurationError);
            }
        });
        (0, vitest_1.it)('should validate model names when provided', () => {
            const configs = [
                {
                    provider: 'openai',
                    apiKey: 'sk-test',
                    classificationModel: 'gpt-3.5-turbo',
                    extractionModel: 'gpt-4o',
                },
                {
                    provider: 'anthropic',
                    apiKey: 'sk-ant-test',
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
                    classificationModel: 'llama3.1:8b',
                    extractionModel: 'llama3.1:70b',
                },
            ];
            for (const config of configs) {
                (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(config)).not.toThrow();
            }
        });
    });
    (0, vitest_1.describe)('Error Messages', () => {
        (0, vitest_1.it)('should provide helpful error messages', () => {
            const invalidConfig = {
                provider: 'openai',
                apiKey: '',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringContaining('API key'),
            }));
        });
        (0, vitest_1.it)('should include provider context in error messages', () => {
            const invalidConfig = {
                provider: 'vertexai',
                projectId: '',
                location: 'us-central1',
            };
            (0, vitest_1.expect)(() => config_validator_1.ConfigValidator.validateProviderConfig(invalidConfig)).toThrow(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringContaining('project'),
            }));
        });
    });
});
