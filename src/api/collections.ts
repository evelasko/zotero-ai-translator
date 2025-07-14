/**
 * Collections API implementation for the Zotero Web API client
 */

import { ZoteroHttpClient, ZoteroResponse, PaginationInfo } from '../core/http.js';
import { ZoteroCollection, ZoteroCollectionData } from '../generated/types/index.js';
import { ZoteroCollectionSchema } from '../generated/schemas/index.js';

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
  failed: Record<number, { code: number; message: string }>;
  
  /**
   * Success mapping
   */
  success: Record<number, string>;
}

export class CollectionsAPI {
  constructor(private readonly httpClient: ZoteroHttpClient) {}

  /**
   * Get all collections in a library
   */
  async getAll(
    libraryType: 'user' | 'group',
    libraryId: number,
    params: CollectionsQueryParams = {}
  ): Promise<ZoteroResponse<ZoteroCollection[]> & { pagination: PaginationInfo }> {
    const endpoint = `/${libraryType}s/${libraryId}/collections`;
    
    const response = await this.httpClient.get<ZoteroCollection[]>(endpoint, { params: params as Record<string, unknown> });
    
    // Validate response data
    if (Array.isArray(response.data)) {
      response.data.forEach(collection => {
        try {
          ZoteroCollectionSchema.parse(collection);
        } catch {
          // Invalid collection data received
        }
      });
    }
    
    return {
      ...response,
      pagination: this.httpClient.extractPaginationInfo(response.response),
    };
  }

  /**
   * Get a specific collection by key
   */
  async get(
    libraryType: 'user' | 'group',
    libraryId: number,
    collectionKey: string,
    params: Pick<CollectionsQueryParams, 'format' | 'include'> = {}
  ): Promise<ZoteroResponse<ZoteroCollection>> {
    const endpoint = `/${libraryType}s/${libraryId}/collections/${collectionKey}`;
    
    const response = await this.httpClient.get<ZoteroCollection>(endpoint, { params: params as Record<string, unknown> });
    
    // Validate response data
    try {
      ZoteroCollectionSchema.parse(response.data);
    } catch {
      // Invalid collection data received
    }
    
    return response;
  }

  /**
   * Create new collections
   */
  async create(
    libraryType: 'user' | 'group',
    libraryId: number,
    collections: ZoteroCollectionData[]
  ): Promise<ZoteroResponse<CollectionsBatchResponse>> {
    const endpoint = `/${libraryType}s/${libraryId}/collections`;
    
    // Validate collections before sending
    collections.forEach(collection => {
      try {
        if (!collection.name) {
          throw new Error('Collection name is required');
        }
      } catch (error) {
        throw new Error(`Invalid collection data: ${error}`);
      }
    });
    
    return this.httpClient.post<CollectionsBatchResponse>(endpoint, collections);
  }

  /**
   * Update an existing collection
   */
  async update(
    libraryType: 'user' | 'group',
    libraryId: number,
    collectionKey: string,
    collectionData: ZoteroCollectionData,
    headers: Record<string, string> = {}
  ): Promise<ZoteroResponse<ZoteroCollection>> {
    const endpoint = `/${libraryType}s/${libraryId}/collections/${collectionKey}`;
    
    // Include version header for conflict detection
    const requestHeaders = {
      ...headers,
    };
    
    // If version is provided, include it in the If-Unmodified-Since-Version header
    if (collectionData.version) {
      requestHeaders['If-Unmodified-Since-Version'] = String(collectionData.version);
    }
    
    const response = await this.httpClient.put<ZoteroCollection>(endpoint, collectionData, { headers: requestHeaders });
    
    // Validate response data
    try {
      ZoteroCollectionSchema.parse(response.data);
    } catch {
      // Invalid collection data received
    }
    
    return response;
  }

  /**
   * Update multiple collections
   */
  async updateMultiple(
    libraryType: 'user' | 'group',
    libraryId: number,
    collections: ZoteroCollectionData[]
  ): Promise<ZoteroResponse<CollectionsBatchResponse>> {
    const endpoint = `/${libraryType}s/${libraryId}/collections`;
    
    // Validate collections before sending
    collections.forEach(collection => {
      if (!collection.key) {
        throw new Error('Collection key is required for updates');
      }
      if (!collection.version) {
        throw new Error('Collection version is required for updates');
      }
    });
    
    return this.httpClient.patch<CollectionsBatchResponse>(endpoint, collections);
  }

  /**
   * Delete a collection
   */
  async delete(
    libraryType: 'user' | 'group',
    libraryId: number,
    collectionKey: string,
    version?: number
  ): Promise<ZoteroResponse<void>> {
    const endpoint = `/${libraryType}s/${libraryId}/collections/${collectionKey}`;
    
    const headers: Record<string, string> = {};
    
    // Include version header for conflict detection
    if (version) {
      headers['If-Unmodified-Since-Version'] = String(version);
    }
    
    return this.httpClient.delete<void>(endpoint, { headers });
  }

  /**
   * Delete multiple collections
   */
  async deleteMultiple(
    libraryType: 'user' | 'group',
    libraryId: number,
    collections: Array<{ key: string; version?: number }>
  ): Promise<ZoteroResponse<void>> {
    const endpoint = `/${libraryType}s/${libraryId}/collections`;
    
    const collectionKeys = collections.map(collection => collection.key);
    const queryParams = {
      collectionKey: collectionKeys.join(','),
    };
    
    // If all collections have versions, include them in the header
    const versions = collections.map(collection => collection.version).filter(Boolean);
    const headers: Record<string, string> = {};
    
    if (versions.length === collections.length) {
      headers['If-Unmodified-Since-Version'] = versions.join(',');
    }
    
    return this.httpClient.delete<void>(endpoint, { params: queryParams, headers });
  }

  /**
   * Get subcollections of a collection
   */
  async getSubcollections(
    libraryType: 'user' | 'group',
    libraryId: number,
    collectionKey: string,
    params: Pick<CollectionsQueryParams, 'format' | 'include' | 'start' | 'limit'> = {}
  ): Promise<ZoteroResponse<ZoteroCollection[]> & { pagination: PaginationInfo }> {
    const endpoint = `/${libraryType}s/${libraryId}/collections/${collectionKey}/collections`;
    
    const response = await this.httpClient.get<ZoteroCollection[]>(endpoint, { params: params as Record<string, unknown> });
    
    return {
      ...response,
      pagination: this.httpClient.extractPaginationInfo(response.response),
    };
  }

  /**
   * Get items in a collection
   */
  async getItems(
    libraryType: 'user' | 'group',
    libraryId: number,
    collectionKey: string,
    params: {
      format?: 'json' | 'atom' | 'bib' | 'ris' | 'bibtex' | 'bookmarks' | 'coins' | 'csljson' | 'mods' | 'refer' | 'rdf_bibliontology' | 'rdf_dc' | 'rdf_zotero' | 'tei';
      include?: ('bib' | 'data' | 'csljson')[];
      start?: number;
      limit?: number;
      sort?: 'dateAdded' | 'dateModified' | 'title' | 'creator' | 'itemType' | 'date' | 'publisher' | 'publicationTitle' | 'journalAbbreviation' | 'language' | 'accessDate' | 'libraryCatalog' | 'callNumber' | 'rights' | 'addedBy' | 'numItems';
      direction?: 'asc' | 'desc';
    } = {}
  ): Promise<ZoteroResponse<unknown[]> & { pagination: PaginationInfo }> {
    const endpoint = `/${libraryType}s/${libraryId}/collections/${collectionKey}/items`;
    
    const response = await this.httpClient.get<unknown[]>(endpoint, { params: params as Record<string, unknown> });
    
    return {
      ...response,
      pagination: this.httpClient.extractPaginationInfo(response.response),
    };
  }

  /**
   * Get top-level collections (collections without parents)
   */
  async getTop(
    libraryType: 'user' | 'group',
    libraryId: number,
    params: CollectionsQueryParams = {}
  ): Promise<ZoteroResponse<ZoteroCollection[]> & { pagination: PaginationInfo }> {
    const endpoint = `/${libraryType}s/${libraryId}/collections/top`;
    
    const response = await this.httpClient.get<ZoteroCollection[]>(endpoint, { params: params as Record<string, unknown> });
    
    return {
      ...response,
      pagination: this.httpClient.extractPaginationInfo(response.response),
    };
  }
}