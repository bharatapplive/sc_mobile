import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  private router = inject(Router);
  private alertController = inject(AlertController);
  private authService = inject(AuthService);

  theme: 'light' | 'dark' = 'light';
  identity = '';
  password = '';
  showPassword = false;

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

    this.authService.login({ identity: this.identity.trim(), password: this.password }).subscribe({
      next: (res: any) => {
        if (res?.user) {
          localStorage.setItem('currentUser', JSON.stringify(res.user));
        }
        this.router.navigate(['/home']);
      },
      error: async (err: any) => {
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: err.error?.message || 'Invalid username/mobile/email or password.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}
