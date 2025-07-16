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
  self?: { href: string; type: string; };
  alternate?: { href: string; type: string; };
  up?: { href: string; type: string; };
  enclosure?: { href: string; type: string; length?: number; title?: string; };
}

export interface ZoteroMeta {
  createdByUser?: { id: number; username: string; name: string; };
  createdDate?: string;
  lastModifiedByUser?: { id: number; username: string; name: string; };
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
  tags?: ZoteroTag[];
  collections?: ZoteroKey[];
  relations?: ZoteroRelation;
  dateAdded?: string;
  dateModified?: string;
  [field: string]: any; // Allow additional fields
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
}

export interface ZoteroArtworkItem extends ZoteroItemData {
  itemType: 'artwork';
}

export interface ZoteroAttachmentItem extends ZoteroItemData {
  itemType: 'attachment';
}

export interface ZoteroAudioRecordingItem extends ZoteroItemData {
  itemType: 'audioRecording';
}

export interface ZoteroBillItem extends ZoteroItemData {
  itemType: 'bill';
}

export interface ZoteroBlogPostItem extends ZoteroItemData {
  itemType: 'blogPost';
}

export interface ZoteroBookItem extends ZoteroItemData {
  itemType: 'book';
}

export interface ZoteroBookSectionItem extends ZoteroItemData {
  itemType: 'bookSection';
}

export interface ZoteroCaseItem extends ZoteroItemData {
  itemType: 'case';
}

export interface ZoteroComputerProgramItem extends ZoteroItemData {
  itemType: 'computerProgram';
}

export interface ZoteroConferencePaperItem extends ZoteroItemData {
  itemType: 'conferencePaper';
}

export interface ZoteroDatasetItem extends ZoteroItemData {
  itemType: 'dataset';
}

export interface ZoteroDictionaryEntryItem extends ZoteroItemData {
  itemType: 'dictionaryEntry';
}

export interface ZoteroDocumentItem extends ZoteroItemData {
  itemType: 'document';
}

export interface ZoteroEmailItem extends ZoteroItemData {
  itemType: 'email';
}

export interface ZoteroEncyclopediaArticleItem extends ZoteroItemData {
  itemType: 'encyclopediaArticle';
}

export interface ZoteroFilmItem extends ZoteroItemData {
  itemType: 'film';
}

export interface ZoteroForumPostItem extends ZoteroItemData {
  itemType: 'forumPost';
}

export interface ZoteroHearingItem extends ZoteroItemData {
  itemType: 'hearing';
}

export interface ZoteroInstantMessageItem extends ZoteroItemData {
  itemType: 'instantMessage';
}

export interface ZoteroInterviewItem extends ZoteroItemData {
  itemType: 'interview';
}

export interface ZoteroJournalArticleItem extends ZoteroItemData {
  itemType: 'journalArticle';
}

export interface ZoteroLetterItem extends ZoteroItemData {
  itemType: 'letter';
}

export interface ZoteroMagazineArticleItem extends ZoteroItemData {
  itemType: 'magazineArticle';
}

export interface ZoteroManuscriptItem extends ZoteroItemData {
  itemType: 'manuscript';
}

export interface ZoteroMapItem extends ZoteroItemData {
  itemType: 'map';
}

export interface ZoteroNewspaperArticleItem extends ZoteroItemData {
  itemType: 'newspaperArticle';
}

export interface ZoteroNoteItem extends ZoteroItemData {
  itemType: 'note';
}

export interface ZoteroPatentItem extends ZoteroItemData {
  itemType: 'patent';
}

export interface ZoteroPodcastItem extends ZoteroItemData {
  itemType: 'podcast';
}

export interface ZoteroPreprintItem extends ZoteroItemData {
  itemType: 'preprint';
}

export interface ZoteroPresentationItem extends ZoteroItemData {
  itemType: 'presentation';
}

export interface ZoteroRadioBroadcastItem extends ZoteroItemData {
  itemType: 'radioBroadcast';
}

export interface ZoteroReportItem extends ZoteroItemData {
  itemType: 'report';
}

export interface ZoteroStandardItem extends ZoteroItemData {
  itemType: 'standard';
}

export interface ZoteroStatuteItem extends ZoteroItemData {
  itemType: 'statute';
}

export interface ZoteroThesisItem extends ZoteroItemData {
  itemType: 'thesis';
}

export interface ZoteroTvBroadcastItem extends ZoteroItemData {
  itemType: 'tvBroadcast';
}

export interface ZoteroVideoRecordingItem extends ZoteroItemData {
  itemType: 'videoRecording';
}

export interface ZoteroWebpageItem extends ZoteroItemData {
  itemType: 'webpage';
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
  groups: { all: boolean; [groupId: string]: boolean; };
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

// Template types
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
  format?: string;
  include?: string[];
}

export interface ZoteroSearchResult<T = ZoteroItem> {
  items: T[];
  totalResults: number;
  lastModifiedVersion: ZoteroVersion;
  links?: ZoteroLinks;
}

// Library types
export interface ZoteroLibrary {
  type: 'user' | 'group';
  id: number;
  name: string;
  links: { alternate: { href: string; type: string; }; };
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

// Sync types
export interface ZoteroSync {
  lastModifiedVersion: ZoteroVersion;
  username?: string;
  userID?: number;
}

export interface ZoteroSyncError {
  code: string;
  message: string;
  data?: any;
}

// Content types
export interface ZoteroFulltextContent {
  content: string;
  indexedChars: number;
  totalChars: number;
}

export interface ZoteroHighlight {
  text: string;
  color: string;
  pageLabel?: string;
  position: { pageIndex: number; rects: number[][]; };
}

export interface ZoteroImage {
  src: string;
  width?: number;
  height?: number;
  annotation?: any;
}

export interface ZoteroInk {
  paths: number[][][];
  width: number;
  color: string;
  pageLabel?: string;
  position: { pageIndex: number; rects: number[][]; };
}