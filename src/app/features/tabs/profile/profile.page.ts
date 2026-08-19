import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

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
export class ProfilePage {
  activeTab: 'posts' | 'reels' | 'saved' = 'posts';
  isFollowing = false;

  user = {
    username: 'itz_liveXlife221',
    fullname: 'Aman Sharma',
    category: 'Fullstack devloper & Video Editor',
    avatar: 'assets/images/user-profile.jpg',
    bio: '💡 eating => programing =>sleeping  \n📍 New Delhi, India\n📸 Capturing reality, one frame at a time ✨\n📩 Contact & collab: [EMAIL_ADDRESS]',
    website: 'https://www.amanfolio.me',
    postsCount: 24,
    followersCount: '14.2K',
    followingCount: 382,
    isVerified: true,
  };

  highlights: ProfileHighlight[] = [
    {
      id: 'h1',
      title: 'Chandni Chowk',
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
    },
    {
      id: 'h4',
      title: 'Moments 📸',
      coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'h5',
      title: 'Setup 💻',
      coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=200&q=80',
    }
  ];

  posts: ProfileMediaItem[] = [
    { id: '1', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80', likes: '1.2K', isMultiple: true },
    { id: '2', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', likes: '840' },
    { id: '3', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', likes: '2.5K', isMultiple: true },
    { id: '4', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', likes: '960' },
    { id: '5', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80', likes: '1.9K' },
    { id: '6', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80', likes: '3.1K', isMultiple: true },
    { id: '7', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80', likes: '710' },
    { id: '8', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80', likes: '1.4K' },
    { id: '9', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80', likes: '2.2K' }
  ];

  reels: ProfileMediaItem[] = [
    { id: 'r1', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80', views: '48.2K', isReel: true },
    { id: 'r2', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', views: '112K', isReel: true },
    { id: 'r3', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', views: '29.5K', isReel: true },
    { id: 'r4', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80', views: '84.1K', isReel: true },
    { id: 'r5', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80', views: '63.0K', isReel: true },
    { id: 'r6', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', views: '15.8K', isReel: true }
  ];

  saved: ProfileMediaItem[] = [
    { id: 's1', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', likes: '5.2K' },
    { id: 's2', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', likes: '10.4K' },
    { id: 's3', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80', likes: '4.8K' }
  ];

  private router = inject(Router);

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
    setTimeout(() => {
      event.target.complete();
    }, 1200);
  }

  editProfile() {
    console.log('Open Edit Profile modal');
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

  onLogout() {
    this.router.navigate(['/login']);
  }
}

