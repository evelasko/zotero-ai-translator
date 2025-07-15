/**
 * Zod schema generator for Zotero schema
 * Generates comprehensive Zod schemas based on the official Zotero API schema
 */
import { ZoteroSchema } from '../utils/schema-fetcher';
export declare class ZodGenerator {
    private schema;
    constructor(schema: ZoteroSchema);
    /**
     * Generate all Zod schemas from the schema
     */
    generateSchemas(): string;
    /**
     * Generate utility Zod schemas
     */
    private generateUtilitySchemas;
    /**
     * Generate field Zod schemas from schema
     */
    private generateFieldSchemas;
    /**
     * Generate creator Zod schemas from schema
     */
    private generateCreatorSchemas;
    /**
     * Generate item type Zod schemas
     */
    private generateItemTypeSchemas;
    /**
     * Generate base Zod schemas
     */
    private generateBaseSchemas;
    /**
     * Generate specific item Zod schemas
     */
    private generateSpecificItemSchemas;
    /**
     * Generate API Zod schemas
     */
    private generateAPISchemas;
    /**
     * Generate template Zod schemas
     */
    private generateTemplateSchemas;
    /**
     * Generate collection Zod schemas
     */
    private generateCollectionSchemas;
    /**
     * Generate search Zod schemas
     */
    private generateSearchSchemas;
    /**
     * Generate library Zod schemas
     */
    private generateLibrarySchemas;
    /**
     * Generate sync Zod schemas
     */
    private generateSyncSchemas;
    /**
     * Generate content Zod schemas
     */
    private generateContentSchemas;
    /**
     * Check if a field is a base field that shouldn't be repeated
     */
    private isBaseField;
    /**
     * Capitalize first letter of a string
     */
    private capitalizeFirstLetter;
}
//# sourceMappingURL=zod-generator.d.ts.map