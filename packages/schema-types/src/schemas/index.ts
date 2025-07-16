import { z } from 'zod';

// Utility schemas
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
});

// Field schemas
export const ZoteroFieldSchema = z.enum(['title', 'abstractNote', 'artworkMedium', 'artworkSize', 'date', 'language', 'shortTitle', 'archive', 'archiveLocation', 'libraryCatalog', 'callNumber', 'url', 'accessDate', 'rights', 'extra', 'audioRecordingFormat', 'seriesTitle', 'volume', 'numberOfVolumes', 'place', 'label', 'runningTime', 'ISBN', 'billNumber', 'code', 'codeVolume', 'section', 'codePages', 'legislativeBody', 'session', 'history', 'blogTitle', 'websiteType', 'series', 'seriesNumber', 'edition', 'publisher', 'numPages', 'bookTitle', 'pages', 'caseName', 'court', 'dateDecided', 'docketNumber', 'reporter', 'reporterVolume', 'firstPage', 'versionNumber', 'system', 'company', 'programmingLanguage', 'proceedingsTitle', 'conferenceName', 'DOI', 'identifier', 'type', 'repository', 'repositoryLocation', 'format', 'citationKey', 'dictionaryTitle', 'subject', 'encyclopediaTitle', 'distributor', 'genre', 'videoRecordingFormat', 'forumTitle', 'postType', 'committee', 'documentNumber', 'interviewMedium', 'publicationTitle', 'issue', 'seriesText', 'journalAbbreviation', 'ISSN', 'letterType', 'manuscriptType', 'mapType', 'scale', 'country', 'assignee', 'issuingAuthority', 'patentNumber', 'filingDate', 'applicationNumber', 'priorityNumbers', 'issueDate', 'references', 'legalStatus', 'episodeNumber', 'audioFileType', 'archiveID', 'presentationType', 'meetingName', 'programTitle', 'network', 'reportNumber', 'reportType', 'institution', 'organization', 'number', 'status', 'nameOfAct', 'codeNumber', 'publicLawNumber', 'dateEnacted', 'thesisType', 'university', 'studio', 'websiteTitle']);

export const ZoteroFieldDefinitionSchema = z.object({
  field: z.string(),
  baseField: z.string().optional(),
  type: z.enum(['text', 'date', 'number']).optional(),
});

// Creator schemas
export const ZoteroCreatorTypeSchema = z.enum(['artist', 'contributor', 'performer', 'composer', 'wordsBy', 'sponsor', 'cosponsor', 'author', 'commenter', 'editor', 'translator', 'seriesEditor', 'bookAuthor', 'counsel', 'programmer', 'reviewedAuthor', 'recipient', 'director', 'scriptwriter', 'producer', 'interviewee', 'interviewer', 'cartographer', 'inventor', 'attorneyAgent', 'podcaster', 'guest', 'presenter', 'castMember']);

export const ZoteroCreatorTypeDefinitionSchema = z.object({
  creatorType: ZoteroCreatorTypeSchema,
  primary: z.boolean().optional(),
});

// Item type schemas
export const ZoteroItemTypeSchema = z.enum(['annotation', 'artwork', 'attachment', 'audioRecording', 'bill', 'blogPost', 'book', 'bookSection', 'case', 'computerProgram', 'conferencePaper', 'dataset', 'dictionaryEntry', 'document', 'email', 'encyclopediaArticle', 'film', 'forumPost', 'hearing', 'instantMessage', 'interview', 'journalArticle', 'letter', 'magazineArticle', 'manuscript', 'map', 'newspaperArticle', 'note', 'patent', 'podcast', 'preprint', 'presentation', 'radioBroadcast', 'report', 'standard', 'statute', 'thesis', 'tvBroadcast', 'videoRecording', 'webpage']);

// Base schemas
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
});

export const ZoteroAnnotationItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('annotation'),
});

export const ZoteroArtworkItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('artwork'),
});

export const ZoteroAttachmentItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('attachment'),
});

export const ZoteroAudioRecordingItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('audioRecording'),
});

export const ZoteroBillItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('bill'),
});

export const ZoteroBlogPostItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('blogPost'),
});

export const ZoteroBookItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('book'),
});

export const ZoteroBookSectionItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('bookSection'),
});

export const ZoteroCaseItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('case'),
});

export const ZoteroComputerProgramItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('computerProgram'),
});

export const ZoteroConferencePaperItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('conferencePaper'),
});

export const ZoteroDatasetItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('dataset'),
});

export const ZoteroDictionaryEntryItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('dictionaryEntry'),
});

export const ZoteroDocumentItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('document'),
});

export const ZoteroEmailItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('email'),
});

export const ZoteroEncyclopediaArticleItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('encyclopediaArticle'),
});

export const ZoteroFilmItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('film'),
});

export const ZoteroForumPostItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('forumPost'),
});

export const ZoteroHearingItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('hearing'),
});

export const ZoteroInstantMessageItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('instantMessage'),
});

export const ZoteroInterviewItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('interview'),
});

export const ZoteroJournalArticleItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('journalArticle'),
});

export const ZoteroLetterItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('letter'),
});

export const ZoteroMagazineArticleItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('magazineArticle'),
});

export const ZoteroManuscriptItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('manuscript'),
});

export const ZoteroMapItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('map'),
});

export const ZoteroNewspaperArticleItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('newspaperArticle'),
});

export const ZoteroNoteItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('note'),
});

export const ZoteroPatentItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('patent'),
});

export const ZoteroPodcastItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('podcast'),
});

export const ZoteroPreprintItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('preprint'),
});

export const ZoteroPresentationItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('presentation'),
});

export const ZoteroRadioBroadcastItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('radioBroadcast'),
});

export const ZoteroReportItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('report'),
});

export const ZoteroStandardItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('standard'),
});

export const ZoteroStatuteItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('statute'),
});

export const ZoteroThesisItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('thesis'),
});

export const ZoteroTvBroadcastItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('tvBroadcast'),
});

export const ZoteroVideoRecordingItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('videoRecording'),
});

export const ZoteroWebpageItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('webpage'),
});

// Commonly used schema aliases
export const ZoteroNoteSchema = ZoteroNoteItemSchema;
export const ZoteroAttachmentSchema = ZoteroAttachmentItemSchema;
export const ZoteroAnnotationSchema = ZoteroAnnotationItemSchema;

// API schemas
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
});

// Template schemas
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
});

// Collection schemas
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
});

// Search schemas
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
});

// Library schemas
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
});

// Sync schemas
export const ZoteroSyncSchema = z.object({
  lastModifiedVersion: ZoteroVersionSchema,
  username: z.string().optional(),
  userID: z.number().optional(),
});

export const ZoteroSyncErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  data: z.any().optional(),
});

// Content schemas
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
});