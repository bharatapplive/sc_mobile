import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage {

  fullName: string = '';
  email: string = '';
  mobile: string = '';
  password: string = '';

  passwordType: string = 'password';

  constructor() {}

  showPassword() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  signUp() {
    if (
      this.fullName === '' ||
      this.email === '' ||
      this.mobile === '' ||
      this.password === ''
    ) {
      alert('Please fill all the fields.');
      return;
    }

    alert('Account created successfully!');
  }

  login() {
    console.log('Login clicked');
  }

}