export interface Story {
  id: number;
  username: string;
  avatarUrl: string;
  isCurrentUser?: boolean;
  hasUnreadStory?: boolean;
  altText?: string;
}

export interface PostAuthor {
  name: string;
  avatarUrl: string;
  location?: string;
  hasStory?: boolean;
  altText?: string;
}

export interface InteractiveOverlay {
  title: string;
  subtitle: string;
}

export interface Post {
  id: number;
  author: PostAuthor;
  imageUrl?: string;
  imageAltText?: string;
  interactiveOverlay?: InteractiveOverlay;
  likes: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  caption: string;
  commentCount: number;
  timeAgo: string;
  aspectRatio?: string;
}