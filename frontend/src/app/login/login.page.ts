import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage implements OnInit {

  loginPortal = {identity:'', password:''};
  registerPortal = {fullname:'', email:'', phone:'', password:''};
  verifyPortal = {otp:''};
  isLogin = true;
  showPassword = false;
  otpValue: string = '';
  step: 'REGISTER' | 'OTP' = 'REGISTER';

  constructor(
    private location: Location,
    private readonly authServe: AuthService
  ) { }

  ngOnInit() {
  }

  OnLoginHandler(form: any){
    if(form.valid){
      this.authServe.login(this.loginPortal.identity, this.loginPortal.password).subscribe({
        next: (user) =>{
          alert(`Welcome back, ${user.username}`);
        },
        error: (err) => {
          alert('Invalid username and password');
        }
      })
    }

  }

  onRegisterHandler(form: any){
    if (form.valid) {
      const payload = {
        fullname: this.registerPortal.fullname.trim(),
        username: this.registerPortal.email.trim(),
        email: this.registerPortal.phone.trim(),
        password: this.registerPortal.password
      };

      this.authServe.register(payload).subscribe({
        next: (user) => {
          localStorage.setItem('uploadPro', JSON.stringify(user._id));
          this.step = 'OTP';
        },
        error: (err) => {
          // Shows the exact error message from NestJS (e.g. "Username or Email already exists.")
          const serverError = err.error?.message || 'Registration failed. Please try again.';
          alert(serverError);
        }
      });
    }
  }

  onVerifyHandler(form: any){
    if(form.valid){
      // Retrieve stored user id
      const userID = JSON.parse(localStorage.getItem('uploadPro') || '""');

      if(!userID){
        alert('Session expired. Please register again')
        this.step = 'REGISTER';
        return;
      }

      const request = {userId: userID, otp: this.otpValue};

      this.authServe.verifyOtp(request).subscribe({
        next: (user) =>{
          alert('OTP verified successfully');

          localStorage.removeItem('uploadPro');

          this.isLogin = true;
          this.step = 'REGISTER';
        },
        error: (err) => {
          const serverError = err.error?.message || 'Invalid or expired OTP. Please try again.';
          alert(serverError);
        }
      })
    }
  }

  toggleAuth(){
    this.isLogin = !this.isLogin;
    if(this.isLogin){
      this.location.replaceState('/login');
    }else{
      this.location.replaceState('/register');
    }
  }

  cancelOtp(){
    this.step = 'REGISTER';
  }

  showLoginPassword(){
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
  }
}
