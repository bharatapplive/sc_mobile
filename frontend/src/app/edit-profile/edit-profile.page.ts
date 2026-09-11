import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth-service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: false,
})
export class EditProfilePage implements OnInit {

  userId = '';
  fullname = '';
  username = '';
  profileBio = '';

  saving = false;
  loading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log('✅ Edit Profile loaded');

    this.loadSavedUser();
    this.loadLatestUser();
  }

  // =====================================================
  // LOAD SAVED USER
  // =====================================================

  private loadSavedUser(): void {

    const user = this.authService.currentUser();

    if (!user) {
      console.warn('⚠️ Current user not found');
      return;
    }

    this.setUserData(user);
  }

  // =====================================================
  // SET USER DATA
  // =====================================================

  private setUserData(user: User): void {

    this.userId =
      (user as any)._id ||
      (user as any).id ||
      this.userId;

    this.fullname =
      user.fullname || '';

    this.username =
      user.username || '';

    this.profileBio =
      user.profileBio || '';
  }

  // =====================================================
  // LOAD LATEST USER
  // =====================================================

  loadLatestUser(): void {

    this.loading = true;

    this.authService.loadUserData().subscribe({

      next: (user: User) => {

        console.log(
          '✅ Latest profile:',
          user
        );

        this.setUserData(user);

        this.loading = false;
      },

      error: (error: any) => {

        console.error(
          '❌ Failed to load profile:',
          error
        );

        this.loading = false;
      }

    });
  }

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  saveProfile(): void {

    if (this.saving) {
      return;
    }

    // ---------------------------------------------------
    // USER ID
    // ---------------------------------------------------

    if (!this.userId) {

      alert(
        'User ID missing. Please login again.'
      );

      return;
    }

    // ---------------------------------------------------
    // CLEAN DATA
    // ---------------------------------------------------

    const fullname =
      this.fullname.trim();

    const username =
      this.username
        .trim()
        .toLowerCase();

    const profileBio =
      this.profileBio.trim();

    // ---------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------

    if (!fullname) {

      alert(
        'Full name is required.'
      );

      return;
    }

    if (!username) {

      alert(
        'Username is required.'
      );

      return;
    }

    if (profileBio.length > 150) {

      alert(
        'Bio cannot be longer than 150 characters.'
      );

      return;
    }

    // ---------------------------------------------------
    // PAYLOAD
    // ---------------------------------------------------

    const payload = {

      userId: this.userId,

      fullname,

      username,

      profileBio

    };

    console.log(
      '📤 Saving profile:',
      payload
    );

    // ---------------------------------------------------
    // START SAVING
    // ---------------------------------------------------

    this.saving = true;

    // ---------------------------------------------------
    // BACKEND REQUEST
    // ---------------------------------------------------

    this.authService
      .updateProfile(payload)
      .subscribe({

        next: (updatedUser: User) => {

          console.log(
            '✅ Profile saved successfully:',
            updatedUser
          );

          // AuthService already updates local user
          // after successful PATCH.

          this.saving = false;

          // Go back to profile
          this.router.navigate(
            ['/home/profile'],
            {
              replaceUrl: true
            }
          );
        },

        error: (error: any) => {

          console.error(
            '❌ Profile update failed:',
            error
          );

          this.saving = false;

          const message =
            error?.error?.message ||
            error?.message ||
            'Unable to update profile.';

          alert(
            Array.isArray(message)
              ? message.join(', ')
              : message
          );
        }

      });
  }

  // =====================================================
  // CANCEL
  // =====================================================

  cancel(): void {

    if (this.saving) {
      return;
    }

    this.router.navigate(
      ['/home/profile']
    );
  }
}