"use strict";
/**
 * Main entry point for the Zotero AI Translator package
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.AIService = exports.ContentExtractor = exports.BrowserContentExtractor = exports.UrlFetchError = exports.TranslatorError = exports.PdfParseError = exports.ContentExtractionError = exports.ConfigurationError = exports.AIValidationError = exports.AIExtractionError = exports.AIClassificationError = exports.ConfigValidator = exports.AnthropicClient = exports.Translator = void 0;
// Export the main Translator class
var translator_1 = require("./core/translator");
Object.defineProperty(exports, "Translator", { enumerable: true, get: function () { return translator_1.Translator; } });
// Export Anthropic client
var anthropic_client_1 = require("./core/anthropic-client");
Object.defineProperty(exports, "AnthropicClient", { enumerable: true, get: function () { return anthropic_client_1.AnthropicClient; } });
// Export config validator
var config_validator_1 = require("./core/config-validator");
Object.defineProperty(exports, "ConfigValidator", { enumerable: true, get: function () { return config_validator_1.ConfigValidator; } });
// Export error classes
var types_1 = require("./types");
Object.defineProperty(exports, "AIClassificationError", { enumerable: true, get: function () { return types_1.AIClassificationError; } });
Object.defineProperty(exports, "AIExtractionError", { enumerable: true, get: function () { return types_1.AIExtractionError; } });
Object.defineProperty(exports, "AIValidationError", { enumerable: true, get: function () { return types_1.AIValidationError; } });
Object.defineProperty(exports, "ConfigurationError", { enumerable: true, get: function () { return types_1.ConfigurationError; } });
Object.defineProperty(exports, "ContentExtractionError", { enumerable: true, get: function () { return types_1.ContentExtractionError; } });
Object.defineProperty(exports, "PdfParseError", { enumerable: true, get: function () { return types_1.PdfParseError; } });
Object.defineProperty(exports, "TranslatorError", { enumerable: true, get: function () { return types_1.TranslatorError; } });
Object.defineProperty(exports, "UrlFetchError", { enumerable: true, get: function () { return types_1.UrlFetchError; } });
// Export content extraction utilities (browser-compatible)
var browser_content_extractor_1 = require("./utils/browser-content-extractor");
Object.defineProperty(exports, "BrowserContentExtractor", { enumerable: true, get: function () { return browser_content_extractor_1.BrowserContentExtractor; } });
var browser_content_extractor_2 = require("./utils/browser-content-extractor"); // Alias for backward compatibility
Object.defineProperty(exports, "ContentExtractor", { enumerable: true, get: function () { return browser_content_extractor_2.BrowserContentExtractor; } });
// Export AI service
var ai_service_1 = require("./core/ai-service");
Object.defineProperty(exports, "AIService", { enumerable: true, get: function () { return ai_service_1.AIService; } });
// Default export for convenience
var translator_2 = require("./core/translator");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return translator_2.Translator; } });
