// src/sms/sms.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;

  constructor(private readonly configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID')?.trim();
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN')?.trim();

    if (!accountSid || !authToken) {
      console.error('❌ Twilio credentials are missing from .env file');
    }

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendOtpSms(phoneNumber: string, otp: string): Promise<void> {
    try {
      
      console.log('SID Loaded:', process.env.TWILIO_ACCOUNT_SID ? 'YES' : 'NO');
      console.log('Token Loaded:', process.env.TWILIO_AUTH_TOKEN ? 'YES' : 'NO');
      // 1. Clean the input string (remove spaces, dashes, etc.)
      let cleanPhone = phoneNumber.replace(/\D/g, '');

      // 2. If it's a 10-digit Indian number, prepend '+91'
      if (cleanPhone.length === 10) {
        cleanPhone = `+91${cleanPhone}`;
      } else if (!cleanPhone.startsWith('+')) {
        cleanPhone = `+${cleanPhone}`;
      }

      console.log(`Sending SMS to formatted number: ${cleanPhone}`);

      // 3. Send SMS via Twilio
      await this.twilioClient.messages.create({
        body: `Your verification code for SocialCircle is: ${otp}. Valid for 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: cleanPhone,
      });

      console.log(`OTP SMS successfully sent to ${cleanPhone}`);
    } catch (error: any) {
      console.error('Twilio SMS Error:', error.message || error);
      throw new InternalServerErrorException(
        'Failed to send OTP to mobile number. ' + (error.message || '')
      );
    }
  }
}