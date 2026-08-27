import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.model';

@Injectable()
export class PostService {

    constructor(
        @InjectModel('Post') private postModel: Model<Post>
    ){}

    async getAllPost(){
        return await this.postModel.find();
    }

    async getAllPostByUserId(userId: string){
        return await this.postModel.find({ userId: userId }).exec();
    }

    async createPost(request: any){
        try{
            // Safely extract location whether it's flat or nested in the request
            const locationData = request.location || {
                name: request.name || '',
                latitude: request.latitude || null,
                longitude: request.longitude || null,
            };
            const newPost = new this.postModel({
                userId: request.userId,
                userUrl: request.userUrl,
                author: request.author,
                username: request.username,
                caption: request.caption ?? '',
                mediaUrl: request.mediaUrl,
                mediaType: request.mediaType,
                hashtags:request.hashtags || '',
                audio: request.audio || '',
                likesCount: 0,
                commentsCount: 0,
                sharesCount: 0,
                createdDate: new Date(),
                updatedAt: new Date(),
            });

            return await newPost.save()
        }
        catch(error: any){
            console.error('Error creating user:', error);
            
            if (error.code === 11000) {
                throw new ConflictException('User with this email or username already exists.');
            }
            throw new InternalServerErrorException('Error creating user: ' + error.message);
        }
    }

    
    // async getAllPostById(id: string){
    //     return await this.postModel.findById(id).exec();
    // }
}
