import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    author: { type: String, required: true },
    caption: { type: String, default: '' },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    hashtags: [{ type: String }],
    createdDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export interface Post extends mongoose.Document{
    userId: string;
    author: string;
    caption?: string;
    mediaUrl: string;
    mediaType: string;
    likesCount: number;
    commentsCount: number;
    hashtags: string;
    createdDate: Date;
    updatedAt: Date;
}