import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import {
  AuthService,
  RegisterRequest,
  RegisterResponse
} from '../core/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: false
})
export class RegistrationPage {

  registrationForm: FormGroup;

  submitted = false;
  showPassword = false;
  isLoading = false;

  errorMessage = '';
  successMessage = '';


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.registrationForm = this.fb.group({

      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z ]+$/)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9][0-9]{9}$/)
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });
  }


  // =====================================
  // FORM CONTROLS
  // =====================================

  get fullName() {
    return this.registrationForm.get('fullName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get mobile() {
    return this.registrationForm.get('mobile');
  }

  get password() {
    return this.registrationForm.get('password');
  }


  // =====================================
  // PASSWORD TOGGLE
  // =====================================

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


  // =====================================
  // REGISTRATION
  // =====================================

  signUp(): void {

    this.submitted = true;

    this.errorMessage = '';
    this.successMessage = '';


    // Form invalid
    if (this.registrationForm.invalid) {

      this.registrationForm.markAllAsTouched();

      return;
    }


    // =====================================
    // GET FORM DATA
    // =====================================

    const formValue =
      this.registrationForm.value;


    const fullName =
      formValue.fullName.trim();


    // =====================================
    // SPLIT NAME
    // =====================================

    const nameParts =
      fullName.split(/\s+/);


    const firstName =
      nameParts[0];


    const lastName =
      nameParts.slice(1).join(' ') || 'User';


    // =====================================
    // CREATE USERNAME
    // =====================================

    const userName =
      fullName
        .toLowerCase()
        .replace(/\s+/g, '.')
        .replace(/[^a-z0-9.]/g, '');


    // =====================================
    // API REQUEST
    // =====================================

    const registrationData: RegisterRequest = {

      firstName: firstName,

      lastName: lastName,

      userName: userName,

      mobile: formValue.mobile,

      password: formValue.password,

      email: formValue.email

    };


    console.log(
      'Registration data:',
      {
        ...registrationData,
        password: '********'
      }
    );


    // =====================================
    // LOADING
    // =====================================

    this.isLoading = true;


    // =====================================
    // API CALL
    // =====================================

    this.authService
      .register(registrationData)
      .subscribe({

        // -----------------------------
        // SUCCESS
        // -----------------------------

        next: (response: RegisterResponse) => {

          this.isLoading = false;

          console.log(
            'Registration successful:',
            response
          );


          this.successMessage =
            response?.message ||
            'Registration successful!';


          // Login page
          setTimeout(() => {

            this.router.navigate(['/login']);

          }, 1000);
        },


        // -----------------------------
        // ERROR
        // -----------------------------

        error: (error) => {

          this.isLoading = false;

          console.error(
            'Registration failed:',
            error
          );


          this.errorMessage =
            error?.error?.message ||
            'Registration failed. Please try again.';
        }

      });
  }

}