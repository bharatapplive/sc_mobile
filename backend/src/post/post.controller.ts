import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(
        private readonly postServe: PostService
    ){}

    @Get(':id')
    async fetchAllPostById(@Param('id') id:string){
        return await this.postServe.getAllPostById(id);
    }

    @Get()
    async fetchAllPostByuserId(@Query('userId') userId: string){
        return await this.postServe.getAllPostByUserId(userId);
    }

    @Post()
    async createNewPost(@Body() request: any){
        return await this.postServe.createPost(request);
    }
}
