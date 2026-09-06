export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: Date | string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface ConversationDetail {
  id: string;
  user: ChatUser;
  lastMessage?: string;
  unreadCount?: number;
}
