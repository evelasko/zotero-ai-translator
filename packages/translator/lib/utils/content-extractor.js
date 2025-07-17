"use strict";
/**
 * Content extraction utilities - Browser-compatible version for Electron renderer environments
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentExtractor = void 0;
// Export the browser-compatible content extractor as the main extractor
var browser_content_extractor_1 = require("./browser-content-extractor");
Object.defineProperty(exports, "ContentExtractor", { enumerable: true, get: function () { return browser_content_extractor_1.BrowserContentExtractor; } });
