import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  theme: 'light' | 'dark' = 'light';
  mobile = '';
  password = '';
  isPasswordVisible = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.setTheme('light');
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login(): void {
    if (!this.mobile || !this.password) {
      this.errorMessage = 'Please enter your mobile number/email and password.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService
      .login({
        mobile: this.mobile.trim(),
        password: this.password,
      })
      .subscribe({
        next: (response: any) => {
          this.isSubmitting = false;

          const token = response?.token || response?.access_token;

          if (token) {
            this.authService.saveSession(token, response.user ?? null);
            // step 1 for auth gaurd-- if logged or mobile and password true
            this.router.navigate(['/home']);
          }

          console.log('Login successful', response);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage =
            error?.error?.message || 'Invalid credentials. Please try again.';
          console.error('Login failed', error);
        },
      });
  }
}
