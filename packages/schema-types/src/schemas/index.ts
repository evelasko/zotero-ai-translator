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
});

// Field schemas derived from Zotero schema
export const ZoteroFieldSchema = z.enum(['title', 'abstractNote', 'artworkMedium', 'artworkSize', 'date', 'language', 'shortTitle', 'archive', 'archiveLocation', 'libraryCatalog', 'callNumber', 'url', 'accessDate', 'rights', 'extra', 'audioRecordingFormat', 'seriesTitle', 'volume', 'numberOfVolumes', 'place', 'label', 'runningTime', 'ISBN', 'billNumber', 'code', 'codeVolume', 'section', 'codePages', 'legislativeBody', 'session', 'history', 'blogTitle', 'websiteType', 'series', 'seriesNumber', 'edition', 'publisher', 'numPages', 'bookTitle', 'pages', 'caseName', 'court', 'dateDecided', 'docketNumber', 'reporter', 'reporterVolume', 'firstPage', 'versionNumber', 'system', 'company', 'programmingLanguage', 'proceedingsTitle', 'conferenceName', 'DOI', 'identifier', 'type', 'repository', 'repositoryLocation', 'format', 'citationKey', 'dictionaryTitle', 'subject', 'encyclopediaTitle', 'distributor', 'genre', 'videoRecordingFormat', 'forumTitle', 'postType', 'committee', 'documentNumber', 'interviewMedium', 'publicationTitle', 'issue', 'seriesText', 'journalAbbreviation', 'ISSN', 'letterType', 'manuscriptType', 'mapType', 'scale', 'country', 'assignee', 'issuingAuthority', 'patentNumber', 'filingDate', 'applicationNumber', 'priorityNumbers', 'issueDate', 'references', 'legalStatus', 'episodeNumber', 'audioFileType', 'archiveID', 'presentationType', 'meetingName', 'programTitle', 'network', 'reportNumber', 'reportType', 'institution', 'organization', 'number', 'status', 'nameOfAct', 'codeNumber', 'publicLawNumber', 'dateEnacted', 'thesisType', 'university', 'studio', 'websiteTitle']);

export const ZoteroFieldDefinitionSchema = z.object({
  field: z.string(),
  baseField: z.string().optional(),
  type: z.enum(['text', 'date', 'number']).optional(),
});

// Creator schemas derived from Zotero schema
export const ZoteroCreatorTypeSchema = z.enum(['artist', 'contributor', 'performer', 'composer', 'wordsBy', 'sponsor', 'cosponsor', 'author', 'commenter', 'editor', 'translator', 'seriesEditor', 'bookAuthor', 'counsel', 'programmer', 'reviewedAuthor', 'recipient', 'director', 'scriptwriter', 'producer', 'interviewee', 'interviewer', 'cartographer', 'inventor', 'attorneyAgent', 'podcaster', 'guest', 'presenter', 'castMember']);

export const ZoteroCreatorTypeDefinitionSchema = z.object({
  creatorType: ZoteroCreatorTypeSchema,
  primary: z.boolean().optional(),
});

// Item type schemas
export const ZoteroItemTypeSchema = z.enum(['annotation', 'artwork', 'attachment', 'audioRecording', 'bill', 'blogPost', 'book', 'bookSection', 'case', 'computerProgram', 'conferencePaper', 'dataset', 'dictionaryEntry', 'document', 'email', 'encyclopediaArticle', 'film', 'forumPost', 'hearing', 'instantMessage', 'interview', 'journalArticle', 'letter', 'magazineArticle', 'manuscript', 'map', 'newspaperArticle', 'note', 'patent', 'podcast', 'preprint', 'presentation', 'radioBroadcast', 'report', 'standard', 'statute', 'thesis', 'tvBroadcast', 'videoRecording', 'webpage']);

// Base Zotero schemas
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
});

export const ZoteroAnnotationItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('annotation'),
});

export const ZoteroArtworkItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('artwork'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['artist', 'contributor']),
  })).optional(),
  artworkMedium: z.string().optional(),
  artworkSize: z.string().optional(),
});

export const ZoteroAttachmentItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('attachment'),
});

export const ZoteroAudioRecordingItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('audioRecording'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['performer', 'contributor', 'composer', 'wordsBy']),
  })).optional(),
  audioRecordingFormat: z.string().optional(),
  seriesTitle: z.string().optional(),
  label: z.string().optional(),
  runningTime: z.string().optional(),
});

export const ZoteroBillItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('bill'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['sponsor', 'cosponsor', 'contributor']),
  })).optional(),
  billNumber: z.string().optional(),
  code: z.string().optional(),
  codeVolume: z.string().optional(),
  section: z.string().optional(),
  codePages: z.string().optional(),
  legislativeBody: z.string().optional(),
  session: z.string().optional(),
  history: z.string().optional(),
});

export const ZoteroBlogPostItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('blogPost'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'commenter', 'contributor']),
  })).optional(),
  blogTitle: z.string().optional(),
  websiteType: z.string().optional(),
});

export const ZoteroBookItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('book'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'translator', 'seriesEditor']),
  })).optional(),
});

export const ZoteroBookSectionItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('bookSection'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'bookAuthor', 'translator', 'seriesEditor']),
  })).optional(),
  bookTitle: z.string().optional(),
  pages: z.string().optional(),
});

export const ZoteroCaseItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('case'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'counsel', 'contributor']),
  })).optional(),
  caseName: z.string().optional(),
  court: z.string().optional(),
  dateDecided: z.string().optional(),
  docketNumber: z.string().optional(),
  reporter: z.string().optional(),
  reporterVolume: z.string().optional(),
  firstPage: z.string().optional(),
  history: z.string().optional(),
});

export const ZoteroComputerProgramItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('computerProgram'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['programmer', 'contributor']),
  })).optional(),
  seriesTitle: z.string().optional(),
  versionNumber: z.string().optional(),
  system: z.string().optional(),
  company: z.string().optional(),
  programmingLanguage: z.string().optional(),
});

export const ZoteroConferencePaperItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('conferencePaper'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'translator', 'seriesEditor']),
  })).optional(),
  proceedingsTitle: z.string().optional(),
  conferenceName: z.string().optional(),
  pages: z.string().optional(),
  DOI: z.string().optional(),
});

export const ZoteroDatasetItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('dataset'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor']),
  })).optional(),
  identifier: z.string().optional(),
  type: z.string().optional(),
  versionNumber: z.string().optional(),
  repository: z.string().optional(),
  repositoryLocation: z.string().optional(),
  format: z.string().optional(),
  DOI: z.string().optional(),
  citationKey: z.string().optional(),
});

export const ZoteroDictionaryEntryItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('dictionaryEntry'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'translator', 'seriesEditor']),
  })).optional(),
  dictionaryTitle: z.string().optional(),
  pages: z.string().optional(),
});

export const ZoteroDocumentItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('document'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'translator', 'reviewedAuthor']),
  })).optional(),
});

export const ZoteroEmailItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('email'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'recipient']),
  })).optional(),
  subject: z.string().optional(),
});

export const ZoteroEncyclopediaArticleItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('encyclopediaArticle'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'translator', 'seriesEditor']),
  })).optional(),
  encyclopediaTitle: z.string().optional(),
  pages: z.string().optional(),
});

export const ZoteroFilmItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('film'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['director', 'contributor', 'scriptwriter', 'producer']),
  })).optional(),
  distributor: z.string().optional(),
  genre: z.string().optional(),
  videoRecordingFormat: z.string().optional(),
  runningTime: z.string().optional(),
});

export const ZoteroForumPostItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('forumPost'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor']),
  })).optional(),
  forumTitle: z.string().optional(),
  postType: z.string().optional(),
});

export const ZoteroHearingItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('hearing'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['contributor']),
  })).optional(),
  committee: z.string().optional(),
  documentNumber: z.string().optional(),
  pages: z.string().optional(),
  legislativeBody: z.string().optional(),
  session: z.string().optional(),
  history: z.string().optional(),
});

export const ZoteroInstantMessageItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('instantMessage'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'recipient']),
  })).optional(),
});

export const ZoteroInterviewItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('interview'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['interviewee', 'contributor', 'interviewer', 'translator']),
  })).optional(),
  interviewMedium: z.string().optional(),
});

export const ZoteroJournalArticleItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('journalArticle'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'translator', 'reviewedAuthor']),
  })).optional(),
  publicationTitle: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  seriesTitle: z.string().optional(),
  seriesText: z.string().optional(),
  journalAbbreviation: z.string().optional(),
  DOI: z.string().optional(),
  ISSN: z.string().optional(),
});

export const ZoteroLetterItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('letter'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'recipient']),
  })).optional(),
  letterType: z.string().optional(),
});

export const ZoteroMagazineArticleItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('magazineArticle'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'translator', 'reviewedAuthor']),
  })).optional(),
  publicationTitle: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  ISSN: z.string().optional(),
});

export const ZoteroManuscriptItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('manuscript'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'translator']),
  })).optional(),
  manuscriptType: z.string().optional(),
});

export const ZoteroMapItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('map'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['cartographer', 'contributor', 'seriesEditor']),
  })).optional(),
  mapType: z.string().optional(),
  scale: z.string().optional(),
  seriesTitle: z.string().optional(),
});

export const ZoteroNewspaperArticleItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('newspaperArticle'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'translator', 'reviewedAuthor']),
  })).optional(),
  publicationTitle: z.string().optional(),
  section: z.string().optional(),
  pages: z.string().optional(),
  ISSN: z.string().optional(),
});

export const ZoteroNoteItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('note'),
});

export const ZoteroPatentItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('patent'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['inventor', 'attorneyAgent', 'contributor']),
  })).optional(),
  country: z.string().optional(),
  assignee: z.string().optional(),
  issuingAuthority: z.string().optional(),
  patentNumber: z.string().optional(),
  filingDate: z.string().optional(),
  pages: z.string().optional(),
  applicationNumber: z.string().optional(),
  priorityNumbers: z.string().optional(),
  issueDate: z.string().optional(),
  references: z.string().optional(),
  legalStatus: z.string().optional(),
});

export const ZoteroPodcastItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('podcast'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['podcaster', 'contributor', 'guest']),
  })).optional(),
  seriesTitle: z.string().optional(),
  episodeNumber: z.string().optional(),
  audioFileType: z.string().optional(),
  runningTime: z.string().optional(),
});

export const ZoteroPreprintItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('preprint'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'translator', 'reviewedAuthor']),
  })).optional(),
  genre: z.string().optional(),
  repository: z.string().optional(),
  archiveID: z.string().optional(),
  DOI: z.string().optional(),
  citationKey: z.string().optional(),
});

export const ZoteroPresentationItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('presentation'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['presenter', 'contributor']),
  })).optional(),
  presentationType: z.string().optional(),
  meetingName: z.string().optional(),
});

export const ZoteroRadioBroadcastItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('radioBroadcast'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['director', 'scriptwriter', 'producer', 'castMember', 'contributor', 'guest']),
  })).optional(),
  programTitle: z.string().optional(),
  episodeNumber: z.string().optional(),
  audioRecordingFormat: z.string().optional(),
  network: z.string().optional(),
  runningTime: z.string().optional(),
});

export const ZoteroReportItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('report'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'translator', 'seriesEditor']),
  })).optional(),
  reportNumber: z.string().optional(),
  reportType: z.string().optional(),
  seriesTitle: z.string().optional(),
  institution: z.string().optional(),
  pages: z.string().optional(),
});

export const ZoteroStandardItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('standard'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor']),
  })).optional(),
  organization: z.string().optional(),
  committee: z.string().optional(),
  type: z.string().optional(),
  number: z.string().optional(),
  versionNumber: z.string().optional(),
  status: z.string().optional(),
  DOI: z.string().optional(),
  citationKey: z.string().optional(),
});

export const ZoteroStatuteItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('statute'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor']),
  })).optional(),
  nameOfAct: z.string().optional(),
  code: z.string().optional(),
  codeNumber: z.string().optional(),
  publicLawNumber: z.string().optional(),
  dateEnacted: z.string().optional(),
  pages: z.string().optional(),
  section: z.string().optional(),
  session: z.string().optional(),
  history: z.string().optional(),
});

export const ZoteroThesisItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('thesis'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor']),
  })).optional(),
  thesisType: z.string().optional(),
  university: z.string().optional(),
});

export const ZoteroTvBroadcastItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('tvBroadcast'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['director', 'scriptwriter', 'producer', 'castMember', 'contributor', 'guest']),
  })).optional(),
  programTitle: z.string().optional(),
  episodeNumber: z.string().optional(),
  videoRecordingFormat: z.string().optional(),
  network: z.string().optional(),
  runningTime: z.string().optional(),
});

export const ZoteroVideoRecordingItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('videoRecording'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['director', 'scriptwriter', 'producer', 'castMember', 'contributor']),
  })).optional(),
  videoRecordingFormat: z.string().optional(),
  seriesTitle: z.string().optional(),
  studio: z.string().optional(),
  runningTime: z.string().optional(),
});

export const ZoteroWebpageItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('webpage'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'translator']),
  })).optional(),
  websiteTitle: z.string().optional(),
  websiteType: z.string().optional(),
});

// Commonly used schema aliases
export const ZoteroNoteSchema = ZoteroNoteItemSchema;
export const ZoteroAttachmentSchema = ZoteroAttachmentItemSchema;
export const ZoteroAnnotationSchema = ZoteroAnnotationItemSchema;

// API and Authentication schemas
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
});

// Template schemas for API responses
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
      alternate: z.object({
        href: z.string(),
        type: z.string(),
      }),
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
});

// Library and Group schemas
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
});

// Sync and Error schemas
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
});

// Content and Media schemas
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
});