import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private readonly smsService: SmsService, // 👈 Inject SmsService
    ) {}

    // Generate a random 6-digit numeric OTP
    private generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Create a new user
    async createUser(request: any){
        try{
            const cleanEmail = request.email.trim().toLowerCase();
            const cleanPhone = (request.phoneNumber || '').toString().trim();

            // 1. Find existing account by email OR phone number
            let user = await this.userModel.findOne({
            $or: [{ email: cleanEmail }, { phoneNumber: cleanPhone }],
            });

            if(user?.isVerified)
            {
                throw new ConflictException('This account is already Exist.');
            }
            else
            {
                const otp = this.generateOtp();
                const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

                const saltRound = 10;
                const hashedPassword = await bcrypt.hash(request.password, saltRound);

                const newUser = new this.userModel({
                    fullname: request.fullname,
                    email: request.email,
                    username: request.username,
                    phoneNumber: request.phoneNumber,
                    password: hashedPassword,
                    avatarUrl: request.avatarUrl,
                    otp, otpExpiresAt,
                    isVerified: false
                });

                await newUser.save();

                // 2. Safely trigger SMS delivery
                try {
                    await this.smsService.sendOtpSms(newUser.phoneNumber, otp);
                } catch (smsError: any) {
                    console.warn('⚠️ Twilio trial template restriction caught:', smsError.message);
                    // Log OTP to terminal for local development testing
                    console.log(`🔑 [DEV MODE OTP] Phone: ${newUser.phoneNumber} | OTP: ${otp}`);
                }
                return{
                    _id: newUser._id.toString(),
                    email: newUser.email,
                    phoneNumber: newUser.phoneNumber,
                    message: 'OTP sent to your mobile phone.',
                };
            }
            
        }catch (error: any){
            console.error('Error creating user:', error);

            if (error.code === 11000) {
                throw new ConflictException('User with this email or username already exists.');
            }

            throw new InternalServerErrorException('Error creating user: ' + error.message);
        }
        
    }

    //Verify Otp
    async verifyOtp(id: string, otp:string): Promise<{ message: string; isVerified: boolean }> 
    {
        // 1. Find user by ID
        let user;
        try {
            user = await this.userModel.findById(id);
        } catch (err) {
            throw new BadRequestException('Invalid User ID format.');
        }

        if (!user) {
        throw new NotFoundException('User not found.');
        }

        // 2. Check if user is already verified
        if (user.isVerified) {
            throw new BadRequestException('User is already verified.');
        }

        // 3. Check if OTP is expired
        if (!user.otpExpiresAt || new Date() > new Date(user.otpExpiresAt)) {
            throw new BadRequestException('OTP has expired. Please request a new one.');
        }

        // 4. Validate OTP match
        // Explicitly convert both to trimmed strings
        const cleanInputOtp = String(otp || '').trim();
        const cleanStoredOtp = String(user.otp || '').trim();

        if (cleanStoredOtp !== cleanInputOtp) {
        throw new BadRequestException('Invalid OTP code. Please try again.');
        }

        // 5. Update user state and clear OTP fields
        user.isVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        return {
            message: 'OTP verified successfully.',
            isVerified: true,
        };
    }

    // Find a user by identity and password
    async findUserByIdentityAndPassword(identity: string, password: string){
        // Find the user by email or username
        const newUser = await this.userModel.findOne({
            $or:[
                { email: identity },
                { phoneNumber: identity }
            ]
        });

        if(!newUser){
            throw new UnauthorizedException('User not found');
        }

        // Compare the requested password with stored password through bcrypt..
        const isPasswordValid = await bcrypt.compare(password, newUser.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid password');
        }

        // Return user data (excluding password for security)
        const { password: _, ...result } = newUser.toObject();
        return result;
    }

    // Find a user by ID
    async getUser(id: string){
        return this.userModel.findById(id).exec();
    }

    async findAll()
    {
        return await this.userModel.find();
    }

    async updateAvatar(userId: string, imagePath: string) {
        const updatedUser = await this.userModel.findByIdAndUpdate(
            userId, 
            { avatarUrl: imagePath },
            { returnDocument: 'after' }
        ).exec();

        if(!updatedUser){
            throw new NotFoundException('User not found');
        }

        return updatedUser;
    }

    async updateThePost(userId:string, postNumber: number){
        return await this.userModel.findByIdAndUpdate(userId, {postNumber:postNumber});
    }

    async updateFollower(userId:string, follow: number){
        return await this.userModel.findByIdAndUpdate(userId, {followerNumber:follow});
    }

    async updateFollowing(userId:string, following: number){
        return await this.userModel.findByIdAndUpdate(userId, {followingNumber:following});
    }

    async updateBio(userId: string, bio:string){
        return await this.userModel.findByIdAndUpdate(userId, {profileBio:bio});
    }
}
