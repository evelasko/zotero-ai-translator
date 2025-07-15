/* eslint-disable no-console */
/**
 * Schema fetcher utility for retrieving and caching Zotero schema
 */

import * as fs from 'fs';
import * as path from 'path';

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

const SCHEMA_URL = 'https://api.zotero.org/schema';
const CACHE_FILE = 'zotero-schema-cache.json';

export class SchemaFetcher {
  private cachePath: string;

  constructor(cacheDir: string = process.cwd()) {
    this.cachePath = path.join(cacheDir, CACHE_FILE);
  }

  /**
   * Fetch schema from Zotero API or use cached version
   */
  async fetchSchema(): Promise<ZoteroSchema> {
    console.log('Fetching Zotero schema...');

    try {
      const response = await fetch(SCHEMA_URL, {
        headers: {
          'Accept-Encoding': 'gzip',
          'User-Agent': 'zotero-suite/schema-types@1.0.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const schema = (await response.json()) as ZoteroSchema;
      console.log(`Schema version: ${schema.version}`);

      // Cache the schema
      this.cacheSchema(schema);

      return schema;
    } catch (error) {
      console.error('Failed to fetch schema:', error);

      // Try to use cached schema as fallback
      const cachedSchema = this.loadCachedSchema();
      if (cachedSchema) {
        console.log('Using cached schema as fallback...');
        return cachedSchema;
      }

      throw error;
    }
  }

  /**
   * Load cached schema if available
   */
  private loadCachedSchema(): ZoteroSchema | null {
    try {
      if (fs.existsSync(this.cachePath)) {
        const cachedData = fs.readFileSync(this.cachePath, 'utf8');
        return JSON.parse(cachedData) as ZoteroSchema;
      }
    } catch (error) {
      console.warn('Failed to load cached schema:', error);
    }
    return null;
  }

  /**
   * Cache schema to disk
   */
  private cacheSchema(schema: ZoteroSchema): void {
    try {
      fs.writeFileSync(this.cachePath, JSON.stringify(schema, null, 2));
      console.log('Schema cached successfully');
    } catch (error) {
      console.warn('Failed to cache schema:', error);
    }
  }

  /**
   * Get cache file path
   */
  getCachePath(): string {
    return this.cachePath;
  }
}
