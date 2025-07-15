import { z } from 'zod';

// Base Zod schemas
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

// Item type validation
export const ZoteroItemTypeSchema = z.enum(['annotation', 'artwork', 'attachment', 'audioRecording', 'bill', 'blogPost', 'book', 'bookSection', 'case', 'computerProgram', 'conferencePaper', 'dataset', 'dictionaryEntry', 'document', 'email', 'encyclopediaArticle', 'film', 'forumPost', 'hearing', 'instantMessage', 'interview', 'journalArticle', 'letter', 'magazineArticle', 'manuscript', 'map', 'newspaperArticle', 'note', 'patent', 'podcast', 'preprint', 'presentation', 'radioBroadcast', 'report', 'standard', 'statute', 'thesis', 'tvBroadcast', 'videoRecording', 'webpage']);

export const ZoteroAnnotationItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('annotation')
});

export const ZoteroArtworkItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('artwork'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['artist', 'contributor']),
  })).optional(),
  artworkMedium: z.string().optional(),
  artworkSize: z.string().optional()
});

export const ZoteroAttachmentItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('attachment')
});

export const ZoteroAudioRecordingItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('audioRecording'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['performer', 'contributor', 'composer', 'wordsBy']),
  })).optional(),
  audioRecordingFormat: z.string().optional(),
  seriesTitle: z.string().optional(),
  label: z.string().optional(),
  runningTime: z.string().optional()
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
  history: z.string().optional()
});

export const ZoteroBlogPostItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('blogPost'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'commenter', 'contributor']),
  })).optional(),
  blogTitle: z.string().optional(),
  websiteType: z.string().optional()
});

export const ZoteroBookItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('book'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'translator', 'seriesEditor']),
  })).optional()
});

export const ZoteroBookSectionItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('bookSection'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'bookAuthor', 'translator', 'seriesEditor']),
  })).optional(),
  bookTitle: z.string().optional(),
  pages: z.string().optional()
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
  history: z.string().optional()
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
  programmingLanguage: z.string().optional()
});

export const ZoteroConferencePaperItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('conferencePaper'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'translator', 'seriesEditor']),
  })).optional(),
  proceedingsTitle: z.string().optional(),
  conferenceName: z.string().optional(),
  pages: z.string().optional(),
  DOI: z.string().optional()
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
  citationKey: z.string().optional()
});

export const ZoteroDictionaryEntryItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('dictionaryEntry'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'translator', 'seriesEditor']),
  })).optional(),
  dictionaryTitle: z.string().optional(),
  pages: z.string().optional()
});

export const ZoteroDocumentItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('document'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'translator', 'reviewedAuthor']),
  })).optional()
});

export const ZoteroEmailItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('email'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'recipient']),
  })).optional(),
  subject: z.string().optional()
});

export const ZoteroEncyclopediaArticleItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('encyclopediaArticle'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'editor', 'translator', 'seriesEditor']),
  })).optional(),
  encyclopediaTitle: z.string().optional(),
  pages: z.string().optional()
});

export const ZoteroFilmItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('film'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['director', 'contributor', 'scriptwriter', 'producer']),
  })).optional(),
  distributor: z.string().optional(),
  genre: z.string().optional(),
  videoRecordingFormat: z.string().optional(),
  runningTime: z.string().optional()
});

export const ZoteroForumPostItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('forumPost'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor']),
  })).optional(),
  forumTitle: z.string().optional(),
  postType: z.string().optional()
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
  history: z.string().optional()
});

export const ZoteroInstantMessageItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('instantMessage'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'recipient']),
  })).optional()
});

export const ZoteroInterviewItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('interview'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['interviewee', 'contributor', 'interviewer', 'translator']),
  })).optional(),
  interviewMedium: z.string().optional()
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
  ISSN: z.string().optional()
});

export const ZoteroLetterItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('letter'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'recipient']),
  })).optional(),
  letterType: z.string().optional()
});

export const ZoteroMagazineArticleItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('magazineArticle'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'translator', 'reviewedAuthor']),
  })).optional(),
  publicationTitle: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  ISSN: z.string().optional()
});

export const ZoteroManuscriptItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('manuscript'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'translator']),
  })).optional(),
  manuscriptType: z.string().optional()
});

export const ZoteroMapItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('map'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['cartographer', 'contributor', 'seriesEditor']),
  })).optional(),
  mapType: z.string().optional(),
  scale: z.string().optional(),
  seriesTitle: z.string().optional()
});

export const ZoteroNewspaperArticleItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('newspaperArticle'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'translator', 'reviewedAuthor']),
  })).optional(),
  publicationTitle: z.string().optional(),
  section: z.string().optional(),
  pages: z.string().optional(),
  ISSN: z.string().optional()
});

export const ZoteroNoteItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('note')
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
  legalStatus: z.string().optional()
});

export const ZoteroPodcastItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('podcast'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['podcaster', 'contributor', 'guest']),
  })).optional(),
  seriesTitle: z.string().optional(),
  episodeNumber: z.string().optional(),
  audioFileType: z.string().optional(),
  runningTime: z.string().optional()
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
  citationKey: z.string().optional()
});

export const ZoteroPresentationItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('presentation'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['presenter', 'contributor']),
  })).optional(),
  presentationType: z.string().optional(),
  meetingName: z.string().optional()
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
  runningTime: z.string().optional()
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
  pages: z.string().optional()
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
  citationKey: z.string().optional()
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
  history: z.string().optional()
});

export const ZoteroThesisItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('thesis'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor']),
  })).optional(),
  thesisType: z.string().optional(),
  university: z.string().optional()
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
  runningTime: z.string().optional()
});

export const ZoteroVideoRecordingItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('videoRecording'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['director', 'scriptwriter', 'producer', 'castMember', 'contributor']),
  })).optional(),
  videoRecordingFormat: z.string().optional(),
  seriesTitle: z.string().optional(),
  studio: z.string().optional(),
  runningTime: z.string().optional()
});

export const ZoteroWebpageItemSchema = ZoteroItemDataSchema.extend({
  itemType: z.literal('webpage'),
  creators: z.array(ZoteroCreatorSchema.extend({
    creatorType: z.enum(['author', 'contributor', 'translator']),
  })).optional(),
  websiteTitle: z.string().optional(),
  websiteType: z.string().optional()
});

// Collection schemas
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

// Search schemas
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

// Library schemas
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
});