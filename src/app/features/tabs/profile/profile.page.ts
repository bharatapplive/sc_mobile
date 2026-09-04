import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';

export interface ProfileHighlight {
  id: string;
  title: string;
  coverImage: string;
}

export interface ProfileMediaItem {
  id: string;
  image: string;
  views?: string;
  likes?: string;
  isReel?: boolean;
  isMultiple?: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private actionSheetCtrl = inject(ActionSheetController);

  activeTab: 'posts' | 'reels' | 'saved' = 'posts';
  isFollowing = false;

  user = {
    username: '',
    fullname: '',
    category: 'Fullstack developer & Creator',
    avatar: 'assets/images/user-profile.jpg',
    bio: '💡 eating => programming => sleeping\n📸 Capturing reality, one frame at a time ✨',
    website: 'https://www.socialcircle.app',
    postsCount: 24,
    followersCount: '14.2K',
    followingCount: 382,
    isVerified: true,
  };

  highlights: ProfileHighlight[] = [
    {
      id: 'h1',
      title: 'Moments 📸',
      coverImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'h2',
      title: 'Design 🎨',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'h3',
      title: 'Travel ✈️',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80',
    }
  ];

  posts: ProfileMediaItem[] = [
    { id: '1', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80', likes: '1.2K', isMultiple: true },
    { id: '2', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', likes: '840' },
    { id: '3', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', likes: '2.5K', isMultiple: true },
  ];

  reels: ProfileMediaItem[] = [
    { id: 'r1', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80', views: '48.2K', isReel: true },
    { id: 'r2', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', views: '112K', isReel: true },
  ];

  saved: ProfileMediaItem[] = [
    { id: 's1', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', likes: '5.2K' },
  ];

  ngOnInit() {
    this.loadUserData();
  }

  ionViewWillEnter() {
    this.loadUserData();
  }

  loadUserData() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user.username = currentUser.userName || currentUser.username || currentUser.mobile || 'User';
      const fullName = [currentUser.firstName, currentUser.lastName].filter(Boolean).join(' ');
      this.user.fullname = fullName || currentUser.fullName || currentUser.userName || this.user.username;
      if (currentUser.avatar || currentUser.avatarUrl) {
        this.user.avatar = currentUser.avatar || currentUser.avatarUrl || this.user.avatar;
      }
    }
  }

  getUserAvatar(): string {
    return this.user.avatar;
  }

  setTab(tab: 'posts' | 'reels' | 'saved') {
    this.activeTab = tab;
  }

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }

  handleRefresh(event: any) {
    this.loadUserData();
    setTimeout(() => {
      event.target.complete();
    }, 800);
  }

  editProfile() {
    console.log('Open Edit Profile modal');
  }

  onAvatarSelected(event: any) {
    const file: File = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.user.avatar = base64;
        const currentUser = this.authService.getCurrentUser();
        const userId = currentUser?.id || currentUser?._id;
        if (userId) {
          this.authService.updateAvatar(userId, base64).subscribe({
            next: () => {
              console.log('Avatar updated in DB successfully');
            },
            error: (err) => console.error('Failed to update avatar in DB', err)
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  shareProfile() {
    if (navigator.share) {
      navigator.share({
        title: `${this.user.fullname} (@${this.user.username})`,
        text: this.user.bio,
        url: window.location.href
      }).catch(() => { });
    }
  }

  async openMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Menu & Settings',
      buttons: [
        {
          text: 'Settings & Privacy',
          icon: 'settings-outline',
          handler: () => {
            console.log('Open settings');
          }
        },
        {
          text: 'Saved Posts',
          icon: 'bookmark-outline',
          handler: () => {
            this.setTab('saved');
          }
        },
        {
          text: 'Share Profile',
          icon: 'share-social-outline',
          handler: () => {
            this.shareProfile();
          }
        },
        {
          text: 'Log Out',
          role: 'destructive',
          icon: 'log-out-outline',
          handler: () => {
            this.onLogout();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close-outline'
        }
      ]
    });
    await actionSheet.present();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
