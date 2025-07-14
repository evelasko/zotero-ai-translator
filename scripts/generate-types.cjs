#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { compile } = require('json-schema-to-typescript');
const { jsonSchemaToZod } = require('json-schema-to-zod');

const SCHEMA_URL = 'https://api.zotero.org/schema';
const GENERATED_DIR = path.join(__dirname, '../src/generated');
const TYPES_DIR = path.join(GENERATED_DIR, 'types');
const SCHEMAS_DIR = path.join(GENERATED_DIR, 'schemas');

async function fetchSchema() {
  console.log('Fetching Zotero schema...');
  
  try {
    const response = await fetch(SCHEMA_URL, {
      headers: {
        'Accept-Encoding': 'gzip',
        'User-Agent': 'zotero-web-client/1.0.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const schema = await response.json();
    console.log(`Schema version: ${schema.version}`);
    
    // Cache the schema
    fs.writeFileSync(
      path.join(__dirname, '../schema.json'),
      JSON.stringify(schema, null, 2)
    );
    
    return schema;
  } catch (error) {
    console.error('Failed to fetch schema:', error);
    
    // Try to use cached schema as fallback
    const cachedSchemaPath = path.join(__dirname, '../schema.json');
    if (fs.existsSync(cachedSchemaPath)) {
      console.log('Using cached schema as fallback...');
      return JSON.parse(fs.readFileSync(cachedSchemaPath, 'utf8'));
    }
    
    throw error;
  }
}

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function generateItemTypeInterfaces(schema) {
  const interfaces = [];
  
  // Generate base interfaces
  interfaces.push(`
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
}`);

  interfaces.push(`
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
}`);

  interfaces.push(`
export interface ZoteroCreator {
  creatorType: string;
  name?: string;
  firstName?: string;
  lastName?: string;
}`);

  interfaces.push(`
export interface ZoteroTag {
  tag: string;
  type?: number;
}`);

  // Generate specific item type interfaces
  for (const itemType of schema.itemTypes) {
    const itemTypeName = itemType.itemType;
    const interfaceName = `Zotero${itemTypeName.charAt(0).toUpperCase()}${itemTypeName.slice(1)}Item`;
    
    const fields = itemType.fields || [];
    const fieldProperties = fields.map(field => {
      const fieldName = field.field || field.baseField;
      return `  ${fieldName}?: string;`;
    }).join('\n');
    
    const creatorTypes = itemType.creatorTypes || [];
    const creatorTypeUnion = creatorTypes.length > 0 
      ? creatorTypes.map(ct => `'${ct.creatorType}'`).join(' | ')
      : 'string';
    
    interfaces.push(`
export interface ${interfaceName} extends ZoteroItemData {
  itemType: '${itemTypeName}';
${fieldProperties}
  creators?: (ZoteroCreator & { creatorType: ${creatorTypeUnion} })[];
}`);
  }
  
  // Generate collection interface
  interfaces.push(`
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
}`);

  // Generate search interface
  interfaces.push(`
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
}`);

  interfaces.push(`
export interface ZoteroSearchCondition {
  condition: string;
  operator: string;
  value: string;
}`);

  // Generate library info interface
  interfaces.push(`
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
}`);

  return interfaces.join('\n');
}

function generateZodSchemas(schema) {
  const schemas = [];
  
  // Base schemas
  schemas.push(`
import { z } from 'zod';

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
});

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
});

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
});`);

  return schemas.join('\n');
}

async function generateTypes(schema) {
  console.log('Generating TypeScript interfaces...');
  
  const typesContent = generateItemTypeInterfaces(schema);
  
  fs.writeFileSync(
    path.join(TYPES_DIR, 'index.ts'),
    typesContent
  );
  
  console.log('TypeScript interfaces generated successfully!');
}

async function generateSchemas(schema) {
  console.log('Generating Zod schemas...');
  
  const schemasContent = generateZodSchemas(schema);
  
  fs.writeFileSync(
    path.join(SCHEMAS_DIR, 'index.ts'),
    schemasContent
  );
  
  console.log('Zod schemas generated successfully!');
}

function generateIndexFile() {
  const indexContent = `// Auto-generated file - do not edit manually
export * from './types/index.js';
export * from './schemas/index.js';
`;
  
  fs.writeFileSync(
    path.join(GENERATED_DIR, 'index.ts'),
    indexContent
  );
}

async function main() {
  try {
    console.log('Starting schema generation...');
    
    // Ensure directories exist
    ensureDirectoryExists(GENERATED_DIR);
    ensureDirectoryExists(TYPES_DIR);
    ensureDirectoryExists(SCHEMAS_DIR);
    
    // Fetch schema
    const schema = await fetchSchema();
    
    // Generate types and schemas
    await generateTypes(schema);
    await generateSchemas(schema);
    
    // Generate index file
    generateIndexFile();
    
    console.log('Schema generation completed successfully!');
  } catch (error) {
    console.error('Schema generation failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}