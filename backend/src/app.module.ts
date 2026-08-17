import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SmsService } from './sms/sms.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 Makes process.env available everywhere
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/Lumia'),
    // 👈 Mounts the 'uploads' directory to be publicly accessible
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService, SmsService],
})
export class AppModule {}
