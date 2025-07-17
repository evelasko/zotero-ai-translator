import { z } from 'zod';
export declare const ZoteroKeySchema: z.ZodString;
export declare const ZoteroVersionSchema: z.ZodNumber;
export declare const ZoteroDateStringSchema: z.ZodString;
export declare const ZoteroDateObjectSchema: z.ZodObject<{
    'date-parts': z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
    season: z.ZodOptional<z.ZodNumber>;
    circa: z.ZodOptional<z.ZodBoolean>;
    literal: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    'date-parts': number[][];
    season?: number | undefined;
    circa?: boolean | undefined;
    literal?: string | undefined;
}, {
    'date-parts': number[][];
    season?: number | undefined;
    circa?: boolean | undefined;
    literal?: string | undefined;
}>;
export declare const ZoteroAPIResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodOptional<z.ZodAny>;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        code: number;
        message: string;
        details?: string | undefined;
    }, {
        code: number;
        message: string;
        details?: string | undefined;
    }>>;
    lastModifiedVersion: z.ZodOptional<z.ZodNumber>;
    totalResults: z.ZodOptional<z.ZodNumber>;
    links: z.ZodOptional<z.ZodObject<{
        self: z.ZodObject<{
            href: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            href: string;
        }, {
            href: string;
        }>;
        next: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            href: string;
        }, {
            href: string;
        }>>;
        prev: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            href: string;
        }, {
            href: string;
        }>>;
        first: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            href: string;
        }, {
            href: string;
        }>>;
        last: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            href: string;
        }, {
            href: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        self: {
            href: string;
        };
        next?: {
            href: string;
        } | undefined;
        prev?: {
            href: string;
        } | undefined;
        first?: {
            href: string;
        } | undefined;
        last?: {
            href: string;
        } | undefined;
    }, {
        self: {
            href: string;
        };
        next?: {
            href: string;
        } | undefined;
        prev?: {
            href: string;
        } | undefined;
        first?: {
            href: string;
        } | undefined;
        last?: {
            href: string;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data?: any;
    error?: {
        code: number;
        message: string;
        details?: string | undefined;
    } | undefined;
    lastModifiedVersion?: number | undefined;
    totalResults?: number | undefined;
    links?: {
        self: {
            href: string;
        };
        next?: {
            href: string;
        } | undefined;
        prev?: {
            href: string;
        } | undefined;
        first?: {
            href: string;
        } | undefined;
        last?: {
            href: string;
        } | undefined;
    } | undefined;
}, {
    success: boolean;
    data?: any;
    error?: {
        code: number;
        message: string;
        details?: string | undefined;
    } | undefined;
    lastModifiedVersion?: number | undefined;
    totalResults?: number | undefined;
    links?: {
        self: {
            href: string;
        };
        next?: {
            href: string;
        } | undefined;
        prev?: {
            href: string;
        } | undefined;
        first?: {
            href: string;
        } | undefined;
        last?: {
            href: string;
        } | undefined;
    } | undefined;
}>;
export declare const ZoteroAPIErrorSchema: z.ZodObject<{
    code: z.ZodNumber;
    message: z.ZodString;
    details: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: number;
    message: string;
    details?: string | undefined;
}, {
    code: number;
    message: string;
    details?: string | undefined;
}>;
export declare const ZoteroWriteTokenSchema: z.ZodObject<{
    token: z.ZodString;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    token: string;
}, {
    url: string;
    token: string;
}>;
export declare const ZoteroFieldSchema: z.ZodEnum<["title", "abstractNote", "artworkMedium", "artworkSize", "date", "language", "shortTitle", "archive", "archiveLocation", "libraryCatalog", "callNumber", "url", "accessDate", "rights", "extra", "audioRecordingFormat", "seriesTitle", "volume", "numberOfVolumes", "place", "label", "runningTime", "ISBN", "billNumber", "code", "codeVolume", "section", "codePages", "legislativeBody", "session", "history", "blogTitle", "websiteType", "series", "seriesNumber", "edition", "publisher", "numPages", "bookTitle", "pages", "caseName", "court", "dateDecided", "docketNumber", "reporter", "reporterVolume", "firstPage", "versionNumber", "system", "company", "programmingLanguage", "proceedingsTitle", "conferenceName", "DOI", "identifier", "type", "repository", "repositoryLocation", "format", "citationKey", "dictionaryTitle", "subject", "encyclopediaTitle", "distributor", "genre", "videoRecordingFormat", "forumTitle", "postType", "committee", "documentNumber", "interviewMedium", "publicationTitle", "issue", "seriesText", "journalAbbreviation", "ISSN", "letterType", "manuscriptType", "mapType", "scale", "country", "assignee", "issuingAuthority", "patentNumber", "filingDate", "applicationNumber", "priorityNumbers", "issueDate", "references", "legalStatus", "episodeNumber", "audioFileType", "archiveID", "presentationType", "meetingName", "programTitle", "network", "reportNumber", "reportType", "institution", "organization", "number", "status", "nameOfAct", "codeNumber", "publicLawNumber", "dateEnacted", "thesisType", "university", "studio", "websiteTitle"]>;
export declare const ZoteroFieldDefinitionSchema: z.ZodObject<{
    field: z.ZodString;
    baseField: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["text", "date", "number"]>>;
}, "strip", z.ZodTypeAny, {
    field: string;
    type?: "number" | "date" | "text" | undefined;
    baseField?: string | undefined;
}, {
    field: string;
    type?: "number" | "date" | "text" | undefined;
    baseField?: string | undefined;
}>;
export declare const ZoteroCreatorTypeSchema: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
export declare const ZoteroCreatorTypeDefinitionSchema: z.ZodObject<{
    creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
    primary: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
    primary?: boolean | undefined;
}, {
    creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
    primary?: boolean | undefined;
}>;
export declare const ZoteroItemTypeSchema: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
export declare const ZoteroLinksSchema: z.ZodObject<{
    self: z.ZodOptional<z.ZodObject<{
        href: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        href: string;
    }, {
        type: string;
        href: string;
    }>>;
    alternate: z.ZodOptional<z.ZodObject<{
        href: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        href: string;
    }, {
        type: string;
        href: string;
    }>>;
    up: z.ZodOptional<z.ZodObject<{
        href: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        href: string;
    }, {
        type: string;
        href: string;
    }>>;
    enclosure: z.ZodOptional<z.ZodObject<{
        href: z.ZodString;
        type: z.ZodString;
        length: z.ZodOptional<z.ZodNumber>;
        title: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        href: string;
        length?: number | undefined;
        title?: string | undefined;
    }, {
        type: string;
        href: string;
        length?: number | undefined;
        title?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    self?: {
        type: string;
        href: string;
    } | undefined;
    alternate?: {
        type: string;
        href: string;
    } | undefined;
    up?: {
        type: string;
        href: string;
    } | undefined;
    enclosure?: {
        type: string;
        href: string;
        length?: number | undefined;
        title?: string | undefined;
    } | undefined;
}, {
    self?: {
        type: string;
        href: string;
    } | undefined;
    alternate?: {
        type: string;
        href: string;
    } | undefined;
    up?: {
        type: string;
        href: string;
    } | undefined;
    enclosure?: {
        type: string;
        href: string;
        length?: number | undefined;
        title?: string | undefined;
    } | undefined;
}>;
export declare const ZoteroMetaSchema: z.ZodObject<{
    createdByUser: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        username: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        username: string;
    }, {
        name: string;
        id: number;
        username: string;
    }>>;
    createdDate: z.ZodOptional<z.ZodString>;
    lastModifiedByUser: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        username: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        username: string;
    }, {
        name: string;
        id: number;
        username: string;
    }>>;
    lastModifiedDate: z.ZodOptional<z.ZodString>;
    numChildren: z.ZodOptional<z.ZodNumber>;
    numCollections: z.ZodOptional<z.ZodNumber>;
    numItems: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    createdByUser?: {
        name: string;
        id: number;
        username: string;
    } | undefined;
    createdDate?: string | undefined;
    lastModifiedByUser?: {
        name: string;
        id: number;
        username: string;
    } | undefined;
    lastModifiedDate?: string | undefined;
    numChildren?: number | undefined;
    numCollections?: number | undefined;
    numItems?: number | undefined;
}, {
    createdByUser?: {
        name: string;
        id: number;
        username: string;
    } | undefined;
    createdDate?: string | undefined;
    lastModifiedByUser?: {
        name: string;
        id: number;
        username: string;
    } | undefined;
    lastModifiedDate?: string | undefined;
    numChildren?: number | undefined;
    numCollections?: number | undefined;
    numItems?: number | undefined;
}>;
export declare const ZoteroDataSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
}, z.ZodAny, "strip">>;
export declare const ZoteroCreatorSchema: z.ZodObject<{
    creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
    name: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
    name?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}, {
    creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
    name?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}>;
export declare const ZoteroTagSchema: z.ZodObject<{
    tag: z.ZodString;
    type: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    tag: string;
    type?: number | undefined;
}, {
    tag: string;
    type?: number | undefined;
}>;
export declare const ZoteroRelationSchema: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
export declare const ZoteroItemDataSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
} & {
    itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
} & {
    itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
} & {
    itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    library: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["user", "group"]>;
        id: z.ZodNumber;
        name: z.ZodString;
        links: z.ZodObject<{
            alternate: z.ZodObject<{
                href: z.ZodString;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                href: string;
            }, {
                type: string;
                href: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            alternate: {
                type: string;
                href: string;
            };
        }, {
            alternate: {
                type: string;
                href: string;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "user" | "group";
        name: string;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
        id: number;
    }, {
        type: "user" | "group";
        name: string;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
        id: number;
    }>>;
    links: z.ZodOptional<z.ZodObject<{
        self: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        alternate: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        up: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        enclosure: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
            length: z.ZodOptional<z.ZodNumber>;
            title: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        }, {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    }, {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    }>>;
    meta: z.ZodOptional<z.ZodObject<{
        createdByUser: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            username: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
            username: string;
        }, {
            name: string;
            id: number;
            username: string;
        }>>;
        createdDate: z.ZodOptional<z.ZodString>;
        lastModifiedByUser: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            username: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
            username: string;
        }, {
            name: string;
            id: number;
            username: string;
        }>>;
        lastModifiedDate: z.ZodOptional<z.ZodString>;
        numChildren: z.ZodOptional<z.ZodNumber>;
        numCollections: z.ZodOptional<z.ZodNumber>;
        numItems: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        createdByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        createdDate?: string | undefined;
        lastModifiedByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        lastModifiedDate?: string | undefined;
        numChildren?: number | undefined;
        numCollections?: number | undefined;
        numItems?: number | undefined;
    }, {
        createdByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        createdDate?: string | undefined;
        lastModifiedByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        lastModifiedDate?: string | undefined;
        numChildren?: number | undefined;
        numCollections?: number | undefined;
        numItems?: number | undefined;
    }>>;
    data: z.ZodObject<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
    } & {
        itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
        title: z.ZodOptional<z.ZodString>;
        creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
            creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
            name: z.ZodOptional<z.ZodString>;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
            name?: string | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
            name?: string | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>, "many">>;
        abstractNote: z.ZodOptional<z.ZodString>;
        series: z.ZodOptional<z.ZodString>;
        seriesNumber: z.ZodOptional<z.ZodString>;
        volume: z.ZodOptional<z.ZodString>;
        numberOfVolumes: z.ZodOptional<z.ZodString>;
        edition: z.ZodOptional<z.ZodString>;
        place: z.ZodOptional<z.ZodString>;
        publisher: z.ZodOptional<z.ZodString>;
        date: z.ZodOptional<z.ZodString>;
        numPages: z.ZodOptional<z.ZodString>;
        language: z.ZodOptional<z.ZodString>;
        ISBN: z.ZodOptional<z.ZodString>;
        shortTitle: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        accessDate: z.ZodOptional<z.ZodString>;
        archive: z.ZodOptional<z.ZodString>;
        archiveLocation: z.ZodOptional<z.ZodString>;
        libraryCatalog: z.ZodOptional<z.ZodString>;
        callNumber: z.ZodOptional<z.ZodString>;
        rights: z.ZodOptional<z.ZodString>;
        extra: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
            tag: z.ZodString;
            type: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            tag: string;
            type?: number | undefined;
        }, {
            tag: string;
            type?: number | undefined;
        }>, "many">>;
        collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
        dateAdded: z.ZodOptional<z.ZodString>;
        dateModified: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodAny, z.objectOutputType<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
    } & {
        itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
        title: z.ZodOptional<z.ZodString>;
        creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
            creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
            name: z.ZodOptional<z.ZodString>;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
            name?: string | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
            name?: string | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>, "many">>;
        abstractNote: z.ZodOptional<z.ZodString>;
        series: z.ZodOptional<z.ZodString>;
        seriesNumber: z.ZodOptional<z.ZodString>;
        volume: z.ZodOptional<z.ZodString>;
        numberOfVolumes: z.ZodOptional<z.ZodString>;
        edition: z.ZodOptional<z.ZodString>;
        place: z.ZodOptional<z.ZodString>;
        publisher: z.ZodOptional<z.ZodString>;
        date: z.ZodOptional<z.ZodString>;
        numPages: z.ZodOptional<z.ZodString>;
        language: z.ZodOptional<z.ZodString>;
        ISBN: z.ZodOptional<z.ZodString>;
        shortTitle: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        accessDate: z.ZodOptional<z.ZodString>;
        archive: z.ZodOptional<z.ZodString>;
        archiveLocation: z.ZodOptional<z.ZodString>;
        libraryCatalog: z.ZodOptional<z.ZodString>;
        callNumber: z.ZodOptional<z.ZodString>;
        rights: z.ZodOptional<z.ZodString>;
        extra: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
            tag: z.ZodString;
            type: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            tag: string;
            type?: number | undefined;
        }, {
            tag: string;
            type?: number | undefined;
        }>, "many">>;
        collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
        dateAdded: z.ZodOptional<z.ZodString>;
        dateModified: z.ZodOptional<z.ZodString>;
    }, z.ZodAny, "strip">, z.objectInputType<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
    } & {
        itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
        title: z.ZodOptional<z.ZodString>;
        creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
            creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
            name: z.ZodOptional<z.ZodString>;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
            name?: string | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
            name?: string | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }>, "many">>;
        abstractNote: z.ZodOptional<z.ZodString>;
        series: z.ZodOptional<z.ZodString>;
        seriesNumber: z.ZodOptional<z.ZodString>;
        volume: z.ZodOptional<z.ZodString>;
        numberOfVolumes: z.ZodOptional<z.ZodString>;
        edition: z.ZodOptional<z.ZodString>;
        place: z.ZodOptional<z.ZodString>;
        publisher: z.ZodOptional<z.ZodString>;
        date: z.ZodOptional<z.ZodString>;
        numPages: z.ZodOptional<z.ZodString>;
        language: z.ZodOptional<z.ZodString>;
        ISBN: z.ZodOptional<z.ZodString>;
        shortTitle: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        accessDate: z.ZodOptional<z.ZodString>;
        archive: z.ZodOptional<z.ZodString>;
        archiveLocation: z.ZodOptional<z.ZodString>;
        libraryCatalog: z.ZodOptional<z.ZodString>;
        callNumber: z.ZodOptional<z.ZodString>;
        rights: z.ZodOptional<z.ZodString>;
        extra: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
            tag: z.ZodString;
            type: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            tag: string;
            type?: number | undefined;
        }, {
            tag: string;
            type?: number | undefined;
        }>, "many">>;
        collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
        dateAdded: z.ZodOptional<z.ZodString>;
        dateModified: z.ZodOptional<z.ZodString>;
    }, z.ZodAny, "strip">>;
}, "strip", z.ZodTypeAny, {
    data: {
        itemType: "map" | "annotation" | "artwork" | "attachment" | "audioRecording" | "bill" | "blogPost" | "book" | "bookSection" | "case" | "computerProgram" | "conferencePaper" | "dataset" | "dictionaryEntry" | "document" | "email" | "encyclopediaArticle" | "film" | "forumPost" | "hearing" | "instantMessage" | "interview" | "journalArticle" | "letter" | "magazineArticle" | "manuscript" | "newspaperArticle" | "note" | "patent" | "podcast" | "preprint" | "presentation" | "radioBroadcast" | "report" | "standard" | "statute" | "thesis" | "tvBroadcast" | "videoRecording" | "webpage";
        key?: string | undefined;
        version?: number | undefined;
        title?: string | undefined;
        creators?: {
            creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
            name?: string | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }[] | undefined;
        abstractNote?: string | undefined;
        series?: string | undefined;
        seriesNumber?: string | undefined;
        volume?: string | undefined;
        numberOfVolumes?: string | undefined;
        edition?: string | undefined;
        place?: string | undefined;
        publisher?: string | undefined;
        date?: string | undefined;
        numPages?: string | undefined;
        language?: string | undefined;
        ISBN?: string | undefined;
        shortTitle?: string | undefined;
        url?: string | undefined;
        accessDate?: string | undefined;
        archive?: string | undefined;
        archiveLocation?: string | undefined;
        libraryCatalog?: string | undefined;
        callNumber?: string | undefined;
        rights?: string | undefined;
        extra?: string | undefined;
        tags?: {
            tag: string;
            type?: number | undefined;
        }[] | undefined;
        collections?: string[] | undefined;
        relations?: Record<string, string | string[]> | undefined;
        dateAdded?: string | undefined;
        dateModified?: string | undefined;
    } & {
        [k: string]: any;
    };
    key?: string | undefined;
    version?: number | undefined;
    links?: {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    } | undefined;
    library?: {
        type: "user" | "group";
        name: string;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
        id: number;
    } | undefined;
    meta?: {
        createdByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        createdDate?: string | undefined;
        lastModifiedByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        lastModifiedDate?: string | undefined;
        numChildren?: number | undefined;
        numCollections?: number | undefined;
        numItems?: number | undefined;
    } | undefined;
}, {
    data: {
        itemType: "map" | "annotation" | "artwork" | "attachment" | "audioRecording" | "bill" | "blogPost" | "book" | "bookSection" | "case" | "computerProgram" | "conferencePaper" | "dataset" | "dictionaryEntry" | "document" | "email" | "encyclopediaArticle" | "film" | "forumPost" | "hearing" | "instantMessage" | "interview" | "journalArticle" | "letter" | "magazineArticle" | "manuscript" | "newspaperArticle" | "note" | "patent" | "podcast" | "preprint" | "presentation" | "radioBroadcast" | "report" | "standard" | "statute" | "thesis" | "tvBroadcast" | "videoRecording" | "webpage";
        key?: string | undefined;
        version?: number | undefined;
        title?: string | undefined;
        creators?: {
            creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
            name?: string | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }[] | undefined;
        abstractNote?: string | undefined;
        series?: string | undefined;
        seriesNumber?: string | undefined;
        volume?: string | undefined;
        numberOfVolumes?: string | undefined;
        edition?: string | undefined;
        place?: string | undefined;
        publisher?: string | undefined;
        date?: string | undefined;
        numPages?: string | undefined;
        language?: string | undefined;
        ISBN?: string | undefined;
        shortTitle?: string | undefined;
        url?: string | undefined;
        accessDate?: string | undefined;
        archive?: string | undefined;
        archiveLocation?: string | undefined;
        libraryCatalog?: string | undefined;
        callNumber?: string | undefined;
        rights?: string | undefined;
        extra?: string | undefined;
        tags?: {
            tag: string;
            type?: number | undefined;
        }[] | undefined;
        collections?: string[] | undefined;
        relations?: Record<string, string | string[]> | undefined;
        dateAdded?: string | undefined;
        dateModified?: string | undefined;
    } & {
        [k: string]: any;
    };
    key?: string | undefined;
    version?: number | undefined;
    links?: {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    } | undefined;
    library?: {
        type: "user" | "group";
        name: string;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
        id: number;
    } | undefined;
    meta?: {
        createdByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        createdDate?: string | undefined;
        lastModifiedByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        lastModifiedDate?: string | undefined;
        numChildren?: number | undefined;
        numCollections?: number | undefined;
        numItems?: number | undefined;
    } | undefined;
}>;
export declare const ZoteroAnnotationItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"annotation">;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"annotation">;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"annotation">;
}, z.ZodAny, "strip">>;
export declare const ZoteroArtworkItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"artwork">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["artist", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    artworkMedium: z.ZodOptional<z.ZodString>;
    artworkSize: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"artwork">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["artist", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    artworkMedium: z.ZodOptional<z.ZodString>;
    artworkSize: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"artwork">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["artist", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    artworkMedium: z.ZodOptional<z.ZodString>;
    artworkSize: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroAttachmentItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"attachment">;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"attachment">;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"attachment">;
}, z.ZodAny, "strip">>;
export declare const ZoteroAudioRecordingItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"audioRecording">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["performer", "contributor", "composer", "wordsBy"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "performer" | "composer" | "wordsBy";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "performer" | "composer" | "wordsBy";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    audioRecordingFormat: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"audioRecording">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["performer", "contributor", "composer", "wordsBy"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "performer" | "composer" | "wordsBy";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "performer" | "composer" | "wordsBy";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    audioRecordingFormat: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"audioRecording">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["performer", "contributor", "composer", "wordsBy"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "performer" | "composer" | "wordsBy";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "performer" | "composer" | "wordsBy";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    audioRecordingFormat: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroBillItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"bill">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["sponsor", "cosponsor", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "sponsor" | "cosponsor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "sponsor" | "cosponsor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    billNumber: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    codeVolume: z.ZodOptional<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    codePages: z.ZodOptional<z.ZodString>;
    legislativeBody: z.ZodOptional<z.ZodString>;
    session: z.ZodOptional<z.ZodString>;
    history: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"bill">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["sponsor", "cosponsor", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "sponsor" | "cosponsor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "sponsor" | "cosponsor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    billNumber: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    codeVolume: z.ZodOptional<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    codePages: z.ZodOptional<z.ZodString>;
    legislativeBody: z.ZodOptional<z.ZodString>;
    session: z.ZodOptional<z.ZodString>;
    history: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"bill">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["sponsor", "cosponsor", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "sponsor" | "cosponsor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "sponsor" | "cosponsor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    billNumber: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    codeVolume: z.ZodOptional<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    codePages: z.ZodOptional<z.ZodString>;
    legislativeBody: z.ZodOptional<z.ZodString>;
    session: z.ZodOptional<z.ZodString>;
    history: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroBlogPostItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"blogPost">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "commenter", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "commenter";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "commenter";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    blogTitle: z.ZodOptional<z.ZodString>;
    websiteType: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"blogPost">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "commenter", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "commenter";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "commenter";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    blogTitle: z.ZodOptional<z.ZodString>;
    websiteType: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"blogPost">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "commenter", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "commenter";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "commenter";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    blogTitle: z.ZodOptional<z.ZodString>;
    websiteType: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroBookItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"book">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"book">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"book">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
}, z.ZodAny, "strip">>;
export declare const ZoteroBookSectionItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"bookSection">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "bookAuthor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor" | "bookAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor" | "bookAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    bookTitle: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"bookSection">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "bookAuthor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor" | "bookAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor" | "bookAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    bookTitle: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"bookSection">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "bookAuthor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor" | "bookAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor" | "bookAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    bookTitle: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroCaseItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"case">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "counsel", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "counsel";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "counsel";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    caseName: z.ZodOptional<z.ZodString>;
    court: z.ZodOptional<z.ZodString>;
    dateDecided: z.ZodOptional<z.ZodString>;
    docketNumber: z.ZodOptional<z.ZodString>;
    reporter: z.ZodOptional<z.ZodString>;
    reporterVolume: z.ZodOptional<z.ZodString>;
    firstPage: z.ZodOptional<z.ZodString>;
    history: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"case">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "counsel", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "counsel";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "counsel";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    caseName: z.ZodOptional<z.ZodString>;
    court: z.ZodOptional<z.ZodString>;
    dateDecided: z.ZodOptional<z.ZodString>;
    docketNumber: z.ZodOptional<z.ZodString>;
    reporter: z.ZodOptional<z.ZodString>;
    reporterVolume: z.ZodOptional<z.ZodString>;
    firstPage: z.ZodOptional<z.ZodString>;
    history: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"case">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "counsel", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "counsel";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "counsel";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    caseName: z.ZodOptional<z.ZodString>;
    court: z.ZodOptional<z.ZodString>;
    dateDecided: z.ZodOptional<z.ZodString>;
    docketNumber: z.ZodOptional<z.ZodString>;
    reporter: z.ZodOptional<z.ZodString>;
    reporterVolume: z.ZodOptional<z.ZodString>;
    firstPage: z.ZodOptional<z.ZodString>;
    history: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroComputerProgramItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"computerProgram">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["programmer", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "programmer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "programmer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    versionNumber: z.ZodOptional<z.ZodString>;
    system: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    programmingLanguage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"computerProgram">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["programmer", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "programmer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "programmer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    versionNumber: z.ZodOptional<z.ZodString>;
    system: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    programmingLanguage: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"computerProgram">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["programmer", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "programmer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "programmer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    versionNumber: z.ZodOptional<z.ZodString>;
    system: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    programmingLanguage: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroConferencePaperItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"conferencePaper">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    proceedingsTitle: z.ZodOptional<z.ZodString>;
    conferenceName: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"conferencePaper">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    proceedingsTitle: z.ZodOptional<z.ZodString>;
    conferenceName: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"conferencePaper">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    proceedingsTitle: z.ZodOptional<z.ZodString>;
    conferenceName: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroDatasetItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"dataset">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    identifier: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    versionNumber: z.ZodOptional<z.ZodString>;
    repository: z.ZodOptional<z.ZodString>;
    repositoryLocation: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
    citationKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"dataset">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    identifier: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    versionNumber: z.ZodOptional<z.ZodString>;
    repository: z.ZodOptional<z.ZodString>;
    repositoryLocation: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
    citationKey: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"dataset">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    identifier: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    versionNumber: z.ZodOptional<z.ZodString>;
    repository: z.ZodOptional<z.ZodString>;
    repositoryLocation: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
    citationKey: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroDictionaryEntryItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"dictionaryEntry">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    dictionaryTitle: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"dictionaryEntry">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    dictionaryTitle: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"dictionaryEntry">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    dictionaryTitle: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroDocumentItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"document">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"document">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"document">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
}, z.ZodAny, "strip">>;
export declare const ZoteroEmailItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"email">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "recipient"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    subject: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"email">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "recipient"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    subject: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"email">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "recipient"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    subject: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroEncyclopediaArticleItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"encyclopediaArticle">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    encyclopediaTitle: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"encyclopediaArticle">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    encyclopediaTitle: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"encyclopediaArticle">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    encyclopediaTitle: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroFilmItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"film">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["director", "contributor", "scriptwriter", "producer"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    distributor: z.ZodOptional<z.ZodString>;
    genre: z.ZodOptional<z.ZodString>;
    videoRecordingFormat: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"film">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["director", "contributor", "scriptwriter", "producer"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    distributor: z.ZodOptional<z.ZodString>;
    genre: z.ZodOptional<z.ZodString>;
    videoRecordingFormat: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"film">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["director", "contributor", "scriptwriter", "producer"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    distributor: z.ZodOptional<z.ZodString>;
    genre: z.ZodOptional<z.ZodString>;
    videoRecordingFormat: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroForumPostItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"forumPost">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    forumTitle: z.ZodOptional<z.ZodString>;
    postType: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"forumPost">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    forumTitle: z.ZodOptional<z.ZodString>;
    postType: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"forumPost">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    forumTitle: z.ZodOptional<z.ZodString>;
    postType: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroHearingItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"hearing">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    committee: z.ZodOptional<z.ZodString>;
    documentNumber: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    legislativeBody: z.ZodOptional<z.ZodString>;
    session: z.ZodOptional<z.ZodString>;
    history: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"hearing">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    committee: z.ZodOptional<z.ZodString>;
    documentNumber: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    legislativeBody: z.ZodOptional<z.ZodString>;
    session: z.ZodOptional<z.ZodString>;
    history: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"hearing">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    committee: z.ZodOptional<z.ZodString>;
    documentNumber: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    legislativeBody: z.ZodOptional<z.ZodString>;
    session: z.ZodOptional<z.ZodString>;
    history: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroInstantMessageItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"instantMessage">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "recipient"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"instantMessage">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "recipient"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"instantMessage">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "recipient"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
}, z.ZodAny, "strip">>;
export declare const ZoteroInterviewItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"interview">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["interviewee", "contributor", "interviewer", "translator"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "translator" | "interviewee" | "interviewer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "translator" | "interviewee" | "interviewer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    interviewMedium: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"interview">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["interviewee", "contributor", "interviewer", "translator"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "translator" | "interviewee" | "interviewer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "translator" | "interviewee" | "interviewer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    interviewMedium: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"interview">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["interviewee", "contributor", "interviewer", "translator"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "translator" | "interviewee" | "interviewer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "translator" | "interviewee" | "interviewer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    interviewMedium: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroJournalArticleItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"journalArticle">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    publicationTitle: z.ZodOptional<z.ZodString>;
    issue: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    seriesText: z.ZodOptional<z.ZodString>;
    journalAbbreviation: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
    ISSN: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"journalArticle">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    publicationTitle: z.ZodOptional<z.ZodString>;
    issue: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    seriesText: z.ZodOptional<z.ZodString>;
    journalAbbreviation: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
    ISSN: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"journalArticle">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    publicationTitle: z.ZodOptional<z.ZodString>;
    issue: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    seriesText: z.ZodOptional<z.ZodString>;
    journalAbbreviation: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
    ISSN: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroLetterItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"letter">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "recipient"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    letterType: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"letter">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "recipient"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    letterType: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"letter">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "recipient"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "recipient";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    letterType: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroMagazineArticleItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"magazineArticle">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    publicationTitle: z.ZodOptional<z.ZodString>;
    issue: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    ISSN: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"magazineArticle">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    publicationTitle: z.ZodOptional<z.ZodString>;
    issue: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    ISSN: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"magazineArticle">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    publicationTitle: z.ZodOptional<z.ZodString>;
    issue: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    ISSN: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroManuscriptItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"manuscript">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    manuscriptType: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"manuscript">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    manuscriptType: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"manuscript">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    manuscriptType: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroMapItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"map">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["cartographer", "contributor", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "seriesEditor" | "cartographer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "seriesEditor" | "cartographer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    mapType: z.ZodOptional<z.ZodString>;
    scale: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"map">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["cartographer", "contributor", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "seriesEditor" | "cartographer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "seriesEditor" | "cartographer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    mapType: z.ZodOptional<z.ZodString>;
    scale: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"map">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["cartographer", "contributor", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "seriesEditor" | "cartographer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "seriesEditor" | "cartographer";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    mapType: z.ZodOptional<z.ZodString>;
    scale: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroNewspaperArticleItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"newspaperArticle">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    publicationTitle: z.ZodOptional<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    ISSN: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"newspaperArticle">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    publicationTitle: z.ZodOptional<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    ISSN: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"newspaperArticle">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    publicationTitle: z.ZodOptional<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    ISSN: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroNoteItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"note">;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"note">;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"note">;
}, z.ZodAny, "strip">>;
export declare const ZoteroPatentItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"patent">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["inventor", "attorneyAgent", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "inventor" | "attorneyAgent";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "inventor" | "attorneyAgent";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    country: z.ZodOptional<z.ZodString>;
    assignee: z.ZodOptional<z.ZodString>;
    issuingAuthority: z.ZodOptional<z.ZodString>;
    patentNumber: z.ZodOptional<z.ZodString>;
    filingDate: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    applicationNumber: z.ZodOptional<z.ZodString>;
    priorityNumbers: z.ZodOptional<z.ZodString>;
    issueDate: z.ZodOptional<z.ZodString>;
    references: z.ZodOptional<z.ZodString>;
    legalStatus: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"patent">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["inventor", "attorneyAgent", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "inventor" | "attorneyAgent";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "inventor" | "attorneyAgent";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    country: z.ZodOptional<z.ZodString>;
    assignee: z.ZodOptional<z.ZodString>;
    issuingAuthority: z.ZodOptional<z.ZodString>;
    patentNumber: z.ZodOptional<z.ZodString>;
    filingDate: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    applicationNumber: z.ZodOptional<z.ZodString>;
    priorityNumbers: z.ZodOptional<z.ZodString>;
    issueDate: z.ZodOptional<z.ZodString>;
    references: z.ZodOptional<z.ZodString>;
    legalStatus: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"patent">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["inventor", "attorneyAgent", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "inventor" | "attorneyAgent";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "inventor" | "attorneyAgent";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    country: z.ZodOptional<z.ZodString>;
    assignee: z.ZodOptional<z.ZodString>;
    issuingAuthority: z.ZodOptional<z.ZodString>;
    patentNumber: z.ZodOptional<z.ZodString>;
    filingDate: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    applicationNumber: z.ZodOptional<z.ZodString>;
    priorityNumbers: z.ZodOptional<z.ZodString>;
    issueDate: z.ZodOptional<z.ZodString>;
    references: z.ZodOptional<z.ZodString>;
    legalStatus: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroPodcastItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"podcast">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["podcaster", "contributor", "guest"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "podcaster" | "guest";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "podcaster" | "guest";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    episodeNumber: z.ZodOptional<z.ZodString>;
    audioFileType: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"podcast">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["podcaster", "contributor", "guest"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "podcaster" | "guest";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "podcaster" | "guest";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    episodeNumber: z.ZodOptional<z.ZodString>;
    audioFileType: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"podcast">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["podcaster", "contributor", "guest"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "podcaster" | "guest";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "podcaster" | "guest";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    episodeNumber: z.ZodOptional<z.ZodString>;
    audioFileType: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroPreprintItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"preprint">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    genre: z.ZodOptional<z.ZodString>;
    repository: z.ZodOptional<z.ZodString>;
    archiveID: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
    citationKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"preprint">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    genre: z.ZodOptional<z.ZodString>;
    repository: z.ZodOptional<z.ZodString>;
    archiveID: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
    citationKey: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"preprint">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "editor", "translator", "reviewedAuthor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    genre: z.ZodOptional<z.ZodString>;
    repository: z.ZodOptional<z.ZodString>;
    archiveID: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
    citationKey: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroPresentationItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"presentation">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["presenter", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "presenter";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "presenter";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    presentationType: z.ZodOptional<z.ZodString>;
    meetingName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"presentation">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["presenter", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "presenter";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "presenter";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    presentationType: z.ZodOptional<z.ZodString>;
    meetingName: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"presentation">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["presenter", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "presenter";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "presenter";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    presentationType: z.ZodOptional<z.ZodString>;
    meetingName: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroRadioBroadcastItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"radioBroadcast">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["director", "scriptwriter", "producer", "castMember", "contributor", "guest"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    programTitle: z.ZodOptional<z.ZodString>;
    episodeNumber: z.ZodOptional<z.ZodString>;
    audioRecordingFormat: z.ZodOptional<z.ZodString>;
    network: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"radioBroadcast">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["director", "scriptwriter", "producer", "castMember", "contributor", "guest"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    programTitle: z.ZodOptional<z.ZodString>;
    episodeNumber: z.ZodOptional<z.ZodString>;
    audioRecordingFormat: z.ZodOptional<z.ZodString>;
    network: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"radioBroadcast">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["director", "scriptwriter", "producer", "castMember", "contributor", "guest"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    programTitle: z.ZodOptional<z.ZodString>;
    episodeNumber: z.ZodOptional<z.ZodString>;
    audioRecordingFormat: z.ZodOptional<z.ZodString>;
    network: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroReportItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"report">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    reportNumber: z.ZodOptional<z.ZodString>;
    reportType: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    institution: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"report">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    reportNumber: z.ZodOptional<z.ZodString>;
    reportType: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    institution: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"report">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator", "seriesEditor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator" | "seriesEditor";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    reportNumber: z.ZodOptional<z.ZodString>;
    reportType: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    institution: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroStandardItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"standard">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    organization: z.ZodOptional<z.ZodString>;
    committee: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    number: z.ZodOptional<z.ZodString>;
    versionNumber: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
    citationKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"standard">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    organization: z.ZodOptional<z.ZodString>;
    committee: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    number: z.ZodOptional<z.ZodString>;
    versionNumber: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
    citationKey: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"standard">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    organization: z.ZodOptional<z.ZodString>;
    committee: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    number: z.ZodOptional<z.ZodString>;
    versionNumber: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    DOI: z.ZodOptional<z.ZodString>;
    citationKey: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroStatuteItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"statute">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    nameOfAct: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    codeNumber: z.ZodOptional<z.ZodString>;
    publicLawNumber: z.ZodOptional<z.ZodString>;
    dateEnacted: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    session: z.ZodOptional<z.ZodString>;
    history: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"statute">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    nameOfAct: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    codeNumber: z.ZodOptional<z.ZodString>;
    publicLawNumber: z.ZodOptional<z.ZodString>;
    dateEnacted: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    session: z.ZodOptional<z.ZodString>;
    history: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"statute">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    nameOfAct: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    codeNumber: z.ZodOptional<z.ZodString>;
    publicLawNumber: z.ZodOptional<z.ZodString>;
    dateEnacted: z.ZodOptional<z.ZodString>;
    pages: z.ZodOptional<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    session: z.ZodOptional<z.ZodString>;
    history: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroThesisItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"thesis">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    thesisType: z.ZodOptional<z.ZodString>;
    university: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"thesis">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    thesisType: z.ZodOptional<z.ZodString>;
    university: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"thesis">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    thesisType: z.ZodOptional<z.ZodString>;
    university: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroTvBroadcastItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"tvBroadcast">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["director", "scriptwriter", "producer", "castMember", "contributor", "guest"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    programTitle: z.ZodOptional<z.ZodString>;
    episodeNumber: z.ZodOptional<z.ZodString>;
    videoRecordingFormat: z.ZodOptional<z.ZodString>;
    network: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"tvBroadcast">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["director", "scriptwriter", "producer", "castMember", "contributor", "guest"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    programTitle: z.ZodOptional<z.ZodString>;
    episodeNumber: z.ZodOptional<z.ZodString>;
    videoRecordingFormat: z.ZodOptional<z.ZodString>;
    network: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"tvBroadcast">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["director", "scriptwriter", "producer", "castMember", "contributor", "guest"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    programTitle: z.ZodOptional<z.ZodString>;
    episodeNumber: z.ZodOptional<z.ZodString>;
    videoRecordingFormat: z.ZodOptional<z.ZodString>;
    network: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroVideoRecordingItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"videoRecording">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["director", "scriptwriter", "producer", "castMember", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    videoRecordingFormat: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    studio: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"videoRecording">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["director", "scriptwriter", "producer", "castMember", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    videoRecordingFormat: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    studio: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"videoRecording">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["director", "scriptwriter", "producer", "castMember", "contributor"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    videoRecordingFormat: z.ZodOptional<z.ZodString>;
    seriesTitle: z.ZodOptional<z.ZodString>;
    studio: z.ZodOptional<z.ZodString>;
    runningTime: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroWebpageItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"webpage">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    websiteTitle: z.ZodOptional<z.ZodString>;
    websiteType: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"webpage">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    websiteTitle: z.ZodOptional<z.ZodString>;
    websiteType: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"webpage">;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    } & {
        creatorType: z.ZodEnum<["author", "contributor", "translator"]>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "contributor" | "author" | "translator";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "contributor" | "author" | "translator";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    websiteTitle: z.ZodOptional<z.ZodString>;
    websiteType: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
export declare const ZoteroNoteSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"note">;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"note">;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"note">;
}, z.ZodAny, "strip">>;
export declare const ZoteroAttachmentSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"attachment">;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"attachment">;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"attachment">;
}, z.ZodAny, "strip">>;
export declare const ZoteroAnnotationSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"annotation">;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"annotation">;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
    abstractNote: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    seriesNumber: z.ZodOptional<z.ZodString>;
    volume: z.ZodOptional<z.ZodString>;
    numberOfVolumes: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    place: z.ZodOptional<z.ZodString>;
    publisher: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    numPages: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    ISBN: z.ZodOptional<z.ZodString>;
    shortTitle: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    accessDate: z.ZodOptional<z.ZodString>;
    archive: z.ZodOptional<z.ZodString>;
    archiveLocation: z.ZodOptional<z.ZodString>;
    libraryCatalog: z.ZodOptional<z.ZodString>;
    callNumber: z.ZodOptional<z.ZodString>;
    rights: z.ZodOptional<z.ZodString>;
    extra: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">>;
    collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    dateAdded: z.ZodOptional<z.ZodString>;
    dateModified: z.ZodOptional<z.ZodString>;
} & {
    itemType: z.ZodLiteral<"annotation">;
}, z.ZodAny, "strip">>;
export declare const ZoteroUserSchema: z.ZodObject<{
    id: z.ZodNumber;
    username: z.ZodString;
    name: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    links: z.ZodOptional<z.ZodObject<{
        self: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        alternate: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        up: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        enclosure: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
            length: z.ZodOptional<z.ZodNumber>;
            title: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        }, {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    }, {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: number;
    username: string;
    email?: string | undefined;
    links?: {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    } | undefined;
    slug?: string | undefined;
}, {
    name: string;
    id: number;
    username: string;
    email?: string | undefined;
    links?: {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    } | undefined;
    slug?: string | undefined;
}>;
export declare const ZoteroKeyPermissionsSchema: z.ZodObject<{
    library: z.ZodBoolean;
    notes: z.ZodBoolean;
    write: z.ZodBoolean;
    groups: z.ZodObject<{
        all: z.ZodBoolean;
    }, "strip", z.ZodBoolean, z.objectOutputType<{
        all: z.ZodBoolean;
    }, z.ZodBoolean, "strip">, z.objectInputType<{
        all: z.ZodBoolean;
    }, z.ZodBoolean, "strip">>;
}, "strip", z.ZodTypeAny, {
    library: boolean;
    notes: boolean;
    write: boolean;
    groups: {
        all: boolean;
    } & {
        [k: string]: boolean;
    };
}, {
    library: boolean;
    notes: boolean;
    write: boolean;
    groups: {
        all: boolean;
    } & {
        [k: string]: boolean;
    };
}>;
export declare const ZoteroSettingsSchema: z.ZodRecord<z.ZodString, z.ZodAny>;
export declare const ZoteroDeletedContentSchema: z.ZodObject<{
    collections: z.ZodArray<z.ZodString, "many">;
    items: z.ZodArray<z.ZodString, "many">;
    searches: z.ZodArray<z.ZodString, "many">;
    tags: z.ZodArray<z.ZodObject<{
        tag: z.ZodString;
        type: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        type?: number | undefined;
    }, {
        tag: string;
        type?: number | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    tags: {
        tag: string;
        type?: number | undefined;
    }[];
    collections: string[];
    items: string[];
    searches: string[];
}, {
    tags: {
        tag: string;
        type?: number | undefined;
    }[];
    collections: string[];
    items: string[];
    searches: string[];
}>;
export declare const ZoteroFieldTemplateSchema: z.ZodObject<{
    field: z.ZodString;
    baseField: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    field: string;
    baseField?: string | undefined;
}, {
    field: string;
    baseField?: string | undefined;
}>;
export declare const ZoteroCreatorTemplateSchema: z.ZodObject<{
    creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
    name: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
    name?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}, {
    creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
    name?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}>;
export declare const ZoteroTemplateSchema: z.ZodObject<{
    itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
    fields: z.ZodArray<z.ZodObject<{
        field: z.ZodString;
        baseField: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        field: string;
        baseField?: string | undefined;
    }, {
        field: string;
        baseField?: string | undefined;
    }>, "many">;
    creatorTypes: z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        primary: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        primary?: boolean | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        primary?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    itemType: "map" | "annotation" | "artwork" | "attachment" | "audioRecording" | "bill" | "blogPost" | "book" | "bookSection" | "case" | "computerProgram" | "conferencePaper" | "dataset" | "dictionaryEntry" | "document" | "email" | "encyclopediaArticle" | "film" | "forumPost" | "hearing" | "instantMessage" | "interview" | "journalArticle" | "letter" | "magazineArticle" | "manuscript" | "newspaperArticle" | "note" | "patent" | "podcast" | "preprint" | "presentation" | "radioBroadcast" | "report" | "standard" | "statute" | "thesis" | "tvBroadcast" | "videoRecording" | "webpage";
    fields: {
        field: string;
        baseField?: string | undefined;
    }[];
    creatorTypes: {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        primary?: boolean | undefined;
    }[];
}, {
    itemType: "map" | "annotation" | "artwork" | "attachment" | "audioRecording" | "bill" | "blogPost" | "book" | "bookSection" | "case" | "computerProgram" | "conferencePaper" | "dataset" | "dictionaryEntry" | "document" | "email" | "encyclopediaArticle" | "film" | "forumPost" | "hearing" | "instantMessage" | "interview" | "journalArticle" | "letter" | "magazineArticle" | "manuscript" | "newspaperArticle" | "note" | "patent" | "podcast" | "preprint" | "presentation" | "radioBroadcast" | "report" | "standard" | "statute" | "thesis" | "tvBroadcast" | "videoRecording" | "webpage";
    fields: {
        field: string;
        baseField?: string | undefined;
    }[];
    creatorTypes: {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        primary?: boolean | undefined;
    }[];
}>;
export declare const ZoteroItemTemplateSchema: z.ZodObject<{
    itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodAny, z.objectOutputType<{
    itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
}, z.ZodAny, "strip">, z.objectInputType<{
    itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }>, "many">>;
}, z.ZodAny, "strip">>;
export declare const ZoteroItemTypeTemplateSchema: z.ZodObject<{
    itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
    localized: z.ZodString;
}, "strip", z.ZodTypeAny, {
    itemType: "map" | "annotation" | "artwork" | "attachment" | "audioRecording" | "bill" | "blogPost" | "book" | "bookSection" | "case" | "computerProgram" | "conferencePaper" | "dataset" | "dictionaryEntry" | "document" | "email" | "encyclopediaArticle" | "film" | "forumPost" | "hearing" | "instantMessage" | "interview" | "journalArticle" | "letter" | "magazineArticle" | "manuscript" | "newspaperArticle" | "note" | "patent" | "podcast" | "preprint" | "presentation" | "radioBroadcast" | "report" | "standard" | "statute" | "thesis" | "tvBroadcast" | "videoRecording" | "webpage";
    localized: string;
}, {
    itemType: "map" | "annotation" | "artwork" | "attachment" | "audioRecording" | "bill" | "blogPost" | "book" | "bookSection" | "case" | "computerProgram" | "conferencePaper" | "dataset" | "dictionaryEntry" | "document" | "email" | "encyclopediaArticle" | "film" | "forumPost" | "hearing" | "instantMessage" | "interview" | "journalArticle" | "letter" | "magazineArticle" | "manuscript" | "newspaperArticle" | "note" | "patent" | "podcast" | "preprint" | "presentation" | "radioBroadcast" | "report" | "standard" | "statute" | "thesis" | "tvBroadcast" | "videoRecording" | "webpage";
    localized: string;
}>;
export declare const ZoteroCollectionTemplateSchema: z.ZodObject<{
    name: z.ZodString;
    parentCollection: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<false>]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    parentCollection?: string | false | undefined;
}, {
    name: string;
    parentCollection?: string | false | undefined;
}>;
export declare const ZoteroCollectionDataSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
} & {
    name: z.ZodString;
    parentCollection: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<false>]>>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
} & {
    name: z.ZodString;
    parentCollection: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<false>]>>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
} & {
    name: z.ZodString;
    parentCollection: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<false>]>>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
}, z.ZodAny, "strip">>;
export declare const ZoteroCollectionSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    library: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["user", "group"]>;
        id: z.ZodNumber;
        name: z.ZodString;
        links: z.ZodObject<{
            alternate: z.ZodObject<{
                href: z.ZodString;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                href: string;
            }, {
                type: string;
                href: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            alternate: {
                type: string;
                href: string;
            };
        }, {
            alternate: {
                type: string;
                href: string;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "user" | "group";
        name: string;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
        id: number;
    }, {
        type: "user" | "group";
        name: string;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
        id: number;
    }>>;
    links: z.ZodOptional<z.ZodObject<{
        self: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        alternate: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        up: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        enclosure: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
            length: z.ZodOptional<z.ZodNumber>;
            title: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        }, {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    }, {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    }>>;
    meta: z.ZodOptional<z.ZodObject<{
        createdByUser: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            username: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
            username: string;
        }, {
            name: string;
            id: number;
            username: string;
        }>>;
        createdDate: z.ZodOptional<z.ZodString>;
        lastModifiedByUser: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            username: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
            username: string;
        }, {
            name: string;
            id: number;
            username: string;
        }>>;
        lastModifiedDate: z.ZodOptional<z.ZodString>;
        numChildren: z.ZodOptional<z.ZodNumber>;
        numCollections: z.ZodOptional<z.ZodNumber>;
        numItems: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        createdByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        createdDate?: string | undefined;
        lastModifiedByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        lastModifiedDate?: string | undefined;
        numChildren?: number | undefined;
        numCollections?: number | undefined;
        numItems?: number | undefined;
    }, {
        createdByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        createdDate?: string | undefined;
        lastModifiedByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        lastModifiedDate?: string | undefined;
        numChildren?: number | undefined;
        numCollections?: number | undefined;
        numItems?: number | undefined;
    }>>;
    data: z.ZodObject<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
    } & {
        name: z.ZodString;
        parentCollection: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<false>]>>;
        relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    }, "strip", z.ZodAny, z.objectOutputType<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
    } & {
        name: z.ZodString;
        parentCollection: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<false>]>>;
        relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    }, z.ZodAny, "strip">, z.objectInputType<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
    } & {
        name: z.ZodString;
        parentCollection: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<false>]>>;
        relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    }, z.ZodAny, "strip">>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        key?: string | undefined;
        version?: number | undefined;
        relations?: Record<string, string | string[]> | undefined;
        parentCollection?: string | false | undefined;
    } & {
        [k: string]: any;
    };
    key?: string | undefined;
    version?: number | undefined;
    links?: {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    } | undefined;
    library?: {
        type: "user" | "group";
        name: string;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
        id: number;
    } | undefined;
    meta?: {
        createdByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        createdDate?: string | undefined;
        lastModifiedByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        lastModifiedDate?: string | undefined;
        numChildren?: number | undefined;
        numCollections?: number | undefined;
        numItems?: number | undefined;
    } | undefined;
}, {
    data: {
        name: string;
        key?: string | undefined;
        version?: number | undefined;
        relations?: Record<string, string | string[]> | undefined;
        parentCollection?: string | false | undefined;
    } & {
        [k: string]: any;
    };
    key?: string | undefined;
    version?: number | undefined;
    links?: {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    } | undefined;
    library?: {
        type: "user" | "group";
        name: string;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
        id: number;
    } | undefined;
    meta?: {
        createdByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        createdDate?: string | undefined;
        lastModifiedByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        lastModifiedDate?: string | undefined;
        numChildren?: number | undefined;
        numCollections?: number | undefined;
        numItems?: number | undefined;
    } | undefined;
}>;
export declare const ZoteroSearchConditionSchema: z.ZodObject<{
    condition: z.ZodString;
    operator: z.ZodString;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    condition: string;
    operator: string;
}, {
    value: string;
    condition: string;
    operator: string;
}>;
export declare const ZoteroSearchDataSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
} & {
    name: z.ZodString;
    conditions: z.ZodArray<z.ZodObject<{
        condition: z.ZodString;
        operator: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        condition: string;
        operator: string;
    }, {
        value: string;
        condition: string;
        operator: string;
    }>, "many">;
}, "strip", z.ZodAny, z.objectOutputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
} & {
    name: z.ZodString;
    conditions: z.ZodArray<z.ZodObject<{
        condition: z.ZodString;
        operator: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        condition: string;
        operator: string;
    }, {
        value: string;
        condition: string;
        operator: string;
    }>, "many">;
}, z.ZodAny, "strip">, z.objectInputType<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
} & {
    name: z.ZodString;
    conditions: z.ZodArray<z.ZodObject<{
        condition: z.ZodString;
        operator: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        condition: string;
        operator: string;
    }, {
        value: string;
        condition: string;
        operator: string;
    }>, "many">;
}, z.ZodAny, "strip">>;
export declare const ZoteroSearchSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    library: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["user", "group"]>;
        id: z.ZodNumber;
        name: z.ZodString;
        links: z.ZodObject<{
            alternate: z.ZodObject<{
                href: z.ZodString;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                href: string;
            }, {
                type: string;
                href: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            alternate: {
                type: string;
                href: string;
            };
        }, {
            alternate: {
                type: string;
                href: string;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "user" | "group";
        name: string;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
        id: number;
    }, {
        type: "user" | "group";
        name: string;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
        id: number;
    }>>;
    links: z.ZodOptional<z.ZodObject<{
        self: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        alternate: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        up: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        enclosure: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
            length: z.ZodOptional<z.ZodNumber>;
            title: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        }, {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    }, {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    }>>;
    meta: z.ZodOptional<z.ZodObject<{
        createdByUser: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            username: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
            username: string;
        }, {
            name: string;
            id: number;
            username: string;
        }>>;
        createdDate: z.ZodOptional<z.ZodString>;
        lastModifiedByUser: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            username: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
            username: string;
        }, {
            name: string;
            id: number;
            username: string;
        }>>;
        lastModifiedDate: z.ZodOptional<z.ZodString>;
        numChildren: z.ZodOptional<z.ZodNumber>;
        numCollections: z.ZodOptional<z.ZodNumber>;
        numItems: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        createdByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        createdDate?: string | undefined;
        lastModifiedByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        lastModifiedDate?: string | undefined;
        numChildren?: number | undefined;
        numCollections?: number | undefined;
        numItems?: number | undefined;
    }, {
        createdByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        createdDate?: string | undefined;
        lastModifiedByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        lastModifiedDate?: string | undefined;
        numChildren?: number | undefined;
        numCollections?: number | undefined;
        numItems?: number | undefined;
    }>>;
    data: z.ZodObject<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
    } & {
        name: z.ZodString;
        conditions: z.ZodArray<z.ZodObject<{
            condition: z.ZodString;
            operator: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            condition: string;
            operator: string;
        }, {
            value: string;
            condition: string;
            operator: string;
        }>, "many">;
    }, "strip", z.ZodAny, z.objectOutputType<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
    } & {
        name: z.ZodString;
        conditions: z.ZodArray<z.ZodObject<{
            condition: z.ZodString;
            operator: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            condition: string;
            operator: string;
        }, {
            value: string;
            condition: string;
            operator: string;
        }>, "many">;
    }, z.ZodAny, "strip">, z.objectInputType<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
    } & {
        name: z.ZodString;
        conditions: z.ZodArray<z.ZodObject<{
            condition: z.ZodString;
            operator: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            condition: string;
            operator: string;
        }, {
            value: string;
            condition: string;
            operator: string;
        }>, "many">;
    }, z.ZodAny, "strip">>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        conditions: {
            value: string;
            condition: string;
            operator: string;
        }[];
        key?: string | undefined;
        version?: number | undefined;
    } & {
        [k: string]: any;
    };
    key?: string | undefined;
    version?: number | undefined;
    links?: {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    } | undefined;
    library?: {
        type: "user" | "group";
        name: string;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
        id: number;
    } | undefined;
    meta?: {
        createdByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        createdDate?: string | undefined;
        lastModifiedByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        lastModifiedDate?: string | undefined;
        numChildren?: number | undefined;
        numCollections?: number | undefined;
        numItems?: number | undefined;
    } | undefined;
}, {
    data: {
        name: string;
        conditions: {
            value: string;
            condition: string;
            operator: string;
        }[];
        key?: string | undefined;
        version?: number | undefined;
    } & {
        [k: string]: any;
    };
    key?: string | undefined;
    version?: number | undefined;
    links?: {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    } | undefined;
    library?: {
        type: "user" | "group";
        name: string;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
        id: number;
    } | undefined;
    meta?: {
        createdByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        createdDate?: string | undefined;
        lastModifiedByUser?: {
            name: string;
            id: number;
            username: string;
        } | undefined;
        lastModifiedDate?: string | undefined;
        numChildren?: number | undefined;
        numCollections?: number | undefined;
        numItems?: number | undefined;
    } | undefined;
}>;
export declare const ZoteroSearchQuerySchema: z.ZodObject<{
    q: z.ZodOptional<z.ZodString>;
    itemType: z.ZodOptional<z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>>;
    tag: z.ZodOptional<z.ZodString>;
    since: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    direction: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    start: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    format: z.ZodOptional<z.ZodEnum<["json", "keys", "versions", "bibtex", "biblatex", "bookmarks", "coins", "csljson", "mods", "refer", "rdf_bibliontology", "rdf_dc", "rdf_zotero", "ris", "tei", "wikipedia"]>>;
    include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    sort?: string | undefined;
    itemType?: "map" | "annotation" | "artwork" | "attachment" | "audioRecording" | "bill" | "blogPost" | "book" | "bookSection" | "case" | "computerProgram" | "conferencePaper" | "dataset" | "dictionaryEntry" | "document" | "email" | "encyclopediaArticle" | "film" | "forumPost" | "hearing" | "instantMessage" | "interview" | "journalArticle" | "letter" | "magazineArticle" | "manuscript" | "newspaperArticle" | "note" | "patent" | "podcast" | "preprint" | "presentation" | "radioBroadcast" | "report" | "standard" | "statute" | "thesis" | "tvBroadcast" | "videoRecording" | "webpage" | undefined;
    format?: "keys" | "json" | "versions" | "bibtex" | "biblatex" | "bookmarks" | "coins" | "csljson" | "mods" | "refer" | "rdf_bibliontology" | "rdf_dc" | "rdf_zotero" | "ris" | "tei" | "wikipedia" | undefined;
    tag?: string | undefined;
    q?: string | undefined;
    since?: number | undefined;
    direction?: "asc" | "desc" | undefined;
    start?: number | undefined;
    limit?: number | undefined;
    include?: string[] | undefined;
}, {
    sort?: string | undefined;
    itemType?: "map" | "annotation" | "artwork" | "attachment" | "audioRecording" | "bill" | "blogPost" | "book" | "bookSection" | "case" | "computerProgram" | "conferencePaper" | "dataset" | "dictionaryEntry" | "document" | "email" | "encyclopediaArticle" | "film" | "forumPost" | "hearing" | "instantMessage" | "interview" | "journalArticle" | "letter" | "magazineArticle" | "manuscript" | "newspaperArticle" | "note" | "patent" | "podcast" | "preprint" | "presentation" | "radioBroadcast" | "report" | "standard" | "statute" | "thesis" | "tvBroadcast" | "videoRecording" | "webpage" | undefined;
    format?: "keys" | "json" | "versions" | "bibtex" | "biblatex" | "bookmarks" | "coins" | "csljson" | "mods" | "refer" | "rdf_bibliontology" | "rdf_dc" | "rdf_zotero" | "ris" | "tei" | "wikipedia" | undefined;
    tag?: string | undefined;
    q?: string | undefined;
    since?: number | undefined;
    direction?: "asc" | "desc" | undefined;
    start?: number | undefined;
    limit?: number | undefined;
    include?: string[] | undefined;
}>;
export declare const ZoteroSearchResultSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
        library: z.ZodOptional<z.ZodObject<{
            type: z.ZodEnum<["user", "group"]>;
            id: z.ZodNumber;
            name: z.ZodString;
            links: z.ZodObject<{
                alternate: z.ZodObject<{
                    href: z.ZodString;
                    type: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    type: string;
                    href: string;
                }, {
                    type: string;
                    href: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                alternate: {
                    type: string;
                    href: string;
                };
            }, {
                alternate: {
                    type: string;
                    href: string;
                };
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "user" | "group";
            name: string;
            links: {
                alternate: {
                    type: string;
                    href: string;
                };
            };
            id: number;
        }, {
            type: "user" | "group";
            name: string;
            links: {
                alternate: {
                    type: string;
                    href: string;
                };
            };
            id: number;
        }>>;
        links: z.ZodOptional<z.ZodObject<{
            self: z.ZodOptional<z.ZodObject<{
                href: z.ZodString;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                href: string;
            }, {
                type: string;
                href: string;
            }>>;
            alternate: z.ZodOptional<z.ZodObject<{
                href: z.ZodString;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                href: string;
            }, {
                type: string;
                href: string;
            }>>;
            up: z.ZodOptional<z.ZodObject<{
                href: z.ZodString;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
                href: string;
            }, {
                type: string;
                href: string;
            }>>;
            enclosure: z.ZodOptional<z.ZodObject<{
                href: z.ZodString;
                type: z.ZodString;
                length: z.ZodOptional<z.ZodNumber>;
                title: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type: string;
                href: string;
                length?: number | undefined;
                title?: string | undefined;
            }, {
                type: string;
                href: string;
                length?: number | undefined;
                title?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            self?: {
                type: string;
                href: string;
            } | undefined;
            alternate?: {
                type: string;
                href: string;
            } | undefined;
            up?: {
                type: string;
                href: string;
            } | undefined;
            enclosure?: {
                type: string;
                href: string;
                length?: number | undefined;
                title?: string | undefined;
            } | undefined;
        }, {
            self?: {
                type: string;
                href: string;
            } | undefined;
            alternate?: {
                type: string;
                href: string;
            } | undefined;
            up?: {
                type: string;
                href: string;
            } | undefined;
            enclosure?: {
                type: string;
                href: string;
                length?: number | undefined;
                title?: string | undefined;
            } | undefined;
        }>>;
        meta: z.ZodOptional<z.ZodObject<{
            createdByUser: z.ZodOptional<z.ZodObject<{
                id: z.ZodNumber;
                username: z.ZodString;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                id: number;
                username: string;
            }, {
                name: string;
                id: number;
                username: string;
            }>>;
            createdDate: z.ZodOptional<z.ZodString>;
            lastModifiedByUser: z.ZodOptional<z.ZodObject<{
                id: z.ZodNumber;
                username: z.ZodString;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                id: number;
                username: string;
            }, {
                name: string;
                id: number;
                username: string;
            }>>;
            lastModifiedDate: z.ZodOptional<z.ZodString>;
            numChildren: z.ZodOptional<z.ZodNumber>;
            numCollections: z.ZodOptional<z.ZodNumber>;
            numItems: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            createdByUser?: {
                name: string;
                id: number;
                username: string;
            } | undefined;
            createdDate?: string | undefined;
            lastModifiedByUser?: {
                name: string;
                id: number;
                username: string;
            } | undefined;
            lastModifiedDate?: string | undefined;
            numChildren?: number | undefined;
            numCollections?: number | undefined;
            numItems?: number | undefined;
        }, {
            createdByUser?: {
                name: string;
                id: number;
                username: string;
            } | undefined;
            createdDate?: string | undefined;
            lastModifiedByUser?: {
                name: string;
                id: number;
                username: string;
            } | undefined;
            lastModifiedDate?: string | undefined;
            numChildren?: number | undefined;
            numCollections?: number | undefined;
            numItems?: number | undefined;
        }>>;
        data: z.ZodObject<{
            key: z.ZodOptional<z.ZodString>;
            version: z.ZodOptional<z.ZodNumber>;
        } & {
            itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
            title: z.ZodOptional<z.ZodString>;
            creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
                creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
                name: z.ZodOptional<z.ZodString>;
                firstName: z.ZodOptional<z.ZodString>;
                lastName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
                name?: string | undefined;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }, {
                creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
                name?: string | undefined;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }>, "many">>;
            abstractNote: z.ZodOptional<z.ZodString>;
            series: z.ZodOptional<z.ZodString>;
            seriesNumber: z.ZodOptional<z.ZodString>;
            volume: z.ZodOptional<z.ZodString>;
            numberOfVolumes: z.ZodOptional<z.ZodString>;
            edition: z.ZodOptional<z.ZodString>;
            place: z.ZodOptional<z.ZodString>;
            publisher: z.ZodOptional<z.ZodString>;
            date: z.ZodOptional<z.ZodString>;
            numPages: z.ZodOptional<z.ZodString>;
            language: z.ZodOptional<z.ZodString>;
            ISBN: z.ZodOptional<z.ZodString>;
            shortTitle: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
            accessDate: z.ZodOptional<z.ZodString>;
            archive: z.ZodOptional<z.ZodString>;
            archiveLocation: z.ZodOptional<z.ZodString>;
            libraryCatalog: z.ZodOptional<z.ZodString>;
            callNumber: z.ZodOptional<z.ZodString>;
            rights: z.ZodOptional<z.ZodString>;
            extra: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
                tag: z.ZodString;
                type: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                tag: string;
                type?: number | undefined;
            }, {
                tag: string;
                type?: number | undefined;
            }>, "many">>;
            collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
            dateAdded: z.ZodOptional<z.ZodString>;
            dateModified: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodAny, z.objectOutputType<{
            key: z.ZodOptional<z.ZodString>;
            version: z.ZodOptional<z.ZodNumber>;
        } & {
            itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
            title: z.ZodOptional<z.ZodString>;
            creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
                creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
                name: z.ZodOptional<z.ZodString>;
                firstName: z.ZodOptional<z.ZodString>;
                lastName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
                name?: string | undefined;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }, {
                creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
                name?: string | undefined;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }>, "many">>;
            abstractNote: z.ZodOptional<z.ZodString>;
            series: z.ZodOptional<z.ZodString>;
            seriesNumber: z.ZodOptional<z.ZodString>;
            volume: z.ZodOptional<z.ZodString>;
            numberOfVolumes: z.ZodOptional<z.ZodString>;
            edition: z.ZodOptional<z.ZodString>;
            place: z.ZodOptional<z.ZodString>;
            publisher: z.ZodOptional<z.ZodString>;
            date: z.ZodOptional<z.ZodString>;
            numPages: z.ZodOptional<z.ZodString>;
            language: z.ZodOptional<z.ZodString>;
            ISBN: z.ZodOptional<z.ZodString>;
            shortTitle: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
            accessDate: z.ZodOptional<z.ZodString>;
            archive: z.ZodOptional<z.ZodString>;
            archiveLocation: z.ZodOptional<z.ZodString>;
            libraryCatalog: z.ZodOptional<z.ZodString>;
            callNumber: z.ZodOptional<z.ZodString>;
            rights: z.ZodOptional<z.ZodString>;
            extra: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
                tag: z.ZodString;
                type: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                tag: string;
                type?: number | undefined;
            }, {
                tag: string;
                type?: number | undefined;
            }>, "many">>;
            collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
            dateAdded: z.ZodOptional<z.ZodString>;
            dateModified: z.ZodOptional<z.ZodString>;
        }, z.ZodAny, "strip">, z.objectInputType<{
            key: z.ZodOptional<z.ZodString>;
            version: z.ZodOptional<z.ZodNumber>;
        } & {
            itemType: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
            title: z.ZodOptional<z.ZodString>;
            creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
                creatorType: z.ZodEnum<["artist", "contributor", "performer", "composer", "wordsBy", "sponsor", "cosponsor", "author", "commenter", "editor", "translator", "seriesEditor", "bookAuthor", "counsel", "programmer", "reviewedAuthor", "recipient", "director", "scriptwriter", "producer", "interviewee", "interviewer", "cartographer", "inventor", "attorneyAgent", "podcaster", "guest", "presenter", "castMember"]>;
                name: z.ZodOptional<z.ZodString>;
                firstName: z.ZodOptional<z.ZodString>;
                lastName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
                name?: string | undefined;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }, {
                creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
                name?: string | undefined;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }>, "many">>;
            abstractNote: z.ZodOptional<z.ZodString>;
            series: z.ZodOptional<z.ZodString>;
            seriesNumber: z.ZodOptional<z.ZodString>;
            volume: z.ZodOptional<z.ZodString>;
            numberOfVolumes: z.ZodOptional<z.ZodString>;
            edition: z.ZodOptional<z.ZodString>;
            place: z.ZodOptional<z.ZodString>;
            publisher: z.ZodOptional<z.ZodString>;
            date: z.ZodOptional<z.ZodString>;
            numPages: z.ZodOptional<z.ZodString>;
            language: z.ZodOptional<z.ZodString>;
            ISBN: z.ZodOptional<z.ZodString>;
            shortTitle: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
            accessDate: z.ZodOptional<z.ZodString>;
            archive: z.ZodOptional<z.ZodString>;
            archiveLocation: z.ZodOptional<z.ZodString>;
            libraryCatalog: z.ZodOptional<z.ZodString>;
            callNumber: z.ZodOptional<z.ZodString>;
            rights: z.ZodOptional<z.ZodString>;
            extra: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
                tag: z.ZodString;
                type: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                tag: string;
                type?: number | undefined;
            }, {
                tag: string;
                type?: number | undefined;
            }>, "many">>;
            collections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
            dateAdded: z.ZodOptional<z.ZodString>;
            dateModified: z.ZodOptional<z.ZodString>;
        }, z.ZodAny, "strip">>;
    }, "strip", z.ZodTypeAny, {
        data: {
            itemType: "map" | "annotation" | "artwork" | "attachment" | "audioRecording" | "bill" | "blogPost" | "book" | "bookSection" | "case" | "computerProgram" | "conferencePaper" | "dataset" | "dictionaryEntry" | "document" | "email" | "encyclopediaArticle" | "film" | "forumPost" | "hearing" | "instantMessage" | "interview" | "journalArticle" | "letter" | "magazineArticle" | "manuscript" | "newspaperArticle" | "note" | "patent" | "podcast" | "preprint" | "presentation" | "radioBroadcast" | "report" | "standard" | "statute" | "thesis" | "tvBroadcast" | "videoRecording" | "webpage";
            key?: string | undefined;
            version?: number | undefined;
            title?: string | undefined;
            creators?: {
                creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
                name?: string | undefined;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }[] | undefined;
            abstractNote?: string | undefined;
            series?: string | undefined;
            seriesNumber?: string | undefined;
            volume?: string | undefined;
            numberOfVolumes?: string | undefined;
            edition?: string | undefined;
            place?: string | undefined;
            publisher?: string | undefined;
            date?: string | undefined;
            numPages?: string | undefined;
            language?: string | undefined;
            ISBN?: string | undefined;
            shortTitle?: string | undefined;
            url?: string | undefined;
            accessDate?: string | undefined;
            archive?: string | undefined;
            archiveLocation?: string | undefined;
            libraryCatalog?: string | undefined;
            callNumber?: string | undefined;
            rights?: string | undefined;
            extra?: string | undefined;
            tags?: {
                tag: string;
                type?: number | undefined;
            }[] | undefined;
            collections?: string[] | undefined;
            relations?: Record<string, string | string[]> | undefined;
            dateAdded?: string | undefined;
            dateModified?: string | undefined;
        } & {
            [k: string]: any;
        };
        key?: string | undefined;
        version?: number | undefined;
        links?: {
            self?: {
                type: string;
                href: string;
            } | undefined;
            alternate?: {
                type: string;
                href: string;
            } | undefined;
            up?: {
                type: string;
                href: string;
            } | undefined;
            enclosure?: {
                type: string;
                href: string;
                length?: number | undefined;
                title?: string | undefined;
            } | undefined;
        } | undefined;
        library?: {
            type: "user" | "group";
            name: string;
            links: {
                alternate: {
                    type: string;
                    href: string;
                };
            };
            id: number;
        } | undefined;
        meta?: {
            createdByUser?: {
                name: string;
                id: number;
                username: string;
            } | undefined;
            createdDate?: string | undefined;
            lastModifiedByUser?: {
                name: string;
                id: number;
                username: string;
            } | undefined;
            lastModifiedDate?: string | undefined;
            numChildren?: number | undefined;
            numCollections?: number | undefined;
            numItems?: number | undefined;
        } | undefined;
    }, {
        data: {
            itemType: "map" | "annotation" | "artwork" | "attachment" | "audioRecording" | "bill" | "blogPost" | "book" | "bookSection" | "case" | "computerProgram" | "conferencePaper" | "dataset" | "dictionaryEntry" | "document" | "email" | "encyclopediaArticle" | "film" | "forumPost" | "hearing" | "instantMessage" | "interview" | "journalArticle" | "letter" | "magazineArticle" | "manuscript" | "newspaperArticle" | "note" | "patent" | "podcast" | "preprint" | "presentation" | "radioBroadcast" | "report" | "standard" | "statute" | "thesis" | "tvBroadcast" | "videoRecording" | "webpage";
            key?: string | undefined;
            version?: number | undefined;
            title?: string | undefined;
            creators?: {
                creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
                name?: string | undefined;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }[] | undefined;
            abstractNote?: string | undefined;
            series?: string | undefined;
            seriesNumber?: string | undefined;
            volume?: string | undefined;
            numberOfVolumes?: string | undefined;
            edition?: string | undefined;
            place?: string | undefined;
            publisher?: string | undefined;
            date?: string | undefined;
            numPages?: string | undefined;
            language?: string | undefined;
            ISBN?: string | undefined;
            shortTitle?: string | undefined;
            url?: string | undefined;
            accessDate?: string | undefined;
            archive?: string | undefined;
            archiveLocation?: string | undefined;
            libraryCatalog?: string | undefined;
            callNumber?: string | undefined;
            rights?: string | undefined;
            extra?: string | undefined;
            tags?: {
                tag: string;
                type?: number | undefined;
            }[] | undefined;
            collections?: string[] | undefined;
            relations?: Record<string, string | string[]> | undefined;
            dateAdded?: string | undefined;
            dateModified?: string | undefined;
        } & {
            [k: string]: any;
        };
        key?: string | undefined;
        version?: number | undefined;
        links?: {
            self?: {
                type: string;
                href: string;
            } | undefined;
            alternate?: {
                type: string;
                href: string;
            } | undefined;
            up?: {
                type: string;
                href: string;
            } | undefined;
            enclosure?: {
                type: string;
                href: string;
                length?: number | undefined;
                title?: string | undefined;
            } | undefined;
        } | undefined;
        library?: {
            type: "user" | "group";
            name: string;
            links: {
                alternate: {
                    type: string;
                    href: string;
                };
            };
            id: number;
        } | undefined;
        meta?: {
            createdByUser?: {
                name: string;
                id: number;
                username: string;
            } | undefined;
            createdDate?: string | undefined;
            lastModifiedByUser?: {
                name: string;
                id: number;
                username: string;
            } | undefined;
            lastModifiedDate?: string | undefined;
            numChildren?: number | undefined;
            numCollections?: number | undefined;
            numItems?: number | undefined;
        } | undefined;
    }>, "many">;
    totalResults: z.ZodNumber;
    lastModifiedVersion: z.ZodNumber;
    links: z.ZodOptional<z.ZodObject<{
        self: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        alternate: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        up: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>>;
        enclosure: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
            length: z.ZodOptional<z.ZodNumber>;
            title: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        }, {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    }, {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    lastModifiedVersion: number;
    totalResults: number;
    items: {
        data: {
            itemType: "map" | "annotation" | "artwork" | "attachment" | "audioRecording" | "bill" | "blogPost" | "book" | "bookSection" | "case" | "computerProgram" | "conferencePaper" | "dataset" | "dictionaryEntry" | "document" | "email" | "encyclopediaArticle" | "film" | "forumPost" | "hearing" | "instantMessage" | "interview" | "journalArticle" | "letter" | "magazineArticle" | "manuscript" | "newspaperArticle" | "note" | "patent" | "podcast" | "preprint" | "presentation" | "radioBroadcast" | "report" | "standard" | "statute" | "thesis" | "tvBroadcast" | "videoRecording" | "webpage";
            key?: string | undefined;
            version?: number | undefined;
            title?: string | undefined;
            creators?: {
                creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
                name?: string | undefined;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }[] | undefined;
            abstractNote?: string | undefined;
            series?: string | undefined;
            seriesNumber?: string | undefined;
            volume?: string | undefined;
            numberOfVolumes?: string | undefined;
            edition?: string | undefined;
            place?: string | undefined;
            publisher?: string | undefined;
            date?: string | undefined;
            numPages?: string | undefined;
            language?: string | undefined;
            ISBN?: string | undefined;
            shortTitle?: string | undefined;
            url?: string | undefined;
            accessDate?: string | undefined;
            archive?: string | undefined;
            archiveLocation?: string | undefined;
            libraryCatalog?: string | undefined;
            callNumber?: string | undefined;
            rights?: string | undefined;
            extra?: string | undefined;
            tags?: {
                tag: string;
                type?: number | undefined;
            }[] | undefined;
            collections?: string[] | undefined;
            relations?: Record<string, string | string[]> | undefined;
            dateAdded?: string | undefined;
            dateModified?: string | undefined;
        } & {
            [k: string]: any;
        };
        key?: string | undefined;
        version?: number | undefined;
        links?: {
            self?: {
                type: string;
                href: string;
            } | undefined;
            alternate?: {
                type: string;
                href: string;
            } | undefined;
            up?: {
                type: string;
                href: string;
            } | undefined;
            enclosure?: {
                type: string;
                href: string;
                length?: number | undefined;
                title?: string | undefined;
            } | undefined;
        } | undefined;
        library?: {
            type: "user" | "group";
            name: string;
            links: {
                alternate: {
                    type: string;
                    href: string;
                };
            };
            id: number;
        } | undefined;
        meta?: {
            createdByUser?: {
                name: string;
                id: number;
                username: string;
            } | undefined;
            createdDate?: string | undefined;
            lastModifiedByUser?: {
                name: string;
                id: number;
                username: string;
            } | undefined;
            lastModifiedDate?: string | undefined;
            numChildren?: number | undefined;
            numCollections?: number | undefined;
            numItems?: number | undefined;
        } | undefined;
    }[];
    links?: {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    } | undefined;
}, {
    lastModifiedVersion: number;
    totalResults: number;
    items: {
        data: {
            itemType: "map" | "annotation" | "artwork" | "attachment" | "audioRecording" | "bill" | "blogPost" | "book" | "bookSection" | "case" | "computerProgram" | "conferencePaper" | "dataset" | "dictionaryEntry" | "document" | "email" | "encyclopediaArticle" | "film" | "forumPost" | "hearing" | "instantMessage" | "interview" | "journalArticle" | "letter" | "magazineArticle" | "manuscript" | "newspaperArticle" | "note" | "patent" | "podcast" | "preprint" | "presentation" | "radioBroadcast" | "report" | "standard" | "statute" | "thesis" | "tvBroadcast" | "videoRecording" | "webpage";
            key?: string | undefined;
            version?: number | undefined;
            title?: string | undefined;
            creators?: {
                creatorType: "artist" | "contributor" | "performer" | "composer" | "wordsBy" | "sponsor" | "cosponsor" | "author" | "commenter" | "editor" | "translator" | "seriesEditor" | "bookAuthor" | "counsel" | "programmer" | "reviewedAuthor" | "recipient" | "director" | "scriptwriter" | "producer" | "interviewee" | "interviewer" | "cartographer" | "inventor" | "attorneyAgent" | "podcaster" | "guest" | "presenter" | "castMember";
                name?: string | undefined;
                firstName?: string | undefined;
                lastName?: string | undefined;
            }[] | undefined;
            abstractNote?: string | undefined;
            series?: string | undefined;
            seriesNumber?: string | undefined;
            volume?: string | undefined;
            numberOfVolumes?: string | undefined;
            edition?: string | undefined;
            place?: string | undefined;
            publisher?: string | undefined;
            date?: string | undefined;
            numPages?: string | undefined;
            language?: string | undefined;
            ISBN?: string | undefined;
            shortTitle?: string | undefined;
            url?: string | undefined;
            accessDate?: string | undefined;
            archive?: string | undefined;
            archiveLocation?: string | undefined;
            libraryCatalog?: string | undefined;
            callNumber?: string | undefined;
            rights?: string | undefined;
            extra?: string | undefined;
            tags?: {
                tag: string;
                type?: number | undefined;
            }[] | undefined;
            collections?: string[] | undefined;
            relations?: Record<string, string | string[]> | undefined;
            dateAdded?: string | undefined;
            dateModified?: string | undefined;
        } & {
            [k: string]: any;
        };
        key?: string | undefined;
        version?: number | undefined;
        links?: {
            self?: {
                type: string;
                href: string;
            } | undefined;
            alternate?: {
                type: string;
                href: string;
            } | undefined;
            up?: {
                type: string;
                href: string;
            } | undefined;
            enclosure?: {
                type: string;
                href: string;
                length?: number | undefined;
                title?: string | undefined;
            } | undefined;
        } | undefined;
        library?: {
            type: "user" | "group";
            name: string;
            links: {
                alternate: {
                    type: string;
                    href: string;
                };
            };
            id: number;
        } | undefined;
        meta?: {
            createdByUser?: {
                name: string;
                id: number;
                username: string;
            } | undefined;
            createdDate?: string | undefined;
            lastModifiedByUser?: {
                name: string;
                id: number;
                username: string;
            } | undefined;
            lastModifiedDate?: string | undefined;
            numChildren?: number | undefined;
            numCollections?: number | undefined;
            numItems?: number | undefined;
        } | undefined;
    }[];
    links?: {
        self?: {
            type: string;
            href: string;
        } | undefined;
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        up?: {
            type: string;
            href: string;
        } | undefined;
        enclosure?: {
            type: string;
            href: string;
            length?: number | undefined;
            title?: string | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const ZoteroLibrarySchema: z.ZodObject<{
    type: z.ZodEnum<["user", "group"]>;
    id: z.ZodNumber;
    name: z.ZodString;
    links: z.ZodObject<{
        alternate: z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        alternate: {
            type: string;
            href: string;
        };
    }, {
        alternate: {
            type: string;
            href: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    type: "user" | "group";
    name: string;
    links: {
        alternate: {
            type: string;
            href: string;
        };
    };
    id: number;
}, {
    type: "user" | "group";
    name: string;
    links: {
        alternate: {
            type: string;
            href: string;
        };
    };
    id: number;
}>;
export declare const ZoteroGroupMemberSchema: z.ZodObject<{
    id: z.ZodNumber;
    username: z.ZodString;
    name: z.ZodString;
    role: z.ZodEnum<["member", "admin", "owner"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: number;
    username: string;
    role: "member" | "admin" | "owner";
}, {
    name: string;
    id: number;
    username: string;
    role: "member" | "admin" | "owner";
}>;
export declare const ZoteroGroupMetadataSchema: z.ZodObject<{
    id: z.ZodNumber;
    version: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodString;
    url: z.ZodString;
    library: z.ZodObject<{
        type: z.ZodEnum<["Private", "PublicOpen", "PublicClosed"]>;
        reading: z.ZodEnum<["all", "members"]>;
        editing: z.ZodEnum<["members", "admins"]>;
    }, "strip", z.ZodTypeAny, {
        type: "Private" | "PublicOpen" | "PublicClosed";
        reading: "all" | "members";
        editing: "members" | "admins";
    }, {
        type: "Private" | "PublicOpen" | "PublicClosed";
        reading: "all" | "members";
        editing: "members" | "admins";
    }>;
    members: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        username: z.ZodString;
        name: z.ZodString;
        role: z.ZodEnum<["member", "admin", "owner"]>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        username: string;
        role: "member" | "admin" | "owner";
    }, {
        name: string;
        id: number;
        username: string;
        role: "member" | "admin" | "owner";
    }>, "many">;
    admins: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        username: z.ZodString;
        name: z.ZodString;
        role: z.ZodEnum<["member", "admin", "owner"]>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        username: string;
        role: "member" | "admin" | "owner";
    }, {
        name: string;
        id: number;
        username: string;
        role: "member" | "admin" | "owner";
    }>, "many">;
    owner: z.ZodObject<{
        id: z.ZodNumber;
        username: z.ZodString;
        name: z.ZodString;
        role: z.ZodEnum<["member", "admin", "owner"]>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        username: string;
        role: "member" | "admin" | "owner";
    }, {
        name: string;
        id: number;
        username: string;
        role: "member" | "admin" | "owner";
    }>;
    created: z.ZodString;
    lastModified: z.ZodString;
}, "strip", z.ZodTypeAny, {
    version: number;
    url: string;
    name: string;
    owner: {
        name: string;
        id: number;
        username: string;
        role: "member" | "admin" | "owner";
    };
    members: {
        name: string;
        id: number;
        username: string;
        role: "member" | "admin" | "owner";
    }[];
    admins: {
        name: string;
        id: number;
        username: string;
        role: "member" | "admin" | "owner";
    }[];
    id: number;
    library: {
        type: "Private" | "PublicOpen" | "PublicClosed";
        reading: "all" | "members";
        editing: "members" | "admins";
    };
    description: string;
    created: string;
    lastModified: string;
}, {
    version: number;
    url: string;
    name: string;
    owner: {
        name: string;
        id: number;
        username: string;
        role: "member" | "admin" | "owner";
    };
    members: {
        name: string;
        id: number;
        username: string;
        role: "member" | "admin" | "owner";
    }[];
    admins: {
        name: string;
        id: number;
        username: string;
        role: "member" | "admin" | "owner";
    }[];
    id: number;
    library: {
        type: "Private" | "PublicOpen" | "PublicClosed";
        reading: "all" | "members";
        editing: "members" | "admins";
    };
    description: string;
    created: string;
    lastModified: string;
}>;
export declare const ZoteroGroupSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    links: z.ZodObject<{
        alternate: z.ZodObject<{
            href: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            href: string;
        }, {
            type: string;
            href: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        alternate: {
            type: string;
            href: string;
        };
    }, {
        alternate: {
            type: string;
            href: string;
        };
    }>;
} & {
    type: z.ZodLiteral<"group">;
    data: z.ZodObject<{
        id: z.ZodNumber;
        version: z.ZodNumber;
        name: z.ZodString;
        description: z.ZodString;
        url: z.ZodString;
        library: z.ZodObject<{
            type: z.ZodEnum<["Private", "PublicOpen", "PublicClosed"]>;
            reading: z.ZodEnum<["all", "members"]>;
            editing: z.ZodEnum<["members", "admins"]>;
        }, "strip", z.ZodTypeAny, {
            type: "Private" | "PublicOpen" | "PublicClosed";
            reading: "all" | "members";
            editing: "members" | "admins";
        }, {
            type: "Private" | "PublicOpen" | "PublicClosed";
            reading: "all" | "members";
            editing: "members" | "admins";
        }>;
        members: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            username: z.ZodString;
            name: z.ZodString;
            role: z.ZodEnum<["member", "admin", "owner"]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }, {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }>, "many">;
        admins: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            username: z.ZodString;
            name: z.ZodString;
            role: z.ZodEnum<["member", "admin", "owner"]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }, {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }>, "many">;
        owner: z.ZodObject<{
            id: z.ZodNumber;
            username: z.ZodString;
            name: z.ZodString;
            role: z.ZodEnum<["member", "admin", "owner"]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }, {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }>;
        created: z.ZodString;
        lastModified: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        version: number;
        url: string;
        name: string;
        owner: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        };
        members: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }[];
        admins: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }[];
        id: number;
        library: {
            type: "Private" | "PublicOpen" | "PublicClosed";
            reading: "all" | "members";
            editing: "members" | "admins";
        };
        description: string;
        created: string;
        lastModified: string;
    }, {
        version: number;
        url: string;
        name: string;
        owner: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        };
        members: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }[];
        admins: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }[];
        id: number;
        library: {
            type: "Private" | "PublicOpen" | "PublicClosed";
            reading: "all" | "members";
            editing: "members" | "admins";
        };
        description: string;
        created: string;
        lastModified: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "group";
    name: string;
    data: {
        version: number;
        url: string;
        name: string;
        owner: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        };
        members: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }[];
        admins: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }[];
        id: number;
        library: {
            type: "Private" | "PublicOpen" | "PublicClosed";
            reading: "all" | "members";
            editing: "members" | "admins";
        };
        description: string;
        created: string;
        lastModified: string;
    };
    links: {
        alternate: {
            type: string;
            href: string;
        };
    };
    id: number;
}, {
    type: "group";
    name: string;
    data: {
        version: number;
        url: string;
        name: string;
        owner: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        };
        members: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }[];
        admins: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        }[];
        id: number;
        library: {
            type: "Private" | "PublicOpen" | "PublicClosed";
            reading: "all" | "members";
            editing: "members" | "admins";
        };
        description: string;
        created: string;
        lastModified: string;
    };
    links: {
        alternate: {
            type: string;
            href: string;
        };
    };
    id: number;
}>;
export declare const ZoteroSyncSchema: z.ZodObject<{
    lastModifiedVersion: z.ZodNumber;
    username: z.ZodOptional<z.ZodString>;
    userID: z.ZodOptional<z.ZodNumber>;
    uploaded: z.ZodOptional<z.ZodObject<{
        collections: z.ZodNumber;
        items: z.ZodNumber;
        searches: z.ZodNumber;
        tags: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        tags: number;
        collections: number;
        items: number;
        searches: number;
    }, {
        tags: number;
        collections: number;
        items: number;
        searches: number;
    }>>;
    unchanged: z.ZodOptional<z.ZodObject<{
        collections: z.ZodNumber;
        items: z.ZodNumber;
        searches: z.ZodNumber;
        tags: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        tags: number;
        collections: number;
        items: number;
        searches: number;
    }, {
        tags: number;
        collections: number;
        items: number;
        searches: number;
    }>>;
    failed: z.ZodOptional<z.ZodObject<{
        collections: z.ZodArray<z.ZodString, "many">;
        items: z.ZodArray<z.ZodString, "many">;
        searches: z.ZodArray<z.ZodString, "many">;
        tags: z.ZodArray<z.ZodObject<{
            tag: z.ZodString;
            type: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            tag: string;
            type?: number | undefined;
        }, {
            tag: string;
            type?: number | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        tags: {
            tag: string;
            type?: number | undefined;
        }[];
        collections: string[];
        items: string[];
        searches: string[];
    }, {
        tags: {
            tag: string;
            type?: number | undefined;
        }[];
        collections: string[];
        items: string[];
        searches: string[];
    }>>;
}, "strip", z.ZodTypeAny, {
    lastModifiedVersion: number;
    username?: string | undefined;
    userID?: number | undefined;
    uploaded?: {
        tags: number;
        collections: number;
        items: number;
        searches: number;
    } | undefined;
    unchanged?: {
        tags: number;
        collections: number;
        items: number;
        searches: number;
    } | undefined;
    failed?: {
        tags: {
            tag: string;
            type?: number | undefined;
        }[];
        collections: string[];
        items: string[];
        searches: string[];
    } | undefined;
}, {
    lastModifiedVersion: number;
    username?: string | undefined;
    userID?: number | undefined;
    uploaded?: {
        tags: number;
        collections: number;
        items: number;
        searches: number;
    } | undefined;
    unchanged?: {
        tags: number;
        collections: number;
        items: number;
        searches: number;
    } | undefined;
    failed?: {
        tags: {
            tag: string;
            type?: number | undefined;
        }[];
        collections: string[];
        items: string[];
        searches: string[];
    } | undefined;
}>;
export declare const ZoteroSyncErrorSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    data: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    data?: any;
}, {
    code: string;
    message: string;
    data?: any;
}>;
export declare const ZoteroFulltextContentSchema: z.ZodObject<{
    content: z.ZodString;
    indexedChars: z.ZodNumber;
    totalChars: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    content: string;
    indexedChars: number;
    totalChars: number;
}, {
    content: string;
    indexedChars: number;
    totalChars: number;
}>;
export declare const ZoteroHighlightSchema: z.ZodObject<{
    text: z.ZodString;
    color: z.ZodString;
    pageLabel: z.ZodOptional<z.ZodString>;
    position: z.ZodObject<{
        pageIndex: z.ZodNumber;
        rects: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
    }, "strip", z.ZodTypeAny, {
        pageIndex: number;
        rects: number[][];
    }, {
        pageIndex: number;
        rects: number[][];
    }>;
}, "strip", z.ZodTypeAny, {
    text: string;
    color: string;
    position: {
        pageIndex: number;
        rects: number[][];
    };
    pageLabel?: string | undefined;
}, {
    text: string;
    color: string;
    position: {
        pageIndex: number;
        rects: number[][];
    };
    pageLabel?: string | undefined;
}>;
export declare const ZoteroImageSchema: z.ZodObject<{
    src: z.ZodString;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    annotation: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    src: string;
    annotation?: any;
    width?: number | undefined;
    height?: number | undefined;
}, {
    src: string;
    annotation?: any;
    width?: number | undefined;
    height?: number | undefined;
}>;
export declare const ZoteroInkSchema: z.ZodObject<{
    paths: z.ZodArray<z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">, "many">;
    width: z.ZodNumber;
    color: z.ZodString;
    pageLabel: z.ZodOptional<z.ZodString>;
    position: z.ZodObject<{
        pageIndex: z.ZodNumber;
        rects: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
    }, "strip", z.ZodTypeAny, {
        pageIndex: number;
        rects: number[][];
    }, {
        pageIndex: number;
        rects: number[][];
    }>;
}, "strip", z.ZodTypeAny, {
    color: string;
    position: {
        pageIndex: number;
        rects: number[][];
    };
    width: number;
    paths: number[][][];
    pageLabel?: string | undefined;
}, {
    color: string;
    position: {
        pageIndex: number;
        rects: number[][];
    };
    width: number;
    paths: number[][][];
    pageLabel?: string | undefined;
}>;
//# sourceMappingURL=index.d.ts.map