import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class RegistrationPage implements OnInit {
  registrationForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  isSubmitting = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.validateForm()) {
      this.isSubmitting = true;
      // Add your registration logic here
      console.log('Registration submitted:', this.registrationForm);
      // After successful registration, navigate to login or home
      // this.router.navigate(['/login']);
    }
  }

  private validateForm(): boolean {
    if (!this.registrationForm.firstName.trim()) {
      console.error('First name is required');
      return false;
    }
    if (!this.registrationForm.lastName.trim()) {
      console.error('Last name is required');
      return false;
    }
    if (!this.registrationForm.email.trim()) {
      console.error('Email is required');
      return false;
    }
    if (this.registrationForm.password.length < 6) {
      console.error('Password must be at least 6 characters');
      return false;
    }
    if (this.registrationForm.password !== this.registrationForm.confirmPassword) {
      console.error('Passwords do not match');
      return false;
    }
    return true;
  }
}
