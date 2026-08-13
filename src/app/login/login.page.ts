import { Component, OnInit } from '@angular/core';

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
  step: 'REGISTER' | 'OTP' = 'REGISTER';
  constructor() { }

  ngOnInit() {
  }

  OnLoginHandler(form: any){

  }

  onRegisterHandler(form: any){
    this.step = 'OTP';
  }

  onVerifyHandler(form: any){
    this.isLogin = !this.isLogin;
  }

  toggleAuth(){
    this.isLogin = !this.isLogin;
  }

  cancelOtp(){
    this.step = 'REGISTER';
  }
}
