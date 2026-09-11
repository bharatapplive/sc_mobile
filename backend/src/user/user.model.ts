import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatarUrl: {
      type: String,
      default:
        'https://rare-gallery.com/thumbs/508857-Tom-and-jerry.jpg',
    },

    postNumber: {
      type: Number,
      default: 0,
    },

    followerNumber: {
      type: Number,
      default: 0,
    },

    followingNumber: {
      type: Number,
      default: 0,
    },

    profileBio: {
      type: String,
      default: null,
    },

    // OTP / Account Verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export interface User extends mongoose.Document {
  fullname: string;
  username: string;
  email: string;
  phoneNumber: string;
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