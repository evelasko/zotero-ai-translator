"use strict";
/**
 * @zotero-suite/schema-types
 *
 * The foundational package that ingests the official Zotero schema.json
 * to generate and export Zod schemas and derived TypeScript types.
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoteroSchemaProcessor = exports.ZodGenerator = exports.TypeGenerator = exports.SchemaFetcher = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const schema_fetcher_1 = require("./utils/schema-fetcher");
const type_generator_1 = require("./generators/type-generator");
const zod_generator_1 = require("./generators/zod-generator");
// Generated types will be exported from here after generation
__exportStar(require("./types"), exports);
__exportStar(require("./schemas"), exports);
// Utility exports
var schema_fetcher_2 = require("./utils/schema-fetcher");
Object.defineProperty(exports, "SchemaFetcher", { enumerable: true, get: function () { return schema_fetcher_2.SchemaFetcher; } });
var type_generator_2 = require("./generators/type-generator");
Object.defineProperty(exports, "TypeGenerator", { enumerable: true, get: function () { return type_generator_2.TypeGenerator; } });
var zod_generator_2 = require("./generators/zod-generator");
Object.defineProperty(exports, "ZodGenerator", { enumerable: true, get: function () { return zod_generator_2.ZodGenerator; } });
/**
 * Main class for schema processing and type generation
 */
class ZoteroSchemaProcessor {
    constructor(outputDir = __dirname) {
        Object.defineProperty(this, "fetcher", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputDir", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.fetcher = new schema_fetcher_1.SchemaFetcher();
        this.outputDir = outputDir;
    }
    /**
     * Process schema and generate types and schemas
     */
    async processSchema() {
        console.log('Starting Zotero schema processing...');
        try {
            // Fetch the schema
            const schema = await this.fetcher.fetchSchema();
            // Generate types
            await this.generateTypes(schema);
            // Generate schemas
            await this.generateSchemas(schema);
            console.log('Schema processing completed successfully!');
        }
        catch (error) {
            console.error('Schema processing failed:', error);
            throw error;
        }
    }
    /**
     * Generate TypeScript types
     */
    async generateTypes(schema) {
        console.log('Generating TypeScript types...');
        const typeGenerator = new type_generator_1.TypeGenerator(schema);
        const typesContent = typeGenerator.generateTypes();
        const typesDir = path.join(this.outputDir, 'types');
        this.ensureDirectoryExists(typesDir);
        const typesFile = path.join(typesDir, 'index.ts');
        fs.writeFileSync(typesFile, typesContent);
        console.log('TypeScript types generated successfully!');
    }
    /**
     * Generate Zod schemas
     */
    async generateSchemas(schema) {
        console.log('Generating Zod schemas...');
        const zodGenerator = new zod_generator_1.ZodGenerator(schema);
        const schemasContent = zodGenerator.generateSchemas();
        const schemasDir = path.join(this.outputDir, 'schemas');
        this.ensureDirectoryExists(schemasDir);
        const schemasFile = path.join(schemasDir, 'index.ts');
        fs.writeFileSync(schemasFile, schemasContent);
        console.log('Zod schemas generated successfully!');
    }
    /**
     * Ensure directory exists
     */
    ensureDirectoryExists(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }
}
exports.ZoteroSchemaProcessor = ZoteroSchemaProcessor;
/**
 * Default export for convenience
 */
exports.default = ZoteroSchemaProcessor;
//# sourceMappingURL=index.js.map