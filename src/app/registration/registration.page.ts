import { Component } from '@angular/core';

import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss']
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

  constructor(private fb: FormBuilder) {}

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

    console.log('Registration Data:', this.registerForm.value);

    alert('Account created successfully!');
  }
}