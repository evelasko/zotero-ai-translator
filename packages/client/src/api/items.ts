/**
 * Items API implementation for the Zotero Web API client
 */

import { ZoteroHttpClient, ZoteroResponse, PaginationInfo } from '../core/http';
import { ZoteroItem, ZoteroItemData, ZoteroItemSchema } from '@zotero-suite/schema-types';

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
  failed: Record<number, { code: number; message: string }>;
  
  /**
   * Success mapping
   */
  success: Record<number, string>;
}

export class ItemsAPI {
  constructor(private readonly httpClient: ZoteroHttpClient) {}

  /**
   * Get all items in a library
   */
  async getAll(
    libraryType: 'user' | 'group',
    libraryId: number,
    params: ItemsQueryParams = {}
  ): Promise<ZoteroResponse<ZoteroItem[]> & { pagination: PaginationInfo }> {
    const endpoint = `/${libraryType}s/${libraryId}/items`;
    
    const response = await this.httpClient.get<ZoteroItem[]>(endpoint, { params: params as Record<string, unknown> });
    
    // Validate response data
    if (Array.isArray(response.data)) {
      response.data.forEach(item => {
        try {
          ZoteroItemSchema.parse(item);
        } catch {
          // Invalid item data received
        }
      });
    }
    
    return {
      ...response,
      pagination: this.httpClient.extractPaginationInfo(response.response),
    };
  }

  /**
   * Get a specific item by key
   */
  async get(
    libraryType: 'user' | 'group',
    libraryId: number,
    itemKey: string,
    params: Pick<ItemsQueryParams, 'format' | 'include' | 'includeFields'> = {}
  ): Promise<ZoteroResponse<ZoteroItem>> {
    const endpoint = `/${libraryType}s/${libraryId}/items/${itemKey}`;
    
    const response = await this.httpClient.get<ZoteroItem>(endpoint, { params: params as Record<string, unknown> });
    
    // Validate response data
    try {
      ZoteroItemSchema.parse(response.data);
    } catch {
      // Invalid item data received
    }
    
    return response;
  }

  /**
   * Create new items
   */
  async create(
    libraryType: 'user' | 'group',
    libraryId: number,
    items: ZoteroItemData[]
  ): Promise<ZoteroResponse<ItemsBatchResponse>> {
    const endpoint = `/${libraryType}s/${libraryId}/items`;
    
    // Validate items before sending
    items.forEach(item => {
      try {
        // Basic validation - you might want to use a more specific schema
        if (!item.itemType) {
          throw new Error('Item type is required');
        }
      } catch (error) {
        throw new Error(`Invalid item data: ${error}`);
      }
    });
    
    return this.httpClient.post<ItemsBatchResponse>(endpoint, items);
  }

  /**
   * Update an existing item
   */
  async update(
    libraryType: 'user' | 'group',
    libraryId: number,
    itemKey: string,
    itemData: ZoteroItemData,
    headers: Record<string, string> = {}
  ): Promise<ZoteroResponse<ZoteroItem>> {
    const endpoint = `/${libraryType}s/${libraryId}/items/${itemKey}`;
    
    // Include version header for conflict detection
    const requestHeaders = {
      ...headers,
    };
    
    // If version is provided, include it in the If-Unmodified-Since-Version header
    if (itemData.version) {
      requestHeaders['If-Unmodified-Since-Version'] = String(itemData.version);
    }
    
    const response = await this.httpClient.put<ZoteroItem>(endpoint, itemData, { headers: requestHeaders });
    
    // Validate response data
    try {
      ZoteroItemSchema.parse(response.data);
    } catch {
      // Invalid item data received
    }
    
    return response;
  }

  /**
   * Update multiple items
   */
  async updateMultiple(
    libraryType: 'user' | 'group',
    libraryId: number,
    items: ZoteroItemData[]
  ): Promise<ZoteroResponse<ItemsBatchResponse>> {
    const endpoint = `/${libraryType}s/${libraryId}/items`;
    
    // Validate items before sending
    items.forEach(item => {
      if (!item.key) {
        throw new Error('Item key is required for updates');
      }
      if (!item.version) {
        throw new Error('Item version is required for updates');
      }
    });
    
    return this.httpClient.patch<ItemsBatchResponse>(endpoint, items);
  }

  /**
   * Delete an item
   */
  async delete(
    libraryType: 'user' | 'group',
    libraryId: number,
    itemKey: string,
    version?: number
  ): Promise<ZoteroResponse<void>> {
    const endpoint = `/${libraryType}s/${libraryId}/items/${itemKey}`;
    
    const headers: Record<string, string> = {};
    
    // Include version header for conflict detection
    if (version) {
      headers['If-Unmodified-Since-Version'] = String(version);
    }
    
    return this.httpClient.delete<void>(endpoint, { headers });
  }

  /**
   * Delete multiple items
   */
  async deleteMultiple(
    libraryType: 'user' | 'group',
    libraryId: number,
    items: Array<{ key: string; version?: number }>
  ): Promise<ZoteroResponse<void>> {
    const endpoint = `/${libraryType}s/${libraryId}/items`;
    
    const itemKeys = items.map(item => item.key);
    const queryParams = {
      itemKey: itemKeys.join(','),
    };
    
    // If all items have versions, include them in the header
    const versions = items.map(item => item.version).filter(Boolean);
    const headers: Record<string, string> = {};
    
    if (versions.length === items.length) {
      headers['If-Unmodified-Since-Version'] = versions.join(',');
    }
    
    return this.httpClient.delete<void>(endpoint, { params: queryParams, headers });
  }

  /**
   * Get item children (attachments, notes)
   */
  async getChildren(
    libraryType: 'user' | 'group',
    libraryId: number,
    itemKey: string,
    params: Pick<ItemsQueryParams, 'format' | 'include' | 'includeFields' | 'start' | 'limit'> = {}
  ): Promise<ZoteroResponse<ZoteroItem[]> & { pagination: PaginationInfo }> {
    const endpoint = `/${libraryType}s/${libraryId}/items/${itemKey}/children`;
    
    const response = await this.httpClient.get<ZoteroItem[]>(endpoint, { params: params as Record<string, unknown> });
    
    return {
      ...response,
      pagination: this.httpClient.extractPaginationInfo(response.response),
    };
  }

  /**
   * Get items in trash
   */
  async getTrash(
    libraryType: 'user' | 'group',
    libraryId: number,
    params: Pick<ItemsQueryParams, 'format' | 'include' | 'includeFields' | 'start' | 'limit' | 'sort' | 'direction'> = {}
  ): Promise<ZoteroResponse<ZoteroItem[]> & { pagination: PaginationInfo }> {
    const endpoint = `/${libraryType}s/${libraryId}/items/trash`;
    
    const response = await this.httpClient.get<ZoteroItem[]>(endpoint, { params: params as Record<string, unknown> });
    
    return {
      ...response,
      pagination: this.httpClient.extractPaginationInfo(response.response),
    };
  }

  /**
   * Get top-level items (items without parents)
   */
  async getTop(
    libraryType: 'user' | 'group',
    libraryId: number,
    params: ItemsQueryParams = {}
  ): Promise<ZoteroResponse<ZoteroItem[]> & { pagination: PaginationInfo }> {
    const endpoint = `/${libraryType}s/${libraryId}/items/top`;
    
    const response = await this.httpClient.get<ZoteroItem[]>(endpoint, { params: params as Record<string, unknown> });
    
    return {
      ...response,
      pagination: this.httpClient.extractPaginationInfo(response.response),
    };
  }
}