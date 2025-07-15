"use strict";
/**
 * TypeScript type generator for Zotero schema
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
    /**
     * Generate base TypeScript types
     */
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
    /**
     * Generate item-specific TypeScript types
     */
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
    /**
     * Generate collection TypeScript types
     */
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
    /**
     * Generate search TypeScript types
     */
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
    /**
     * Generate library TypeScript types
     */
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
    /**
     * Capitalize first letter of a string
     */
    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
exports.TypeGenerator = TypeGenerator;
//# sourceMappingURL=type-generator.js.map