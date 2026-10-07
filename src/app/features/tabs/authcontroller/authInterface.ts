export interface ContentAuthor {
  userId: string;
  authorName: string;
  avatarUrl?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl?: string;
  duration?: number;
}

export interface CreatePostPayload {
  author: ContentAuthor | null;
  username: string;
  type: 'POST' | 'REEL' | 'STORY';
  caption: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  audio?: AudioTrack | null;
  hashtags?: string[];
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
}
