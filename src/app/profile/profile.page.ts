import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  firstName = '';
  lastName = '';
  profileImage = 'https://i.pravatar.cc/300?img=12';
  private readonly imageBaseUrl = 'http://localhost:3000/';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // step 4 call getSession method to get the current session state without subscribing. This is useful for synchronous checks, like in route guards.
    // call getSession method to show gate  pass
    //session has token, user, isAuthenticatoion
    const session = this.authService.getSession();

    const user = session?.user || {};

    this.firstName = user?.firstName || '';
    this.lastName = user?.lastName || '';
    const image = user?.image || user?.avatar || user?.profileImage;
    this.profileImage = image ? this.toImageUrl(image) : this.profileImage;
  }

  // step-2 send image to BE
  onProfileImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.profileImage = URL.createObjectURL(file);
      //step 3- call uploadProfileImage method to send the image to the backend and update the session with the new image URL.
      this.authService.uploadProfileImage(file).subscribe({
        next: (response) => {
          const image = response?.image || response?.profileImage || response?.user?.image;

          if (image) {
            const imageUrl = this.toImageUrl(image);
            this.profileImage = imageUrl;
            const session = this.authService.getSession();
            this.authService.saveSession(session.token || '', {
              ...session.user,
              ...(response?.user || {}),
              image: imageUrl,
            });
          }
        },
        error: (error) => {
          console.error('Profile image upload failed', error);
        },
      });
    }
  }

  private toImageUrl(image: string): string {
    return image.startsWith('http://') || image.startsWith('https://')
      ? image
      : `${this.imageBaseUrl}${image.replace(/^\/+/, '')}`;
  }
}
