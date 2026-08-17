import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  fullName = '';
  email = '';
  mobile = '';
  password = '';

  showPassword = false;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async register() {

    // Check empty fields
    if (
      !this.fullName ||
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