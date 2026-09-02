import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../authcontroller/auth-service';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage implements OnInit {

  selectedFile: File | null = null;
  previewPath: string | null = null;
  isSelected: boolean = false;
  
  loginPortal = {identity:'', password:''};
  registerPortal = {fullname:'', email:'', phone:'', password:''};
  verifyPortal = {otp:''};
  isLogin = true;
  showPassword = false;
  step: 'REGISTER' | 'OTP' = 'REGISTER';
  isCreateModel: boolean = false;

  title: string = 'Social Circle';
  subtitle: string = 'Connect with creators, share your story, and join the digital circle.';

  constructor(
    private location: Location,
    private actionSheetCtrl: ActionSheetController,
    private readonly authServe: AuthService,
    private navCtrl: NavController, // 👈 Inject NavController
    private zone: NgZone           // 👈 Inject NgZone
  ) { }

  ngOnInit() {
  }

  OnLoginHandler(form: any){
    if(form.valid){
      this.authServe.login(this.loginPortal.identity, this.loginPortal.password).subscribe({
        next: () =>{
          this.zone.run(() => {            
            // Replaces router.navigate for robust root navigation in Ionic
            this.navCtrl.navigateRoot('/home');
          });
        },
        error: (err) => {
          // Log the backend response message to get specific details
          console.error('Login error details:', err.error);
          alert(err.error?.message || 'Invalid username or password');
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
          this.step = 'OTP';

          this.location.replaceState('/VerifyOTP');      
          this.title = 'Verify the OTP';
          this.subtitle= 'Verification is necessary to join the Social Circle.';

          alert(`Please verify OTP sent to your ${user.phoneNumber}`);
          localStorage.setItem('regUser', JSON.stringify(user._id));
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
      const userID = JSON.parse(localStorage.getItem('regUser') || '""');

      if(!userID){
        alert('Session expired. Please register again');
        this.step = 'REGISTER';
        return;
      }

      const request = {userId: userID, otpCode: this.verifyPortal.otp ? this.verifyPortal.otp.toString().trim() : ''};

      this.authServe.verifyOtp(request).subscribe({
        next: () =>{
          this.upLoadImage();
          //this.isLogin = true;
          //this.step = 'REGISTER';
          //this.registerPortal = { fullname: '', email: '', phone: '', password: '' };
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

  upLoadImage(){
    this.isCreateModel = !this.isCreateModel
  }

  // 1. SELECT THE FILE
  async pickPhotoFromGallery(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Avatar Source',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => this.captureImage(CameraSource.Camera),
        },
        {
          text: 'Choose from Gallery',
          icon: 'image',
          handler: () => this.captureImage(CameraSource.Photos),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async captureImage(source: CameraSource){
    try{

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: source // Opens gallery instead of camera
      });

      if(image.webPath){
        this.previewPath = image.webPath;

        const res = (await fetch(image.webPath));
        const resBlob = await res.blob();
        const resFile = new File([resBlob],'avatar.jpg', { type: resBlob.type })

        this.selectedFile = resFile;
        this.isSelected = true;
      }
    } catch (error) {
      // Handles permission denied, device unsupported, or runtime errors
      console.error('Failed to pick image from gallery:', error);
    }
  }

  updateAvatar(){
    if (!this.selectedFile) return;

        console.log(this.selectedFile);
    const rawId = localStorage.getItem('regUser');
    const userId = rawId ? JSON.parse(rawId) : '';

    this.authServe.uploadAnImage(userId, this.selectedFile).subscribe(
      { next: (res: any) => {
          console.log('Uploaded successfully!', res);
          this.isCreateModel = false;
          this.isLogin = true;
          this.step = 'REGISTER';
          this.registerPortal = { fullname: '', email: '', phone: '', password: '' };          
          this.selectedFile = null;
        },
        error: (err) => console.error('Upload failed:', err)
      });
  }

  skipForNow(){
    this.isCreateModel=false;
    this.isLogin = true;
    this.step = 'REGISTER';
    this.registerPortal = { fullname: '', email: '', phone: '', password: '' };
  }
}
