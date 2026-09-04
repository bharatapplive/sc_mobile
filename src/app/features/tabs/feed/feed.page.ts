import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

export interface Story {
  id: string;
  username: string;
  avatar: string;
  isUser?: boolean;
  hasUnseen?: boolean;
}

export interface Comment {
  username: string;
  text: string;
}

export interface Post {
  id: string;
  author: {
    username: string;
    avatar: string;
    location?: string;
    isVerified?: boolean;
  };
  image: string;
  caption: string;
  hashtags: string[];
  likesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  timeAgo: string;
  commentsCount: number;
  comments: Comment[];
  newCommentText?: string;
  showComments?: boolean;
  animatingHeart?: boolean;
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: false,
})
export class FeedPage implements OnInit {
  private authService = inject(AuthService);
  defaultAvatar = 'assets/images/user-profile.jpg';

  stories: Story[] = [
    {
      id: '0',
      username: 'Your Story',
      avatar: 'assets/images/user-profile.jpg',
      isUser: true,
      hasUnseen: false,
    },
    {
      id: '1',
      username: 'Ajay_Sir',
      avatar: 'https://bharatapp.info/assets/images/team/ajay_shankar.png',
      hasUnseen: true,
    },
    {
      id: '2',
      username: 'Himanshu',
      avatar: 'https://bharatapp.info/assets/images/team/himanshu.png',
      hasUnseen: true,
    },
    {
      id: '3',
      username: 'Ayushi_Shri',
      avatar: 'https://bharatapp.info/assets/images/team/ayushi.png',
      hasUnseen: true,
    },
    {
      id: '4',
      username: 'Saurav_Sir',
      avatar: 'https://bharatapp.info/assets/images/team/saurav.png',
      hasUnseen: false,
    },
  ];

  posts: Post[] = [
    {
      id: '1',
      author: {
        username: 'Aman Sharma',
        avatar: 'assets/images/user-profile.jpg',
        location: 'New Delhi, India',
        isVerified: true,
      },
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80',
      caption: 'Walking through history at the Great Wall. Absolutely breathless by this ancient wonder! 🏯✨',
      hashtags: ['#TravelDiaries', '#Wanderlust', '#Heritage', '#Explore'],
      likesCount: 1248,
      isLiked: false,
      isSaved: false,
      timeAgo: '2 hours ago',
      commentsCount: 84,
      comments: [
        { username: 'alex.nomad', text: 'Incredible shot! What camera did you use? 📸' },
        { username: 'sarah_travels', text: 'This is on my bucket list for next year! 😍' }
      ],
      newCommentText: '',
      showComments: false,
      animatingHeart: false,
    },
    {
      id: '2',
      author: {
        username: 'tech_insider',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        location: 'Bengaluru, India',
        isVerified: true,
      },
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      caption: 'The future of quantum computing is happening right now. Silicon meets next-gen AI processing. ⚡🤖',
      hashtags: ['#TechTrends', '#AI', '#Hardware', '#Innovation'],
      likesCount: 3420,
      isLiked: true,
      isSaved: true,
      timeAgo: '4 hours ago',
      commentsCount: 230,
      comments: [
        { username: 'dev_guy', text: 'Mind-blowing speed benchmarks! 🚀' }
      ],
      newCommentText: '',
      showComments: false,
      animatingHeart: false,
    },
    {
      id: '3',
      author: {
        username: 'nature.vibe',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        location: 'Manali, Himachal Pradesh',
        isVerified: false,
      },
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      caption: 'Golden hour hits different when the waves are calm. Take a deep breath and unwind. 🌅🌊',
      hashtags: ['#SunsetLovers', '#Peace', '#GoldenHour'],
      likesCount: 892,
      isLiked: false,
      isSaved: false,
      timeAgo: '7 hours ago',
      commentsCount: 156,
      comments: [
        { username: 'rok.joyi', text: 'Take me with you next time! 😍' }
      ],
      newCommentText: '',
      showComments: false,
      animatingHeart: false,
    }
  ];

  ngOnInit() {
    this.updateUserStoryAvatar();
  }

  ionViewWillEnter() {
    this.updateUserStoryAvatar();
  }

  updateUserStoryAvatar() {
    const user = this.authService.getCurrentUser();
    if (user) {
      const userStory = this.stories.find(s => s.isUser);
      if (userStory && user.avatar) {
        userStory.avatar = user.avatar;
      }
      // Update first post with logged in user details
      if (this.posts.length > 0) {
        this.posts[0].author.username = user.userName || user.username || user.firstName || this.posts[0].author.username;
        if (user.avatar) {
          this.posts[0].author.avatar = user.avatar;
        }
      }
    }
  }

  onImgError(event: any) {
    event.target.src = this.defaultAvatar;
  }

  toggleLike(post: Post) {
    post.isLiked = !post.isLiked;
    post.likesCount += post.isLiked ? 1 : -1;
  }

  onDoubleTap(post: Post) {
    if (!post.isLiked) {
      post.isLiked = true;
      post.likesCount += 1;
    }
    post.animatingHeart = true;
    setTimeout(() => {
      post.animatingHeart = false;
    }, 900);
  }

  toggleSave(post: Post) {
    post.isSaved = !post.isSaved;
  }

  toggleComments(post: Post) {
    post.showComments = !post.showComments;
  }

  addComment(post: Post) {
    if (post.newCommentText && post.newCommentText.trim().length > 0) {
      const currentUser = this.authService.getCurrentUser();
      post.comments.push({
        username: currentUser?.userName || currentUser?.username || 'User',
        text: post.newCommentText.trim()
      });
      post.commentsCount += 1;
      post.newCommentText = '';
      post.showComments = true;
    }
  }

  handleRefresh(event: any) {
    this.updateUserStoryAvatar();
    setTimeout(() => {
      event.target.complete();
    }, 1200);
  }
}
