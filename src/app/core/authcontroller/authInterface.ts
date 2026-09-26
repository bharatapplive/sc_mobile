export interface SessionState{
  token: string | null;
  isAuthenticated: boolean;
}

export interface User{
  _id?: string;
  email?: string;
  phoneNumber?: string;
  username:string;
  fullname:string;
  pronouns?:string;
  // Mark missing fields as optional
  password?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isVerified?: boolean;
  links?: string[];
  gender?: 'Male' | 'Female' | 'Other' | string | null;
  otpCode?: string;
  otpExpireAt?: string;
}

export interface Followers{
  followerId:  string;
  followingId: string;
}
// Login Data...
export interface LoginResponse {
  message: string;
  jwt: string;
  user: any;
}

// Audio Data
export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl?: string;
  duration?: number;
}

//#region POST CONTENT...

export interface ContentAuthor{  
    userId?:          string;
    authorName:      string;
    avatarUrl:       string;
    isFollowing?:    boolean;
    hasUnseenStory?: boolean;
}

export interface CreatePostPayload {
    _id?:             string;
    author:           ContentAuthor | null;
    username:         string;
    type:             'POST' | 'REEL' | 'STORY';
    caption?:         string;
    mediaUrl:         string;
    mediaType:        'image' | 'video'; // Use strict union types instead of plain string
    hashtags?:        string[];          // Changed to array of strings
    isLiked?:         boolean;
    likesCount:       number;          // Optional for creation payload
    commentsCount?:   number;       // Optional for creation payload
    sharesCount?:     number;
    audio?:           AudioTrack | null; // <-- Add this field
}

export interface PostResponse extends CreatePostPayload {
  _id: string;
  likes: string[];              // User IDs who liked the post
  likesCount: number;           // Guaranteed number from DB
  commentsCount: number;        // Guaranteed number from DB
  createdDate: string;
  updatedAt: string;
}

export interface CommentResponse{
  _id?:        string;
  feedId:      string;
  userID:      string;
  parentID?:   string;
  content?:    string;
  likeCount?:  number;
  replyCount?: number;
}

export interface ReelItem{

  _id?:             string;
  author:           ContentAuthor | null;
  username:         string;
  type:             'POST' | 'REEL' | 'STORY';
  caption?:         string;
  mediaUrl:         string;
  duration:         number;
  mediaType:        'image' | 'video'; // Use strict union types instead of plain string
  hashtags?:        string[];          // Changed to array of strings
  likedBy?:         string[];
  likesCount:       number;          // Optional for creation payload
  commentsCount?:   number;       // Optional for creation payload
  sharesCount?:     number;
  audio?:           AudioTrack | null; // <-- Add this field
  isPlaying?:       boolean;
}

export interface StoryItem{
  username:       string;
  type:             'POST' | 'REEL' | 'STORY';
  author:         ContentAuthor | null;
  mediaUrl:       string;
  mediaType:      'image' | 'video';
  audio?:         AudioTrack | null;
  viewers:        string[];
  viewsCount:     number;
  expiresAt?:     Date | null;
  status:         string;
  createdAt?:     Date;
  updatedAt?:     Date;
}

//#endregion

export type PostType = 'post' | 'story' | 'reel';
export type reelType = 'post' | 'story' | 'reel';

export interface OverlayText {
  id:       string;
  text:     string;
  x:        number;
  y:        number;
  color:    string;
  fontSize: number;
}

export interface MediaComposerState {
  type:           PostType;
  mediaBlob:      Blob | null;
  mediaUrl:       string | null;
  audioTrackUrl:  string | null;
  caption:        string;
  overlayTexts:   OverlayText[];
  aspectRatio:    '1:1' | '9:16' | '4:5';
}