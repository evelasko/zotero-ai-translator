"use strict";
/**
 * Zod schema generator for Zotero schema
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
    /**
     * Generate base Zod schemas
     */
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
    /**
     * Generate item-specific Zod schemas
     */
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
    /**
     * Generate collection Zod schemas
     */
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
    /**
     * Generate library Zod schemas
     */
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