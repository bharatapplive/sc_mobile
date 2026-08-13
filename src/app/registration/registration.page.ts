import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { addIcons } from 'ionicons';
import { ellipse, personOutline, mailOutline, phonePortraitOutline, lockClosedOutline, eyeOutline, eyeOffOutline, arrowForwardOutline } from 'ionicons/icons';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: false
})
export class RegistrationPage implements OnInit {

  registrationForm: FormGroup;
  showPassword = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    addIcons({
      ellipse,
      personOutline,
      mailOutline,
      phonePortraitOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      arrowForwardOutline
    });

    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, this.phoneValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() { }

  get fullNameControl() {
    return this.registrationForm.get('fullName');
  }

  get emailControl() {
    return this.registrationForm.get('email');
  }

  get mobileControl() {
    return this.registrationForm.get('mobileNumber');
  }

  get passwordControl() {
    return this.registrationForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onInput(event: any) {
    // Ionic ionInput event handler
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.registrationForm.valid) {
      console.log('Registration Submitted Successfully:', this.registrationForm.value);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const val = control.value.trim();
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    const digitCount = val.replace(/\D/g, '').length;
    if (phoneRegex.test(val) && digitCount >= 7 && digitCount <= 15) {
      return null;
    }
    return { invalidPhone: true };
  }

}
