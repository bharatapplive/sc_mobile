import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { SmsService } from '../sms/sms.service';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule,

    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),

    JwtModule.register({
      secret: 'supersecretkey123',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],

  controllers: [UserController],

 providers: [
  UserService,
  SmsService,
  JwtStrategy,
],

  exports: [
    UserService,
    MongooseModule,
  ],
})
export class UserModule {}