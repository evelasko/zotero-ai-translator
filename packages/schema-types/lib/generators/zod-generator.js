"use strict";
/**
 * Zod schema generator for Zotero schema
 * Generates comprehensive Zod schemas based on the official Zotero API schema
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodGenerator = void 0;
class ZodGenerator {
    constructor(schema) {
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.schema = schema;
    }
    /**
     * Generate all Zod schemas from the schema
     */
    generateSchemas() {
        const schemas = [];
        // Add import statement
        schemas.push(`import { z } from 'zod';`);
        // Generate utility schemas first
        schemas.push(this.generateUtilitySchemas());
        // Generate field schemas from schema
        schemas.push(this.generateFieldSchemas());
        // Generate creator schemas from schema
        schemas.push(this.generateCreatorSchemas());
        // Generate item type schemas
        schemas.push(this.generateItemTypeSchemas());
        // Generate base schemas
        schemas.push(this.generateBaseSchemas());
        // Generate specific item schemas
        schemas.push(this.generateSpecificItemSchemas());
        // Generate API schemas
        schemas.push(this.generateAPISchemas());
        // Generate template schemas
        schemas.push(this.generateTemplateSchemas());
        // Generate collection schemas
        schemas.push(this.generateCollectionSchemas());
        // Generate search schemas
        schemas.push(this.generateSearchSchemas());
        // Generate library schemas
        schemas.push(this.generateLibrarySchemas());
        // Generate sync schemas
        schemas.push(this.generateSyncSchemas());
        // Generate content schemas
        schemas.push(this.generateContentSchemas());
        return schemas.join('\n\n');
    }
    /**
     * Generate utility Zod schemas
     */
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

// API Response wrapper schemas
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
    /**
     * Generate field Zod schemas from schema
     */
    generateFieldSchemas() {
        const allFields = new Set();
        // Collect all unique field names from all item types
        this.schema.itemTypes.forEach(itemType => {
            itemType.fields?.forEach(field => {
                const fieldName = field.field || field.baseField;
                if (fieldName) {
                    allFields.add(fieldName);
                }
            });
        });
        const fieldEnum = Array.from(allFields).map(field => `'${field}'`).join(', ');
        return `// Field schemas derived from Zotero schema
export const ZoteroFieldSchema = z.enum([${fieldEnum}]);

export const ZoteroFieldDefinitionSchema = z.object({
  field: z.string(),
  baseField: z.string().optional(),
  type: z.enum(['text', 'date', 'number']).optional(),
});`;
    }
    /**
     * Generate creator Zod schemas from schema
     */
    generateCreatorSchemas() {
        const allCreatorTypes = new Set();
        // Collect all unique creator types from all item types
        this.schema.itemTypes.forEach(itemType => {
            itemType.creatorTypes?.forEach(creatorType => {
                allCreatorTypes.add(creatorType.creatorType);
            });
        });
        const creatorTypeEnum = Array.from(allCreatorTypes).map(type => `'${type}'`).join(', ');
        return `// Creator schemas derived from Zotero schema
export const ZoteroCreatorTypeSchema = z.enum([${creatorTypeEnum}]);

export const ZoteroCreatorTypeDefinitionSchema = z.object({
  creatorType: ZoteroCreatorTypeSchema,
  primary: z.boolean().optional(),
});`;
    }
    /**
     * Generate item type Zod schemas
     */
    generateItemTypeSchemas() {
        const itemTypeNames = this.schema.itemTypes.map(item => `'${item.itemType}'`);
        const itemTypeEnum = itemTypeNames.join(', ');
        return `// Item type schemas
export const ZoteroItemTypeSchema = z.enum([${itemTypeEnum}]);`;
    }
    /**
     * Generate base Zod schemas
     */
    generateBaseSchemas() {
        return `// Base Zotero schemas
export const ZoteroLinksSchema = z.object({
  self: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
  alternate: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
  up: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
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
  collections: z.array(ZoteroKeySchema).optional(),
  relations: ZoteroRelationSchema.optional(),
  dateAdded: z.string().optional(),
  dateModified: z.string().optional(),
});

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
    /**
     * Generate specific item Zod schemas
     */
    generateSpecificItemSchemas() {
        const schemas = [];
        // Generate all specific item type schemas
        for (const itemType of this.schema.itemTypes) {
            const typeName = this.capitalizeFirstLetter(itemType.itemType);
            const schemaName = `Zotero${typeName}ItemSchema`;
            const fields = itemType.fields || [];
            const creatorTypes = itemType.creatorTypes || [];
            // Build field extensions
            const fieldExtensions = [];
            fieldExtensions.push(`itemType: z.literal('${itemType.itemType}')`);
            // Add specific creator type validation if available
            if (creatorTypes.length > 0) {
                const creatorTypeNames = creatorTypes.map(ct => `'${ct.creatorType}'`);
                fieldExtensions.push(`creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum([${creatorTypeNames.join(', ')}]),
  })).optional()`);
            }
            // Add specific fields if they exist and aren't base fields
            fields.forEach(field => {
                const fieldName = field.field || field.baseField;
                if (fieldName && !this.isBaseField(fieldName)) {
                    fieldExtensions.push(`${fieldName}: z.string().optional()`);
                }
            });
            const extensionStr = fieldExtensions.length > 0
                ? `.extend({\n  ${fieldExtensions.join(',\n  ')},\n})`
                : '';
            schemas.push(`export const ${schemaName} = ZoteroItemDataSchema${extensionStr};`);
        }
        // Add specific aliases for commonly used schemas
        schemas.push(`// Commonly used schema aliases
export const ZoteroNoteSchema = ZoteroNoteItemSchema;
export const ZoteroAttachmentSchema = ZoteroAttachmentItemSchema;
export const ZoteroAnnotationSchema = ZoteroAnnotationItemSchema;`);
        return schemas.join('\n\n');
    }
    /**
     * Generate API Zod schemas
     */
    generateAPISchemas() {
        return `// API and Authentication schemas
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
  groups: z.object({
    all: z.boolean(),
  }).catchall(z.boolean()),
});

export const ZoteroSettingsSchema = z.record(z.any());

export const ZoteroDeletedContentSchema = z.object({
  collections: z.array(ZoteroKeySchema),
  items: z.array(ZoteroKeySchema),
  searches: z.array(ZoteroKeySchema),
  tags: z.array(z.object({
    tag: z.string(),
    type: z.number().optional(),
  })),
});`;
    }
    /**
     * Generate template Zod schemas
     */
    generateTemplateSchemas() {
        return `// Template schemas for API responses
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
    /**
     * Generate collection Zod schemas
     */
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
      alternate: z.object({
        href: z.string(),
        type: z.string(),
      }),
    }),
  }).optional(),
  links: ZoteroLinksSchema.optional(),
  meta: ZoteroMetaSchema.optional(),
  data: ZoteroCollectionDataSchema,
});`;
    }
    /**
     * Generate search Zod schemas
     */
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
      alternate: z.object({
        href: z.string(),
        type: z.string(),
      }),
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
  format: z.enum(['json', 'keys', 'versions', 'bibtex', 'biblatex', 'bookmarks', 'coins', 'csljson', 'mods', 'refer', 'rdf_bibliontology', 'rdf_dc', 'rdf_zotero', 'ris', 'tei', 'wikipedia']).optional(),
  include: z.array(z.string()).optional(),
});

export const ZoteroSearchResultSchema = z.object({
  items: z.array(ZoteroItemSchema),
  totalResults: z.number(),
  lastModifiedVersion: ZoteroVersionSchema,
  links: ZoteroLinksSchema.optional(),
});`;
    }
    /**
     * Generate library Zod schemas
     */
    generateLibrarySchemas() {
        return `// Library and Group schemas
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
    /**
     * Generate sync Zod schemas
     */
    generateSyncSchemas() {
        return `// Sync and Error schemas
export const ZoteroSyncSchema = z.object({
  lastModifiedVersion: ZoteroVersionSchema,
  username: z.string().optional(),
  userID: z.number().optional(),
  uploaded: z.object({
    collections: z.number(),
    items: z.number(),
    searches: z.number(),
    tags: z.number(),
  }).optional(),
  unchanged: z.object({
    collections: z.number(),
    items: z.number(),
    searches: z.number(),
    tags: z.number(),
  }).optional(),
  failed: z.object({
    collections: z.array(ZoteroKeySchema),
    items: z.array(ZoteroKeySchema),
    searches: z.array(ZoteroKeySchema),
    tags: z.array(z.object({
      tag: z.string(),
      type: z.number().optional(),
    })),
  }).optional(),
});

export const ZoteroSyncErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  data: z.any().optional(),
});`;
    }
    /**
     * Generate content Zod schemas
     */
    generateContentSchemas() {
        return `// Content and Media schemas
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
  annotation: z.any().optional(), // Use z.any() to avoid circular dependency
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
    /**
     * Check if a field is a base field that shouldn't be repeated
     */
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
    /**
     * Capitalize first letter of a string
     */
    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
exports.ZodGenerator = ZodGenerator;
//# sourceMappingURL=zod-generator.js.map