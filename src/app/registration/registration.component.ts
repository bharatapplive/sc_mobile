import { Component } from '@angular/core';

import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegisterComponent {

  showPassword = false;
  showConfirmPassword = false;

  registerForm = this.fb.group(
    {
      emailOrMobile: ['', Validators.required],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: [
        '',
        Validators.required
      ]
    },
    {
      validators: this.passwordMatchValidator
    }
  );

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  register() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const data = {
      emailOrMobile: this.registerForm.value.emailOrMobile,
      password: this.registerForm.value.password
    };

    this.http.post(
      'http://localhost:3000/auth/register',
      data
    ).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('Account created successfully!');
        this.registerForm.reset();
      },

      error: (error) => {
        console.error('Registration error:', error);
        alert(error.error?.message || 'Registration failed');
      }
    });
  }
}