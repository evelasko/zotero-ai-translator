
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
}

export interface ZoteroAnnotationItem extends ZoteroItemData {
  itemType: 'annotation';

  creators?: (ZoteroCreator & { creatorType: string })[];
}

export interface ZoteroArtworkItem extends ZoteroItemData {
  itemType: 'artwork';
  title?: string;
  abstractNote?: string;
  artworkMedium?: string;
  artworkSize?: string;
  date?: string;
  language?: string;
  shortTitle?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  url?: string;
  accessDate?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'artist' | 'contributor' })[];
}

export interface ZoteroAttachmentItem extends ZoteroItemData {
  itemType: 'attachment';
  title?: string;
  accessDate?: string;
  url?: string;
  creators?: (ZoteroCreator & { creatorType: string })[];
}

export interface ZoteroAudioRecordingItem extends ZoteroItemData {
  itemType: 'audioRecording';
  title?: string;
  abstractNote?: string;
  audioRecordingFormat?: string;
  seriesTitle?: string;
  volume?: string;
  numberOfVolumes?: string;
  place?: string;
  label?: string;
  date?: string;
  runningTime?: string;
  language?: string;
  ISBN?: string;
  shortTitle?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  url?: string;
  accessDate?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'performer' | 'contributor' | 'composer' | 'wordsBy' })[];
}

export interface ZoteroBillItem extends ZoteroItemData {
  itemType: 'bill';
  title?: string;
  abstractNote?: string;
  billNumber?: string;
  code?: string;
  codeVolume?: string;
  section?: string;
  codePages?: string;
  legislativeBody?: string;
  session?: string;
  history?: string;
  date?: string;
  language?: string;
  url?: string;
  accessDate?: string;
  shortTitle?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'sponsor' | 'cosponsor' | 'contributor' })[];
}

export interface ZoteroBlogPostItem extends ZoteroItemData {
  itemType: 'blogPost';
  title?: string;
  abstractNote?: string;
  blogTitle?: string;
  websiteType?: string;
  date?: string;
  url?: string;
  accessDate?: string;
  language?: string;
  shortTitle?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'commenter' | 'contributor' })[];
}

export interface ZoteroBookItem extends ZoteroItemData {
  itemType: 'book';
  title?: string;
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
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'editor' | 'translator' | 'seriesEditor' })[];
}

export interface ZoteroBookSectionItem extends ZoteroItemData {
  itemType: 'bookSection';
  title?: string;
  abstractNote?: string;
  bookTitle?: string;
  series?: string;
  seriesNumber?: string;
  volume?: string;
  numberOfVolumes?: string;
  edition?: string;
  place?: string;
  publisher?: string;
  date?: string;
  pages?: string;
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
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'editor' | 'bookAuthor' | 'translator' | 'seriesEditor' })[];
}

export interface ZoteroCaseItem extends ZoteroItemData {
  itemType: 'case';
  caseName?: string;
  abstractNote?: string;
  court?: string;
  dateDecided?: string;
  docketNumber?: string;
  reporter?: string;
  reporterVolume?: string;
  firstPage?: string;
  history?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'counsel' | 'contributor' })[];
}

export interface ZoteroComputerProgramItem extends ZoteroItemData {
  itemType: 'computerProgram';
  title?: string;
  abstractNote?: string;
  seriesTitle?: string;
  versionNumber?: string;
  date?: string;
  system?: string;
  place?: string;
  company?: string;
  programmingLanguage?: string;
  ISBN?: string;
  shortTitle?: string;
  url?: string;
  rights?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  accessDate?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'programmer' | 'contributor' })[];
}

export interface ZoteroConferencePaperItem extends ZoteroItemData {
  itemType: 'conferencePaper';
  title?: string;
  abstractNote?: string;
  date?: string;
  proceedingsTitle?: string;
  conferenceName?: string;
  place?: string;
  publisher?: string;
  volume?: string;
  pages?: string;
  series?: string;
  language?: string;
  DOI?: string;
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
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'editor' | 'translator' | 'seriesEditor' })[];
}

export interface ZoteroDatasetItem extends ZoteroItemData {
  itemType: 'dataset';
  title?: string;
  abstractNote?: string;
  identifier?: string;
  type?: string;
  versionNumber?: string;
  date?: string;
  repository?: string;
  repositoryLocation?: string;
  format?: string;
  DOI?: string;
  citationKey?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  shortTitle?: string;
  language?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' })[];
}

export interface ZoteroDictionaryEntryItem extends ZoteroItemData {
  itemType: 'dictionaryEntry';
  title?: string;
  abstractNote?: string;
  dictionaryTitle?: string;
  series?: string;
  seriesNumber?: string;
  volume?: string;
  numberOfVolumes?: string;
  edition?: string;
  place?: string;
  publisher?: string;
  date?: string;
  pages?: string;
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
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'editor' | 'translator' | 'seriesEditor' })[];
}

export interface ZoteroDocumentItem extends ZoteroItemData {
  itemType: 'document';
  title?: string;
  abstractNote?: string;
  publisher?: string;
  date?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'editor' | 'translator' | 'reviewedAuthor' })[];
}

export interface ZoteroEmailItem extends ZoteroItemData {
  itemType: 'email';
  subject?: string;
  abstractNote?: string;
  date?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  language?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'recipient' })[];
}

export interface ZoteroEncyclopediaArticleItem extends ZoteroItemData {
  itemType: 'encyclopediaArticle';
  title?: string;
  abstractNote?: string;
  encyclopediaTitle?: string;
  series?: string;
  seriesNumber?: string;
  volume?: string;
  numberOfVolumes?: string;
  edition?: string;
  place?: string;
  publisher?: string;
  date?: string;
  pages?: string;
  ISBN?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  language?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'editor' | 'translator' | 'seriesEditor' })[];
}

export interface ZoteroFilmItem extends ZoteroItemData {
  itemType: 'film';
  title?: string;
  abstractNote?: string;
  distributor?: string;
  date?: string;
  genre?: string;
  videoRecordingFormat?: string;
  runningTime?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'director' | 'contributor' | 'scriptwriter' | 'producer' })[];
}

export interface ZoteroForumPostItem extends ZoteroItemData {
  itemType: 'forumPost';
  title?: string;
  abstractNote?: string;
  forumTitle?: string;
  postType?: string;
  date?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' })[];
}

export interface ZoteroHearingItem extends ZoteroItemData {
  itemType: 'hearing';
  title?: string;
  abstractNote?: string;
  committee?: string;
  place?: string;
  publisher?: string;
  numberOfVolumes?: string;
  documentNumber?: string;
  pages?: string;
  legislativeBody?: string;
  session?: string;
  history?: string;
  date?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'contributor' })[];
}

export interface ZoteroInstantMessageItem extends ZoteroItemData {
  itemType: 'instantMessage';
  title?: string;
  abstractNote?: string;
  date?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'recipient' })[];
}

export interface ZoteroInterviewItem extends ZoteroItemData {
  itemType: 'interview';
  title?: string;
  abstractNote?: string;
  date?: string;
  interviewMedium?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'interviewee' | 'contributor' | 'interviewer' | 'translator' })[];
}

export interface ZoteroJournalArticleItem extends ZoteroItemData {
  itemType: 'journalArticle';
  title?: string;
  abstractNote?: string;
  publicationTitle?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  date?: string;
  series?: string;
  seriesTitle?: string;
  seriesText?: string;
  journalAbbreviation?: string;
  language?: string;
  DOI?: string;
  ISSN?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'editor' | 'translator' | 'reviewedAuthor' })[];
}

export interface ZoteroLetterItem extends ZoteroItemData {
  itemType: 'letter';
  title?: string;
  abstractNote?: string;
  letterType?: string;
  date?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'recipient' })[];
}

export interface ZoteroMagazineArticleItem extends ZoteroItemData {
  itemType: 'magazineArticle';
  title?: string;
  abstractNote?: string;
  publicationTitle?: string;
  volume?: string;
  issue?: string;
  date?: string;
  pages?: string;
  language?: string;
  ISSN?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'translator' | 'reviewedAuthor' })[];
}

export interface ZoteroManuscriptItem extends ZoteroItemData {
  itemType: 'manuscript';
  title?: string;
  abstractNote?: string;
  manuscriptType?: string;
  place?: string;
  date?: string;
  numPages?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'translator' })[];
}

export interface ZoteroMapItem extends ZoteroItemData {
  itemType: 'map';
  title?: string;
  abstractNote?: string;
  mapType?: string;
  scale?: string;
  seriesTitle?: string;
  edition?: string;
  place?: string;
  publisher?: string;
  date?: string;
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
  creators?: (ZoteroCreator & { creatorType: 'cartographer' | 'contributor' | 'seriesEditor' })[];
}

export interface ZoteroNewspaperArticleItem extends ZoteroItemData {
  itemType: 'newspaperArticle';
  title?: string;
  abstractNote?: string;
  publicationTitle?: string;
  place?: string;
  edition?: string;
  date?: string;
  section?: string;
  pages?: string;
  language?: string;
  shortTitle?: string;
  ISSN?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'translator' | 'reviewedAuthor' })[];
}

export interface ZoteroNoteItem extends ZoteroItemData {
  itemType: 'note';

  creators?: (ZoteroCreator & { creatorType: string })[];
}

export interface ZoteroPatentItem extends ZoteroItemData {
  itemType: 'patent';
  title?: string;
  abstractNote?: string;
  place?: string;
  country?: string;
  assignee?: string;
  issuingAuthority?: string;
  patentNumber?: string;
  filingDate?: string;
  pages?: string;
  applicationNumber?: string;
  priorityNumbers?: string;
  issueDate?: string;
  references?: string;
  legalStatus?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'inventor' | 'attorneyAgent' | 'contributor' })[];
}

export interface ZoteroPodcastItem extends ZoteroItemData {
  itemType: 'podcast';
  title?: string;
  abstractNote?: string;
  seriesTitle?: string;
  episodeNumber?: string;
  audioFileType?: string;
  date?: string;
  runningTime?: string;
  url?: string;
  accessDate?: string;
  language?: string;
  shortTitle?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'podcaster' | 'contributor' | 'guest' })[];
}

export interface ZoteroPreprintItem extends ZoteroItemData {
  itemType: 'preprint';
  title?: string;
  abstractNote?: string;
  genre?: string;
  repository?: string;
  archiveID?: string;
  place?: string;
  date?: string;
  series?: string;
  seriesNumber?: string;
  DOI?: string;
  citationKey?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  shortTitle?: string;
  language?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'editor' | 'translator' | 'reviewedAuthor' })[];
}

export interface ZoteroPresentationItem extends ZoteroItemData {
  itemType: 'presentation';
  title?: string;
  abstractNote?: string;
  presentationType?: string;
  date?: string;
  place?: string;
  meetingName?: string;
  url?: string;
  accessDate?: string;
  language?: string;
  shortTitle?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'presenter' | 'contributor' })[];
}

export interface ZoteroRadioBroadcastItem extends ZoteroItemData {
  itemType: 'radioBroadcast';
  title?: string;
  abstractNote?: string;
  programTitle?: string;
  episodeNumber?: string;
  audioRecordingFormat?: string;
  place?: string;
  network?: string;
  date?: string;
  runningTime?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'director' | 'scriptwriter' | 'producer' | 'castMember' | 'contributor' | 'guest' })[];
}

export interface ZoteroReportItem extends ZoteroItemData {
  itemType: 'report';
  title?: string;
  abstractNote?: string;
  reportNumber?: string;
  reportType?: string;
  seriesTitle?: string;
  place?: string;
  institution?: string;
  date?: string;
  pages?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'translator' | 'seriesEditor' })[];
}

export interface ZoteroStandardItem extends ZoteroItemData {
  itemType: 'standard';
  title?: string;
  abstractNote?: string;
  organization?: string;
  committee?: string;
  type?: string;
  number?: string;
  versionNumber?: string;
  status?: string;
  date?: string;
  publisher?: string;
  place?: string;
  DOI?: string;
  citationKey?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  shortTitle?: string;
  numPages?: string;
  language?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' })[];
}

export interface ZoteroStatuteItem extends ZoteroItemData {
  itemType: 'statute';
  nameOfAct?: string;
  abstractNote?: string;
  code?: string;
  codeNumber?: string;
  publicLawNumber?: string;
  dateEnacted?: string;
  pages?: string;
  section?: string;
  session?: string;
  history?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' })[];
}

export interface ZoteroThesisItem extends ZoteroItemData {
  itemType: 'thesis';
  title?: string;
  abstractNote?: string;
  thesisType?: string;
  university?: string;
  place?: string;
  date?: string;
  numPages?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' })[];
}

export interface ZoteroTvBroadcastItem extends ZoteroItemData {
  itemType: 'tvBroadcast';
  title?: string;
  abstractNote?: string;
  programTitle?: string;
  episodeNumber?: string;
  videoRecordingFormat?: string;
  place?: string;
  network?: string;
  date?: string;
  runningTime?: string;
  language?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  archive?: string;
  archiveLocation?: string;
  libraryCatalog?: string;
  callNumber?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'director' | 'scriptwriter' | 'producer' | 'castMember' | 'contributor' | 'guest' })[];
}

export interface ZoteroVideoRecordingItem extends ZoteroItemData {
  itemType: 'videoRecording';
  title?: string;
  abstractNote?: string;
  videoRecordingFormat?: string;
  seriesTitle?: string;
  volume?: string;
  numberOfVolumes?: string;
  place?: string;
  studio?: string;
  date?: string;
  runningTime?: string;
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
  creators?: (ZoteroCreator & { creatorType: 'director' | 'scriptwriter' | 'producer' | 'castMember' | 'contributor' })[];
}

export interface ZoteroWebpageItem extends ZoteroItemData {
  itemType: 'webpage';
  title?: string;
  abstractNote?: string;
  websiteTitle?: string;
  websiteType?: string;
  date?: string;
  shortTitle?: string;
  url?: string;
  accessDate?: string;
  language?: string;
  rights?: string;
  extra?: string;
  creators?: (ZoteroCreator & { creatorType: 'author' | 'contributor' | 'translator' })[];
}

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
}

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
}

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
}