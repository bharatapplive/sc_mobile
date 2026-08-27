import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(
        private readonly postServe: PostService
    ){}

    @Get()
    async fetchAllPost(){
        return await this.postServe.getAllPost();
    }

    @Get(':userId')
    async fetchAllPostByuserId(@Param('userId') userId: string){
        return await this.postServe.getAllPostByUserId(userId);
    }

    @Post()
    async createNewPost(@Body() request: any){
        return await this.postServe.createPost(request);
    }
}
