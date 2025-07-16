/**
 * zotero-schema-types
 *
 * The foundational package that ingests the official Zotero schema.json
 * to generate and export Zod schemas and derived TypeScript types.
 */
export * from './types';
export * from './schemas';
export { SchemaFetcher, ZoteroSchema } from './utils/schema-fetcher';
export { TypeGenerator } from './generators/type-generator';
export { ZodGenerator } from './generators/zod-generator';
/**
 * Main class for schema processing and type generation
 */
export declare class ZoteroSchemaProcessor {
    private fetcher;
    private outputDir;
    constructor(outputDir?: string);
    /**
     * Process schema and generate types and schemas
     */
    processSchema(): Promise<void>;
    /**
     * Generate TypeScript types
     */
    private generateTypes;
    /**
     * Generate Zod schemas
     */
    private generateSchemas;
    /**
     * Ensure directory exists
     */
    private ensureDirectoryExists;
}
/**
 * Default export for convenience
 */
export default ZoteroSchemaProcessor;
//# sourceMappingURL=index.d.ts.map