import { z } from 'zod';
export declare const ZoteroCreatorSchema: z.ZodObject<{
    creatorType: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    creatorType: string;
    name?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}, {
    creatorType: string;
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
export declare const ZoteroItemDataSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    itemType: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: string;
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: string;
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
}, "strip", z.ZodTypeAny, {
    itemType: string;
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: string;
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
}, {
    itemType: string;
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: string;
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
}>;
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
        name: string;
        type: "user" | "group";
        id: number;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
    }, {
        name: string;
        type: "user" | "group";
        id: number;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
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
    }, "strip", z.ZodTypeAny, {
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        self?: {
            type: string;
            href: string;
        } | undefined;
    }, {
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        self?: {
            type: string;
            href: string;
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
    }>>;
    data: z.ZodObject<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
        itemType: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
            creatorType: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            firstName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            creatorType: string;
            name?: string | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
        }, {
            creatorType: string;
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
    }, "strip", z.ZodTypeAny, {
        itemType: string;
        key?: string | undefined;
        version?: number | undefined;
        title?: string | undefined;
        creators?: {
            creatorType: string;
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
    }, {
        itemType: string;
        key?: string | undefined;
        version?: number | undefined;
        title?: string | undefined;
        creators?: {
            creatorType: string;
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
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        itemType: string;
        key?: string | undefined;
        version?: number | undefined;
        title?: string | undefined;
        creators?: {
            creatorType: string;
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
    };
    key?: string | undefined;
    version?: number | undefined;
    links?: {
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        self?: {
            type: string;
            href: string;
        } | undefined;
    } | undefined;
    library?: {
        name: string;
        type: "user" | "group";
        id: number;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
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
    } | undefined;
}, {
    data: {
        itemType: string;
        key?: string | undefined;
        version?: number | undefined;
        title?: string | undefined;
        creators?: {
            creatorType: string;
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
    };
    key?: string | undefined;
    version?: number | undefined;
    links?: {
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        self?: {
            type: string;
            href: string;
        } | undefined;
    } | undefined;
    library?: {
        name: string;
        type: "user" | "group";
        id: number;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
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
    } | undefined;
}>;
export declare const ZoteroItemTypeSchema: z.ZodEnum<["annotation", "artwork", "attachment", "audioRecording", "bill", "blogPost", "book", "bookSection", "case", "computerProgram", "conferencePaper", "dataset", "dictionaryEntry", "document", "email", "encyclopediaArticle", "film", "forumPost", "hearing", "instantMessage", "interview", "journalArticle", "letter", "magazineArticle", "manuscript", "map", "newspaperArticle", "note", "patent", "podcast", "preprint", "presentation", "radioBroadcast", "report", "standard", "statute", "thesis", "tvBroadcast", "videoRecording", "webpage"]>;
export declare const ZoteroAnnotationItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: string;
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: string;
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
}, "strip", z.ZodTypeAny, {
    itemType: "annotation";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: string;
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
}, {
    itemType: "annotation";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: string;
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
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "artwork";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "artist" | "contributor";
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
    artworkMedium?: string | undefined;
    artworkSize?: string | undefined;
}, {
    itemType: "artwork";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "artist" | "contributor";
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
    artworkMedium?: string | undefined;
    artworkSize?: string | undefined;
}>;
export declare const ZoteroAttachmentItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: string;
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: string;
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
}, "strip", z.ZodTypeAny, {
    itemType: "attachment";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: string;
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
}, {
    itemType: "attachment";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: string;
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
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "audioRecording";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "performer" | "composer" | "wordsBy";
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
    audioRecordingFormat?: string | undefined;
    seriesTitle?: string | undefined;
    label?: string | undefined;
    runningTime?: string | undefined;
}, {
    itemType: "audioRecording";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "performer" | "composer" | "wordsBy";
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
    audioRecordingFormat?: string | undefined;
    seriesTitle?: string | undefined;
    label?: string | undefined;
    runningTime?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "bill";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "sponsor" | "cosponsor";
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
    code?: string | undefined;
    billNumber?: string | undefined;
    codeVolume?: string | undefined;
    section?: string | undefined;
    codePages?: string | undefined;
    legislativeBody?: string | undefined;
    session?: string | undefined;
    history?: string | undefined;
}, {
    itemType: "bill";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "sponsor" | "cosponsor";
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
    code?: string | undefined;
    billNumber?: string | undefined;
    codeVolume?: string | undefined;
    section?: string | undefined;
    codePages?: string | undefined;
    legislativeBody?: string | undefined;
    session?: string | undefined;
    history?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "blogPost";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "commenter";
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
    blogTitle?: string | undefined;
    websiteType?: string | undefined;
}, {
    itemType: "blogPost";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "commenter";
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
    blogTitle?: string | undefined;
    websiteType?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "book";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
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
}, {
    itemType: "book";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
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
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "bookSection";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor" | "bookAuthor";
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
    bookTitle?: string | undefined;
    pages?: string | undefined;
}, {
    itemType: "bookSection";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor" | "bookAuthor";
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
    bookTitle?: string | undefined;
    pages?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "case";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "counsel";
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
    history?: string | undefined;
    caseName?: string | undefined;
    court?: string | undefined;
    dateDecided?: string | undefined;
    docketNumber?: string | undefined;
    reporter?: string | undefined;
    reporterVolume?: string | undefined;
    firstPage?: string | undefined;
}, {
    itemType: "case";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "counsel";
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
    history?: string | undefined;
    caseName?: string | undefined;
    court?: string | undefined;
    dateDecided?: string | undefined;
    docketNumber?: string | undefined;
    reporter?: string | undefined;
    reporterVolume?: string | undefined;
    firstPage?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "computerProgram";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "programmer";
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
    seriesTitle?: string | undefined;
    versionNumber?: string | undefined;
    system?: string | undefined;
    company?: string | undefined;
    programmingLanguage?: string | undefined;
}, {
    itemType: "computerProgram";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "programmer";
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
    seriesTitle?: string | undefined;
    versionNumber?: string | undefined;
    system?: string | undefined;
    company?: string | undefined;
    programmingLanguage?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "conferencePaper";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
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
    pages?: string | undefined;
    proceedingsTitle?: string | undefined;
    conferenceName?: string | undefined;
    DOI?: string | undefined;
}, {
    itemType: "conferencePaper";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
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
    pages?: string | undefined;
    proceedingsTitle?: string | undefined;
    conferenceName?: string | undefined;
    DOI?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "dataset";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author";
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
    type?: string | undefined;
    versionNumber?: string | undefined;
    DOI?: string | undefined;
    identifier?: string | undefined;
    repository?: string | undefined;
    repositoryLocation?: string | undefined;
    format?: string | undefined;
    citationKey?: string | undefined;
}, {
    itemType: "dataset";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author";
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
    type?: string | undefined;
    versionNumber?: string | undefined;
    DOI?: string | undefined;
    identifier?: string | undefined;
    repository?: string | undefined;
    repositoryLocation?: string | undefined;
    format?: string | undefined;
    citationKey?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "dictionaryEntry";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
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
    pages?: string | undefined;
    dictionaryTitle?: string | undefined;
}, {
    itemType: "dictionaryEntry";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
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
    pages?: string | undefined;
    dictionaryTitle?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "document";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
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
}, {
    itemType: "document";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
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
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "email";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "recipient";
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
    subject?: string | undefined;
}, {
    itemType: "email";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "recipient";
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
    subject?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "encyclopediaArticle";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
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
    pages?: string | undefined;
    encyclopediaTitle?: string | undefined;
}, {
    itemType: "encyclopediaArticle";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "seriesEditor";
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
    pages?: string | undefined;
    encyclopediaTitle?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "film";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer";
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
    runningTime?: string | undefined;
    distributor?: string | undefined;
    genre?: string | undefined;
    videoRecordingFormat?: string | undefined;
}, {
    itemType: "film";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer";
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
    runningTime?: string | undefined;
    distributor?: string | undefined;
    genre?: string | undefined;
    videoRecordingFormat?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "forumPost";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author";
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
    forumTitle?: string | undefined;
    postType?: string | undefined;
}, {
    itemType: "forumPost";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author";
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
    forumTitle?: string | undefined;
    postType?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "hearing";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor";
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
    legislativeBody?: string | undefined;
    session?: string | undefined;
    history?: string | undefined;
    pages?: string | undefined;
    committee?: string | undefined;
    documentNumber?: string | undefined;
}, {
    itemType: "hearing";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor";
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
    legislativeBody?: string | undefined;
    session?: string | undefined;
    history?: string | undefined;
    pages?: string | undefined;
    committee?: string | undefined;
    documentNumber?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "instantMessage";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "recipient";
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
}, {
    itemType: "instantMessage";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "recipient";
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
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "interview";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "translator" | "interviewee" | "interviewer";
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
    interviewMedium?: string | undefined;
}, {
    itemType: "interview";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "translator" | "interviewee" | "interviewer";
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
    interviewMedium?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "journalArticle";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
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
    seriesTitle?: string | undefined;
    pages?: string | undefined;
    DOI?: string | undefined;
    publicationTitle?: string | undefined;
    issue?: string | undefined;
    seriesText?: string | undefined;
    journalAbbreviation?: string | undefined;
    ISSN?: string | undefined;
}, {
    itemType: "journalArticle";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
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
    seriesTitle?: string | undefined;
    pages?: string | undefined;
    DOI?: string | undefined;
    publicationTitle?: string | undefined;
    issue?: string | undefined;
    seriesText?: string | undefined;
    journalAbbreviation?: string | undefined;
    ISSN?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "letter";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "recipient";
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
    letterType?: string | undefined;
}, {
    itemType: "letter";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "recipient";
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
    letterType?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "magazineArticle";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
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
    pages?: string | undefined;
    publicationTitle?: string | undefined;
    issue?: string | undefined;
    ISSN?: string | undefined;
}, {
    itemType: "magazineArticle";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
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
    pages?: string | undefined;
    publicationTitle?: string | undefined;
    issue?: string | undefined;
    ISSN?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "manuscript";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "translator";
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
    manuscriptType?: string | undefined;
}, {
    itemType: "manuscript";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "translator";
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
    manuscriptType?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "map";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "seriesEditor" | "cartographer";
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
    seriesTitle?: string | undefined;
    mapType?: string | undefined;
    scale?: string | undefined;
}, {
    itemType: "map";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "seriesEditor" | "cartographer";
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
    seriesTitle?: string | undefined;
    mapType?: string | undefined;
    scale?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "newspaperArticle";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
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
    section?: string | undefined;
    pages?: string | undefined;
    publicationTitle?: string | undefined;
    ISSN?: string | undefined;
}, {
    itemType: "newspaperArticle";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "translator" | "reviewedAuthor";
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
    section?: string | undefined;
    pages?: string | undefined;
    publicationTitle?: string | undefined;
    ISSN?: string | undefined;
}>;
export declare const ZoteroNoteItemSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    creators: z.ZodOptional<z.ZodArray<z.ZodObject<{
        creatorType: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        creatorType: string;
        name?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }, {
        creatorType: string;
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
}, "strip", z.ZodTypeAny, {
    itemType: "note";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: string;
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
}, {
    itemType: "note";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: string;
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
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "patent";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "inventor" | "attorneyAgent";
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
    pages?: string | undefined;
    country?: string | undefined;
    assignee?: string | undefined;
    issuingAuthority?: string | undefined;
    patentNumber?: string | undefined;
    filingDate?: string | undefined;
    applicationNumber?: string | undefined;
    priorityNumbers?: string | undefined;
    issueDate?: string | undefined;
    references?: string | undefined;
    legalStatus?: string | undefined;
}, {
    itemType: "patent";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "inventor" | "attorneyAgent";
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
    pages?: string | undefined;
    country?: string | undefined;
    assignee?: string | undefined;
    issuingAuthority?: string | undefined;
    patentNumber?: string | undefined;
    filingDate?: string | undefined;
    applicationNumber?: string | undefined;
    priorityNumbers?: string | undefined;
    issueDate?: string | undefined;
    references?: string | undefined;
    legalStatus?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "podcast";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "podcaster" | "guest";
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
    seriesTitle?: string | undefined;
    runningTime?: string | undefined;
    episodeNumber?: string | undefined;
    audioFileType?: string | undefined;
}, {
    itemType: "podcast";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "podcaster" | "guest";
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
    seriesTitle?: string | undefined;
    runningTime?: string | undefined;
    episodeNumber?: string | undefined;
    audioFileType?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "preprint";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
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
    DOI?: string | undefined;
    repository?: string | undefined;
    citationKey?: string | undefined;
    genre?: string | undefined;
    archiveID?: string | undefined;
}, {
    itemType: "preprint";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "editor" | "translator" | "reviewedAuthor";
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
    DOI?: string | undefined;
    repository?: string | undefined;
    citationKey?: string | undefined;
    genre?: string | undefined;
    archiveID?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "presentation";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "presenter";
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
    presentationType?: string | undefined;
    meetingName?: string | undefined;
}, {
    itemType: "presentation";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "presenter";
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
    presentationType?: string | undefined;
    meetingName?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "radioBroadcast";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
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
    audioRecordingFormat?: string | undefined;
    runningTime?: string | undefined;
    episodeNumber?: string | undefined;
    programTitle?: string | undefined;
    network?: string | undefined;
}, {
    itemType: "radioBroadcast";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
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
    audioRecordingFormat?: string | undefined;
    runningTime?: string | undefined;
    episodeNumber?: string | undefined;
    programTitle?: string | undefined;
    network?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "report";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "translator" | "seriesEditor";
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
    seriesTitle?: string | undefined;
    pages?: string | undefined;
    reportNumber?: string | undefined;
    reportType?: string | undefined;
    institution?: string | undefined;
}, {
    itemType: "report";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "translator" | "seriesEditor";
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
    seriesTitle?: string | undefined;
    pages?: string | undefined;
    reportNumber?: string | undefined;
    reportType?: string | undefined;
    institution?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "standard";
    number?: string | undefined;
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author";
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
    type?: string | undefined;
    status?: string | undefined;
    versionNumber?: string | undefined;
    DOI?: string | undefined;
    citationKey?: string | undefined;
    committee?: string | undefined;
    organization?: string | undefined;
}, {
    itemType: "standard";
    number?: string | undefined;
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author";
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
    type?: string | undefined;
    status?: string | undefined;
    versionNumber?: string | undefined;
    DOI?: string | undefined;
    citationKey?: string | undefined;
    committee?: string | undefined;
    organization?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "statute";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author";
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
    code?: string | undefined;
    section?: string | undefined;
    session?: string | undefined;
    history?: string | undefined;
    pages?: string | undefined;
    nameOfAct?: string | undefined;
    codeNumber?: string | undefined;
    publicLawNumber?: string | undefined;
    dateEnacted?: string | undefined;
}, {
    itemType: "statute";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author";
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
    code?: string | undefined;
    section?: string | undefined;
    session?: string | undefined;
    history?: string | undefined;
    pages?: string | undefined;
    nameOfAct?: string | undefined;
    codeNumber?: string | undefined;
    publicLawNumber?: string | undefined;
    dateEnacted?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "thesis";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author";
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
    thesisType?: string | undefined;
    university?: string | undefined;
}, {
    itemType: "thesis";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author";
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
    thesisType?: string | undefined;
    university?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "tvBroadcast";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
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
    runningTime?: string | undefined;
    videoRecordingFormat?: string | undefined;
    episodeNumber?: string | undefined;
    programTitle?: string | undefined;
    network?: string | undefined;
}, {
    itemType: "tvBroadcast";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "guest" | "castMember";
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
    runningTime?: string | undefined;
    videoRecordingFormat?: string | undefined;
    episodeNumber?: string | undefined;
    programTitle?: string | undefined;
    network?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "videoRecording";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "castMember";
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
    seriesTitle?: string | undefined;
    runningTime?: string | undefined;
    videoRecordingFormat?: string | undefined;
    studio?: string | undefined;
}, {
    itemType: "videoRecording";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "director" | "scriptwriter" | "producer" | "castMember";
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
    seriesTitle?: string | undefined;
    runningTime?: string | undefined;
    videoRecordingFormat?: string | undefined;
    studio?: string | undefined;
}>;
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
}, "strip", z.ZodTypeAny, {
    itemType: "webpage";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "translator";
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
    websiteType?: string | undefined;
    websiteTitle?: string | undefined;
}, {
    itemType: "webpage";
    key?: string | undefined;
    version?: number | undefined;
    title?: string | undefined;
    creators?: {
        creatorType: "contributor" | "author" | "translator";
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
    websiteType?: string | undefined;
    websiteTitle?: string | undefined;
}>;
export declare const ZoteroCollectionDataSchema: z.ZodObject<{
    key: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    name: z.ZodString;
    parentCollection: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<false>]>>;
    relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    key?: string | undefined;
    version?: number | undefined;
    relations?: Record<string, string | string[]> | undefined;
    parentCollection?: string | false | undefined;
}, {
    name: string;
    key?: string | undefined;
    version?: number | undefined;
    relations?: Record<string, string | string[]> | undefined;
    parentCollection?: string | false | undefined;
}>;
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
        name: string;
        type: "user" | "group";
        id: number;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
    }, {
        name: string;
        type: "user" | "group";
        id: number;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
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
    }, "strip", z.ZodTypeAny, {
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        self?: {
            type: string;
            href: string;
        } | undefined;
    }, {
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        self?: {
            type: string;
            href: string;
        } | undefined;
    }>>;
    meta: z.ZodOptional<z.ZodObject<{
        numCollections: z.ZodOptional<z.ZodNumber>;
        numItems: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        numCollections?: number | undefined;
        numItems?: number | undefined;
    }, {
        numCollections?: number | undefined;
        numItems?: number | undefined;
    }>>;
    data: z.ZodObject<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
        name: z.ZodString;
        parentCollection: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<false>]>>;
        relations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        key?: string | undefined;
        version?: number | undefined;
        relations?: Record<string, string | string[]> | undefined;
        parentCollection?: string | false | undefined;
    }, {
        name: string;
        key?: string | undefined;
        version?: number | undefined;
        relations?: Record<string, string | string[]> | undefined;
        parentCollection?: string | false | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        key?: string | undefined;
        version?: number | undefined;
        relations?: Record<string, string | string[]> | undefined;
        parentCollection?: string | false | undefined;
    };
    key?: string | undefined;
    version?: number | undefined;
    links?: {
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        self?: {
            type: string;
            href: string;
        } | undefined;
    } | undefined;
    library?: {
        name: string;
        type: "user" | "group";
        id: number;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
    } | undefined;
    meta?: {
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
    };
    key?: string | undefined;
    version?: number | undefined;
    links?: {
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        self?: {
            type: string;
            href: string;
        } | undefined;
    } | undefined;
    library?: {
        name: string;
        type: "user" | "group";
        id: number;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
    } | undefined;
    meta?: {
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
}, "strip", z.ZodTypeAny, {
    name: string;
    conditions: {
        value: string;
        condition: string;
        operator: string;
    }[];
    key?: string | undefined;
    version?: number | undefined;
}, {
    name: string;
    conditions: {
        value: string;
        condition: string;
        operator: string;
    }[];
    key?: string | undefined;
    version?: number | undefined;
}>;
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
        name: string;
        type: "user" | "group";
        id: number;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
    }, {
        name: string;
        type: "user" | "group";
        id: number;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
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
    }, "strip", z.ZodTypeAny, {
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        self?: {
            type: string;
            href: string;
        } | undefined;
    }, {
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        self?: {
            type: string;
            href: string;
        } | undefined;
    }>>;
    data: z.ZodObject<{
        key: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodNumber>;
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
    }, "strip", z.ZodTypeAny, {
        name: string;
        conditions: {
            value: string;
            condition: string;
            operator: string;
        }[];
        key?: string | undefined;
        version?: number | undefined;
    }, {
        name: string;
        conditions: {
            value: string;
            condition: string;
            operator: string;
        }[];
        key?: string | undefined;
        version?: number | undefined;
    }>;
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
    };
    key?: string | undefined;
    version?: number | undefined;
    links?: {
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        self?: {
            type: string;
            href: string;
        } | undefined;
    } | undefined;
    library?: {
        name: string;
        type: "user" | "group";
        id: number;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
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
    };
    key?: string | undefined;
    version?: number | undefined;
    links?: {
        alternate?: {
            type: string;
            href: string;
        } | undefined;
        self?: {
            type: string;
            href: string;
        } | undefined;
    } | undefined;
    library?: {
        name: string;
        type: "user" | "group";
        id: number;
        links: {
            alternate: {
                type: string;
                href: string;
            };
        };
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
    name: string;
    type: "user" | "group";
    id: number;
    links: {
        alternate: {
            type: string;
            href: string;
        };
    };
}, {
    name: string;
    type: "user" | "group";
    id: number;
    links: {
        alternate: {
            type: string;
            href: string;
        };
    };
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
    }, "strip", z.ZodTypeAny, {
        version: number;
        url: string;
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
        owner: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        };
        name: string;
        id: number;
        library: {
            type: "Private" | "PublicOpen" | "PublicClosed";
            reading: "all" | "members";
            editing: "members" | "admins";
        };
        description: string;
    }, {
        version: number;
        url: string;
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
        owner: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        };
        name: string;
        id: number;
        library: {
            type: "Private" | "PublicOpen" | "PublicClosed";
            reading: "all" | "members";
            editing: "members" | "admins";
        };
        description: string;
    }>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "group";
    id: number;
    links: {
        alternate: {
            type: string;
            href: string;
        };
    };
    data: {
        version: number;
        url: string;
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
        owner: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        };
        name: string;
        id: number;
        library: {
            type: "Private" | "PublicOpen" | "PublicClosed";
            reading: "all" | "members";
            editing: "members" | "admins";
        };
        description: string;
    };
}, {
    name: string;
    type: "group";
    id: number;
    links: {
        alternate: {
            type: string;
            href: string;
        };
    };
    data: {
        version: number;
        url: string;
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
        owner: {
            name: string;
            id: number;
            username: string;
            role: "member" | "admin" | "owner";
        };
        name: string;
        id: number;
        library: {
            type: "Private" | "PublicOpen" | "PublicClosed";
            reading: "all" | "members";
            editing: "members" | "admins";
        };
        description: string;
    };
}>;
//# sourceMappingURL=index.d.ts.map