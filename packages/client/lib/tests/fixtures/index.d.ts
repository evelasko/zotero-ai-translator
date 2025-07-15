/**
 * Test fixtures for Zotero API responses
 */
export declare const sampleSchema: {
    version: number;
    itemTypes: {
        itemType: string;
        fields: {
            field: string;
        }[];
        creatorTypes: ({
            creatorType: string;
            primary: boolean;
        } | {
            creatorType: string;
            primary?: undefined;
        })[];
    }[];
    meta: {
        fields: {
            field: string;
            type: string;
        }[];
    };
    csl: {};
    locales: {};
};
export declare const sampleItems: ({
    key: string;
    version: number;
    library: {
        type: "user";
        id: number;
        name: string;
        links: {
            alternate: {
                href: string;
                type: string;
            };
        };
    };
    links: {
        self: {
            href: string;
            type: string;
        };
        alternate: {
            href: string;
            type: string;
        };
    };
    meta: {
        createdByUser: {
            id: number;
            username: string;
            name: string;
        };
        createdDate: string;
        lastModifiedByUser: {
            id: number;
            username: string;
            name: string;
        };
        lastModifiedDate: string;
        numChildren: number;
    };
    data: {
        key: string;
        version: number;
        itemType: string;
        title: string;
        creators: {
            creatorType: string;
            firstName: string;
            lastName: string;
        }[];
        abstractNote: string;
        publisher: string;
        date: string;
        numPages: string;
        language: string;
        ISBN: string;
        tags: {
            tag: string;
            type: number;
        }[];
        collections: string[];
        relations: {};
        dateAdded: string;
        dateModified: string;
        publicationTitle?: undefined;
        volume?: undefined;
        issue?: undefined;
        pages?: undefined;
        DOI?: undefined;
    };
} | {
    key: string;
    version: number;
    library: {
        type: "user";
        id: number;
        name: string;
        links: {
            alternate: {
                href: string;
                type: string;
            };
        };
    };
    links: {
        self: {
            href: string;
            type: string;
        };
        alternate: {
            href: string;
            type: string;
        };
    };
    meta: {
        createdByUser: {
            id: number;
            username: string;
            name: string;
        };
        createdDate: string;
        lastModifiedByUser: {
            id: number;
            username: string;
            name: string;
        };
        lastModifiedDate: string;
        numChildren: number;
    };
    data: {
        key: string;
        version: number;
        itemType: string;
        title: string;
        creators: {
            creatorType: string;
            firstName: string;
            lastName: string;
        }[];
        abstractNote: string;
        publicationTitle: string;
        volume: string;
        issue: string;
        pages: string;
        date: string;
        DOI: string;
        tags: {
            tag: string;
            type: number;
        }[];
        collections: never[];
        relations: {};
        dateAdded: string;
        dateModified: string;
        publisher?: undefined;
        numPages?: undefined;
        language?: undefined;
        ISBN?: undefined;
    };
})[];
export declare const sampleCollections: {
    key: string;
    version: number;
    library: {
        type: "user";
        id: number;
        name: string;
        links: {
            alternate: {
                href: string;
                type: string;
            };
        };
    };
    links: {
        self: {
            href: string;
            type: string;
        };
        alternate: {
            href: string;
            type: string;
        };
    };
    meta: {
        numCollections: number;
        numItems: number;
    };
    data: {
        key: string;
        version: number;
        name: string;
        parentCollection: boolean;
        relations: {};
    };
}[];
export declare const sampleUser: {
    userID: number;
    username: string;
    displayName: string;
    links: {
        self: {
            href: string;
            type: string;
        };
        alternate: {
            href: string;
            type: string;
        };
    };
};
//# sourceMappingURL=index.d.ts.map