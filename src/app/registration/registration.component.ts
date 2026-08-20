import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: false // Yahan change kiya hai
})
export class RegisterComponent {

  passwordType: string = 'password';
  passwordIcon: string = 'eye-outline';

  constructor(private toastController: ToastController, private router: Router) {}

  togglePasswordMode() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-off-outline';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-outline';
    }
  }

  async showMessage(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000, 
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }

  signUp() {
    this.showMessage('Creating your account... Please wait!');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}