import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';
import { PostService } from '../../../core/services/post.service';

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
  caption?: string;
  location?: string;
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
  private postService = inject(PostService);
  private actionSheetCtrl = inject(ActionSheetController);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);

  activeTab: 'posts' | 'reels' | 'saved' = 'posts';
  isFollowing = false;

  // Edit Post State
  isEditPostModalOpen = false;
  isSavingPost = false;
  editingPost: ProfileMediaItem | null = null;
  editPostForm = {
    caption: '',
    location: '',
  };

  // Edit Profile State
  isEditModalOpen = false;
  isSavingProfile = false;
  editForm = {
    firstName: '',
    lastName: '',
    userName: '',
    bio: '',
    website: '',
    category: '',
    avatarPreview: '',
    selectedAvatarBase64: '',
  };

  defaultUser = {
    category: 'Fullstack developer & Creator',
    avatar: 'assets/images/default-avatar.png',
    bio: '💡 eating => programming => sleeping\n📸 Capturing reality, one frame at a time ✨',
    website: 'https://www.socialcircle.app',
    postsCount: 24,
    followersCount: '14.2K',
    followingCount: 382,
    isVerified: true,
  };

  get user() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const fullName = [currentUser.firstName, currentUser.lastName].filter(Boolean).join(' ');
      return {
        ...this.defaultUser,
        username: currentUser.userName || currentUser.username || currentUser.mobile || 'User',
        fullname: fullName || currentUser.fullName || currentUser.userName || 'User',
        avatar: currentUser.avatar || currentUser.avatarUrl || this.defaultUser.avatar,
        bio: currentUser.bio !== undefined ? currentUser.bio : this.defaultUser.bio,
        website: currentUser.website || this.defaultUser.website,
        category: currentUser.category || this.defaultUser.category,
      };
    }
    return {
      ...this.defaultUser,
      username: '',
      fullname: '',
    };
  }


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
    this.loadUserPosts();
  }

  ionViewWillEnter() {
    this.loadUserData();
    this.loadUserPosts();
  }

  loadUserData() {
    // Left intentionally empty as the user getter now handles this reactively
  }

  loadUserPosts() {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || currentUser?._id;
    if (!userId) return;

    this.postService.getUserPosts(userId).subscribe({
      next: (res) => {
        if (res?.posts && res.posts.length > 0) {
          this.posts = res.posts.map(p => ({
            id: p._id,
            image: p.postLink,
            likes: `${p.likesCount || 0}`,
            caption: p.caption || '',
            location: p.location || '',
          }));
          this.defaultUser.postsCount = res.posts.length;
        } else {
          this.posts = [];
          this.defaultUser.postsCount = 0;
        }
      },
      error: (err) => {
        console.warn('[Profile] Failed to load user posts:', err);
      }
    });
  }

  async onPostClick(post: ProfileMediaItem) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Post Options',
      buttons: [
        {
          text: 'Edit Post',
          icon: 'create-outline',
          handler: () => {
            this.openEditPostModal(post);
          },
        },
        {
          text: 'Delete Post',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.confirmDeletePost(post);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close-outline',
        },
      ],
    });
    await actionSheet.present();
  }

  openEditPostModal(post: ProfileMediaItem) {
    this.editingPost = post;
    this.editPostForm = {
      caption: post.caption || '',
      location: post.location || '',
    };
    this.isEditPostModalOpen = true;
  }

  closeEditPostModal() {
    this.isEditPostModalOpen = false;
    this.editingPost = null;
  }

  async saveEditedPost() {
    if (!this.editingPost) return;
    this.isSavingPost = true;

    this.postService
      .updatePost(this.editingPost.id, {
        caption: this.editPostForm.caption.trim(),
        location: this.editPostForm.location.trim(),
      })
      .subscribe({
        next: async (res) => {
          this.isSavingPost = false;
          if (this.editingPost) {
            this.editingPost.caption = this.editPostForm.caption.trim();
            this.editingPost.location = this.editPostForm.location.trim();
          }
          this.closeEditPostModal();
          this.showToast('Post updated successfully! 🎉', 'success');
        },
        error: async (err) => {
          this.isSavingPost = false;
          console.error('[Profile] Failed to update post:', err);
          this.showToast('Failed to update post', 'danger');
        },
      });
  }

  async confirmDeletePost(post: ProfileMediaItem) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Post',
      message: 'Are you sure you want to delete this post? This cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deletePost(post.id);
          },
        },
      ],
    });
    await alert.present();
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter((p) => p.id !== postId);
        this.defaultUser.postsCount = this.posts.length;
        this.showToast('Post deleted successfully', 'success');
      },
      error: (err) => {
        console.error('[Profile] Failed to delete post:', err);
        this.showToast('Failed to delete post', 'danger');
      },
    });
  }

  private async showToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    await toast.present();
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
    this.loadUserPosts();
    setTimeout(() => {
      event.target.complete();
    }, 800);
  }

  editProfile() {
    const current = this.authService.getCurrentUser();
    this.editForm = {
      firstName: current?.firstName || '',
      lastName: current?.lastName || '',
      userName: current?.userName || current?.username || '',
      bio: current?.bio || '',
      website: current?.website || '',
      category: current?.category || 'Fullstack developer & Creator',
      avatarPreview: current?.avatar || current?.avatarUrl || this.defaultUser.avatar,
      selectedAvatarBase64: '',
    };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.isSavingProfile = false;
  }

  onModalAvatarSelected(event: any) {
    const file: File = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.editForm.avatarPreview = base64;
      this.editForm.selectedAvatarBase64 = base64;
    };
    reader.readAsDataURL(file);
  }

  async saveProfile() {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || currentUser?._id;

    const payload: any = {
      firstName: this.editForm.firstName.trim(),
      lastName: this.editForm.lastName.trim(),
      userName: this.editForm.userName.trim(),
      bio: this.editForm.bio.trim(),
      website: this.editForm.website.trim(),
      category: this.editForm.category.trim(),
    };
    if (this.editForm.selectedAvatarBase64) {
      payload.avatar = this.editForm.selectedAvatarBase64;
    }

    this.isSavingProfile = true;

    if (!userId) {
      // Offline / guest fallback
      if (currentUser) {
        Object.assign(currentUser, payload);
        this.authService.setCurrentUser(currentUser);
      }
      this.isSavingProfile = false;
      this.isEditModalOpen = false;
      const toast = await this.toastCtrl.create({
        message: 'Profile updated locally',
        duration: 2000,
        position: 'bottom',
        color: 'success',
      });
      await toast.present();
      return;
    }

    this.authService.updateProfile(userId, payload).subscribe({
      next: async () => {
        this.isSavingProfile = false;
        this.isEditModalOpen = false;
        const toast = await this.toastCtrl.create({
          message: 'Profile updated successfully! ✨',
          duration: 2500,
          position: 'bottom',
          color: 'success',
          icon: 'checkmark-circle',
        });
        await toast.present();
      },
      error: async (err) => {
        console.error('Failed to update profile on backend', err);
        // Fallback update locally so the user experience isn't blocked
        if (currentUser) {
          Object.assign(currentUser, payload);
          this.authService.setCurrentUser(currentUser);
        }
        this.isSavingProfile = false;
        this.isEditModalOpen = false;
        const toast = await this.toastCtrl.create({
          message: 'Profile updated locally',
          duration: 2500,
          position: 'bottom',
          color: 'warning',
        });
        await toast.present();
      },
    });
  }


  onAvatarSelected(event: any) {
    const file: File = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          currentUser.avatar = base64;
          this.authService.setCurrentUser(currentUser);
          const userId = currentUser.id || currentUser._id;
          if (userId) {
            this.authService.updateAvatar(userId, base64).subscribe({
              next: () => {
                console.log('Avatar updated in DB successfully');
              },
              error: (err) => console.error('Failed to update avatar in DB', err)
            });
          }
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
