"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoteroSearchSchema = exports.ZoteroSearchDataSchema = exports.ZoteroSearchConditionSchema = exports.ZoteroCollectionSchema = exports.ZoteroCollectionDataSchema = exports.ZoteroWebpageItemSchema = exports.ZoteroVideoRecordingItemSchema = exports.ZoteroTvBroadcastItemSchema = exports.ZoteroThesisItemSchema = exports.ZoteroStatuteItemSchema = exports.ZoteroStandardItemSchema = exports.ZoteroReportItemSchema = exports.ZoteroRadioBroadcastItemSchema = exports.ZoteroPresentationItemSchema = exports.ZoteroPreprintItemSchema = exports.ZoteroPodcastItemSchema = exports.ZoteroPatentItemSchema = exports.ZoteroNoteItemSchema = exports.ZoteroNewspaperArticleItemSchema = exports.ZoteroMapItemSchema = exports.ZoteroManuscriptItemSchema = exports.ZoteroMagazineArticleItemSchema = exports.ZoteroLetterItemSchema = exports.ZoteroJournalArticleItemSchema = exports.ZoteroInterviewItemSchema = exports.ZoteroInstantMessageItemSchema = exports.ZoteroHearingItemSchema = exports.ZoteroForumPostItemSchema = exports.ZoteroFilmItemSchema = exports.ZoteroEncyclopediaArticleItemSchema = exports.ZoteroEmailItemSchema = exports.ZoteroDocumentItemSchema = exports.ZoteroDictionaryEntryItemSchema = exports.ZoteroDatasetItemSchema = exports.ZoteroConferencePaperItemSchema = exports.ZoteroComputerProgramItemSchema = exports.ZoteroCaseItemSchema = exports.ZoteroBookSectionItemSchema = exports.ZoteroBookItemSchema = exports.ZoteroBlogPostItemSchema = exports.ZoteroBillItemSchema = exports.ZoteroAudioRecordingItemSchema = exports.ZoteroAttachmentItemSchema = exports.ZoteroArtworkItemSchema = exports.ZoteroAnnotationItemSchema = exports.ZoteroItemTypeSchema = exports.ZoteroItemSchema = exports.ZoteroItemDataSchema = exports.ZoteroTagSchema = exports.ZoteroCreatorSchema = void 0;
exports.ZoteroGroupSchema = exports.ZoteroGroupMemberSchema = exports.ZoteroLibrarySchema = void 0;
const zod_1 = require("zod");
// Base Zod schemas
exports.ZoteroCreatorSchema = zod_1.z.object({
    creatorType: zod_1.z.string(),
    name: zod_1.z.string().optional(),
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
});
exports.ZoteroTagSchema = zod_1.z.object({
    tag: zod_1.z.string(),
    type: zod_1.z.number().optional(),
});
exports.ZoteroItemDataSchema = zod_1.z.object({
    key: zod_1.z.string().optional(),
    version: zod_1.z.number().optional(),
    itemType: zod_1.z.string(),
    title: zod_1.z.string().optional(),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema).optional(),
    abstractNote: zod_1.z.string().optional(),
    series: zod_1.z.string().optional(),
    seriesNumber: zod_1.z.string().optional(),
    volume: zod_1.z.string().optional(),
    numberOfVolumes: zod_1.z.string().optional(),
    edition: zod_1.z.string().optional(),
    place: zod_1.z.string().optional(),
    publisher: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    numPages: zod_1.z.string().optional(),
    language: zod_1.z.string().optional(),
    ISBN: zod_1.z.string().optional(),
    shortTitle: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    accessDate: zod_1.z.string().optional(),
    archive: zod_1.z.string().optional(),
    archiveLocation: zod_1.z.string().optional(),
    libraryCatalog: zod_1.z.string().optional(),
    callNumber: zod_1.z.string().optional(),
    rights: zod_1.z.string().optional(),
    extra: zod_1.z.string().optional(),
    tags: zod_1.z.array(exports.ZoteroTagSchema).optional(),
    collections: zod_1.z.array(zod_1.z.string()).optional(),
    relations: zod_1.z.record(zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())])).optional(),
    dateAdded: zod_1.z.string().optional(),
    dateModified: zod_1.z.string().optional(),
});
exports.ZoteroItemSchema = zod_1.z.object({
    key: zod_1.z.string().optional(),
    version: zod_1.z.number().optional(),
    library: zod_1.z.object({
        type: zod_1.z.enum(['user', 'group']),
        id: zod_1.z.number(),
        name: zod_1.z.string(),
        links: zod_1.z.object({
            alternate: zod_1.z.object({
                href: zod_1.z.string(),
                type: zod_1.z.string(),
            }),
        }),
    }).optional(),
    links: zod_1.z.object({
        self: zod_1.z.object({
            href: zod_1.z.string(),
            type: zod_1.z.string(),
        }).optional(),
        alternate: zod_1.z.object({
            href: zod_1.z.string(),
            type: zod_1.z.string(),
        }).optional(),
    }).optional(),
    meta: zod_1.z.object({
        createdByUser: zod_1.z.object({
            id: zod_1.z.number(),
            username: zod_1.z.string(),
            name: zod_1.z.string(),
        }).optional(),
        createdDate: zod_1.z.string().optional(),
        lastModifiedByUser: zod_1.z.object({
            id: zod_1.z.number(),
            username: zod_1.z.string(),
            name: zod_1.z.string(),
        }).optional(),
        lastModifiedDate: zod_1.z.string().optional(),
        numChildren: zod_1.z.number().optional(),
    }).optional(),
    data: exports.ZoteroItemDataSchema,
});
// Item type validation
exports.ZoteroItemTypeSchema = zod_1.z.enum(['annotation', 'artwork', 'attachment', 'audioRecording', 'bill', 'blogPost', 'book', 'bookSection', 'case', 'computerProgram', 'conferencePaper', 'dataset', 'dictionaryEntry', 'document', 'email', 'encyclopediaArticle', 'film', 'forumPost', 'hearing', 'instantMessage', 'interview', 'journalArticle', 'letter', 'magazineArticle', 'manuscript', 'map', 'newspaperArticle', 'note', 'patent', 'podcast', 'preprint', 'presentation', 'radioBroadcast', 'report', 'standard', 'statute', 'thesis', 'tvBroadcast', 'videoRecording', 'webpage']);
exports.ZoteroAnnotationItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('annotation')
});
exports.ZoteroArtworkItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('artwork'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['artist', 'contributor']),
    })).optional(),
    artworkMedium: zod_1.z.string().optional(),
    artworkSize: zod_1.z.string().optional()
});
exports.ZoteroAttachmentItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('attachment')
});
exports.ZoteroAudioRecordingItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('audioRecording'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['performer', 'contributor', 'composer', 'wordsBy']),
    })).optional(),
    audioRecordingFormat: zod_1.z.string().optional(),
    seriesTitle: zod_1.z.string().optional(),
    label: zod_1.z.string().optional(),
    runningTime: zod_1.z.string().optional()
});
exports.ZoteroBillItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('bill'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['sponsor', 'cosponsor', 'contributor']),
    })).optional(),
    billNumber: zod_1.z.string().optional(),
    code: zod_1.z.string().optional(),
    codeVolume: zod_1.z.string().optional(),
    section: zod_1.z.string().optional(),
    codePages: zod_1.z.string().optional(),
    legislativeBody: zod_1.z.string().optional(),
    session: zod_1.z.string().optional(),
    history: zod_1.z.string().optional()
});
exports.ZoteroBlogPostItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('blogPost'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'commenter', 'contributor']),
    })).optional(),
    blogTitle: zod_1.z.string().optional(),
    websiteType: zod_1.z.string().optional()
});
exports.ZoteroBookItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('book'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'editor', 'translator', 'seriesEditor']),
    })).optional()
});
exports.ZoteroBookSectionItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('bookSection'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'editor', 'bookAuthor', 'translator', 'seriesEditor']),
    })).optional(),
    bookTitle: zod_1.z.string().optional(),
    pages: zod_1.z.string().optional()
});
exports.ZoteroCaseItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('case'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'counsel', 'contributor']),
    })).optional(),
    caseName: zod_1.z.string().optional(),
    court: zod_1.z.string().optional(),
    dateDecided: zod_1.z.string().optional(),
    docketNumber: zod_1.z.string().optional(),
    reporter: zod_1.z.string().optional(),
    reporterVolume: zod_1.z.string().optional(),
    firstPage: zod_1.z.string().optional(),
    history: zod_1.z.string().optional()
});
exports.ZoteroComputerProgramItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('computerProgram'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['programmer', 'contributor']),
    })).optional(),
    seriesTitle: zod_1.z.string().optional(),
    versionNumber: zod_1.z.string().optional(),
    system: zod_1.z.string().optional(),
    company: zod_1.z.string().optional(),
    programmingLanguage: zod_1.z.string().optional()
});
exports.ZoteroConferencePaperItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('conferencePaper'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'editor', 'translator', 'seriesEditor']),
    })).optional(),
    proceedingsTitle: zod_1.z.string().optional(),
    conferenceName: zod_1.z.string().optional(),
    pages: zod_1.z.string().optional(),
    DOI: zod_1.z.string().optional()
});
exports.ZoteroDatasetItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('dataset'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor']),
    })).optional(),
    identifier: zod_1.z.string().optional(),
    type: zod_1.z.string().optional(),
    versionNumber: zod_1.z.string().optional(),
    repository: zod_1.z.string().optional(),
    repositoryLocation: zod_1.z.string().optional(),
    format: zod_1.z.string().optional(),
    DOI: zod_1.z.string().optional(),
    citationKey: zod_1.z.string().optional()
});
exports.ZoteroDictionaryEntryItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('dictionaryEntry'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'editor', 'translator', 'seriesEditor']),
    })).optional(),
    dictionaryTitle: zod_1.z.string().optional(),
    pages: zod_1.z.string().optional()
});
exports.ZoteroDocumentItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('document'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'editor', 'translator', 'reviewedAuthor']),
    })).optional()
});
exports.ZoteroEmailItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('email'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'recipient']),
    })).optional(),
    subject: zod_1.z.string().optional()
});
exports.ZoteroEncyclopediaArticleItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('encyclopediaArticle'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'editor', 'translator', 'seriesEditor']),
    })).optional(),
    encyclopediaTitle: zod_1.z.string().optional(),
    pages: zod_1.z.string().optional()
});
exports.ZoteroFilmItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('film'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['director', 'contributor', 'scriptwriter', 'producer']),
    })).optional(),
    distributor: zod_1.z.string().optional(),
    genre: zod_1.z.string().optional(),
    videoRecordingFormat: zod_1.z.string().optional(),
    runningTime: zod_1.z.string().optional()
});
exports.ZoteroForumPostItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('forumPost'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor']),
    })).optional(),
    forumTitle: zod_1.z.string().optional(),
    postType: zod_1.z.string().optional()
});
exports.ZoteroHearingItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('hearing'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['contributor']),
    })).optional(),
    committee: zod_1.z.string().optional(),
    documentNumber: zod_1.z.string().optional(),
    pages: zod_1.z.string().optional(),
    legislativeBody: zod_1.z.string().optional(),
    session: zod_1.z.string().optional(),
    history: zod_1.z.string().optional()
});
exports.ZoteroInstantMessageItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('instantMessage'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'recipient']),
    })).optional()
});
exports.ZoteroInterviewItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('interview'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['interviewee', 'contributor', 'interviewer', 'translator']),
    })).optional(),
    interviewMedium: zod_1.z.string().optional()
});
exports.ZoteroJournalArticleItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('journalArticle'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'editor', 'translator', 'reviewedAuthor']),
    })).optional(),
    publicationTitle: zod_1.z.string().optional(),
    issue: zod_1.z.string().optional(),
    pages: zod_1.z.string().optional(),
    seriesTitle: zod_1.z.string().optional(),
    seriesText: zod_1.z.string().optional(),
    journalAbbreviation: zod_1.z.string().optional(),
    DOI: zod_1.z.string().optional(),
    ISSN: zod_1.z.string().optional()
});
exports.ZoteroLetterItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('letter'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'recipient']),
    })).optional(),
    letterType: zod_1.z.string().optional()
});
exports.ZoteroMagazineArticleItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('magazineArticle'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'translator', 'reviewedAuthor']),
    })).optional(),
    publicationTitle: zod_1.z.string().optional(),
    issue: zod_1.z.string().optional(),
    pages: zod_1.z.string().optional(),
    ISSN: zod_1.z.string().optional()
});
exports.ZoteroManuscriptItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('manuscript'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'translator']),
    })).optional(),
    manuscriptType: zod_1.z.string().optional()
});
exports.ZoteroMapItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('map'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['cartographer', 'contributor', 'seriesEditor']),
    })).optional(),
    mapType: zod_1.z.string().optional(),
    scale: zod_1.z.string().optional(),
    seriesTitle: zod_1.z.string().optional()
});
exports.ZoteroNewspaperArticleItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('newspaperArticle'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'translator', 'reviewedAuthor']),
    })).optional(),
    publicationTitle: zod_1.z.string().optional(),
    section: zod_1.z.string().optional(),
    pages: zod_1.z.string().optional(),
    ISSN: zod_1.z.string().optional()
});
exports.ZoteroNoteItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('note')
});
exports.ZoteroPatentItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('patent'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['inventor', 'attorneyAgent', 'contributor']),
    })).optional(),
    country: zod_1.z.string().optional(),
    assignee: zod_1.z.string().optional(),
    issuingAuthority: zod_1.z.string().optional(),
    patentNumber: zod_1.z.string().optional(),
    filingDate: zod_1.z.string().optional(),
    pages: zod_1.z.string().optional(),
    applicationNumber: zod_1.z.string().optional(),
    priorityNumbers: zod_1.z.string().optional(),
    issueDate: zod_1.z.string().optional(),
    references: zod_1.z.string().optional(),
    legalStatus: zod_1.z.string().optional()
});
exports.ZoteroPodcastItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('podcast'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['podcaster', 'contributor', 'guest']),
    })).optional(),
    seriesTitle: zod_1.z.string().optional(),
    episodeNumber: zod_1.z.string().optional(),
    audioFileType: zod_1.z.string().optional(),
    runningTime: zod_1.z.string().optional()
});
exports.ZoteroPreprintItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('preprint'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'editor', 'translator', 'reviewedAuthor']),
    })).optional(),
    genre: zod_1.z.string().optional(),
    repository: zod_1.z.string().optional(),
    archiveID: zod_1.z.string().optional(),
    DOI: zod_1.z.string().optional(),
    citationKey: zod_1.z.string().optional()
});
exports.ZoteroPresentationItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('presentation'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['presenter', 'contributor']),
    })).optional(),
    presentationType: zod_1.z.string().optional(),
    meetingName: zod_1.z.string().optional()
});
exports.ZoteroRadioBroadcastItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('radioBroadcast'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['director', 'scriptwriter', 'producer', 'castMember', 'contributor', 'guest']),
    })).optional(),
    programTitle: zod_1.z.string().optional(),
    episodeNumber: zod_1.z.string().optional(),
    audioRecordingFormat: zod_1.z.string().optional(),
    network: zod_1.z.string().optional(),
    runningTime: zod_1.z.string().optional()
});
exports.ZoteroReportItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('report'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'translator', 'seriesEditor']),
    })).optional(),
    reportNumber: zod_1.z.string().optional(),
    reportType: zod_1.z.string().optional(),
    seriesTitle: zod_1.z.string().optional(),
    institution: zod_1.z.string().optional(),
    pages: zod_1.z.string().optional()
});
exports.ZoteroStandardItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('standard'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor']),
    })).optional(),
    organization: zod_1.z.string().optional(),
    committee: zod_1.z.string().optional(),
    type: zod_1.z.string().optional(),
    number: zod_1.z.string().optional(),
    versionNumber: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
    DOI: zod_1.z.string().optional(),
    citationKey: zod_1.z.string().optional()
});
exports.ZoteroStatuteItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('statute'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor']),
    })).optional(),
    nameOfAct: zod_1.z.string().optional(),
    code: zod_1.z.string().optional(),
    codeNumber: zod_1.z.string().optional(),
    publicLawNumber: zod_1.z.string().optional(),
    dateEnacted: zod_1.z.string().optional(),
    pages: zod_1.z.string().optional(),
    section: zod_1.z.string().optional(),
    session: zod_1.z.string().optional(),
    history: zod_1.z.string().optional()
});
exports.ZoteroThesisItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('thesis'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor']),
    })).optional(),
    thesisType: zod_1.z.string().optional(),
    university: zod_1.z.string().optional()
});
exports.ZoteroTvBroadcastItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('tvBroadcast'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['director', 'scriptwriter', 'producer', 'castMember', 'contributor', 'guest']),
    })).optional(),
    programTitle: zod_1.z.string().optional(),
    episodeNumber: zod_1.z.string().optional(),
    videoRecordingFormat: zod_1.z.string().optional(),
    network: zod_1.z.string().optional(),
    runningTime: zod_1.z.string().optional()
});
exports.ZoteroVideoRecordingItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('videoRecording'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['director', 'scriptwriter', 'producer', 'castMember', 'contributor']),
    })).optional(),
    videoRecordingFormat: zod_1.z.string().optional(),
    seriesTitle: zod_1.z.string().optional(),
    studio: zod_1.z.string().optional(),
    runningTime: zod_1.z.string().optional()
});
exports.ZoteroWebpageItemSchema = exports.ZoteroItemDataSchema.extend({
    itemType: zod_1.z.literal('webpage'),
    creators: zod_1.z.array(exports.ZoteroCreatorSchema.extend({
        creatorType: zod_1.z.enum(['author', 'contributor', 'translator']),
    })).optional(),
    websiteTitle: zod_1.z.string().optional(),
    websiteType: zod_1.z.string().optional()
});
// Collection schemas
exports.ZoteroCollectionDataSchema = zod_1.z.object({
    key: zod_1.z.string().optional(),
    version: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    parentCollection: zod_1.z.union([zod_1.z.string(), zod_1.z.literal(false)]).optional(),
    relations: zod_1.z.record(zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())])).optional(),
});
exports.ZoteroCollectionSchema = zod_1.z.object({
    key: zod_1.z.string().optional(),
    version: zod_1.z.number().optional(),
    library: zod_1.z.object({
        type: zod_1.z.enum(['user', 'group']),
        id: zod_1.z.number(),
        name: zod_1.z.string(),
        links: zod_1.z.object({
            alternate: zod_1.z.object({
                href: zod_1.z.string(),
                type: zod_1.z.string(),
            }),
        }),
    }).optional(),
    links: zod_1.z.object({
        self: zod_1.z.object({
            href: zod_1.z.string(),
            type: zod_1.z.string(),
        }).optional(),
        alternate: zod_1.z.object({
            href: zod_1.z.string(),
            type: zod_1.z.string(),
        }).optional(),
    }).optional(),
    meta: zod_1.z.object({
        numCollections: zod_1.z.number().optional(),
        numItems: zod_1.z.number().optional(),
    }).optional(),
    data: exports.ZoteroCollectionDataSchema,
});
// Search schemas
exports.ZoteroSearchConditionSchema = zod_1.z.object({
    condition: zod_1.z.string(),
    operator: zod_1.z.string(),
    value: zod_1.z.string(),
});
exports.ZoteroSearchDataSchema = zod_1.z.object({
    key: zod_1.z.string().optional(),
    version: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    conditions: zod_1.z.array(exports.ZoteroSearchConditionSchema),
});
exports.ZoteroSearchSchema = zod_1.z.object({
    key: zod_1.z.string().optional(),
    version: zod_1.z.number().optional(),
    library: zod_1.z.object({
        type: zod_1.z.enum(['user', 'group']),
        id: zod_1.z.number(),
        name: zod_1.z.string(),
        links: zod_1.z.object({
            alternate: zod_1.z.object({
                href: zod_1.z.string(),
                type: zod_1.z.string(),
            }),
        }),
    }).optional(),
    links: zod_1.z.object({
        self: zod_1.z.object({
            href: zod_1.z.string(),
            type: zod_1.z.string(),
        }).optional(),
        alternate: zod_1.z.object({
            href: zod_1.z.string(),
            type: zod_1.z.string(),
        }).optional(),
    }).optional(),
    data: exports.ZoteroSearchDataSchema,
});
// Library schemas
exports.ZoteroLibrarySchema = zod_1.z.object({
    type: zod_1.z.enum(['user', 'group']),
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    links: zod_1.z.object({
        alternate: zod_1.z.object({
            href: zod_1.z.string(),
            type: zod_1.z.string(),
        }),
    }),
});
exports.ZoteroGroupMemberSchema = zod_1.z.object({
    id: zod_1.z.number(),
    username: zod_1.z.string(),
    name: zod_1.z.string(),
    role: zod_1.z.enum(['member', 'admin', 'owner']),
});
exports.ZoteroGroupSchema = exports.ZoteroLibrarySchema.extend({
    type: zod_1.z.literal('group'),
    data: zod_1.z.object({
        id: zod_1.z.number(),
        version: zod_1.z.number(),
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        url: zod_1.z.string(),
        library: zod_1.z.object({
            type: zod_1.z.enum(['Private', 'PublicOpen', 'PublicClosed']),
            reading: zod_1.z.enum(['all', 'members']),
            editing: zod_1.z.enum(['members', 'admins']),
        }),
        members: zod_1.z.array(exports.ZoteroGroupMemberSchema),
        admins: zod_1.z.array(exports.ZoteroGroupMemberSchema),
        owner: exports.ZoteroGroupMemberSchema,
    }),
});
//# sourceMappingURL=index.js.map