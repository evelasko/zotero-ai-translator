/**
 * Zod schema generator for Zotero schema
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
     * Generate base Zod schemas
     */
    private generateBaseSchemas;
    /**
     * Generate item-specific Zod schemas
     */
    private generateItemSchemas;
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
     * Check if a field is a base field that shouldn't be repeated
     */
    private isBaseField;
    /**
     * Capitalize first letter of a string
     */
    private capitalizeFirstLetter;
}
//# sourceMappingURL=zod-generator.d.ts.map