import { Component, OnInit } from '@angular/core';
import {
FormBuilder,
FormGroup,
Validators,
AbstractControl,
ValidationErrors
} from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
selector: 'app-registration',
templateUrl: './registration.page.html',
styleUrls: ['./registration.page.scss'],
standalone: false
})
export class RegistrationPage implements OnInit {

theme: 'light' | 'dark' = 'light';
registrationForm!: FormGroup;

showPassword = false;
showConfirmPassword = false;
submitted = false;
isLoading = false;

// Change this if your NestJS backend uses another port.
private readonly apiUrl = 'http://localhost:3000/users/register';

constructor(
private fb: FormBuilder,
private http: HttpClient,
private alertController: AlertController,
private loadingController: LoadingController,
private router: Router
) {}

ngOnInit() {
this.setTheme('light');


this.registrationForm = this.fb.group(
  {
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$/),
        Validators.minLength(2),
        Validators.maxLength(50)
      ]
    ],

    identity: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S+$/
        )
      ]
    ],

    confirmPassword: ['', Validators.required],

    terms: [false, Validators.requiredTrue]
  },
  {
    validators: this.passwordMatchValidator
  }
);


}

get f() {
return this.registrationForm.controls;
}

passwordMatchValidator(
control: AbstractControl
): ValidationErrors | null {


const password = control.get('password')?.value;
const confirmPassword = control.get('confirmPassword')?.value;

if (!password || !confirmPassword) {
  return null;
}

return password === confirmPassword
  ? null
  : { passwordMismatch: true };


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

toggleConfirmPassword() {
this.showConfirmPassword = !this.showConfirmPassword;
}

async showAlert(header: string, message: string) {
const alert = await this.alertController.create({
header,
message,
buttons: ['OK']
});


await alert.present();


}

async register() {
this.submitted = true;


if (this.registrationForm.invalid) {
  this.registrationForm.markAllAsTouched();

  await this.showAlert(
    'Check your details',
    'Please correct the errors in the form before continuing.'
  );

  return;
}

if (this.isLoading) {
  return;
}

this.isLoading = true;

const loading = await this.loadingController.create({
  message: 'Creating your account...'
});

await loading.present();

const formValue = this.registrationForm.getRawValue();

// Match the field names expected by CreateUserDto.
const userData = {
  name: formValue.name.trim(),
  username: formValue.username.trim(),
  email: formValue.identity.trim().toLowerCase(),
  password: formValue.password
};

this.http.post(this.apiUrl, userData).subscribe({
  next: async () => {
    await loading.dismiss();
    this.isLoading = false;

    await this.showAlert(
      'Registration Successful',
      'Your Social Circle account has been created. Please log in.'
    );

    this.registrationForm.reset();

    this.router.navigateByUrl('/login');
  },

  error: async (error) => {
    await loading.dismiss();
    this.isLoading = false;

    let message = 'Something went wrong. Please try again.';

    if (error.status === 0) {
      message =
        'Cannot connect to the server. Make sure your backend is running and CORS is configured correctly.';
    } else if (error.status === 409) {
      message =
        'This username or email is already registered. Please use another one.';
    } else if (error.status === 400) {
      message =
        'The server rejected the submitted details. Please check your input.';
    } else if (error.error?.message) {
      message = Array.isArray(error.error.message)
        ? error.error.message.join(', ')
        : error.error.message;
    }

    await this.showAlert('Registration Failed', message);
  }
});


}
}
