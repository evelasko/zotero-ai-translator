/**
 * Items API implementation for the Zotero Web API client
 */
import { ZoteroHttpClient, ZoteroResponse, PaginationInfo } from '../core/http';
import { ZoteroItem, ZoteroItemData } from 'zotero-schema-types';
export interface ItemsQueryParams {
    /**
     * Return only items with the given tags
     */
    tag?: string;
    /**
     * Return only items of the given type
     */
    itemType?: string;
    /**
     * Return only items in the given collection
     */
    collection?: string;
    /**
     * Quick search for items
     */
    q?: string;
    /**
     * Return items since the given library version
     */
    since?: number;
    /**
     * Sort items by field
     */
    sort?: 'dateAdded' | 'dateModified' | 'title' | 'creator' | 'itemType' | 'date' | 'publisher' | 'publicationTitle' | 'journalAbbreviation' | 'language' | 'accessDate' | 'libraryCatalog' | 'callNumber' | 'rights' | 'addedBy' | 'numItems';
    /**
     * Sort direction
     */
    direction?: 'asc' | 'desc';
    /**
     * Return a specific range of items
     */
    start?: number;
    /**
     * Number of items to return
     */
    limit?: number;
    /**
     * Format for the response
     */
    format?: 'json' | 'atom' | 'bib' | 'ris' | 'bibtex' | 'bookmarks' | 'coins' | 'csljson' | 'mods' | 'refer' | 'rdf_bibliontology' | 'rdf_dc' | 'rdf_zotero' | 'tei';
    /**
     * Include additional data in the response
     */
    include?: ('bib' | 'data' | 'csljson')[];
    /**
     * Include only the specified fields in the response
     */
    includeFields?: string[];
}
export interface ItemsCreateData {
    /**
     * Array of item data to create
     */
    items: ZoteroItemData[];
}
export interface ItemsUpdateData {
    /**
     * Array of item data to update
     */
    items: ZoteroItemData[];
}
export interface ItemsBatchResponse {
    /**
     * Items that were successfully created/updated
     */
    successful: Record<number, ZoteroItem>;
    /**
     * Items that were unchanged
     */
    unchanged: Record<number, string>;
    /**
     * Items that failed to be created/updated
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
export declare class ItemsAPI {
    private readonly httpClient;
    constructor(httpClient: ZoteroHttpClient);
    /**
     * Get all items in a library
     */
    getAll(libraryType: 'user' | 'group', libraryId: number, params?: ItemsQueryParams): Promise<ZoteroResponse<ZoteroItem[]> & {
        pagination: PaginationInfo;
    }>;
    /**
     * Get a specific item by key
     */
    get(libraryType: 'user' | 'group', libraryId: number, itemKey: string, params?: Pick<ItemsQueryParams, 'format' | 'include' | 'includeFields'>): Promise<ZoteroResponse<ZoteroItem>>;
    /**
     * Create new items
     */
    create(libraryType: 'user' | 'group', libraryId: number, items: ZoteroItemData[]): Promise<ZoteroResponse<ItemsBatchResponse>>;
    /**
     * Update an existing item
     */
    update(libraryType: 'user' | 'group', libraryId: number, itemKey: string, itemData: ZoteroItemData, headers?: Record<string, string>): Promise<ZoteroResponse<ZoteroItem>>;
    /**
     * Update multiple items
     */
    updateMultiple(libraryType: 'user' | 'group', libraryId: number, items: ZoteroItemData[]): Promise<ZoteroResponse<ItemsBatchResponse>>;
    /**
     * Delete an item
     */
    delete(libraryType: 'user' | 'group', libraryId: number, itemKey: string, version?: number): Promise<ZoteroResponse<void>>;
    /**
     * Delete multiple items
     */
    deleteMultiple(libraryType: 'user' | 'group', libraryId: number, items: Array<{
        key: string;
        version?: number;
    }>): Promise<ZoteroResponse<void>>;
    /**
     * Get item children (attachments, notes)
     */
    getChildren(libraryType: 'user' | 'group', libraryId: number, itemKey: string, params?: Pick<ItemsQueryParams, 'format' | 'include' | 'includeFields' | 'start' | 'limit'>): Promise<ZoteroResponse<ZoteroItem[]> & {
        pagination: PaginationInfo;
    }>;
    /**
     * Get items in trash
     */
    getTrash(libraryType: 'user' | 'group', libraryId: number, params?: Pick<ItemsQueryParams, 'format' | 'include' | 'includeFields' | 'start' | 'limit' | 'sort' | 'direction'>): Promise<ZoteroResponse<ZoteroItem[]> & {
        pagination: PaginationInfo;
    }>;
    /**
     * Get top-level items (items without parents)
     */
    getTop(libraryType: 'user' | 'group', libraryId: number, params?: ItemsQueryParams): Promise<ZoteroResponse<ZoteroItem[]> & {
        pagination: PaginationInfo;
    }>;
}
//# sourceMappingURL=items.d.ts.map