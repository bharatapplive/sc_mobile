import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username:{type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true  }, // Changed to String to support formats like "+123456789"
  password: { type: String, required: true },
  avatarUrl: { 
    type: String, 
    default: 'https://pixabay.com/images/download/openclipart-vectors-avatar-1295397_1920.png' 
  },
  postNumber: { type: Number, default: 0 },
  followerNumber: { type: Number, default: 0 },
  followingNumber: { type: Number, default: 0 },
  profileBio: { type: String, default: null },

  // OTP & Verification status
  isVerified: { type: Boolean, default: false },
  otp: { type: String, default: null },
  otpExpiresAt: { type: Date, default: null }
});

export interface User extends mongoose.Document {
  fullname: string;
  username: string;
  email: string;
  phoneNumber: string; // Updated to match schema
  password: string;
  avatarUrl: string;
  postNumber: number;
  followerNumber: number;
  followingNumber: number;
  profileBio: string | null;
  isVerified: boolean;
  otp: string | null;
  otpExpiresAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}