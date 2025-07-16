/**
 * Collections API implementation for the Zotero Web API client
 */
import { ZoteroHttpClient, ZoteroResponse, PaginationInfo } from '../core/http';
import { ZoteroCollection, ZoteroCollectionData } from 'zotero-schema-types';
export interface CollectionsQueryParams {
    /**
     * Return collections since the given library version
     */
    since?: number;
    /**
     * Sort collections by field
     */
    sort?: 'dateAdded' | 'dateModified' | 'title';
    /**
     * Sort direction
     */
    direction?: 'asc' | 'desc';
    /**
     * Return a specific range of collections
     */
    start?: number;
    /**
     * Number of collections to return
     */
    limit?: number;
    /**
     * Format for the response
     */
    format?: 'json' | 'atom';
    /**
     * Include additional data in the response
     */
    include?: ('data')[];
}
export interface CollectionsBatchResponse {
    /**
     * Collections that were successfully created/updated
     */
    successful: Record<number, ZoteroCollection>;
    /**
     * Collections that were unchanged
     */
    unchanged: Record<number, string>;
    /**
     * Collections that failed to be created/updated
     */
    failed: Record<number, {
        code: number;
        message: string;
    }>;
    /**
     * Success mapping
     */
    success: Record<number, string>;
}
export declare class CollectionsAPI {
    private readonly httpClient;
    constructor(httpClient: ZoteroHttpClient);
    /**
     * Get all collections in a library
     */
    getAll(libraryType: 'user' | 'group', libraryId: number, params?: CollectionsQueryParams): Promise<ZoteroResponse<ZoteroCollection[]> & {
        pagination: PaginationInfo;
    }>;
    /**
     * Get a specific collection by key
     */
    get(libraryType: 'user' | 'group', libraryId: number, collectionKey: string, params?: Pick<CollectionsQueryParams, 'format' | 'include'>): Promise<ZoteroResponse<ZoteroCollection>>;
    /**
     * Create new collections
     */
    create(libraryType: 'user' | 'group', libraryId: number, collections: ZoteroCollectionData[]): Promise<ZoteroResponse<CollectionsBatchResponse>>;
    /**
     * Update an existing collection
     */
    update(libraryType: 'user' | 'group', libraryId: number, collectionKey: string, collectionData: ZoteroCollectionData, headers?: Record<string, string>): Promise<ZoteroResponse<ZoteroCollection>>;
    /**
     * Update multiple collections
     */
    updateMultiple(libraryType: 'user' | 'group', libraryId: number, collections: ZoteroCollectionData[]): Promise<ZoteroResponse<CollectionsBatchResponse>>;
    /**
     * Delete a collection
     */
    delete(libraryType: 'user' | 'group', libraryId: number, collectionKey: string, version?: number): Promise<ZoteroResponse<void>>;
    /**
     * Delete multiple collections
     */
    deleteMultiple(libraryType: 'user' | 'group', libraryId: number, collections: Array<{
        key: string;
        version?: number;
    }>): Promise<ZoteroResponse<void>>;
    /**
     * Get subcollections of a collection
     */
    getSubcollections(libraryType: 'user' | 'group', libraryId: number, collectionKey: string, params?: Pick<CollectionsQueryParams, 'format' | 'include' | 'start' | 'limit'>): Promise<ZoteroResponse<ZoteroCollection[]> & {
        pagination: PaginationInfo;
    }>;
    /**
     * Get items in a collection
     */
    getItems(libraryType: 'user' | 'group', libraryId: number, collectionKey: string, params?: {
        format?: 'json' | 'atom' | 'bib' | 'ris' | 'bibtex' | 'bookmarks' | 'coins' | 'csljson' | 'mods' | 'refer' | 'rdf_bibliontology' | 'rdf_dc' | 'rdf_zotero' | 'tei';
        include?: ('bib' | 'data' | 'csljson')[];
        start?: number;
        limit?: number;
        sort?: 'dateAdded' | 'dateModified' | 'title' | 'creator' | 'itemType' | 'date' | 'publisher' | 'publicationTitle' | 'journalAbbreviation' | 'language' | 'accessDate' | 'libraryCatalog' | 'callNumber' | 'rights' | 'addedBy' | 'numItems';
        direction?: 'asc' | 'desc';
    }): Promise<ZoteroResponse<unknown[]> & {
        pagination: PaginationInfo;
    }>;
    /**
     * Get top-level collections (collections without parents)
     */
    getTop(libraryType: 'user' | 'group', libraryId: number, params?: CollectionsQueryParams): Promise<ZoteroResponse<ZoteroCollection[]> & {
        pagination: PaginationInfo;
    }>;
}
//# sourceMappingURL=collections.d.ts.map