import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient: Twilio | null = null;
  private twilioPhoneNumber: string | null = null;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const accountSid =
      this.configService
        .get<string>('TWILIO_ACCOUNT_SID')
        ?.trim();

    const authToken =
      this.configService
        .get<string>('TWILIO_AUTH_TOKEN')
        ?.trim();

    const phoneNumber =
      this.configService
        .get<string>('TWILIO_PHONE_NUMBER')
        ?.trim();

    /*
     * Twilio credentials available hain tabhi
     * Twilio client create hoga.
     *
     * Agar .env mein YOUR_TWILIO... hai,
     * to backend crash nahi karega.
     */
    if (
      accountSid &&
      accountSid.startsWith('AC') &&
      authToken &&
      !authToken.startsWith('YOUR_') &&
      phoneNumber &&
      !phoneNumber.startsWith('YOUR_')
    ) {
      try {
        this.twilioClient = new Twilio(
          accountSid,
          authToken,
        );

        this.twilioPhoneNumber = phoneNumber;

        console.log('✅ Twilio SMS service enabled');
      } catch (error) {
        console.error(
          '❌ Failed to initialize Twilio:',
          error,
        );

        this.twilioClient = null;
      }
    } else {
      console.warn(
        '⚠️ Twilio credentials not configured.',
      );

      console.warn(
        '⚠️ OTP will be printed in the backend terminal.',
      );
    }
  }

  async sendOtpSms(
    phoneNumber: string,
    otp: string,
  ): Promise<void> {
    /*
     * ==========================================
     * LOCAL DEVELOPMENT MODE
     * ==========================================
     */

    if (
      !this.twilioClient ||
      !this.twilioPhoneNumber
    ) {
      console.log('');
      console.log(
        '==========================================',
      );
      console.log('🔐 SOCIAL CIRCLE OTP');
      console.log(
        '==========================================',
      );
      console.log(
        `📱 Phone: ${phoneNumber}`,
      );
      console.log(
        `🔑 OTP: ${otp}`,
      );
      console.log(
        '⏰ Valid for 10 minutes',
      );
      console.log(
        '==========================================',
      );
      console.log('');

      return;
    }

    /*
     * ==========================================
     * TWILIO MODE
     * ==========================================
     */

    try {
      let cleanPhone =
        String(phoneNumber || '').trim();

      /*
       * 10 digit Indian number
       */
      const digitsOnly =
        cleanPhone.replace(/\D/g, '');

      if (digitsOnly.length === 10) {
        cleanPhone = `+91${digitsOnly}`;
      } else if (
        !cleanPhone.startsWith('+')
      ) {
        cleanPhone = `+${digitsOnly}`;
      }

      console.log(
        `📤 Sending OTP SMS to: ${cleanPhone}`,
      );

      await this.twilioClient.messages.create({
        body:
          `Your verification code for SocialCircle is: ${otp}. ` +
          `Valid for 10 minutes.`,

        from: this.twilioPhoneNumber,

        to: cleanPhone,
      });

      console.log(
        `✅ OTP SMS successfully sent to ${cleanPhone}`,
      );
    } catch (error: any) {
      console.error(
        '❌ Twilio SMS Error:',
        error?.message || error,
      );

      /*
       * Development mein SMS fail hone par
       * OTP terminal mein dikha denge.
       *
       * Isse registration block nahi hoga.
       */
      console.log('');
      console.log(
        '==========================================',
      );
      console.log('🔐 FALLBACK OTP');
      console.log(
        `📱 Phone: ${phoneNumber}`,
      );
      console.log(
        `🔑 OTP: ${otp}`,
      );
      console.log(
        '==========================================',
      );
      console.log('');

      return;
    }
  }
}