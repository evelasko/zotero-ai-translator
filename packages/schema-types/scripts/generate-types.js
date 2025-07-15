#!/usr/bin/env node

/**
 * Type generation script for @zotero-suite/schema-types
 * This script fetches the latest Zotero schema and generates TypeScript types and Zod schemas
 * 
 * This script runs before compilation, so it directly implements the generation logic
 */

const fs = require('fs');
const path = require('path');

// Schema fetching and caching logic
const SCHEMA_URL = 'https://api.zotero.org/schema';
const CACHE_FILE = 'zotero-schema-cache.json';

class SchemaFetcher {
  constructor(cacheDir = process.cwd()) {
    this.cacheDir = cacheDir;
    this.cachePath = path.join(cacheDir, CACHE_FILE);
  }

  async fetchSchema() {
    console.log('Fetching Zotero schema...');
    
    try {
      const response = await fetch(SCHEMA_URL, {
        headers: {
          'Accept-Encoding': 'gzip',
          'User-Agent': 'zotero-suite/schema-types@1.0.0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const schema = await response.json();
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

  loadCachedSchema() {
    try {
      if (fs.existsSync(this.cachePath)) {
        const cachedData = fs.readFileSync(this.cachePath, 'utf8');
        return JSON.parse(cachedData);
      }
    } catch (error) {
      console.warn('Failed to load cached schema:', error);
    }
    return null;
  }

  cacheSchema(schema) {
    try {
      fs.writeFileSync(this.cachePath, JSON.stringify(schema, null, 2));
      console.log('Schema cached successfully');
    } catch (error) {
      console.warn('Failed to cache schema:', error);
    }
  }
}

// Use the compiled TypeScript generators for consistency
async function importGenerators() {
  try {
    // Try to require the compiled generators if they exist
    const TypeGeneratorPath = path.join(__dirname, '../lib/generators/type-generator.js');
    const ZodGeneratorPath = path.join(__dirname, '../lib/generators/zod-generator.js');
    
    if (fs.existsSync(TypeGeneratorPath) && fs.existsSync(ZodGeneratorPath)) {
      const { TypeGenerator } = require(TypeGeneratorPath);
      const { ZodGenerator } = require(ZodGeneratorPath);
      return { TypeGenerator, ZodGenerator };
    }
  } catch (error) {
    console.log(`Using fallback generators because ${error.message}`);
  }
  
  // Fallback to inline implementations
  return getFallbackGenerators();
}

// Simplified fallback generators
function getFallbackGenerators() {
  class TypeGenerator {
    constructor(schema) {
      this.schema = schema;
    }

    generateTypes() {
      const types = [];
      
      // Generate utility types
      types.push(this.generateUtilityTypes());
      
      // Generate field types
      types.push(this.generateFieldTypes());
      
      // Generate creator types
      types.push(this.generateCreatorTypes());
      
      // Generate item type definitions
      types.push(this.generateItemTypeDefinitions());
      
      // Generate base types
      types.push(this.generateBaseTypes());
      
      // Generate specific item types
      types.push(this.generateSpecificItemTypes());
      
      // Generate API types
      types.push(this.generateAPITypes());
      
      // Generate template types
      types.push(this.generateTemplateTypes());
      
      // Generate collection types
      types.push(this.generateCollectionTypes());
      
      // Generate search types
      types.push(this.generateSearchTypes());
      
      // Generate library types
      types.push(this.generateLibraryTypes());
      
      // Generate sync types
      types.push(this.generateSyncTypes());
      
      // Generate content types
      types.push(this.generateContentTypes());

      return types.join('\n\n');
    }

    generateUtilityTypes() {
      return `// Utility types
export type ZoteroKey = string;
export type ZoteroVersion = number;
export type ZoteroDateString = string;
export type ZoteroDateObject = {
  'date-parts': number[][];
  season?: number;
  circa?: boolean;
  literal?: string;
};

export interface ZoteroAPIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ZoteroAPIError;
  lastModifiedVersion?: number;
  totalResults?: number;
  links?: {
    self: { href: string };
    next?: { href: string };
    prev?: { href: string };
    first?: { href: string };
    last?: { href: string };
  };
}

export interface ZoteroAPIError {
  code: number;
  message: string;
  details?: string;
}

export interface ZoteroWriteToken {
  token: string;
  url: string;
}`;
    }

    generateFieldTypes() {
      const allFields = new Set();
      this.schema.itemTypes.forEach(itemType => {
        itemType.fields?.forEach(field => {
          const fieldName = field.field || field.baseField;
          if (fieldName) allFields.add(fieldName);
        });
      });

      const fieldUnion = Array.from(allFields).map(field => `'${field}'`).join(' | ');
      
      return `// Field types derived from Zotero schema
export type ZoteroField = ${fieldUnion};

export interface ZoteroFieldDefinition {
  field: string;
  baseField?: string;
  type?: 'text' | 'date' | 'number';
}`;
    }

    generateCreatorTypes() {
      const allCreatorTypes = new Set();
      this.schema.itemTypes.forEach(itemType => {
        itemType.creatorTypes?.forEach(creatorType => {
          allCreatorTypes.add(creatorType.creatorType);
        });
      });

      const creatorTypeUnion = Array.from(allCreatorTypes).map(type => `'${type}'`).join(' | ');
      
      return `// Creator types derived from Zotero schema
export type ZoteroCreatorType = ${creatorTypeUnion};

export interface ZoteroCreatorTypeDefinition {
  creatorType: ZoteroCreatorType;
  primary?: boolean;
}`;
    }

    generateItemTypeDefinitions() {
      const itemTypeNames = this.schema.itemTypes.map(item => `'${item.itemType}'`);
      return `// Item type definitions
export type ZoteroItemType = ${itemTypeNames.join(' | ')};`;
    }

    generateBaseTypes() {
      return `// Base Zotero types
export interface ZoteroLinks {
  self?: { href: string; type: string; };
  alternate?: { href: string; type: string; };
  up?: { href: string; type: string; };
  enclosure?: { href: string; type: string; length?: number; title?: string; };
}

export interface ZoteroMeta {
  createdByUser?: { id: number; username: string; name: string; };
  createdDate?: string;
  lastModifiedByUser?: { id: number; username: string; name: string; };
  lastModifiedDate?: string;
  numChildren?: number;
  numCollections?: number;
  numItems?: number;
}

export interface ZoteroData {
  key?: ZoteroKey;
  version?: ZoteroVersion;
  [key: string]: any;
}

export interface ZoteroCreator {
  creatorType: ZoteroCreatorType;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export interface ZoteroTag {
  tag: string;
  type?: number;
}

export interface ZoteroRelation {
  [predicate: string]: string | string[];
}

export interface ZoteroItemData extends ZoteroData {
  itemType: ZoteroItemType;
  title?: string;
  creators?: ZoteroCreator[];
  abstractNote?: string;
  tags?: ZoteroTag[];
  collections?: ZoteroKey[];
  relations?: ZoteroRelation;
  dateAdded?: string;
  dateModified?: string;
  [field: string]: any; // Allow additional fields
}

export interface ZoteroItem {
  key?: ZoteroKey;
  version?: ZoteroVersion;
  library?: ZoteroLibrary;
  links?: ZoteroLinks;
  meta?: ZoteroMeta;
  data: ZoteroItemData;
}`;
    }

    generateSpecificItemTypes() {
      const types = [];
      
      // Generate specific item interfaces
      for (const itemType of this.schema.itemTypes) {
        const typeName = this.capitalizeFirstLetter(itemType.itemType);
        types.push(`export interface Zotero${typeName}Item extends ZoteroItemData {
  itemType: '${itemType.itemType}';
}`);
      }

      types.push(`// Commonly used type aliases
export type ZoteroNote = ZoteroNoteItem;
export type ZoteroAttachment = ZoteroAttachmentItem;
export type ZoteroAnnotation = ZoteroAnnotationItem;`);

      return types.join('\n\n');
    }

    generateAPITypes() {
      return `// API and Authentication types
export interface ZoteroUser {
  id: number;
  username: string;
  name: string;
  email?: string;
  slug?: string;
  links?: ZoteroLinks;
}

export interface ZoteroKeyPermissions {
  library: boolean;
  notes: boolean;
  write: boolean;
  groups: { all: boolean; [groupId: string]: boolean; };
}

export interface ZoteroSettings {
  [key: string]: any;
}

export interface ZoteroDeletedContent {
  collections: ZoteroKey[];
  items: ZoteroKey[];
  searches: ZoteroKey[];
  tags: { tag: string; type?: number }[];
}`;
    }

    generateTemplateTypes() {
      return `// Template types
export interface ZoteroTemplate {
  itemType: ZoteroItemType;
  fields: ZoteroFieldTemplate[];
  creatorTypes: ZoteroCreatorTemplate[];
}

export interface ZoteroItemTemplate {
  itemType: ZoteroItemType;
  title?: string;
  creators?: ZoteroCreatorTemplate[];
  [fieldName: string]: any;
}

export interface ZoteroCreatorTemplate {
  creatorType: ZoteroCreatorType;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export interface ZoteroFieldTemplate {
  field: string;
  baseField?: string;
}

export interface ZoteroItemTypeTemplate {
  itemType: ZoteroItemType;
  localized: string;
}

export interface ZoteroCollectionTemplate {
  name: string;
  parentCollection?: ZoteroKey | false;
}`;
    }

    generateCollectionTypes() {
      return `// Collection types
export interface ZoteroCollectionData extends ZoteroData {
  name: string;
  parentCollection?: ZoteroKey | false;
  relations?: ZoteroRelation;
}

export interface ZoteroCollection {
  key?: ZoteroKey;
  version?: ZoteroVersion;
  library?: ZoteroLibrary;
  links?: ZoteroLinks;
  meta?: ZoteroMeta;
  data: ZoteroCollectionData;
}`;
    }

    generateSearchTypes() {
      return `// Search types
export interface ZoteroSearchCondition {
  condition: string;
  operator: string;
  value: string;
}

export interface ZoteroSearchData extends ZoteroData {
  name: string;
  conditions: ZoteroSearchCondition[];
}

export interface ZoteroSearch {
  key?: ZoteroKey;
  version?: ZoteroVersion;
  library?: ZoteroLibrary;
  links?: ZoteroLinks;
  meta?: ZoteroMeta;
  data: ZoteroSearchData;
}

export interface ZoteroSearchQuery {
  q?: string;
  itemType?: ZoteroItemType;
  tag?: string;
  since?: ZoteroVersion;
  sort?: string;
  direction?: 'asc' | 'desc';
  start?: number;
  limit?: number;
  format?: string;
  include?: string[];
}

export interface ZoteroSearchResult<T = ZoteroItem> {
  items: T[];
  totalResults: number;
  lastModifiedVersion: ZoteroVersion;
  links?: ZoteroLinks;
}`;
    }

    generateLibraryTypes() {
      return `// Library types
export interface ZoteroLibrary {
  type: 'user' | 'group';
  id: number;
  name: string;
  links: { alternate: { href: string; type: string; }; };
}

export interface ZoteroGroupMember {
  id: number;
  username: string;
  name: string;
  role: 'member' | 'admin' | 'owner';
}

export interface ZoteroGroupMetadata {
  id: number;
  version: ZoteroVersion;
  name: string;
  description: string;
  url: string;
  library: {
    type: 'Private' | 'PublicOpen' | 'PublicClosed';
    reading: 'all' | 'members';
    editing: 'members' | 'admins';
  };
  members: ZoteroGroupMember[];
  admins: ZoteroGroupMember[];
  owner: ZoteroGroupMember;
  created: string;
  lastModified: string;
}

export interface ZoteroGroup extends ZoteroLibrary {
  type: 'group';
  data: ZoteroGroupMetadata;
}`;
    }

    generateSyncTypes() {
      return `// Sync types
export interface ZoteroSync {
  lastModifiedVersion: ZoteroVersion;
  username?: string;
  userID?: number;
}

export interface ZoteroSyncError {
  code: string;
  message: string;
  data?: any;
}`;
    }

    generateContentTypes() {
      return `// Content types
export interface ZoteroFulltextContent {
  content: string;
  indexedChars: number;
  totalChars: number;
}

export interface ZoteroHighlight {
  text: string;
  color: string;
  pageLabel?: string;
  position: { pageIndex: number; rects: number[][]; };
}

export interface ZoteroImage {
  src: string;
  width?: number;
  height?: number;
  annotation?: any;
}

export interface ZoteroInk {
  paths: number[][][];
  width: number;
  color: string;
  pageLabel?: string;
  position: { pageIndex: number; rects: number[][]; };
}`;
    }

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

  class ZodGenerator {
    constructor(schema) {
      this.schema = schema;
    }

    generateSchemas() {
      const schemas = [];
      
      schemas.push(`import { z } from 'zod';`);
      schemas.push(this.generateUtilitySchemas());
      schemas.push(this.generateFieldSchemas());
      schemas.push(this.generateCreatorSchemas());
      schemas.push(this.generateItemTypeSchemas());
      schemas.push(this.generateBaseSchemas());
      schemas.push(this.generateSpecificItemSchemas());
      schemas.push(this.generateAPISchemas());
      schemas.push(this.generateTemplateSchemas());
      schemas.push(this.generateCollectionSchemas());
      schemas.push(this.generateSearchSchemas());
      schemas.push(this.generateLibrarySchemas());
      schemas.push(this.generateSyncSchemas());
      schemas.push(this.generateContentSchemas());

      return schemas.join('\n\n');
    }

    generateUtilitySchemas() {
      return `// Utility schemas
export const ZoteroKeySchema = z.string();
export const ZoteroVersionSchema = z.number();
export const ZoteroDateStringSchema = z.string();
export const ZoteroDateObjectSchema = z.object({
  'date-parts': z.array(z.array(z.number())),
  season: z.number().optional(),
  circa: z.boolean().optional(),
  literal: z.string().optional(),
});

export const ZoteroAPIResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.object({
    code: z.number(),
    message: z.string(),
    details: z.string().optional(),
  }).optional(),
  lastModifiedVersion: z.number().optional(),
  totalResults: z.number().optional(),
  links: z.object({
    self: z.object({ href: z.string() }),
    next: z.object({ href: z.string() }).optional(),
    prev: z.object({ href: z.string() }).optional(),
    first: z.object({ href: z.string() }).optional(),
    last: z.object({ href: z.string() }).optional(),
  }).optional(),
});

export const ZoteroAPIErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
  details: z.string().optional(),
});

export const ZoteroWriteTokenSchema = z.object({
  token: z.string(),
  url: z.string(),
});`;
    }

    generateFieldSchemas() {
      const allFields = new Set();
      this.schema.itemTypes.forEach(itemType => {
        itemType.fields?.forEach(field => {
          const fieldName = field.field || field.baseField;
          if (fieldName) allFields.add(fieldName);
        });
      });

      const fieldEnum = Array.from(allFields).map(field => `'${field}'`).join(', ');
      
      return `// Field schemas
export const ZoteroFieldSchema = z.enum([${fieldEnum}]);

export const ZoteroFieldDefinitionSchema = z.object({
  field: z.string(),
  baseField: z.string().optional(),
  type: z.enum(['text', 'date', 'number']).optional(),
});`;
    }

    generateCreatorSchemas() {
      const allCreatorTypes = new Set();
      this.schema.itemTypes.forEach(itemType => {
        itemType.creatorTypes?.forEach(creatorType => {
          allCreatorTypes.add(creatorType.creatorType);
        });
      });

      const creatorTypeEnum = Array.from(allCreatorTypes).map(type => `'${type}'`).join(', ');
      
      return `// Creator schemas
export const ZoteroCreatorTypeSchema = z.enum([${creatorTypeEnum}]);

export const ZoteroCreatorTypeDefinitionSchema = z.object({
  creatorType: ZoteroCreatorTypeSchema,
  primary: z.boolean().optional(),
});`;
    }

    generateItemTypeSchemas() {
      const itemTypeNames = this.schema.itemTypes.map(item => `'${item.itemType}'`);
      return `// Item type schemas
export const ZoteroItemTypeSchema = z.enum([${itemTypeNames.join(', ')}]);`;
    }

    generateBaseSchemas() {
      return `// Base schemas
export const ZoteroLinksSchema = z.object({
  self: z.object({ href: z.string(), type: z.string() }).optional(),
  alternate: z.object({ href: z.string(), type: z.string() }).optional(),
  up: z.object({ href: z.string(), type: z.string() }).optional(),
  enclosure: z.object({
    href: z.string(),
    type: z.string(),
    length: z.number().optional(),
    title: z.string().optional(),
  }).optional(),
});

export const ZoteroMetaSchema = z.object({
  createdByUser: z.object({
    id: z.number(),
    username: z.string(),
    name: z.string(),
  }).optional(),
  createdDate: z.string().optional(),
  lastModifiedByUser: z.object({
    id: z.number(),
    username: z.string(),
    name: z.string(),
  }).optional(),
  lastModifiedDate: z.string().optional(),
  numChildren: z.number().optional(),
  numCollections: z.number().optional(),
  numItems: z.number().optional(),
});

export const ZoteroDataSchema = z.object({
  key: ZoteroKeySchema.optional(),
  version: ZoteroVersionSchema.optional(),
}).catchall(z.any());

export const ZoteroCreatorSchema = z.object({
  creatorType: ZoteroCreatorTypeSchema,
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const ZoteroTagSchema = z.object({
  tag: z.string(),
  type: z.number().optional(),
});

export const ZoteroRelationSchema = z.record(z.union([z.string(), z.array(z.string())]));

export const ZoteroItemDataSchema = ZoteroDataSchema.extend({
  itemType: ZoteroItemTypeSchema,
  title: z.string().optional(),
  creators: z.array(ZoteroCreatorSchema).optional(),
  abstractNote: z.string().optional(),
  tags: z.array(ZoteroTagSchema).optional(),
  collections: z.array(ZoteroKeySchema).optional(),
  relations: ZoteroRelationSchema.optional(),
  dateAdded: z.string().optional(),
  dateModified: z.string().optional(),
}).catchall(z.any());

export const ZoteroItemSchema = z.object({
  key: ZoteroKeySchema.optional(),
  version: ZoteroVersionSchema.optional(),
  library: z.object({
    type: z.enum(['user', 'group']),
    id: z.number(),
    name: z.string(),
    links: z.object({
      alternate: z.object({
        href: z.string(),
        type: z.string(),
      }),
    }),
  }).optional(),
  links: ZoteroLinksSchema.optional(),
  meta: ZoteroMetaSchema.optional(),
  data: ZoteroItemDataSchema,
});`;
    }

    generateSpecificItemSchemas() {
      const schemas = [];
      
      for (const itemType of this.schema.itemTypes) {
        const typeName = this.capitalizeFirstLetter(itemType.itemType);
        schemas.push(`export const Zotero${typeName}ItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('${itemType.itemType}'),
});`);
      }

      schemas.push(`// Commonly used schema aliases
export const ZoteroNoteSchema = ZoteroNoteItemSchema;
export const ZoteroAttachmentSchema = ZoteroAttachmentItemSchema;
export const ZoteroAnnotationSchema = ZoteroAnnotationItemSchema;`);

      return schemas.join('\n\n');
    }

    generateAPISchemas() {
      return `// API schemas
export const ZoteroUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  name: z.string(),
  email: z.string().optional(),
  slug: z.string().optional(),
  links: ZoteroLinksSchema.optional(),
});

export const ZoteroKeyPermissionsSchema = z.object({
  library: z.boolean(),
  notes: z.boolean(),
  write: z.boolean(),
  groups: z.object({ all: z.boolean() }).catchall(z.boolean()),
});

export const ZoteroSettingsSchema = z.record(z.any());

export const ZoteroDeletedContentSchema = z.object({
  collections: z.array(ZoteroKeySchema),
  items: z.array(ZoteroKeySchema),
  searches: z.array(ZoteroKeySchema),
  tags: z.array(z.object({ tag: z.string(), type: z.number().optional() })),
});`;
    }

    generateTemplateSchemas() {
      return `// Template schemas
export const ZoteroFieldTemplateSchema = z.object({
  field: z.string(),
  baseField: z.string().optional(),
});

export const ZoteroCreatorTemplateSchema = z.object({
  creatorType: ZoteroCreatorTypeSchema,
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const ZoteroTemplateSchema = z.object({
  itemType: ZoteroItemTypeSchema,
  fields: z.array(ZoteroFieldTemplateSchema),
  creatorTypes: z.array(z.object({
    creatorType: ZoteroCreatorTypeSchema,
    primary: z.boolean().optional(),
  })),
});

export const ZoteroItemTemplateSchema = z.object({
  itemType: ZoteroItemTypeSchema,
  title: z.string().optional(),
  creators: z.array(ZoteroCreatorTemplateSchema).optional(),
}).catchall(z.any());

export const ZoteroItemTypeTemplateSchema = z.object({
  itemType: ZoteroItemTypeSchema,
  localized: z.string(),
});

export const ZoteroCollectionTemplateSchema = z.object({
  name: z.string(),
  parentCollection: z.union([ZoteroKeySchema, z.literal(false)]).optional(),
});`;
    }

    generateCollectionSchemas() {
      return `// Collection schemas
export const ZoteroCollectionDataSchema = ZoteroDataSchema.extend({
  name: z.string(),
  parentCollection: z.union([ZoteroKeySchema, z.literal(false)]).optional(),
  relations: ZoteroRelationSchema.optional(),
});

export const ZoteroCollectionSchema = z.object({
  key: ZoteroKeySchema.optional(),
  version: ZoteroVersionSchema.optional(),
  library: z.object({
    type: z.enum(['user', 'group']),
    id: z.number(),
    name: z.string(),
    links: z.object({
      alternate: z.object({ href: z.string(), type: z.string() }),
    }),
  }).optional(),
  links: ZoteroLinksSchema.optional(),
  meta: ZoteroMetaSchema.optional(),
  data: ZoteroCollectionDataSchema,
});`;
    }

    generateSearchSchemas() {
      return `// Search schemas
export const ZoteroSearchConditionSchema = z.object({
  condition: z.string(),
  operator: z.string(),
  value: z.string(),
});

export const ZoteroSearchDataSchema = ZoteroDataSchema.extend({
  name: z.string(),
  conditions: z.array(ZoteroSearchConditionSchema),
});

export const ZoteroSearchSchema = z.object({
  key: ZoteroKeySchema.optional(),
  version: ZoteroVersionSchema.optional(),
  library: z.object({
    type: z.enum(['user', 'group']),
    id: z.number(),
    name: z.string(),
    links: z.object({
      alternate: z.object({ href: z.string(), type: z.string() }),
    }),
  }).optional(),
  links: ZoteroLinksSchema.optional(),
  meta: ZoteroMetaSchema.optional(),
  data: ZoteroSearchDataSchema,
});

export const ZoteroSearchQuerySchema = z.object({
  q: z.string().optional(),
  itemType: ZoteroItemTypeSchema.optional(),
  tag: z.string().optional(),
  since: ZoteroVersionSchema.optional(),
  sort: z.string().optional(),
  direction: z.enum(['asc', 'desc']).optional(),
  start: z.number().optional(),
  limit: z.number().optional(),
  format: z.string().optional(),
  include: z.array(z.string()).optional(),
});

export const ZoteroSearchResultSchema = z.object({
  items: z.array(ZoteroItemSchema),
  totalResults: z.number(),
  lastModifiedVersion: ZoteroVersionSchema,
  links: ZoteroLinksSchema.optional(),
});`;
    }

    generateLibrarySchemas() {
      return `// Library schemas
export const ZoteroLibrarySchema = z.object({
  type: z.enum(['user', 'group']),
  id: z.number(),
  name: z.string(),
  links: z.object({
    alternate: z.object({ href: z.string(), type: z.string() }),
  }),
});

export const ZoteroGroupMemberSchema = z.object({
  id: z.number(),
  username: z.string(),
  name: z.string(),
  role: z.enum(['member', 'admin', 'owner']),
});

export const ZoteroGroupMetadataSchema = z.object({
  id: z.number(),
  version: ZoteroVersionSchema,
  name: z.string(),
  description: z.string(),
  url: z.string(),
  library: z.object({
    type: z.enum(['Private', 'PublicOpen', 'PublicClosed']),
    reading: z.enum(['all', 'members']),
    editing: z.enum(['members', 'admins']),
  }),
  members: z.array(ZoteroGroupMemberSchema),
  admins: z.array(ZoteroGroupMemberSchema),
  owner: ZoteroGroupMemberSchema,
  created: z.string(),
  lastModified: z.string(),
});

export const ZoteroGroupSchema = ZoteroLibrarySchema.extend({
  type: z.literal('group'),
  data: ZoteroGroupMetadataSchema,
});`;
    }

    generateSyncSchemas() {
      return `// Sync schemas
export const ZoteroSyncSchema = z.object({
  lastModifiedVersion: ZoteroVersionSchema,
  username: z.string().optional(),
  userID: z.number().optional(),
});

export const ZoteroSyncErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  data: z.any().optional(),
});`;
    }

    generateContentSchemas() {
      return `// Content schemas
export const ZoteroFulltextContentSchema = z.object({
  content: z.string(),
  indexedChars: z.number(),
  totalChars: z.number(),
});

export const ZoteroHighlightSchema = z.object({
  text: z.string(),
  color: z.string(),
  pageLabel: z.string().optional(),
  position: z.object({
    pageIndex: z.number(),
    rects: z.array(z.array(z.number())),
  }),
});

export const ZoteroImageSchema = z.object({
  src: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  annotation: z.any().optional(),
});

export const ZoteroInkSchema = z.object({
  paths: z.array(z.array(z.array(z.number()))),
  width: z.number(),
  color: z.string(),
  pageLabel: z.string().optional(),
  position: z.object({
    pageIndex: z.number(),
    rects: z.array(z.array(z.number())),
  }),
});`;
    }

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

  return { TypeGenerator, ZodGenerator };
}

// Utility functions
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Main function
async function main() {
  try {
    console.log('Starting Zotero schema type generation...');
    
    const srcDir = path.join(__dirname, '../src');
    const fetcher = new SchemaFetcher(path.join(__dirname, '..'));
    
    // Fetch the schema
    const schema = await fetcher.fetchSchema();
    
    // Get generators
    const { TypeGenerator, ZodGenerator } = await importGenerators();
    
    // Generate types
    console.log('Generating TypeScript types...');
    const typeGenerator = new TypeGenerator(schema);
    const typesContent = typeGenerator.generateTypes();
    
    const typesDir = path.join(srcDir, 'types');
    ensureDirectoryExists(typesDir);
    
    const typesFile = path.join(typesDir, 'index.ts');
    fs.writeFileSync(typesFile, typesContent);
    
    // Generate schemas
    console.log('Generating Zod schemas...');
    const zodGenerator = new ZodGenerator(schema);
    const schemasContent = zodGenerator.generateSchemas();
    
    const schemasDir = path.join(srcDir, 'schemas');
    ensureDirectoryExists(schemasDir);
    
    const schemasFile = path.join(schemasDir, 'index.ts');
    fs.writeFileSync(schemasFile, schemasContent);
    
    console.log('Type generation completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Type generation failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}