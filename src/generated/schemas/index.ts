
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
});