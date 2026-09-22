import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  // Theme
  theme: 'light' | 'dark' = 'light';

  // Password visibility
  showPassword = false;

  // Login fields
  emailOrMobile = '';
  password = '';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.setTheme('light');
  }

  // ================================
  // THEME
  // ================================

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;

    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    );
  }

  // ================================
  // LOGIN
  // ================================

  login() {

    // Check empty fields
    if (!this.emailOrMobile || !this.password) {

      alert(
        'Please enter email/mobile and password'
      );

      return;
    }

    const loginData = {
      emailOrMobile: this.emailOrMobile,
      password: this.password
    };
console.log('LOGIN DATA:', loginData);
    // Call backend API
    this.http.post(
      'http://localhost:3000/auth/login',
      loginData
    ).subscribe({

      // Login successful
      next: (response: any) => {

        console.log(
          'Login successful:',
          response
        );

        // Save JWT token
        localStorage.setItem(
          'access_token',
          response.access_token
        );

        alert('Login successful!');

        // Navigate to Home
        window.location.href = '/home';
      },

      // Login failed
      error: (error) => {

        console.error(
          'Login error:',
          error
        );

        alert(
          error.error?.message ||
          'Invalid email/mobile or password'
        );
      }

    });
  }
}