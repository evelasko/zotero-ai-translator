"use strict";
/**
 * TypeScript type generator for Zotero schema
 * Generates comprehensive types based on the official Zotero API schema
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeGenerator = void 0;
class TypeGenerator {
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
     * Generate all TypeScript types from the schema
     */
    generateTypes() {
        const types = [];
        // Generate utility types first
        types.push(this.generateUtilityTypes());
        // Generate field types from schema
        types.push(this.generateFieldTypes());
        // Generate creator types from schema
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
        // Generate library and user types
        types.push(this.generateLibraryTypes());
        // Generate sync types
        types.push(this.generateSyncTypes());
        // Generate content types
        types.push(this.generateContentTypes());
        return types.join('\n\n');
    }
    /**
     * Generate utility types
     */
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

// API Response wrapper types
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
    /**
     * Generate field types from schema
     */
    generateFieldTypes() {
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
        const fieldUnion = Array.from(allFields).map(field => `'${field}'`).join(' | ');
        return `// Field types derived from Zotero schema
export type ZoteroField = ${fieldUnion};

export interface ZoteroFieldDefinition {
  field: string;
  baseField?: string;
  type?: 'text' | 'date' | 'number';
}`;
    }
    /**
     * Generate creator types from schema
     */
    generateCreatorTypes() {
        const allCreatorTypes = new Set();
        // Collect all unique creator types from all item types
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
    /**
     * Generate item type definitions
     */
    generateItemTypeDefinitions() {
        const itemTypeNames = this.schema.itemTypes.map(item => `'${item.itemType}'`);
        const itemTypeUnion = itemTypeNames.join(' | ');
        return `// Item type definitions
export type ZoteroItemType = ${itemTypeUnion};`;
    }
    /**
     * Generate base types
     */
    generateBaseTypes() {
        return `// Base Zotero types
export interface ZoteroLinks {
  self?: {
    href: string;
    type: string;
  };
  alternate?: {
    href: string;
    type: string;
  };
  up?: {
    href: string;
    type: string;
  };
  enclosure?: {
    href: string;
    type: string;
    length?: number;
    title?: string;
  };
}

export interface ZoteroMeta {
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
  collections?: ZoteroKey[];
  relations?: ZoteroRelation;
  dateAdded?: string;
  dateModified?: string;
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
    /**
     * Generate specific item types (Note, Attachment, Annotation)
     */
    generateSpecificItemTypes() {
        const types = [];
        // Generate all specific item type interfaces
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
                : 'ZoteroCreatorType';
            types.push(`export interface ${interfaceName} extends ZoteroItemData {
  itemType: '${itemType.itemType}';${fieldProperties ? `\n${fieldProperties}` : ''}
  creators?: (ZoteroCreator & { creatorType: ${creatorTypeUnion} })[];
}`);
        }
        // Add specific aliases for commonly used types
        types.push(`// Commonly used type aliases
export type ZoteroNote = ZoteroNoteItem;
export type ZoteroAttachment = ZoteroAttachmentItem;
export type ZoteroAnnotation = ZoteroAnnotationItem;`);
        return types.join('\n\n');
    }
    /**
     * Generate API types
     */
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
  groups: {
    all: boolean;
    [groupId: string]: boolean;
  };
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
    /**
     * Generate template types for API responses
     */
    generateTemplateTypes() {
        return `// Template types for API responses
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
    /**
     * Generate collection types
     */
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
    /**
     * Generate search types
     */
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
  format?: 'json' | 'keys' | 'versions' | 'bibtex' | 'biblatex' | 'bookmarks' | 'coins' | 'csljson' | 'mods' | 'refer' | 'rdf_bibliontology' | 'rdf_dc' | 'rdf_zotero' | 'ris' | 'tei' | 'wikipedia';
  include?: string[];
}

export interface ZoteroSearchResult<T = ZoteroItem> {
  items: T[];
  totalResults: number;
  lastModifiedVersion: ZoteroVersion;
  links?: ZoteroLinks;
}`;
    }
    /**
     * Generate library and user types
     */
    generateLibraryTypes() {
        return `// Library and Group types
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
    /**
     * Generate sync types
     */
    generateSyncTypes() {
        return `// Sync and Error types
export interface ZoteroSync {
  lastModifiedVersion: ZoteroVersion;
  username?: string;
  userID?: number;
  uploaded?: {
    collections: number;
    items: number;
    searches: number;
    tags: number;
  };
  unchanged?: {
    collections: number;
    items: number;
    searches: number;
    tags: number;
  };
  failed?: {
    collections: ZoteroKey[];
    items: ZoteroKey[];
    searches: ZoteroKey[];
    tags: { tag: string; type?: number }[];
  };
}

export interface ZoteroSyncError {
  code: string;
  message: string;
  data?: any;
}`;
    }
    /**
     * Generate content types for fulltext, highlights, etc.
     */
    generateContentTypes() {
        return `// Content and Media types
export interface ZoteroFulltextContent {
  content: string;
  indexedChars: number;
  totalChars: number;
}

export interface ZoteroHighlight {
  text: string;
  color: string;
  pageLabel?: string;
  position: {
    pageIndex: number;
    rects: number[][];
  };
}

export interface ZoteroImage {
  src: string;
  width?: number;
  height?: number;
  annotation?: ZoteroAnnotation;
}

export interface ZoteroInk {
  paths: number[][][];
  width: number;
  color: string;
  pageLabel?: string;
  position: {
    pageIndex: number;
    rects: number[][];
  };
}`;
    }
    /**
     * Capitalize first letter of a string
     */
    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
exports.TypeGenerator = TypeGenerator;
//# sourceMappingURL=type-generator.js.map