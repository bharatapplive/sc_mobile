import * as mongoose from 'mongoose';

// Audio Sub-schema definition
export const AudioSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    audioUrl: { type: String, required: true },
    coverUrl: { type: String, default: '' },
    duration: { type: Number, default: 0 },
  },
  { _id: false } // Prevents Mongoose from auto-generating sub-document _id
);

export const PostSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    author: { type: String, required: true },
    caption: { type: String, default: '' },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    hashtags: [{ type: String }],
    audio: { type: AudioSchema, default: null }, // <-- Added Audio Field
    createdDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// TypeScript Interface for Audio
export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl?: string;
  duration?: number;
}

export interface Post extends mongoose.Document{
    userId: string;
    author: string;
    caption?: string;
    mediaUrl: string;
    mediaType: string;
    likesCount: number;
    commentsCount: number;
    hashtags: string[]; // Fixed type from string to string[]
    audio?: AudioTrack | null; // <-- Added Audio Field
    createdDate: Date;
    updatedAt: Date;
}