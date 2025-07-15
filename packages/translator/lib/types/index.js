"use strict";
/**
 * Type definitions for the Zotero AI Translator package
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationError = exports.PdfParseError = exports.UrlFetchError = exports.ContentExtractionError = exports.TranslatorError = void 0;
/**
 * Error types specific to the translator
 */
class TranslatorError extends Error {
    code;
    cause;
    constructor(message, code, cause) {
        super(message);
        this.code = code;
        this.cause = cause;
        this.name = 'TranslatorError';
    }
}
exports.TranslatorError = TranslatorError;
/**
 * Content extraction errors
 */
class ContentExtractionError extends TranslatorError {
    constructor(message, cause) {
        super(message, 'CONTENT_EXTRACTION_ERROR', cause);
        this.name = 'ContentExtractionError';
    }
}
exports.ContentExtractionError = ContentExtractionError;
/**
 * URL fetch errors
 */
class UrlFetchError extends TranslatorError {
    constructor(message, cause) {
        super(message, 'URL_FETCH_ERROR', cause);
        this.name = 'UrlFetchError';
    }
}
exports.UrlFetchError = UrlFetchError;
/**
 * PDF parsing errors
 */
class PdfParseError extends TranslatorError {
    constructor(message, cause) {
        super(message, 'PDF_PARSE_ERROR', cause);
        this.name = 'PdfParseError';
    }
}
exports.PdfParseError = PdfParseError;
/**
 * Configuration validation errors
 */
class ConfigurationError extends TranslatorError {
    constructor(message) {
        super(message, 'CONFIGURATION_ERROR');
        this.name = 'ConfigurationError';
    }
}
exports.ConfigurationError = ConfigurationError;
