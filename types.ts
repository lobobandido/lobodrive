
export interface FileMetadata {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  ownerId: string;
  ownerName: string;
  sharedWith: string[]; // array of user IDs
}

export interface User {
  id: string;
  name: string;
}

export type View = 'my-files' | 'shared-with-me' | 'analysis';
