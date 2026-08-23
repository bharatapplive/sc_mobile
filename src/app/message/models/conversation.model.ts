export interface Conversation {
  id: number;
  name: string;
  avatar?: string;
  avatars?: string[];
  isGroup?: boolean;
  senderName?: string;
  lastMessage: string;
  time: string;
  isOnline?: boolean;
  unread?: boolean;
  altText?: string;
}
