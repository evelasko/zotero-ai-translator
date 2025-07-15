/**
 * TypeScript type generator for Zotero schema
 */
import { ZoteroSchema } from '../utils/schema-fetcher';
export declare class TypeGenerator {
    private schema;
    constructor(schema: ZoteroSchema);
    /**
     * Generate all TypeScript types from the schema
     */
    generateTypes(): string;
    /**
     * Generate base TypeScript types
     */
    private generateBaseTypes;
    /**
     * Generate item-specific TypeScript types
     */
    private generateItemTypes;
    /**
     * Generate collection TypeScript types
     */
    private generateCollectionTypes;
    /**
     * Generate search TypeScript types
     */
    private generateSearchTypes;
    /**
     * Generate library TypeScript types
     */
    private generateLibraryTypes;
    /**
     * Capitalize first letter of a string
     */
    private capitalizeFirstLetter;
}
//# sourceMappingURL=type-generator.d.ts.map