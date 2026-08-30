import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

import { User } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { SmsService } from 'src/sms/sms.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private readonly smsService: SmsService,
        private readonly jwtService: JwtService,
    ) {}

    // Generate a random 6-digit numeric OTP
    private generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }


    // =========================================================
    // CREATE ACCOUNT
    // =========================================================

    async createUser(request: any) {

        try {

            const cleanEmail = String(request.email || '')
                .trim()
                .toLowerCase();

            const cleanPhone = String(request.phoneNumber || '')
                .trim();

            // Check existing account by email OR phone
            const existingUser = await this.userModel.findOne({
                $or: [
                    { email: cleanEmail },
                    { phoneNumber: cleanPhone }
                ]
            });

            // If account already exists and is verified
            if (existingUser?.isVerified) {
                throw new ConflictException(
                    'This account already exists.'
                );
            }

            const otp = this.generateOtp();

            const otpExpiresAt = new Date(
                Date.now() + 10 * 60 * 1000
            );

            // Hash password
            const saltRound = 10;

            const hashedPassword = await bcrypt.hash(
                request.password,
                saltRound
            );


            let newUser;

            // If an unverified user already exists,
            // update that account instead of creating duplicate
            if (existingUser) {

                existingUser.fullname = request.fullname;
                existingUser.username = request.username;
                existingUser.email = cleanEmail;
                existingUser.phoneNumber = cleanPhone;
                existingUser.password = hashedPassword;

                existingUser.otp = otp;
                existingUser.otpExpiresAt = otpExpiresAt;
                existingUser.isVerified = false;

                newUser = await existingUser.save();

            } else {

                newUser = new this.userModel({

                    fullname: request.fullname,

                    username: request.username,

                    email: cleanEmail,

                    phoneNumber: cleanPhone,

                    password: hashedPassword,

                    avatarUrl: request.avatarUrl,

                    otp: otp,

                    otpExpiresAt: otpExpiresAt,

                    isVerified: false,

                });

                await newUser.save();
            }


            // Send OTP through SMS
            try {

                await this.smsService.sendOtpSms(
                    newUser.phoneNumber,
                    otp
                );

            } catch (smsError: any) {

                console.warn(
                    '⚠️ SMS sending failed:',
                    smsError.message
                );

                // Development mode OTP
                console.log(
                    `🔑 [DEV MODE OTP] Phone: ${newUser.phoneNumber} | OTP: ${otp}`
                );
            }


            return {

                _id: newUser._id.toString(),

                email: newUser.email,

                phoneNumber: newUser.phoneNumber,

                message: 'OTP sent to your mobile phone.',

            };

        } catch (error: any) {

            console.error(
                'Error creating user:',
                error
            );


            if (error instanceof ConflictException) {
                throw error;
            }


            if (error.code === 11000) {

                throw new ConflictException(
                    'User with this email, phone or username already exists.'
                );

            }


            throw new InternalServerErrorException(
                'Error creating user: ' + error.message
            );
        }
    }


    // =========================================================
    // SEND OTP AGAIN
    // =========================================================

    async sendOtp(emailOrPhone: string) {

        const identity = String(emailOrPhone || '').trim();

        const cleanIdentity = identity.toLowerCase();


        const user = await this.userModel.findOne({

            $or: [

                { email: cleanIdentity },

                { phoneNumber: identity }

            ]

        });


        if (!user) {

            throw new NotFoundException(
                'User not found.'
            );

        }


        if (user.isVerified) {

            throw new BadRequestException(
                'User is already verified.'
            );

        }


        const otp = this.generateOtp();

        const otpExpiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );


        user.otp = otp;

        user.otpExpiresAt = otpExpiresAt;


        await user.save();


        // Send OTP
        try {

            await this.smsService.sendOtpSms(
                user.phoneNumber,
                otp
            );

        } catch (smsError: any) {

            console.warn(
                '⚠️ SMS failed:',
                smsError.message
            );

            console.log(
                `🔑 [DEV MODE OTP] Phone: ${user.phoneNumber} | OTP: ${otp}`
            );
        }


        return {

            message: 'OTP sent successfully.',

            userId: user._id.toString(),

        };
    }


    // =========================================================
    // VERIFY OTP
    // =========================================================

    async verifyOtp(
        id: string,
        otp: string
    ): Promise<{
        message: string;
        isVerified: boolean;
    }> {

        let user;


        try {

            user = await this.userModel.findById(id);

        } catch (err) {

            throw new BadRequestException(
                'Invalid User ID format.'
            );

        }


        if (!user) {

            throw new NotFoundException(
                'User not found.'
            );

        }


        // Already verified
        if (user.isVerified) {

            throw new BadRequestException(
                'User is already verified.'
            );

        }


        // Check OTP expiry
        if (
            !user.otpExpiresAt ||
            new Date() > new Date(user.otpExpiresAt)
        ) {

            throw new BadRequestException(
                'OTP has expired. Please request a new one.'
            );

        }


        // Clean OTP values
        const cleanInputOtp = String(otp || '').trim();

        const cleanStoredOtp = String(user.otp || '').trim();


        // Compare OTP
        if (cleanStoredOtp !== cleanInputOtp) {

            throw new BadRequestException(
                'Invalid OTP code. Please try again.'
            );

        }


        // Verify user
        user.isVerified = true;

        user.otp = null;

        user.otpExpiresAt = null;


        await user.save();


        return {

            message: 'OTP verified successfully.',

            isVerified: true,

        };
    }


    // =========================================================
    // LOGIN + JWT
    // =========================================================

    async findUserByIdentityAndPassword(
        identity: string,
        password: string
    ) {

        const originalIdentity = String(
            identity || ''
        ).trim();

        const cleanIdentity = originalIdentity.toLowerCase();


        // Find user by email OR phone number
        const user = await this.userModel.findOne({

            $or: [

                { email: cleanIdentity },

                { phoneNumber: originalIdentity }

            ]

        });


        // User doesn't exist
        if (!user) {

            throw new UnauthorizedException(
                'User not found'
            );

        }


        // OTP verification required
        if (!user.isVerified) {

            throw new UnauthorizedException(
                'Please verify your account with OTP first.'
            );

        }


        // Check password
        const isPasswordValid = await bcrypt.compare(

            password,

            user.password || ''

        );


        if (!isPasswordValid) {

            throw new UnauthorizedException(
                'Invalid password'
            );

        }


        // =====================================================
        // GENERATE JWT TOKEN
        // =====================================================

        const payload = {

            sub: user._id.toString(),

            email: user.email,

            username: user.username,

        };


        const accessToken =
            this.jwtService.sign(payload);


        // Remove password from response
        const {
            password: _,
            ...result
        } = user.toObject();


        // Return user + JWT
        return {

            ...result,

            accessToken,

        };
    }


    // =========================================================
    // GET USER BY ID
    // =========================================================

    async getUser(id: string) {

        return this.userModel
            .findById(id)
            .exec();

    }


    // =========================================================
    // GET ALL USERS
    // =========================================================

    async findAll() {

        return await this.userModel.find();

    }


    // =========================================================
    // UPDATE AVATAR
    // =========================================================

    async updateAvatar(
        userId: string,
        imagePath: string
    ) {

        const updatedUser =
            await this.userModel.findByIdAndUpdate(

                userId,

                {
                    avatarUrl: imagePath
                },

                {
                    returnDocument: 'after'
                }

            ).exec();


        if (!updatedUser) {

            throw new NotFoundException(
                'User not found'
            );

        }


        return updatedUser;
    }


    // =========================================================
    // UPDATE POST NUMBER
    // =========================================================

    async updateThePost(
        userId: string,
        postNumber: number
    ) {

        return await this.userModel.findByIdAndUpdate(

            userId,

            {
                postNumber: postNumber
            }

        );

    }


    // =========================================================
    // UPDATE FOLLOWER
    // =========================================================

    async updateFollower(
        userId: string,
        follow: number
    ) {

        return await this.userModel.findByIdAndUpdate(

            userId,

            {
                followerNumber: follow
            }

        );

    }


    // =========================================================
    // UPDATE FOLLOWING
    // =========================================================

    async updateFollowing(
        userId: string,
        following: number
    ) {

        return await this.userModel.findByIdAndUpdate(

            userId,

            {
                followingNumber: following
            }

        );

    }


    // =========================================================
    // UPDATE BIO
    // =========================================================

    async updateBio(
        userId: string,
        bio: string
    ) {

        return await this.userModel.findByIdAndUpdate(

            userId,

            {
                profileBio: bio
            }

        );

    }

}