import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, AlertController, LoadingController } from '@ionic/angular';
import { AuthService, UserData } from '../../../core/services/auth.service';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.page.html',
  styleUrls: ['./setup-profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SetupProfilePage implements OnInit {

  private router = inject(Router);
  private authService = inject(AuthService);
  private alertCtrl = inject(AlertController);
  private loadingCtrl = inject(LoadingController);

  currentUser: UserData | null = null;
  avatarPreview = 'assets/images/default-avatar.png';
  selectedAvatarBase64 = '';
  username = '';
  bio = '';
  maxBioLength = 150;
  isLoading = false;

  quickTags = [
    '✨ Digital Creator',
    '📸 Photography',
    '💻 Tech & Code',
    '🎨 Designer',
    '🌍 Traveler',
    '🎧 Music Lover',
  ];

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      if (
        this.currentUser.avatar &&
        !this.currentUser.avatar.includes('default-avatar.png') &&
        !this.currentUser.avatar.includes('user-profile.jpg')
      ) {
        this.avatarPreview = this.currentUser.avatar;
      }
      if (this.currentUser.bio) {
        this.bio = this.currentUser.bio;
      }
      this.username = this.currentUser.userName || this.currentUser.username || '';
    }
  }

  get displayName(): string {
    if (!this.currentUser) return 'Creator';
    const fullName = [this.currentUser.firstName, this.currentUser.lastName].filter(Boolean).join(' ');
    return fullName || this.username || this.currentUser.userName || this.currentUser.username || 'Creator';
  }


  onFileSelected(event: any) {
    const file: File = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.showAlert('Invalid Image', 'Please select a valid image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.showAlert('Image Too Large', 'Please select an image smaller than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.avatarPreview = base64;
        this.selectedAvatarBase64 = base64;
      };
      reader.readAsDataURL(file);
    }
  }

  addTag(tag: string) {
    const spaceNeeded = this.bio.length > 0 ? ' ' : '';
    if ((this.bio + spaceNeeded + tag).length <= this.maxBioLength) {
      this.bio += spaceNeeded + tag;
    }
  }

  async saveAndContinue() {
    if (!this.currentUser) {
      this.router.navigate(['/home']);
      return;
    }

    const userId = this.currentUser.id || this.currentUser._id;
    if (!userId) {
      this.router.navigate(['/home']);
      return;
    }

    const loader = await this.loadingCtrl.create({
      message: 'Setting up your profile...',
      spinner: 'crescent'
    });
    await loader.present();
    this.isLoading = true;

    const payload: { avatar?: string; bio?: string; userName?: string } = {
      bio: this.bio.trim(),
    };
    if (this.username.trim()) {
      payload.userName = this.username.trim().toLowerCase();
    }
    if (this.selectedAvatarBase64) {
      payload.avatar = this.selectedAvatarBase64;
    } else if (!this.currentUser.avatar || this.currentUser.avatar.includes('default-avatar') || this.currentUser.avatar.includes('user-profile')) {
      payload.avatar = 'assets/images/default-avatar.png';
    }

    this.authService.updateProfile(userId, payload).subscribe({
      next: async () => {
        await loader.dismiss();
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: async (err) => {
        await loader.dismiss();
        this.isLoading = false;
        console.error('Failed to update profile onboarding', err);
        if (this.currentUser) {
          if (payload.userName) this.currentUser.userName = payload.userName;
          if (payload.bio !== undefined) this.currentUser.bio = payload.bio;
          if (payload.avatar) this.currentUser.avatar = payload.avatar;
          this.currentUser.isProfileComplete = true;
          this.authService.setCurrentUser(this.currentUser);
        }
        const alert = await this.alertCtrl.create({
          header: 'Profile Setup',
          message: 'Saved locally. You can update your profile anytime in settings.',
          buttons: [
            {
              text: 'Continue',
              handler: () => this.router.navigate(['/home'])
            }
          ]
        });
        await alert.present();
      }
    });
  }


  skip() {
    // If skipped, mark completed locally so the user isn't prompted repeatedly on every login
    if (this.currentUser) {
      this.currentUser.isProfileComplete = true;
      if (!this.currentUser.avatar) {
        this.currentUser.avatar = 'assets/images/default-avatar.png';
      }
      this.authService.setCurrentUser(this.currentUser);
    }
    this.router.navigate(['/home']);
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}

