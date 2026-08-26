import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../auth-service';
import { NavController } from '@ionic/angular';

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
  step: 'REGISTER' | 'OTP' = 'REGISTER';

  title: string = 'Social Circle';
  subtitle: string = 'Connect with creators, share your story, and join the digital circle.';

  constructor(
    private location: Location,
    private readonly authServe: AuthService,
    private navCtrl: NavController, // 👈 Inject NavController
    private zone: NgZone           // 👈 Inject NgZone
  ) { }

  ngOnInit() {
  }

  OnLoginHandler(form: any){
    if(form.valid){
      this.authServe.login(this.loginPortal.identity, this.loginPortal.password).subscribe({
        next: (user) =>{
          this.zone.run(() => {
            alert(`Welcome back, ${user.phoneNumber || user.email || 'User'}!`);
            
            // Replaces router.navigate for robust root navigation in Ionic
            this.navCtrl.navigateRoot('/home');
          });
        },
        error: (err) => {
          alert('Invalid username and password');
        }
      })
    }

  }

  onRegisterHandler(form: any){
    if (form.valid) {

      // 1. get the fullname and change to lower..
      const cleanName = (this.registerPortal.fullname || '').toLowerCase().trim(); // strip spaces and special chars
          
      // 2. Split into parts
      const parts = cleanName.split(/\s+/); // Splits by one or more spaces

      const firstName = parts[0] || '';
      const lastName = parts.slice(1).join('') || '';

      const uniqueSuffix = Math.floor(100 + Math.random() * 900); // 3-digit random number
      const generatedUsername = `@${firstName}_${lastName}.${uniqueSuffix}`;

      const payload = {
        fullname: this.registerPortal.fullname?.trim() || '',
        username: generatedUsername, // 👈 Included username
        email: this.registerPortal.email?.trim() || '',
        phoneNumber: (this.registerPortal.phone || '').toString().trim(),
        password: this.registerPortal.password
      };

      this.authServe.register(payload).subscribe({
        next: (user) => {
          localStorage.setItem('uploadPro', JSON.stringify(user._id));
          console.log(user._id);
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
      console.log(userID);

      if(!userID){
        alert('Session expired. Please register again');
        this.step = 'REGISTER';
        return;
      }

      const request = {userId: userID, otp: this.verifyPortal.otp ? this.verifyPortal.otp.toString().trim() : ''};

      console.log(request.otp);
      this.authServe.verifyOtp(request).subscribe({
        next: (user) =>{
          alert('OTP verified successfully');

          localStorage.removeItem('uploadPro');

          this.isLogin = true;
          this.step = 'REGISTER';
          this.registerPortal = { fullname: '', email: '', phone: '', password: '' };
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
      this.title = 'Social Circle';
      this.subtitle= 'Connect with creators, share your story, and join the digital circle.';
    }else{
      this.location.replaceState('/register');      
      this.title = 'Join the circle';
      this.subtitle= 'Where creators connect and the digital pulse comes alive.';
    }
    
  }

  cancelOtp(){
    this.step = 'REGISTER';
  }
}
