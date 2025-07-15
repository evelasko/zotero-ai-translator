/**
 * TypeScript type generator for Zotero schema
 * Generates comprehensive types based on the official Zotero API schema
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
     * Generate utility types
     */
    private generateUtilityTypes;
    /**
     * Generate field types from schema
     */
    private generateFieldTypes;
    /**
     * Generate creator types from schema
     */
    private generateCreatorTypes;
    /**
     * Generate item type definitions
     */
    private generateItemTypeDefinitions;
    /**
     * Generate base types
     */
    private generateBaseTypes;
    /**
     * Generate specific item types (Note, Attachment, Annotation)
     */
    private generateSpecificItemTypes;
    /**
     * Generate API types
     */
    private generateAPITypes;
    /**
     * Generate template types for API responses
     */
    private generateTemplateTypes;
    /**
     * Generate collection types
     */
    private generateCollectionTypes;
    /**
     * Generate search types
     */
    private generateSearchTypes;
    /**
     * Generate library and user types
     */
    private generateLibraryTypes;
    /**
     * Generate sync types
     */
    private generateSyncTypes;
    /**
     * Generate content types for fulltext, highlights, etc.
     */
    private generateContentTypes;
    /**
     * Capitalize first letter of a string
     */
    private capitalizeFirstLetter;
}
//# sourceMappingURL=type-generator.d.ts.map