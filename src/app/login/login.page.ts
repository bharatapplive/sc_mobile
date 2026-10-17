import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  theme: 'light' | 'dark' = 'light';

  loginForm!: FormGroup;
  showPassword = false;
  submitted = false;
  isLoading = false;

  private readonly apiUrl = 'http://localhost:3000/auth/login';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.setTheme('light');

    this.loginForm = this.fb.group({
      identity: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;

    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      await this.showAlert(
        'Invalid Details',
        'Please enter a valid email address and password.'
      );

      return;
    }

    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    const loading = await this.loadingController.create({
      message: 'Logging in...'
    });

    await loading.present();

    const formValue = this.loginForm.getRawValue();

    const loginData = {
      email: formValue.identity.trim().toLowerCase(),
      password: formValue.password
    };

    this.http.post<any>(this.apiUrl, loginData).subscribe({
      next: async (response) => {
        await loading.dismiss();
        this.isLoading = false;

        if (!response?.access_token) {
          await this.showAlert(
            'Login Failed',
            'The server did not return an authentication token.'
          );
          return;
        }

        // Save the authentication token.
        localStorage.setItem(
          'access_token',
          response.access_token
        );

        // Save the logged-in user's details.
        if (response.user) {
          localStorage.setItem(
            'user',
            JSON.stringify(response.user)
          );
        }

        await this.showAlert(
          'Login Successful',
          'Welcome back to Social Circle!'
        );

        this.router.navigateByUrl('/tabs/home');
      },

      error: async (error) => {
        await loading.dismiss();
        this.isLoading = false;

        let message = 'Unable to log in. Please try again.';

        if (error.status === 0) {
          message =
            'Cannot connect to the server. Please check that your backend is running.';
        } else if (
          error.status === 401 ||
          error.status === 403
        ) {
          message =
            'Incorrect email or password. Please check your details.';
        } else if (error.status === 400) {
          message =
            'Please check the email and password you entered.';
        } else if (error.error?.message) {
          message = Array.isArray(error.error.message)
            ? error.error.message.join(', ')
            : error.error.message;
        }

        await this.showAlert('Login Failed', message);
      }
    });
  }
}

