export interface FeedComment {
  username: string;
  text: string;
}

export interface FeedPost {
  id: number;
  username: string;
  name: string;
  avatar: string;
  location: string;
  image: string;
  mediaType?: 'image' | 'video';
  caption: string;
  time: string;
  likes: number;
  comments: FeedComment[];
  liked: boolean;
  saved: boolean;
  commentsOpen: boolean;
  commentDraft: string;
  hidden?: boolean;
}
