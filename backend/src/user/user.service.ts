import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';

import {
  InjectModel,
} from '@nestjs/mongoose';

import {
  Model,
} from 'mongoose';

import {
  User,
} from './user.model';

import {
  SmsService,
} from '../sms/sms.service';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,

    private readonly smsService: SmsService,
  ) {}

  // ==========================================
  // GET ALL USERS
  // ==========================================

  async findAll(): Promise<User[]> {
    return this.userModel
      .find()
      .select('-password -otp -otpExpiresAt')
      .exec();
  }

  // ==========================================
  // GET USER BY ID
  // ==========================================

  async getUser(
    userId: string,
  ): Promise<User> {

    if (!userId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    const user =
      await this.userModel
        .findById(userId)
        .select('-password -otp -otpExpiresAt')
        .exec();

    if (!user) {
      throw new NotFoundException(
        'User not found.',
      );
    }

    return user;
  }

  // ==========================================
  // CREATE USER / REGISTER
  // ==========================================

  async createUser(
    request: any,
  ): Promise<any> {

    const {
      fullname,
      username,
      email,
      phoneNumber,
      password,
    } = request;

    // ------------------------------------------
    // VALIDATION
    // ------------------------------------------

    if (!fullname?.trim()) {
      throw new BadRequestException(
        'Full name is required.',
      );
    }

    if (!email?.trim()) {
      throw new BadRequestException(
        'Email is required.',
      );
    }

    if (!phoneNumber?.trim()) {
      throw new BadRequestException(
        'Phone number is required.',
      );
    }

    if (!password) {
      throw new BadRequestException(
        'Password is required.',
      );
    }

    // ------------------------------------------
    // CLEAN DATA
    // ------------------------------------------

    const cleanFullname =
      String(fullname).trim();

    const cleanEmail =
      String(email)
        .trim()
        .toLowerCase();

    const cleanPhone =
      String(phoneNumber).trim();

    const cleanUsername =
      username
        ? String(username)
            .trim()
            .toLowerCase()
        : undefined;

    // ------------------------------------------
    // CHECK EMAIL
    // ------------------------------------------

    const existingEmail =
      await this.userModel.findOne({
        email: cleanEmail,
      });

    if (existingEmail) {
      throw new ConflictException(
        'Email already registered.',
      );
    }

    // ------------------------------------------
    // CHECK PHONE
    // ------------------------------------------

    const existingPhone =
      await this.userModel.findOne({
        phoneNumber: cleanPhone,
      });

    if (existingPhone) {
      throw new ConflictException(
        'Phone number already registered.',
      );
    }

    // ------------------------------------------
    // CHECK USERNAME
    // ------------------------------------------

    if (cleanUsername) {

      const existingUsername =
        await this.userModel.findOne({
          username: cleanUsername,
        });

      if (existingUsername) {
        throw new ConflictException(
          'Username already taken.',
        );
      }
    }

    // ------------------------------------------
    // GENERATE OTP
    // ------------------------------------------

    const otp =
      Math.floor(
        100000 +
        Math.random() * 900000,
      ).toString();

    const otpExpiresAt =
      new Date(
        Date.now() +
        10 * 60 * 1000,
      );

    // ------------------------------------------
    // CREATE USER
    // ------------------------------------------

    const user =
      new this.userModel({

        fullname:
          cleanFullname,

        username:
          cleanUsername,

        email:
          cleanEmail,

        phoneNumber:
          cleanPhone,

        password,

        isVerified:
          false,

        otp,

        otpExpiresAt,
      });

    // ------------------------------------------
    // SAVE USER
    // ------------------------------------------

    const savedUser =
      await user.save();

    // ------------------------------------------
    // SEND OTP
    // ------------------------------------------

    try {

      await this.smsService.sendOtpSms(
        cleanPhone,
        otp,
      );

    } catch (error) {

      console.error(
        'OTP sending failed:',
        error,
      );

      // SMS fail hone par registration
      // block nahi hoga.
    }

    // ------------------------------------------
    // SAFE RESPONSE
    // ------------------------------------------

    const safeUser: any =
      savedUser.toObject();

    // Password / OTP response mein nahi bhejna
    safeUser.password = undefined;
    safeUser.otp = undefined;
    safeUser.otpExpiresAt = undefined;

    return safeUser;
  }

  // ==========================================
  // LOGIN
  // ==========================================

  async findUserByIdentityAndPassword(
    identity: string,
    password: string,
  ): Promise<any> {

    if (!identity?.trim() || !password) {
      throw new BadRequestException(
        'Identity and password are required.',
      );
    }

    const cleanIdentity =
      identity.trim();

    // ------------------------------------------
    // FIND USER
    // ------------------------------------------

    const user =
      await this.userModel.findOne({

        $or: [

          {
            email:
              cleanIdentity.toLowerCase(),
          },

          {
            username:
              cleanIdentity.toLowerCase(),
          },

          {
            phoneNumber:
              cleanIdentity,
          },

        ],

      });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid email, username, phone number or password.',
      );
    }

    // ------------------------------------------
    // PASSWORD
    // ------------------------------------------

    if (
      user.password !== password
    ) {

      throw new UnauthorizedException(
        'Invalid email, username, phone number or password.',
      );
    }

    // ------------------------------------------
    // OTP VERIFICATION
    // ------------------------------------------

    if (!user.isVerified) {

      throw new UnauthorizedException(
        'Please verify your account with OTP first.',
      );
    }

    // ------------------------------------------
    // SAFE USER
    // ------------------------------------------

    const safeUser =
      await this.userModel
        .findById(user._id)
        .select('-password -otp -otpExpiresAt')
        .exec();

    if (!safeUser) {
      throw new NotFoundException(
        'User not found.',
      );
    }

    return safeUser;
  }

  // ==========================================
  // VERIFY OTP
  // ==========================================

  async verifyOtp(
    userId: string,
    otp: string,
  ): Promise<any> {

    if (!userId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    if (!otp) {
      throw new BadRequestException(
        'OTP is required.',
      );
    }

    const user =
      await this.userModel.findById(
        userId,
      );

    if (!user) {
      throw new NotFoundException(
        'User not found.',
      );
    }

    // ------------------------------------------
    // ALREADY VERIFIED
    // ------------------------------------------

    if (user.isVerified) {

      const safeUser =
        await this.userModel
          .findById(user._id)
          .select('-password -otp -otpExpiresAt')
          .exec();

      return {
        message:
          'Account is already verified.',
        user: safeUser,
      };
    }

    // ------------------------------------------
    // OTP EXISTS
    // ------------------------------------------

    if (!user.otp) {
      throw new BadRequestException(
        'No OTP found.',
      );
    }

    // ------------------------------------------
    // OTP EXPIRY
    // ------------------------------------------

    if (
      !user.otpExpiresAt ||
      user.otpExpiresAt.getTime() <
        Date.now()
    ) {

      throw new BadRequestException(
        'OTP has expired.',
      );
    }

    // ------------------------------------------
    // OTP CHECK
    // ------------------------------------------

    if (
      String(user.otp) !==
      String(otp).trim()
    ) {

      throw new BadRequestException(
        'Invalid OTP.',
      );
    }

    // ------------------------------------------
    // VERIFY USER
    // ------------------------------------------

    user.isVerified = true;

    user.otp = null;

    user.otpExpiresAt = null;

    const updatedUser =
      await user.save();

    // ------------------------------------------
    // SAFE USER
    // ------------------------------------------

    const safeUser =
      await this.userModel
        .findById(updatedUser._id)
        .select('-password -otp -otpExpiresAt')
        .exec();

    return {

      message:
        'Account verified successfully.',

      user:
        safeUser,
    };
  }
// ==========================================
// UPDATE AVATAR
// ==========================================

async updateAvatar(
  userId: string,
  avatarUrl: string,
): Promise<User> {

  if (!userId) {
    throw new BadRequestException(
      'User ID is required.',
    );
  }

  if (!avatarUrl) {
    throw new BadRequestException(
      'Avatar URL is required.',
    );
  }

  const user =
    await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          avatarUrl,
        },
        {
          returnDocument: 'after',
          runValidators: true,
        },
      )
      .select(
        '-password -otp -otpExpiresAt',
      )
      .exec();

  if (!user) {
    throw new NotFoundException(
      'User not found.',
    );
  }

  return user;
}
  // ==========================================
  // UPDATE COMPLETE PROFILE
  // ==========================================

  async updateProfile(
    userId: string,
    data: {
      fullname?: string;
      username?: string;
      profileBio?: string | null;
    },
  ): Promise<User> {

    const cleanUserId = String(userId || '').trim();

    if (!cleanUserId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    // Find the actual MongoDB document first.
    // This makes sure we update the logged-in user only.
    let existingUser: User | null;

    try {
      existingUser =
        await this.userModel.findById(
          cleanUserId,
        );
    } catch (error) {
      throw new BadRequestException(
        'Invalid User ID format.',
      );
    }

    if (!existingUser) {
      throw new NotFoundException(
        'User not found.',
      );
    }

    const updateData: any = {};

    // FULL NAME
    if (data?.fullname !== undefined) {
      const fullname = String(
        data.fullname,
      ).trim();

      if (!fullname) {
        throw new BadRequestException(
          'Full name cannot be empty.',
        );
      }

      updateData.fullname = fullname;
    }

    // USERNAME
    if (data?.username !== undefined) {
      const username = String(
        data.username,
      ).trim().toLowerCase();

      if (!username) {
        throw new BadRequestException(
          'Username cannot be empty.',
        );
      }

      // Do not reject the user's own current username.
      const duplicateUser =
        await this.userModel.findOne({
          username,
          _id: { $ne: existingUser._id },
        });

      if (duplicateUser) {
        throw new ConflictException(
          'Username is already taken.',
        );
      }

      updateData.username = username;
    }

    // BIO
    if (data?.profileBio !== undefined) {
      const bio =
        data.profileBio == null
          ? ''
          : String(data.profileBio).trim();

      if (bio.length > 150) {
        throw new BadRequestException(
          'Bio cannot be longer than 150 characters.',
        );
      }

      // Empty bio is stored as null.
      updateData.profileBio = bio || null;
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException(
        'No profile data provided.',
      );
    }

    console.log('📥 PROFILE UPDATE REQUEST:', {
      userId: cleanUserId,
      updateData,
    });

    // Save the changes in MongoDB and return the NEW document.
    const updatedUser =
      await this.userModel
        .findByIdAndUpdate(
          existingUser._id,
          { $set: updateData },
          {
            new: true,
            runValidators: true,
          },
        )
        .select('-password -otp -otpExpiresAt')
        .exec();

    if (!updatedUser) {
      throw new NotFoundException(
        'User not found after profile update.',
      );
    }

    console.log('✅ PROFILE UPDATED:', {
      id: updatedUser._id.toString(),
      fullname: updatedUser.fullname,
      username: updatedUser.username,
      profileBio: updatedUser.profileBio,
    });

    return updatedUser;
  }


  // ==========================================
  // UPDATE POST NUMBER
  // ==========================================

  async updateThePost(
    userId: string,
    postNumber: number,
  ): Promise<User> {

    if (!userId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    if (
      typeof postNumber !== 'number' ||
      postNumber < 0
    ) {

      throw new BadRequestException(
        'postNumber must be a valid number.',
      );
    }

    const user =
      await this.userModel
        .findByIdAndUpdate(

          userId,

          {
            postNumber,
          },

          {
            new: true,
            runValidators: true,
          },

        )
        .select('-password -otp -otpExpiresAt')
        .exec();

    if (!user) {
      throw new NotFoundException(
        'User not found.',
      );
    }

    return user;
  }

  // ==========================================
  // UPDATE FOLLOWERS
  // ==========================================

  async updateFollower(
    userId: string,
    followerNumber: number,
  ): Promise<User> {

    if (!userId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    if (
      typeof followerNumber !== 'number' ||
      followerNumber < 0
    ) {

      throw new BadRequestException(
        'Follower number must be a valid number.',
      );
    }

    const user =
      await this.userModel
        .findByIdAndUpdate(

          userId,

          {
            followerNumber,
          },

          {
            new: true,
            runValidators: true,
          },

        )
        .select('-password -otp -otpExpiresAt')
        .exec();

    if (!user) {
      throw new NotFoundException(
        'User not found.',
      );
    }

    return user;
  }

  // ==========================================
  // UPDATE FOLLOWING
  // ==========================================

  async updateFollowing(
    userId: string,
    followingNumber: number,
  ): Promise<User> {

    if (!userId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    if (
      typeof followingNumber !== 'number' ||
      followingNumber < 0
    ) {

      throw new BadRequestException(
        'Following number must be a valid number.',
      );
    }

    const user =
      await this.userModel
        .findByIdAndUpdate(

          userId,

          {
            followingNumber,
          },

          {
            new: true,
            runValidators: true,
          },

        )
        .select('-password -otp -otpExpiresAt')
        .exec();

    if (!user) {
      throw new NotFoundException(
        'User not found.',
      );
    }

    return user;
  }

  // ==========================================
  // UPDATE BIO ONLY
  // ==========================================

  async updateBio(
    userId: string,
    profileBio: string,
  ): Promise<User> {

    if (!userId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    const bio =
      profileBio?.trim() || '';

    if (
      bio.length > 150
    ) {

      throw new BadRequestException(
        'Bio cannot be longer than 150 characters.',
      );
    }

    const user =
      await this.userModel
        .findByIdAndUpdate(

          userId,

          {
            profileBio:
              bio || null,
          },

          {
            new: true,
            runValidators: true,
          },

        )
        .select('-password -otp -otpExpiresAt')
        .exec();

    if (!user) {
      throw new NotFoundException(
        'User not found.',
      );
    }

    return user;
  }
}