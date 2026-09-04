import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: false,
})
export class RegisterPage {
  private router = inject(Router);
  private alertController = inject(AlertController);
  private authService = inject(AuthService);

  fullName = '';
  UserName = '';
  email = '';
  mobile = '';
  password = '';
  avatar = '';
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  suggestUsername() {
    const name = this.fullName.trim().toLowerCase().replace(/\s+/g, '');
    const digits = this.mobile.replace(/\D/g, '').slice(-4);

    if (name && digits.length === 4) {
      this.UserName = `${name}.${digits}`;
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.showAlert('Invalid File', 'Please select a valid image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.showAlert('File Too Large', 'Please select an image smaller than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.avatar = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeAvatar() {
    this.avatar = '';
  }

  async register() {
    if (!this.fullName || !this.UserName || !this.email || !this.mobile || !this.password) {
      return this.showAlert('Missing Information', 'Please fill in all fields.');
    }

    const [firstName, ...rest] = this.fullName.trim().split(' ');
    const lastName = rest.join(' ') || firstName;

    const newUser = {
      firstName,
      lastName,
      userName: this.UserName,
      email: this.email,
      mobile: this.mobile,
      password: this.password,
      avatar: this.avatar || 'assets/images/user-profile.jpg',
      role: 'user',
      active: true,
    };

    this.authService.register(newUser).subscribe({
      next: async () => {
        await this.showAlert('Registration Successful', 'Your account has been created successfully.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        const message =
          err.status === 409
            ? 'An account with this email already exists.'
            : err.error?.message || 'Something went wrong. Please try again.';
        this.showAlert('Registration Failed', message);
      },
    });
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }
}