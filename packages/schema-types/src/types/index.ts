// Utility types
export type ZoteroKey = string;
export type ZoteroVersion = number;
export type ZoteroDateString = string;
export type ZoteroDateObject = {
  'date-parts': number[][];
  season?: number;
  circa?: boolean;
  literal?: string;
};

// API Response wrapper types
export interface ZoteroAPIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ZoteroAPIError;
  lastModifiedVersion?: number;
  totalResults?: number;
  links?: {
    self: { href: string };
    next?: { href: string };
    prev?: { href: string };
    first?: { href: string };
    last?: { href: string };
  };
}

export interface ZoteroAPIError {
  code: number;
  message: string;
  details?: string;
}

export interface ZoteroWriteToken {
  token: string;
  url: string;
}

// Field types derived from Zotero schema
export type ZoteroField = 'title' | 'abstractNote' | 'artworkMedium' | 'artworkSize' | 'date' | 'language' | 'shortTitle' | 'archive' | 'archiveLocation' | 'libraryCatalog' | 'callNumber' | 'url' | 'accessDate' | 'rights' | 'extra' | 'audioRecordingFormat' | 'seriesTitle' | 'volume' | 'numberOfVolumes' | 'place' | 'label' | 'runningTime' | 'ISBN' | 'billNumber' | 'code' | 'codeVolume' | 'section' | 'codePages' | 'legislativeBody' | 'session' | 'history' | 'blogTitle' | 'websiteType' | 'series' | 'seriesNumber' | 'edition' | 'publisher' | 'numPages' | 'bookTitle' | 'pages' | 'caseName' | 'court' | 'dateDecided' | 'docketNumber' | 'reporter' | 'reporterVolume' | 'firstPage' | 'versionNumber' | 'system' | 'company' | 'programmingLanguage' | 'proceedingsTitle' | 'conferenceName' | 'DOI' | 'identifier' | 'type' | 'repository' | 'repositoryLocation' | 'format' | 'citationKey' | 'dictionaryTitle' | 'subject' | 'encyclopediaTitle' | 'distributor' | 'genre' | 'videoRecordingFormat' | 'forumTitle' | 'postType' | 'committee' | 'documentNumber' | 'interviewMedium' | 'publicationTitle' | 'issue' | 'seriesText' | 'journalAbbreviation' | 'ISSN' | 'letterType' | 'manuscriptType' | 'mapType' | 'scale' | 'country' | 'assignee' | 'issuingAuthority' | 'patentNumber' | 'filingDate' | 'applicationNumber' | 'priorityNumbers' | 'issueDate' | 'references' | 'legalStatus' | 'episodeNumber' | 'audioFileType' | 'archiveID' | 'presentationType' | 'meetingName' | 'programTitle' | 'network' | 'reportNumber' | 'reportType' | 'institution' | 'organization' | 'number' | 'status' | 'nameOfAct' | 'codeNumber' | 'publicLawNumber' | 'dateEnacted' | 'thesisType' | 'university' | 'studio' | 'websiteTitle';

export interface ZoteroFieldDefinition {
  field: string;
  baseField?: string;
  type?: 'text' | 'date' | 'number';
}

// Creator types derived from Zotero schema
export type ZoteroCreatorType = 'artist' | 'contributor' | 'performer' | 'composer' | 'wordsBy' | 'sponsor' | 'cosponsor' | 'author' | 'commenter' | 'editor' | 'translator' | 'seriesEditor' | 'bookAuthor' | 'counsel' | 'programmer' | 'reviewedAuthor' | 'recipient' | 'director' | 'scriptwriter' | 'producer' | 'interviewee' | 'interviewer' | 'cartographer' | 'inventor' | 'attorneyAgent' | 'podcaster' | 'guest' | 'presenter' | 'castMember';

export interface ZoteroCreatorTypeDefinition {
  creatorType: ZoteroCreatorType;
  primary?: boolean;
}

// Item type definitions
export type ZoteroItemType = 'annotation' | 'artwork' | 'attachment' | 'audioRecording' | 'bill' | 'blogPost' | 'book' | 'bookSection' | 'case' | 'computerProgram' | 'conferencePaper' | 'dataset' | 'dictionaryEntry' | 'document' | 'email' | 'encyclopediaArticle' | 'film' | 'forumPost' | 'hearing' | 'instantMessage' | 'interview' | 'journalArticle' | 'letter' | 'magazineArticle' | 'manuscript' | 'map' | 'newspaperArticle' | 'note' | 'patent' | 'podcast' | 'preprint' | 'presentation' | 'radioBroadcast' | 'report' | 'standard' | 'statute' | 'thesis' | 'tvBroadcast' | 'videoRecording' | 'webpage';

// Base Zotero types
export interface ZoteroLinks {
  self?: {
    href: string;
    type: string;
  };
  alternate?: {
    href: string;
    type: string;
  };
  up?: {
    href: string;
    type: string;
  };
  enclosure?: {
    href: string;
    type: string;
    length?: number;
    title?: string;
  };
}

export interface ZoteroMeta {
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
  numCollections?: number;
  numItems?: number;
}

export interface ZoteroData {
  key?: ZoteroKey;
  version?: ZoteroVersion;
  [key: string]: any;
}

export interface ZoteroCreator {
  creatorType: ZoteroCreatorType;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export interface ZoteroTag {
  tag: string;
  type?: number;
}

export interface ZoteroRelation {
  [predicate: string]: string | string[];
}

export interface ZoteroItemData extends ZoteroData {
  itemType: ZoteroItemType;
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
  collections?: ZoteroKey[];
  relations?: ZoteroRelation;
  dateAdded?: string;
  dateModified?: string;
}

export interface ZoteroItem {
  key?: ZoteroKey;
  version?: ZoteroVersion;
  library?: ZoteroLibrary;
  links?: ZoteroLinks;
  meta?: ZoteroMeta;
  data: ZoteroItemData;
}

export interface ZoteroAnnotationItem extends ZoteroItemData {
  itemType: 'annotation';
  creators?: (ZoteroCreator & { creatorType: ZoteroCreatorType })[];
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
  creators?: (ZoteroCreator & { creatorType: ZoteroCreatorType })[];
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
  creators?: (ZoteroCreator & { creatorType: ZoteroCreatorType })[];
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

// Commonly used type aliases
export type ZoteroNote = ZoteroNoteItem;
export type ZoteroAttachment = ZoteroAttachmentItem;
export type ZoteroAnnotation = ZoteroAnnotationItem;

// API and Authentication types
export interface ZoteroUser {
  id: number;
  username: string;
  name: string;
  email?: string;
  slug?: string;
  links?: ZoteroLinks;
}

export interface ZoteroKeyPermissions {
  library: boolean;
  notes: boolean;
  write: boolean;
  groups: {
    all: boolean;
    [groupId: string]: boolean;
  };
}

export interface ZoteroSettings {
  [key: string]: any;
}

export interface ZoteroDeletedContent {
  collections: ZoteroKey[];
  items: ZoteroKey[];
  searches: ZoteroKey[];
  tags: { tag: string; type?: number }[];
}

// Template types for API responses
export interface ZoteroTemplate {
  itemType: ZoteroItemType;
  fields: ZoteroFieldTemplate[];
  creatorTypes: ZoteroCreatorTemplate[];
}

export interface ZoteroItemTemplate {
  itemType: ZoteroItemType;
  title?: string;
  creators?: ZoteroCreatorTemplate[];
  [fieldName: string]: any;
}

export interface ZoteroCreatorTemplate {
  creatorType: ZoteroCreatorType;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export interface ZoteroFieldTemplate {
  field: string;
  baseField?: string;
}

export interface ZoteroItemTypeTemplate {
  itemType: ZoteroItemType;
  localized: string;
}

export interface ZoteroCollectionTemplate {
  name: string;
  parentCollection?: ZoteroKey | false;
}

// Collection types
export interface ZoteroCollectionData extends ZoteroData {
  name: string;
  parentCollection?: ZoteroKey | false;
  relations?: ZoteroRelation;
}

export interface ZoteroCollection {
  key?: ZoteroKey;
  version?: ZoteroVersion;
  library?: ZoteroLibrary;
  links?: ZoteroLinks;
  meta?: ZoteroMeta;
  data: ZoteroCollectionData;
}

// Search types
export interface ZoteroSearchCondition {
  condition: string;
  operator: string;
  value: string;
}

export interface ZoteroSearchData extends ZoteroData {
  name: string;
  conditions: ZoteroSearchCondition[];
}

export interface ZoteroSearch {
  key?: ZoteroKey;
  version?: ZoteroVersion;
  library?: ZoteroLibrary;
  links?: ZoteroLinks;
  meta?: ZoteroMeta;
  data: ZoteroSearchData;
}

export interface ZoteroSearchQuery {
  q?: string;
  itemType?: ZoteroItemType;
  tag?: string;
  since?: ZoteroVersion;
  sort?: string;
  direction?: 'asc' | 'desc';
  start?: number;
  limit?: number;
  format?: 'json' | 'keys' | 'versions' | 'bibtex' | 'biblatex' | 'bookmarks' | 'coins' | 'csljson' | 'mods' | 'refer' | 'rdf_bibliontology' | 'rdf_dc' | 'rdf_zotero' | 'ris' | 'tei' | 'wikipedia';
  include?: string[];
}

export interface ZoteroSearchResult<T = ZoteroItem> {
  items: T[];
  totalResults: number;
  lastModifiedVersion: ZoteroVersion;
  links?: ZoteroLinks;
}

// Library and Group types
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

export interface ZoteroGroupMember {
  id: number;
  username: string;
  name: string;
  role: 'member' | 'admin' | 'owner';
}

export interface ZoteroGroupMetadata {
  id: number;
  version: ZoteroVersion;
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
  created: string;
  lastModified: string;
}

export interface ZoteroGroup extends ZoteroLibrary {
  type: 'group';
  data: ZoteroGroupMetadata;
}

// Sync and Error types
export interface ZoteroSync {
  lastModifiedVersion: ZoteroVersion;
  username?: string;
  userID?: number;
  uploaded?: {
    collections: number;
    items: number;
    searches: number;
    tags: number;
  };
  unchanged?: {
    collections: number;
    items: number;
    searches: number;
    tags: number;
  };
  failed?: {
    collections: ZoteroKey[];
    items: ZoteroKey[];
    searches: ZoteroKey[];
    tags: { tag: string; type?: number }[];
  };
}

export interface ZoteroSyncError {
  code: string;
  message: string;
  data?: any;
}

// Content and Media types
export interface ZoteroFulltextContent {
  content: string;
  indexedChars: number;
  totalChars: number;
}

export interface ZoteroHighlight {
  text: string;
  color: string;
  pageLabel?: string;
  position: {
    pageIndex: number;
    rects: number[][];
  };
}

export interface ZoteroImage {
  src: string;
  width?: number;
  height?: number;
  annotation?: ZoteroAnnotation;
}

export interface ZoteroInk {
  paths: number[][][];
  width: number;
  color: string;
  pageLabel?: string;
  position: {
    pageIndex: number;
    rects: number[][];
  };
}