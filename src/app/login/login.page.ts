import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  identity = '';
  password = '';
showPassword = false;
  theme: 'light' | 'dark' = 'light';


  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}


  ngOnInit() {
    this.setTheme('light');
  }
  togglePassword() {
  this.showPassword = !this.showPassword;
}


  setTheme(theme: 'light' | 'dark') {

    this.theme = theme;

    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    );
  }


  async login() {

  
    const users =
      JSON.parse(localStorage.getItem('users') || '[]');


    const user = users.find(
      (u: any) =>
        (u.email === this.identity ||
         u.mobile === this.identity)
        &&
        u.password === this.password
    );


  
    if (!user) {

      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Email/mobile number or password is incorrect.',
        buttons: ['OK']
      });

      await alert.present();

      return;
    }


     localStorage.setItem(
    'loggedInUser',
    JSON.stringify(user)
  );



    
    this.router.navigate(['home']);
  }
}