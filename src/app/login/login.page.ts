import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { addIcons } from 'ionicons';
import { people, callOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline, logoGoogle, logoApple } from 'ionicons/icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false

})
export class LoginPage implements OnInit {
  // theme: 'light' | 'dark' = 'light';
  // ngOnInit() {
  //   this.setTheme('light');
  // }

  // setTheme(theme: 'light' | 'dark') {
  //   this.theme = theme;
  //   document.documentElement.classList.toggle('dark', theme === 'dark');
  // }

  loginForm: FormGroup;
  showPassword = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    addIcons({people,callOutline,mailOutline,lockClosedOutline,eyeOutline,eyeOffOutline,logoGoogle,logoApple});

    this.loginForm = this.fb.group({
      identity: ['', [Validators.required, this.emailOrPhoneValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  ngOnInit() { }

  get identityControl() {
    return this.loginForm.get('identity');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log('Form Submitted Successfully:', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  
  onGoogleLogin() {
    console.log('Google login clicked');
  }

  onAppleLogin() {
    console.log('Apple login clicked');
  }

  private emailOrPhoneValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

    if (emailRegex.test(value) || (phoneRegex.test(value) && value.replace(/\D/g, '').length >= 7)) {
      return null;
    }
    return { invalidIdentity: true };
  }


}
