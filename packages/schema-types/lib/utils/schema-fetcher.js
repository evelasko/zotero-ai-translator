"use strict";
/**
 * Schema fetcher utility for retrieving and caching Zotero schema
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
exports.SchemaFetcher = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const SCHEMA_URL = 'https://api.zotero.org/schema';
const CACHE_FILE = 'zotero-schema-cache.json';
class SchemaFetcher {
    constructor(cacheDir = process.cwd()) {
        Object.defineProperty(this, "cachePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cachePath = path.join(cacheDir, CACHE_FILE);
    }
    /**
     * Fetch schema from Zotero API or use cached version
     */
    async fetchSchema() {
        console.log('Fetching Zotero schema...');
        try {
            const response = await fetch(SCHEMA_URL, {
                headers: {
                    'Accept-Encoding': 'gzip',
                    'User-Agent': 'zotero-suite/schema-types@1.0.0'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const schema = await response.json();
            console.log(`Schema version: ${schema.version}`);
            // Cache the schema
            this.cacheSchema(schema);
            return schema;
        }
        catch (error) {
            console.error('Failed to fetch schema:', error);
            // Try to use cached schema as fallback
            const cachedSchema = this.loadCachedSchema();
            if (cachedSchema) {
                console.log('Using cached schema as fallback...');
                return cachedSchema;
            }
            throw error;
        }
    }
    /**
     * Load cached schema if available
     */
    loadCachedSchema() {
        try {
            if (fs.existsSync(this.cachePath)) {
                const cachedData = fs.readFileSync(this.cachePath, 'utf8');
                return JSON.parse(cachedData);
            }
        }
        catch (error) {
            console.warn('Failed to load cached schema:', error);
        }
        return null;
    }
    /**
     * Cache schema to disk
     */
    cacheSchema(schema) {
        try {
            fs.writeFileSync(this.cachePath, JSON.stringify(schema, null, 2));
            console.log('Schema cached successfully');
        }
        catch (error) {
            console.warn('Failed to cache schema:', error);
        }
    }
    /**
     * Get cache file path
     */
    getCachePath() {
        return this.cachePath;
    }
}
exports.SchemaFetcher = SchemaFetcher;
//# sourceMappingURL=schema-fetcher.js.map