import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: false,
})
export class RegisterPage {
  private router = inject(Router);
  private alertController = inject(AlertController);

  fullName = '';
  UserName = '';
  email = '';
  mobile = '';
  password = '';

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async register() {

    // Check empty fields
    if (
      !this.fullName ||
      !this.UserName ||
      !this.email ||
      !this.mobile ||
      !this.password
    ) {

      const alert = await this.alertController.create({
        header: 'Missing Information',
        message: 'Please fill in all fields.',
        buttons: ['OK']
      });

      await alert.present();

      return;
    }


    // Get existing users
    const existingUsers =
      JSON.parse(localStorage.getItem('users') || '[]');


    // Check if email already exists
    const alreadyExists = existingUsers.some(
      (user: any) =>
        user.email === this.email
    );


    if (alreadyExists) {

      const alert = await this.alertController.create({
        header: 'Account Already Exists',
        message: 'An account with this email already exists.',
        buttons: ['OK']
      });

      await alert.present();

      return;
    }



    const newUser = {
      fullName: this.fullName,
      UserName: this.UserName,
      email: this.email,
      mobile: this.mobile,
      password: this.password
    };



    existingUsers.push(newUser);

    localStorage.setItem(
      'users',
      JSON.stringify(existingUsers)
    );



    const alert = await this.alertController.create({
      header: 'Registration Successful',
      message: 'Your account has been created successfully.',
      buttons: ['OK']
    });

    await alert.present();


    this.router.navigate(['/login']);
  }
}