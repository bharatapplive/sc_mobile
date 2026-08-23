export interface Note {
  id: number;
  username: string;
  avatar: string;
  hasStoryRing?: boolean;
  isOwnNote?: boolean;
  hasNote?: boolean;
  altText?: string;
}
