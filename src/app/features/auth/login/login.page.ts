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
  theme: 'light' | 'dark' = 'light';
  identity = '';
  password = '';
  showPassword = false;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.setTheme('light');
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    if (!this.identity || !this.password) {
      const alert = await this.alertController.create({
        header: 'Missing Fields',
        message: 'Please enter both your mobile/email and password.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => (u.email === this.identity || u.mobile === this.identity) && u.password === this.password
    );

    if (user) {
      // Login successful
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Invalid email/mobile number or password.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
