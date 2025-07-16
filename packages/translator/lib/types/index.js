"use strict";
/**
 * Type definitions for the Zotero AI Translator package
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIValidationError = exports.AIExtractionError = exports.AIClassificationError = exports.PdfParseError = exports.UrlFetchError = exports.ContentExtractionError = exports.ConfigurationError = exports.TranslatorError = void 0;
/**
 * Base error class for all translator errors
 */
class TranslatorError extends Error {
    code;
    cause;
    constructor(message, code = 'TRANSLATOR_ERROR', cause) {
        super(message);
        this.name = 'TranslatorError';
        this.code = code;
        this.cause = cause;
    }
}
exports.TranslatorError = TranslatorError;
/**
 * Configuration validation error
 */
class ConfigurationError extends TranslatorError {
    constructor(message, cause) {
        super(message, 'CONFIGURATION_ERROR', cause);
        this.name = 'ConfigurationError';
    }
}
exports.ConfigurationError = ConfigurationError;
/**
 * Content extraction error
 */
class ContentExtractionError extends TranslatorError {
    constructor(message, cause) {
        super(message, 'CONTENT_EXTRACTION_ERROR', cause);
        this.name = 'ContentExtractionError';
    }
}
exports.ContentExtractionError = ContentExtractionError;
/**
 * URL fetch error
 */
class UrlFetchError extends TranslatorError {
    statusCode;
    constructor(message, statusCode, cause) {
        super(message, 'URL_FETCH_ERROR', cause);
        this.name = 'UrlFetchError';
        this.statusCode = statusCode;
    }
}
exports.UrlFetchError = UrlFetchError;
/**
 * PDF parsing error
 */
class PdfParseError extends TranslatorError {
    constructor(message, cause) {
        super(message, 'PDF_PARSE_ERROR', cause);
        this.name = 'PdfParseError';
    }
}
exports.PdfParseError = PdfParseError;
/**
 * AI classification error
 */
class AIClassificationError extends TranslatorError {
    constructor(message, cause) {
        super(message, 'AI_CLASSIFICATION_ERROR', cause);
        this.name = 'AIClassificationError';
    }
}
exports.AIClassificationError = AIClassificationError;
/**
 * AI extraction error
 */
class AIExtractionError extends TranslatorError {
    constructor(message, cause) {
        super(message, 'AI_EXTRACTION_ERROR', cause);
        this.name = 'AIExtractionError';
    }
}
exports.AIExtractionError = AIExtractionError;
/**
 * AI validation error
 */
class AIValidationError extends TranslatorError {
    constructor(message, cause) {
        super(message, 'AI_VALIDATION_ERROR', cause);
        this.name = 'AIValidationError';
    }
}
exports.AIValidationError = AIValidationError;
