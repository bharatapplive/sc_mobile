import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';

import { UserService } from './user.service';

import { UserSchema } from './user.model';

import { SmsService } from '../sms/sms.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],

  controllers: [
    UserController,
  ],

  providers: [
    UserService,
    SmsService,
  ],

  exports: [
    UserService,
  ],
})
export class UserModule {}