#!/usr/bin/env node

/**
 * Type generation script for @zotero-suite/schema-types
 * This script fetches the latest Zotero schema and generates TypeScript types and Zod schemas
 * 
 * This script runs before compilation, so it directly uses the TypeScript source files
 */

const fs = require('fs');
const path = require('path');

// Schema fetching and caching logic (inline implementation)
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

// Type generation logic (inline implementation)
class TypeGenerator {
  constructor(schema) {
    this.schema = schema;
  }

  generateTypes() {
    const types = [];

    // Generate base types
    types.push(this.generateBaseTypes());
    
    // Generate item-specific types
    types.push(this.generateItemTypes());
    
    // Generate collection types
    types.push(this.generateCollectionTypes());
    
    // Generate search types
    types.push(this.generateSearchTypes());
    
    // Generate library types
    types.push(this.generateLibraryTypes());

    return types.join('\n\n');
  }

  generateBaseTypes() {
    return `// Base Zotero types
export interface ZoteroItem {
  key?: string;
  version?: number;
  library?: {
    type: 'user' | 'group';
    id: number;
    name: string;
    links: {
      alternate: {
        href: string;
        type: string;
      };
    };
  };
  links?: {
    self?: {
      href: string;
      type: string;
    };
    alternate?: {
      href: string;
      type: string;
    };
  };
  meta?: {
    createdByUser?: {
      id: number;
      username: string;
      name: string;
    };
    createdDate?: string;
    lastModifiedByUser?: {
      id: number;
      username: string;
      name: string;
    };
    lastModifiedDate?: string;
    numChildren?: number;
  };
  data: ZoteroItemData;
}

export interface ZoteroItemData {
  key?: string;
  version?: number;
  itemType: string;
  title?: string;
  creators?: ZoteroCreator[];
  abstractNote?: string;
  series?: string;
  seriesNumber?: string;
  volume?: string;
  numberOfVolumes?: string;
  edition?: string;
  place?: string;
  publisher?: string;
  date?: string;
  numPages?: string;
  language?: string;
  ISBN?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  tags?: ZoteroTag[];
  collections?: string[];
  relations?: Record<string, string | string[]>;
  dateAdded?: string;
  dateModified?: string;
}

export interface ZoteroCreator {
  creatorType: string;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export interface ZoteroTag {
  tag: string;
  type?: number;
}`;
  }

  generateItemTypes() {
    const itemTypes = [];

    // Generate union type for all item types
    const itemTypeNames = this.schema.itemTypes.map(item => `'${item.itemType}'`);
    itemTypes.push(`// Item type union
export type ZoteroItemType = ${itemTypeNames.join(' | ')};`);

    // Generate specific item type interfaces
    for (const itemType of this.schema.itemTypes) {
      const typeName = this.capitalizeFirstLetter(itemType.itemType);
      const interfaceName = `Zotero${typeName}Item`;
      
      const fields = itemType.fields || [];
      const fieldProperties = fields.map(field => {
        const fieldName = field.field || field.baseField;
        return `  ${fieldName}?: string;`;
      }).join('\n');
      
      const creatorTypes = itemType.creatorTypes || [];
      const creatorTypeUnion = creatorTypes.length > 0 
        ? creatorTypes.map(ct => `'${ct.creatorType}'`).join(' | ')
        : 'string';
      
      itemTypes.push(`export interface ${interfaceName} extends ZoteroItemData {
  itemType: '${itemType.itemType}';${fieldProperties ? '\n' + fieldProperties : ''}
  creators?: (ZoteroCreator & { creatorType: ${creatorTypeUnion} })[];
}`);
    }

    return itemTypes.join('\n\n');
  }

  generateCollectionTypes() {
    return `// Collection types
export interface ZoteroCollection {
  key?: string;
  version?: number;
  library?: {
    type: 'user' | 'group';
    id: number;
    name: string;
    links: {
      alternate: {
        href: string;
        type: string;
      };
    };
  };
  links?: {
    self?: {
      href: string;
      type: string;
    };
    alternate?: {
      href: string;
      type: string;
    };
  };
  meta?: {
    numCollections?: number;
    numItems?: number;
  };
  data: ZoteroCollectionData;
}

export interface ZoteroCollectionData {
  key?: string;
  version?: number;
  name: string;
  parentCollection?: string | false;
  relations?: Record<string, string | string[]>;
}`;
  }

  generateSearchTypes() {
    return `// Search types
export interface ZoteroSearch {
  key?: string;
  version?: number;
  library?: {
    type: 'user' | 'group';
    id: number;
    name: string;
    links: {
      alternate: {
        href: string;
        type: string;
      };
    };
  };
  links?: {
    self?: {
      href: string;
      type: string;
    };
    alternate?: {
      href: string;
      type: string;
    };
  };
  data: ZoteroSearchData;
}

export interface ZoteroSearchData {
  key?: string;
  version?: number;
  name: string;
  conditions: ZoteroSearchCondition[];
}

export interface ZoteroSearchCondition {
  condition: string;
  operator: string;
  value: string;
}`;
  }

  generateLibraryTypes() {
    return `// Library types
export interface ZoteroLibrary {
  type: 'user' | 'group';
  id: number;
  name: string;
  links: {
    alternate: {
      href: string;
      type: string;
    };
  };
}

export interface ZoteroGroup extends ZoteroLibrary {
  type: 'group';
  data: {
    id: number;
    version: number;
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
  };
}

export interface ZoteroGroupMember {
  id: number;
  username: string;
  name: string;
  role: 'member' | 'admin' | 'owner';
}`;
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// Zod schema generation logic (inline implementation)
class ZodGenerator {
  constructor(schema) {
    this.schema = schema;
  }

  generateSchemas() {
    const schemas = [];

    // Add import statement
    schemas.push(`import { z } from 'zod';`);
    
    // Generate base schemas
    schemas.push(this.generateBaseSchemas());
    
    // Generate item-specific schemas
    schemas.push(this.generateItemSchemas());
    
    // Generate collection schemas
    schemas.push(this.generateCollectionSchemas());
    
    // Generate search schemas
    schemas.push(this.generateSearchSchemas());
    
    // Generate library schemas
    schemas.push(this.generateLibrarySchemas());

    return schemas.join('\n\n');
  }

  generateBaseSchemas() {
    return `// Base Zod schemas
export const ZoteroCreatorSchema = z.object({
  creatorType: z.string(),
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const ZoteroTagSchema = z.object({
  tag: z.string(),
  type: z.number().optional(),
});

export const ZoteroItemDataSchema = z.object({
  key: z.string().optional(),
  version: z.number().optional(),
  itemType: z.string(),
  title: z.string().optional(),
  creators: z.array(ZoteroCreatorSchema).optional(),
  abstractNote: z.string().optional(),
  series: z.string().optional(),
  seriesNumber: z.string().optional(),
  volume: z.string().optional(),
  numberOfVolumes: z.string().optional(),
  edition: z.string().optional(),
  place: z.string().optional(),
  publisher: z.string().optional(),
  date: z.string().optional(),
  numPages: z.string().optional(),
  language: z.string().optional(),
  ISBN: z.string().optional(),
  shortTitle: z.string().optional(),
  url: z.string().optional(),
  accessDate: z.string().optional(),
  archive: z.string().optional(),
  archiveLocation: z.string().optional(),
  libraryCatalog: z.string().optional(),
  callNumber: z.string().optional(),
  rights: z.string().optional(),
  extra: z.string().optional(),
  tags: z.array(ZoteroTagSchema).optional(),
  collections: z.array(z.string()).optional(),
  relations: z.record(z.union([z.string(), z.array(z.string())])).optional(),
  dateAdded: z.string().optional(),
  dateModified: z.string().optional(),
});

export const ZoteroItemSchema = z.object({
  key: z.string().optional(),
  version: z.number().optional(),
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
  links: z.object({
    self: z.object({
      href: z.string(),
      type: z.string(),
    }).optional(),
    alternate: z.object({
      href: z.string(),
      type: z.string(),
    }).optional(),
  }).optional(),
  meta: z.object({
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
  }).optional(),
  data: ZoteroItemDataSchema,
});`;
  }

  generateItemSchemas() {
    const itemSchemas = [];

    // Generate union schema for all item types
    const itemTypeNames = this.schema.itemTypes.map(item => `'${item.itemType}'`);
    itemSchemas.push(`// Item type validation
export const ZoteroItemTypeSchema = z.enum([${itemTypeNames.join(', ')}]);`);

    // Generate specific item type schemas
    for (const itemType of this.schema.itemTypes) {
      const typeName = this.capitalizeFirstLetter(itemType.itemType);
      const schemaName = `Zotero${typeName}ItemSchema`;
      
      const fields = itemType.fields || [];
      const creatorTypes = itemType.creatorTypes || [];
      
      let creatorSchema = 'ZoteroCreatorSchema';
      if (creatorTypes.length > 0) {
        const creatorTypeNames = creatorTypes.map(ct => `'${ct.creatorType}'`);
        creatorSchema = `ZoteroCreatorSchema.extend({
    creatorType: z.enum([${creatorTypeNames.join(', ')}]),
  })`;
      }
      
      // Build field extensions
      const fieldExtensions = [];
      fieldExtensions.push(`itemType: z.literal('${itemType.itemType}')`);
      
      if (creatorTypes.length > 0) {
        fieldExtensions.push(`creators: z.array(${creatorSchema}).optional()`);
      }
      
      // Add specific fields if they exist
      fields.forEach(field => {
        const fieldName = field.field || field.baseField;
        if (fieldName && !this.isBaseField(fieldName)) {
          fieldExtensions.push(`${fieldName}: z.string().optional()`);
        }
      });
      
      const extensionStr = fieldExtensions.length > 0 
        ? `.extend({\n  ${fieldExtensions.join(',\n  ')}\n})`
        : '';
      
      itemSchemas.push(`export const ${schemaName} = ZoteroItemDataSchema${extensionStr};`);
    }

    return itemSchemas.join('\n\n');
  }

  generateCollectionSchemas() {
    return `// Collection schemas
export const ZoteroCollectionDataSchema = z.object({
  key: z.string().optional(),
  version: z.number().optional(),
  name: z.string(),
  parentCollection: z.union([z.string(), z.literal(false)]).optional(),
  relations: z.record(z.union([z.string(), z.array(z.string())])).optional(),
});

export const ZoteroCollectionSchema = z.object({
  key: z.string().optional(),
  version: z.number().optional(),
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
  links: z.object({
    self: z.object({
      href: z.string(),
      type: z.string(),
    }).optional(),
    alternate: z.object({
      href: z.string(),
      type: z.string(),
    }).optional(),
  }).optional(),
  meta: z.object({
    numCollections: z.number().optional(),
    numItems: z.number().optional(),
  }).optional(),
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

export const ZoteroSearchDataSchema = z.object({
  key: z.string().optional(),
  version: z.number().optional(),
  name: z.string(),
  conditions: z.array(ZoteroSearchConditionSchema),
});

export const ZoteroSearchSchema = z.object({
  key: z.string().optional(),
  version: z.number().optional(),
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
  links: z.object({
    self: z.object({
      href: z.string(),
      type: z.string(),
    }).optional(),
    alternate: z.object({
      href: z.string(),
      type: z.string(),
    }).optional(),
  }).optional(),
  data: ZoteroSearchDataSchema,
});`;
  }

  generateLibrarySchemas() {
    return `// Library schemas
export const ZoteroLibrarySchema = z.object({
  type: z.enum(['user', 'group']),
  id: z.number(),
  name: z.string(),
  links: z.object({
    alternate: z.object({
      href: z.string(),
      type: z.string(),
    }),
  }),
});

export const ZoteroGroupMemberSchema = z.object({
  id: z.number(),
  username: z.string(),
  name: z.string(),
  role: z.enum(['member', 'admin', 'owner']),
});

export const ZoteroGroupSchema = ZoteroLibrarySchema.extend({
  type: z.literal('group'),
  data: z.object({
    id: z.number(),
    version: z.number(),
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
  }),
});`;
  }

  isBaseField(fieldName) {
    const baseFields = [
      'key', 'version', 'itemType', 'title', 'creators', 'abstractNote',
      'series', 'seriesNumber', 'volume', 'numberOfVolumes', 'edition',
      'place', 'publisher', 'date', 'numPages', 'language', 'ISBN',
      'shortTitle', 'url', 'accessDate', 'archive', 'archiveLocation',
      'libraryCatalog', 'callNumber', 'rights', 'extra', 'tags',
      'collections', 'relations', 'dateAdded', 'dateModified'
    ];
    return baseFields.includes(fieldName);
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
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