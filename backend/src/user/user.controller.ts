import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // CREATE ACCOUNT
  @Post('auth/create-account')
  async createUser(@Body() request: any) {
    console.log('CREATE ACCOUNT REQUEST:', request);
    return this.userService.createUser(request);
  }

  // SEND OTP
  @Post('auth/send-otp')
  async sendOtp(@Body('emailOrPhone') emailOrPhone: string) {
    return this.userService.sendOtp(emailOrPhone);
  }

  // VERIFY OTP
  @Post('auth/verify-otp')
  async verifyOtp(
    @Body('userId') userId: string,
    @Body('otp') otp: string,
  ) {
    return this.userService.verifyOtp(userId, otp);
  }

  // LOGIN
  @Post('auth/login')
  async login(
    @Body('identity') identity: string,
    @Body('password') password: string,
  ) {
    return this.userService.findUserByIdentityAndPassword(
      identity,
      password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  // GET ALL USERS
  @Get('user')
  async findAll() {
    return this.userService.findAll();
  }
}