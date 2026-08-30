// Registeration Data....
export interface User{
  _id?: string;
  email: string;
  phoneNumber: string;
  username:string;
  fullname:string;
  
  // Mark missing fields as optional
  password?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isVerified?: boolean;
  otpCode?: string;
  otpExpireAt?: string;
}

// Login Data...
export interface LoginResponse {
  message: string;
  accessToken: string;
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
    userId:          string;
    authorName:      string;
    avatarUrl:       string;
    isFollowing?:    boolean;
    hasUnseenStory?: boolean;
}

export interface CreatePostPayload {
    _id?:                string;
    author:           ContentAuthor | null;
    username:         string;
    type:             'POST' | 'REEL' | 'STORY';
    caption?:         string;
    mediaUrl:         string;
    mediaType:        'image' | 'video'; // Use strict union types instead of plain string
    hashtags?:        string[];          // Changed to array of strings
    isLiked?:         boolean;
    likesCount:      number;          // Optional for creation payload
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

//#endregion