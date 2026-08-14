// src/sms/sms.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;

  constructor(private readonly configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');

    if (!accountSid || !authToken) {
      console.error('❌ Twilio credentials are missing from .env file');
    }

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendOtpSms(phoneNumber: string, otp: string): Promise<void> {
    try {
      const fromNumber = this.configService.get<string>('TWILIO_PHONE_NUMBER');

      // Format Indian phone numbers automatically if missing country code
      const formattedPhone = phoneNumber.startsWith('+')
        ? phoneNumber
        : `+91${phoneNumber.trim()}`;

      await this.twilioClient.messages.create({
        body: `Your verification code for SocialCircle is: ${otp}. Valid for 10 minutes.`,
        from: fromNumber,
        to: formattedPhone,
      });

      console.log(`✅ OTP SMS successfully sent to ${formattedPhone}`);
    } catch (error: any) {
      console.error('Twilio SMS Error details:', error);
      throw new InternalServerErrorException('Failed to send OTP to mobile number.');
    }
  }
}