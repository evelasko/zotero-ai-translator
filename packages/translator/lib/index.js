"use strict";
/**
 * Main entry point for the Zotero AI Translator package
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.ContentExtractor = exports.ConfigurationError = exports.PdfParseError = exports.UrlFetchError = exports.ContentExtractionError = exports.TranslatorError = exports.Translator = void 0;
// Export the main Translator class
var translator_1 = require("./core/translator");
Object.defineProperty(exports, "Translator", { enumerable: true, get: function () { return translator_1.Translator; } });
// Export all types and interfaces
var types_1 = require("./types");
Object.defineProperty(exports, "TranslatorError", { enumerable: true, get: function () { return types_1.TranslatorError; } });
Object.defineProperty(exports, "ContentExtractionError", { enumerable: true, get: function () { return types_1.ContentExtractionError; } });
Object.defineProperty(exports, "UrlFetchError", { enumerable: true, get: function () { return types_1.UrlFetchError; } });
Object.defineProperty(exports, "PdfParseError", { enumerable: true, get: function () { return types_1.PdfParseError; } });
Object.defineProperty(exports, "ConfigurationError", { enumerable: true, get: function () { return types_1.ConfigurationError; } });
// Export content extraction utilities
var content_extractor_1 = require("./utils/content-extractor");
Object.defineProperty(exports, "ContentExtractor", { enumerable: true, get: function () { return content_extractor_1.ContentExtractor; } });
// Default export for convenience
var translator_2 = require("./core/translator");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return translator_2.Translator; } });
