import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { SmsService } from 'src/sms/sms.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserService, SmsService]
})
export class UserModule {}
