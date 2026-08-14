import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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

  constructor(
    private location: Location
  ) { }

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
    if(this.isLogin){
      this.location.replaceState('/login');
    }else{
      this.location.replaceState('/register');
    }
  }

  cancelOtp(){
    this.step = 'REGISTER';
  }
}
