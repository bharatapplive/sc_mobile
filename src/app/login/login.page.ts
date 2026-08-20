import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  
  // Password show/hide variables
  passwordType: string = 'password';
  passwordIcon: string = 'eye-outline';

  constructor(private toastController: ToastController, private router: Router) {}

  // YAHAN HAI NAYA FUNCTION: Registration page par jane ke liye
  goToRegistration() {
    this.router.navigate(['/registration']);
  }

  // Password ko show/hide karne ka function
  togglePasswordMode() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text'; // Text dikhaye
      this.passwordIcon = 'eye-off-outline'; // Aankh band wala icon
    } else {
      this.passwordType = 'password'; // Password chhupaye (dots)
      this.passwordIcon = 'eye-outline'; // Aankh khuli wala icon
    }
  }

  // Baaki purane functions...
  async showMessage(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000, 
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }

  login() {
    this.showMessage('Logging in... Please wait!');
  }

  forgotPassword() {
    this.showMessage('Redirecting to Forgot Password page...');
  }

  loginWithGoogle() {
    this.showMessage('Connecting to Google...');
  }

  loginWithApple() {
    this.showMessage('Connecting to Apple...');
  }

  goToSignUp() {
    this.showMessage('Redirecting to Sign Up page...');
  }
}