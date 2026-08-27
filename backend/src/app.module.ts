import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { UserModule } from './user/user.module';

import { PostModule } from './post/post.module';

import { MongooseModule } from '@nestjs/mongoose';

import { ServeStaticModule } from '@nestjs/serve-static';

import { ConfigModule } from '@nestjs/config';

import { join } from 'path';

@Module({
  imports: [

    // ========================================
    // CONFIG
    // ========================================

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ========================================
    // MONGODB
    // ========================================

    MongooseModule.forRoot(
      'mongodb://localhost:27017/Lumia',
    ),

    // ========================================
    // UPLOADS
    // ========================================

    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        'uploads',
      ),

      serveRoot: '/uploads',
    }),

    // ========================================
    // MODULES
    // ========================================

    UserModule,

    PostModule,
  ],

  controllers: [
    AppController,
  ],

  providers: [
    AppService,
  ],
})
export class AppModule {}