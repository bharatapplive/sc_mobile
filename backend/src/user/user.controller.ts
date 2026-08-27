import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  // ==========================================
  // GET ALL USERS
  // ==========================================

  @Get()
  async getAllUser() {
    return this.userService.findAll();
  }

  // ==========================================
  // GET USER BY ID
  // ==========================================

  @Get(':id')
  async getUser(
    @Param('id') id: string,
  ) {
    return this.userService.getUser(id);
  }

  // ==========================================
  // REGISTER
  // ==========================================

  @Post('register')
  async registerUser(
    @Body() request: any,
  ) {
    console.log(
      '--- Registration Request ---',
      request,
    );

    return this.userService.createUser(
      request,
    );
  }

  // ==========================================
  // LOGIN
  // ==========================================

  @Post('login')
  async loginUser(
    @Body()
    body: {
      identity: string;
      password: string;
    },
  ) {
    console.log(
      '--- Login Request ---',
      {
        identity: body?.identity,
      },
    );

    if (!body?.identity) {
      throw new BadRequestException(
        'Identity is required.',
      );
    }

    if (!body?.password) {
      throw new BadRequestException(
        'Password is required.',
      );
    }

    return this.userService.findUserByIdentityAndPassword(
      body.identity,
      body.password,
    );
  }

  // ==========================================
  // VERIFY OTP
  // ==========================================

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(
    @Body()
    body: {
      userId: string;
      otp: string;
    },
  ) {
    console.log(
      '--- OTP Verification Request ---',
      {
        userId: body?.userId,
        otp: body?.otp,
      },
    );

    if (!body?.userId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    if (!body?.otp) {
      throw new BadRequestException(
        'OTP is required.',
      );
    }

    return this.userService.verifyOtp(
      body.userId,
      body.otp,
    );
  }

  // ==========================================
  // UPLOAD AVATAR
  // ==========================================

  @Post(':id/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination:
          './uploads/avatars',

        filename: (
          req,
          file,
          callback,
        ) => {
          const uniqueSuffix =
            Date.now() +
            '-' +
            Math.round(
              Math.random() * 1e9,
            );

          const ext =
            extname(
              file.originalname,
            );

          callback(
            null,
            `avatar-${uniqueSuffix}${ext}`,
          );
        },
      }),

      fileFilter: (
        req,
        file,
        callback,
      ) => {
        if (
          !file.mimetype.match(
            /\/(jpg|jpeg|png|webp)$/,
          )
        ) {
          return callback(
            new BadRequestException(
              'Only image files (jpg, jpeg, png, webp) are allowed!',
            ),
            false,
          );
        }

        callback(null, true);
      },

      limits: {
        fileSize:
          5 * 1024 * 1024,
      },
    }),
  )
  async uploadAvatar(
    @Param('id') userId: string,
    @UploadedFile() file: any,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Please provide an image file.',
      );
    }

    const imageRelativePath =
      `/uploads/avatars/${file.filename}`;

    const updatedUser =
      await this.userService.updateAvatar(
        userId,
        imageRelativePath,
      );

    return {
      message:
        'Profile picture updated successfully',

      avatarUrl:
        updatedUser.avatarUrl,

      user: updatedUser,
    };
  }

  // ==========================================
  // UPDATE COMPLETE PROFILE
  // ==========================================

  @Patch('profile')
  async updateProfile(
    @Body()
    body: {
      userId: string;
      fullname?: string;
      username?: string;
      profileBio?: string | null;
    },
  ) {
    if (!body?.userId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    if (
      body.fullname === undefined &&
      body.username === undefined &&
      body.profileBio === undefined
    ) {
      throw new BadRequestException(
        'At least one profile field is required.',
      );
    }

    // Fullname empty check
    if (
      body.fullname !== undefined &&
      !body.fullname.trim()
    ) {
      throw new BadRequestException(
        'Full name cannot be empty.',
      );
    }

    // Username empty check
    if (
      body.username !== undefined &&
      !body.username.trim()
    ) {
      throw new BadRequestException(
        'Username cannot be empty.',
      );
    }

    console.log(
      '--- Update Profile Request ---',
      {
        userId: body.userId,
        fullname: body.fullname,
        username: body.username,
        profileBio: body.profileBio,
      },
    );

    return this.userService.updateProfile(
      body.userId,
      {
        fullname:
          body.fullname?.trim(),

        username:
          body.username?.trim(),

        profileBio:
          body.profileBio?.trim() || null,
      },
    );
  }

  // ==========================================
  // UPDATE POST NUMBER
  // ==========================================

  @Patch('post')
  async updatePost(
    @Body()
    body: {
      userId: string;
      postNumber: number;
    },
  ) {
    if (!body?.userId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    if (
      body.postNumber === undefined ||
      typeof body.postNumber !== 'number'
    ) {
      throw new BadRequestException(
        'postNumber must be a valid number.',
      );
    }

    return this.userService.updateThePost(
      body.userId,
      body.postNumber,
    );
  }

  // ==========================================
  // UPDATE FOLLOWERS
  // ==========================================

  @Patch('follower')
  async updateFollowers(
    @Body()
    body: {
      userId: string;
      followerNumber: number;
    },
  ) {
    if (!body?.userId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    if (
      body.followerNumber === undefined ||
      typeof body.followerNumber !== 'number'
    ) {
      throw new BadRequestException(
        'Follower number must be a valid number.',
      );
    }

    return this.userService.updateFollower(
      body.userId,
      body.followerNumber,
    );
  }

  // ==========================================
  // UPDATE FOLLOWING
  // ==========================================

  @Patch('following')
  async updateFollowing(
    @Body()
    body: {
      userId: string;
      followingNumber: number;
    },
  ) {
    if (!body?.userId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    if (
      body.followingNumber === undefined ||
      typeof body.followingNumber !== 'number'
    ) {
      throw new BadRequestException(
        'Following number must be a valid number.',
      );
    }

    return this.userService.updateFollowing(
      body.userId,
      body.followingNumber,
    );
  }

  // ==========================================
  // UPDATE BIO ONLY
  // ==========================================

  @Patch('bio')
  async updateProfileBio(
    @Body()
    body: {
      userId: string;
      profileBio: string;
    },
  ) {
    if (!body?.userId) {
      throw new BadRequestException(
        'User ID is required.',
      );
    }

    if (
      body.profileBio === undefined
    ) {
      throw new BadRequestException(
        'Profile Bio must be valid.',
      );
    }

    return this.userService.updateBio(
      body.userId,
      body.profileBio,
    );
  }
}