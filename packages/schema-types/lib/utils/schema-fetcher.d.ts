/**
 * Schema fetcher utility for retrieving and caching Zotero schema
 */
export interface ZoteroSchema {
    version: string;
    itemTypes: ZoteroItemType[];
    meta: {
        [key: string]: any;
    };
}
export interface ZoteroItemType {
    itemType: string;
    fields?: ZoteroField[];
    creatorTypes?: ZoteroCreatorType[];
}
export interface ZoteroField {
    field?: string;
    baseField?: string;
}
export interface ZoteroCreatorType {
    creatorType: string;
    primary?: boolean;
}
export declare class SchemaFetcher {
    private cachePath;
    constructor(cacheDir?: string);
    /**
     * Fetch schema from Zotero API or use cached version
     */
    fetchSchema(): Promise<ZoteroSchema>;
    /**
     * Load cached schema if available
     */
    private loadCachedSchema;
    /**
     * Cache schema to disk
     */
    private cacheSchema;
    /**
     * Get cache file path
     */
    getCachePath(): string;
}
//# sourceMappingURL=schema-fetcher.d.ts.map