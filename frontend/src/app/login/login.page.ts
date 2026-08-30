import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService, User } from '../auth-service';
import { NavController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  // =========================================================
  // LOGIN
  // =========================================================

  loginPortal = {
    identity: '',
    password: ''
  };

  // =========================================================
  // REGISTER
  // =========================================================

  registerPortal = {
    fullname: '',
    email: '',
    phone: '',
    password: ''
  };

  // =========================================================
  // OTP
  // =========================================================

  verifyPortal = {
    otp: ''
  };

  isLogin = true;

  showPassword = false;

  step: 'REGISTER' | 'OTP' = 'REGISTER';

  title: string = 'Social Circle';

  subtitle: string =
    'Connect with creators, share your story, and join the digital circle.';

  // Loading states
  isLoggingIn = false;
  isRegistering = false;
  isVerifyingOtp = false;

  constructor(
    private location: Location,
    private readonly authServe: AuthService,
    private navCtrl: NavController,
    private zone: NgZone
  ) {}

 ngOnInit(): void {
  const currentPath = this.location.path();

  if (currentPath === '/register') {
    this.isLogin = false;

    this.title = 'Join the circle';

    this.subtitle =
      'Where creators connect and the digital pulse comes alive.';
  } else {
    this.isLogin = true;

    this.title = 'Social Circle';

    this.subtitle =
      'Connect with creators, share your story, and join the digital circle.';
  }
}

  // =========================================================
  // LOGIN
  // =========================================================

  OnLoginHandler(form: any): void {

    if (!form.valid) {
      return;
    }

    const identity =
      this.loginPortal.identity.trim();

    const password =
      this.loginPortal.password;

    if (!identity || !password) {
      alert('Please enter email/phone and password.');
      return;
    }

    this.isLoggingIn = true;

    console.log('Attempting login with:', identity);

    this.authServe
      .login(identity, password)
      .subscribe({

        next: (user: User) => {

          this.isLoggingIn = false;

          this.zone.run(() => {

            console.log(
              'Logged in user:',
              user
            );

            alert(
              `Welcome back, ${user.fullname || user.username || 'User'}!`
            );

            // Login successful
            this.navCtrl.navigateRoot('/home');
          });
        },

        error: (error: HttpErrorResponse) => {

          this.isLoggingIn = false;

          console.error(
            'Login failed:',
            error
          );

          let message =
            'Invalid email/phone or password.';

          if (error?.error?.message) {

            if (Array.isArray(error.error.message)) {
              message =
                error.error.message.join(', ');
            } else {
              message =
                error.error.message;
            }
          }

          alert(message);
        }
      });
  }

  // =========================================================
  // REGISTER
  // =========================================================

  onRegisterHandler(form: any): void {

    if (!form.valid) {
      return;
    }

    this.isRegistering = true;

    const cleanName =
      (this.registerPortal.fullname || '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

    const uniqueSuffix =
      Math.floor(
        1000 + Math.random() * 9000
      );

    const generatedUsername =
      `${cleanName}_${uniqueSuffix}`;

    const payload: User = {

      fullname:
        this.registerPortal.fullname
          ?.trim() || '',

      username:
        generatedUsername,

      email:
        this.registerPortal.email
          ?.trim() || '',

      phoneNumber:
        (this.registerPortal.phone || '')
          .toString()
          .trim(),

      password:
        this.registerPortal.password
    };

    console.log(
      'Registration payload:',
      payload
    );

    this.authServe
      .register(payload)
      .subscribe({

        next: (user: User) => {

          this.isRegistering = false;

          console.log(
            'Registered user:',
            user
          );

          if (!user._id) {

            alert(
              'Registration successful, but user ID was not received.'
            );

            return;
          }

          // Save temporary ID for OTP
          localStorage.setItem(
            'uploadPro',
            user._id
          );

          console.log(
            'User ID:',
            user._id
          );

          // Move to OTP screen
          this.step = 'OTP';
        },

        error: (error: HttpErrorResponse) => {

          this.isRegistering = false;

          console.error(
            'Registration failed:',
            error
          );

          let message =
            'Registration failed. Please try again.';

          if (error?.error?.message) {

            if (Array.isArray(error.error.message)) {
              message =
                error.error.message.join(', ');
            } else {
              message =
                error.error.message;
            }
          }

          alert(message);
        }
      });
  }

  // =========================================================
  // VERIFY OTP
  // =========================================================

  onVerifyHandler(form: any): void {

    if (!form.valid) {
      return;
    }

    const userID =
      localStorage.getItem('uploadPro');

    console.log(
      'OTP User ID:',
      userID
    );

    if (!userID) {

      alert(
        'Session expired. Please register again.'
      );

      this.step = 'REGISTER';

      return;
    }

    const otp =
      (this.verifyPortal.otp || '')
        .toString()
        .trim();

    if (!otp) {

      alert(
        'Please enter OTP.'
      );

      return;
    }

    const request = {
      userId: userID,
      otp: otp
    };

    console.log(
      'OTP request:',
      request
    );

    this.isVerifyingOtp = true;

    this.authServe
      .verifyOtp(request)
      .subscribe({

        next: (user: User) => {

          this.isVerifyingOtp = false;

          console.log(
            'OTP verified:',
            user
          );

          alert(
            'OTP verified successfully!'
          );

          // Remove temporary registration ID
          localStorage.removeItem(
            'uploadPro'
          );

          // Go back to login
          this.isLogin = true;

          this.step = 'REGISTER';

          this.registerPortal = {
            fullname: '',
            email: '',
            phone: '',
            password: ''
          };

          this.verifyPortal = {
            otp: ''
          };

          this.location.replaceState(
            '/login'
          );
        },

        error: (error: HttpErrorResponse) => {

          this.isVerifyingOtp = false;

          console.error(
            'OTP verification failed:',
            error
          );

          let message =
            'Invalid or expired OTP. Please try again.';

          if (error?.error?.message) {

            if (Array.isArray(error.error.message)) {
              message =
                error.error.message.join(', ');
            } else {
              message =
                error.error.message;
            }
          }

          alert(message);
        }
      });
  }

  // =========================================================
  // SWITCH LOGIN / REGISTER
  // =========================================================

  toggleAuth(): void {

    this.isLogin = !this.isLogin;

    if (this.isLogin) {

      this.location.replaceState(
        '/login'
      );

      this.title =
        'Social Circle';

      this.subtitle =
        'Connect with creators, share your story, and join the digital circle.';

    } else {

      this.location.replaceState(
        '/register'
      );

      this.title =
        'Join the circle';

      this.subtitle =
        'Where creators connect and the digital pulse comes alive.';
    }
  }

  // =========================================================
  // CANCEL OTP
  // =========================================================

  cancelOtp(): void {

    this.step = 'REGISTER';

    this.verifyPortal = {
      otp: ''
    };
  }

  // =========================================================
  // PASSWORD VISIBILITY
  // =========================================================

  togglePassword(): void {

    this.showPassword =
      !this.showPassword;
  }
}