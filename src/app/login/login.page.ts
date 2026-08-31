import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import {
  AuthService,
  LoginResponse,
} from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  loginForm: FormGroup;

  passwordVisible = false;

  submitted = false;

  loading = false;

  loginError = '';


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

    this.loginForm = this.fb.group({

      identity: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/),
        ],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],

    });

  }


  // =========================
  // FORM CONTROLS
  // =========================

  get identity() {
    return this.loginForm.get('identity');
  }


  get password() {
    return this.loginForm.get('password');
  }


  // =========================
  // LOGIN
  // =========================

  login() {

    this.submitted = true;

    this.loginError = '';


    // Validation
    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }


    this.loading = true;


    // Backend ko data
    const credentials = {

      mobile: this.identity?.value,

      password: this.password?.value,

    };


    console.log(
      'Login credentials:',
      credentials
    );


    // AuthService ke through API call
    this.authService.login(credentials)
      .subscribe({

        next: (response: LoginResponse) => {

          console.log(
            'Login successful:',
            response
          );


          // JWT token save
          localStorage.setItem(
            'access_token',
            response.access_token
          );


          // User details save
          localStorage.setItem(
            'user',
            JSON.stringify(response.user)
          );


          this.loading = false;


          // Login ke baad Feed
          this.router.navigate(['/tabs/feed']);

        },


        error: (error) => {

          console.error(
            'Login failed:',
            error
          );


          this.loading = false;


          if (error.status === 0) {

            this.loginError =
              'Unable to connect to server.';

          } else {

            this.loginError =
              'Invalid mobile number or password.';

          }

        },

      });

  }


  // =========================
  // PASSWORD VISIBILITY
  // =========================

  togglePassword() {

    this.passwordVisible =
      !this.passwordVisible;

  }

}