import { BadRequestException, Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors,HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    async getAllUser(){
        return await this.userService.findAll();
    }
    
    @Get(':id')
    async getUser(@Param('id') id: string){
        return await this.userService.getUser(id);
    }

    @Post('register')
    async registerUser(@Body() request: any){
        console.log('--- Incoming ID Payload ---', request);
        return await this.userService.createUser(request);
    }

    @Post('login')
    async loginUser(@Body() body:{identity: string, password: string}){
        return await this.userService.findUserByIdentityAndPassword(body.identity, body.password);
    }

    
    @Post(':id/avatar')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './uploads/avatars', filename: (req, file, callback) => { 
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); 
                const ext = extname(file.originalname); 
                callback(null, `avatar-${uniqueSuffix}${ext}`);
            },
        }), fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
                return callback(
                    new BadRequestException('Only image files (jpg, jpeg, png, webp) are allowed!'),
                    false,
                );
            } callback(null, true);
        }, limits: {
            fileSize: 5 * 1024 * 1024, // 5MB limit
            },
        }),
    )
    async uploadAvatar(@Param('id') userId: string, @UploadedFile() file: any,) {
        if (!file) {
            throw new BadRequestException('Please provide an image file');
        }

        const imageRelativePath = `/uploads/avatars/${file.filename}`;
        const updatedUser = await this.userService.updateAvatar(userId, imageRelativePath);

        return {
        message: 'Profile picture updated successfully',
        avatarUrl: updatedUser.avatarUrl,
        user: updatedUser,
        };
    }

    @Patch('post')
    async updatePost(@Body() body:{userId: string, postNumber: number}){
        // Ensure values are not undefined
        if (!body || body.postNumber === undefined) {
        throw new BadRequestException('postNumber is required');
        }

        return await this.userService.updateThePost(body.userId, body.postNumber);
    }

    @Patch('follower')
    async updateFollowers(@Body() body:{userId: string, followerNumber: number}){
        if (!body || body.followerNumber === undefined) {
            throw new BadRequestException('Follower number must be a valid number');
        }

        return await this.userService.updateFollower(body.userId, body.followerNumber);
    }
    
    @Patch('following')
    async updateFollowing(@Body() body:{userId: string, followingNumber: number}){
        if (!body || body.followingNumber === undefined) {
            throw new BadRequestException('Follower number must be a valid number');
        }

        return await this.userService.updateFollowing(body.userId, body.followingNumber);
    }

    @Patch('bio')
    async updateProfileBio(@Body() body:{userId: string, profileBio: string}){
        if(!body || body.profileBio === undefined){
            throw new BadRequestException('Profile Bio must be a valid');
        }

        return await this.userService.updateBio(body.userId, body.profileBio);
    }

    @Post('verify-otp')
    @HttpCode(HttpStatus.OK)
    async verifyOtp(@Body() body:{userId: string, otp: string}) {
        console.log('--- Incoming OTP Payload ---', body);
        return await this.userService.verifyOtp(body.userId, body.otp);
    }
}

