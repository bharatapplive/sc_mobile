import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { PostService, ApiPost, LikedUser, PostCommentItem } from '../../../core/services/post.service';


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
export class FeedPage implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private postService = inject(PostService);
  private router = inject(Router);
  private userSub!: Subscription;
  defaultAvatar = 'assets/images/default-avatar.png';

  // Likes Sheet Modal
  isLikesModalOpen: boolean = false;
  activeLikesPost: Post | null = null;
  likedUsers: LikedUser[] = [];
  isLoadingLikes: boolean = false;

  // Comments Sheet Modal
  isCommentsModalOpen: boolean = false;
  activeCommentsPost: Post | null = null;
  postComments: PostCommentItem[] = [];
  isLoadingComments: boolean = false;
  newCommentInput: string = '';
  isSubmittingComment: boolean = false;

  stories: Story[] = [
    {
      id: '0',
      username: 'Your Story',
      avatar: 'assets/images/default-avatar.png',
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
      avatar: 'https://bharatapp.info/assets/images/team/himanshu_rana.png',
      hasUnseen: true,
    },
    {
      id: '3',
      username: 'Ayushi_Shri',
      avatar: 'https://bharatapp.info/assets/images/team/ayushi_singh.png',
      hasUnseen: true,
    },
    {
      id: '4',
      username: 'Deepa Mam',
      avatar: 'https://bharatapp.info/assets/images/team/deepa.jpg',
      hasUnseen: false,
    },
  ];

  initialPosts: Post[] = [
    {
      id: '1',
      author: {
        username: 'Aman Sharma',
        avatar: 'assets/images/default-avatar.png',
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

  posts: Post[] = [];

  ngOnInit() {
    this.posts = [...this.initialPosts];
    this.loadFeedPosts();

    this.userSub = this.authService.currentUser$.subscribe(user => {
      if (user) {
        const userStory = this.stories.find(s => s.isUser);
        if (userStory) {
          userStory.avatar = user.avatar || userStory.avatar;
          userStory.username = user.userName || 'Your Story';
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.loadFeedPosts();
  }

  goToCreatePost() {
    this.router.navigate(['/home/post']);
  }

  isRefreshing: boolean = true;

  loadFeedPosts(event?: any) {
    this.isRefreshing = true;
    const startTime = Date.now();

    this.postService.getFeedPosts().subscribe({
      next: (res) => {
        if (res?.posts && res.posts.length > 0) {
          const livePosts = res.posts.map(p => this.mapApiPostToPost(p));
          this.posts = [...livePosts, ...this.initialPosts];
        } else {
          this.posts = [...this.initialPosts];
        }
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 600 - elapsed);
        setTimeout(() => {
          this.isRefreshing = false;
          if (event) event.target.complete();
        }, delay);
      },
      error: (err) => {
        console.warn('[Feed] Failed to load live posts:', err);
        if (this.posts.length === 0) {
          this.posts = [...this.initialPosts];
        }
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 600 - elapsed);
        setTimeout(() => {
          this.isRefreshing = false;
          if (event) event.target.complete();
        }, delay);
      }
    });
  }

  private mapApiPostToPost(p: ApiPost): Post {
    const currentUser = this.authService.getCurrentUser();
    const currentUserId = currentUser?.id || currentUser?._id || '';
    const uidStr = String(currentUserId).trim();

    const isLiked = Boolean(
      uidStr &&
      Array.isArray(p.likedBy) &&
      p.likedBy.some(id => String(id).trim() === uidStr)
    );

    const likesCount = Array.isArray(p.likedBy)
      ? p.likedBy.length
      : (p.likesCount || 0);

    return {
      id: p._id,
      author: {
        username: p.userName || 'User',
        avatar: p.userAvatar || this.defaultAvatar,
        location: p.location || '',
        isVerified: false,
      },
      image: p.postLink,
      caption: p.caption || '',
      hashtags: [],
      likesCount,
      isLiked,
      isSaved: false,
      timeAgo: this.formatTimeAgo(p.createdAt),
      commentsCount: p.commentsCount || 0,
      comments: [],
      newCommentText: '',
      showComments: false,
      animatingHeart: false,
    };
  }

  formatTimeAgo(dateStr?: string | Date): string {
    if (!dateStr) return 'Just now';
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  updateUserStoryAvatar() {
    // Handled reactively by the observable subscription
  }

  onImgError(event: any) {
    event.target.src = this.defaultAvatar;
  }

  toggleLike(post: Post) {
    const previousState = post.isLiked;
    const previousCount = post.likesCount;

    // Optimistic UI update
    post.isLiked = !post.isLiked;
    post.likesCount += post.isLiked ? 1 : -1;
    if (post.likesCount < 0) post.likesCount = 0;

    const currentUser = this.authService.getCurrentUser();
    const currentUserId = currentUser?.id || currentUser?._id;

    // If it's a persisted live post from MongoDB and user is logged in
    if (post.id && post.id.length >= 12 && currentUserId) {
      this.postService.toggleLike(post.id, String(currentUserId)).subscribe({
        next: (res) => {
          if (res) {
            post.likesCount = res.likesCount;
            post.isLiked = res.isLiked;
          }
        },
        error: (err) => {
          console.error('[FeedPage] Failed to toggle like on server:', err);
          // Revert optimistic update on failure
          post.isLiked = previousState;
          post.likesCount = previousCount;
        },
      });
    }
  }

  onDoubleTap(post: Post) {
    if (!post.isLiked) {
      this.toggleLike(post);
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
    this.openCommentsModal(post);
  }

  openLikesModal(post: Post) {
    this.activeLikesPost = post;
    this.isLikesModalOpen = true;
    this.isLoadingLikes = true;
    this.likedUsers = [];

    if (post.id && post.id.length >= 12) {
      this.postService.getPostLikes(post.id).subscribe({
        next: (res) => {
          this.isLoadingLikes = false;
          if (res?.users) {
            this.likedUsers = res.users;
          }
        },
        error: (err) => {
          console.error('[FeedPage] Failed to fetch post likes:', err);
          this.isLoadingLikes = false;
        },
      });
    } else {
      // Mock / initial posts fallback
      this.isLoadingLikes = false;
      if (post.likesCount > 0) {
        this.likedUsers = [
          { id: '1', userName: 'Ajay_Sir', fullName: 'Ajay Shankar', avatar: 'https://bharatapp.info/assets/images/team/ajay_shankar.png' },
          { id: '2', userName: 'Himanshu', fullName: 'Himanshu Rana', avatar: 'https://bharatapp.info/assets/images/team/himanshu_rana.png' },
          { id: '3', userName: 'Ayushi_Shri', fullName: 'Ayushi Singh', avatar: 'https://bharatapp.info/assets/images/team/ayushi_singh.png' },
        ].slice(0, Math.min(post.likesCount, 3));
      }
    }
  }

  closeLikesModal() {
    this.isLikesModalOpen = false;
    this.activeLikesPost = null;
    this.likedUsers = [];
  }

  openCommentsModal(post: Post) {
    this.activeCommentsPost = post;
    this.isCommentsModalOpen = true;
    this.isLoadingComments = true;
    this.postComments = [];
    this.newCommentInput = '';

    if (post.id && post.id.length >= 12) {
      this.postService.getPostComments(post.id).subscribe({
        next: (res) => {
          this.isLoadingComments = false;
          if (res?.comments) {
            this.postComments = res.comments;
          }
        },
        error: (err) => {
          console.error('[FeedPage] Failed to fetch post comments:', err);
          this.isLoadingComments = false;
          this.postComments = post.comments.map(c => ({
            userName: c.username,
            text: c.text,
            createdAt: new Date().toISOString(),
          }));
        },
      });
    } else {
      this.isLoadingComments = false;
      this.postComments = post.comments.map(c => ({
        userName: c.username,
        text: c.text,
        createdAt: new Date().toISOString(),
      }));
    }
  }

  closeCommentsModal() {
    this.isCommentsModalOpen = false;
    this.activeCommentsPost = null;
    this.postComments = [];
    this.newCommentInput = '';
  }

  submitComment() {
    const text = this.newCommentInput?.trim();
    if (!text || !this.activeCommentsPost) return;

    const currentUser = this.authService.getCurrentUser();
    const currentUserId = currentUser?.id || currentUser?._id || '';
    const currentUserName = currentUser?.userName || currentUser?.username || 'User';
    const currentUserAvatar = currentUser?.avatar || currentUser?.avatarUrl || this.defaultAvatar;

    const newCommentItem: PostCommentItem = {
      userId: currentUserId,
      userName: currentUserName,
      userAvatar: currentUserAvatar,
      text,
      createdAt: new Date().toISOString(),
    };

    // Optimistic push
    this.postComments.push(newCommentItem);
    this.activeCommentsPost.commentsCount = (this.activeCommentsPost.commentsCount || 0) + 1;
    this.activeCommentsPost.comments.push({
      username: currentUserName,
      text,
    });
    this.newCommentInput = '';

    // If live post, persist in MongoDB
    if (this.activeCommentsPost.id && this.activeCommentsPost.id.length >= 12) {
      this.isSubmittingComment = true;
      this.postService.addComment(this.activeCommentsPost.id, {
        userId: currentUserId,
        userName: currentUserName,
        userAvatar: currentUserAvatar,
        text,
      }).subscribe({
        next: (res) => {
          this.isSubmittingComment = false;
          if (this.activeCommentsPost && res?.commentsCount) {
            this.activeCommentsPost.commentsCount = res.commentsCount;
          }
        },
        error: (err) => {
          this.isSubmittingComment = false;
          console.error('[FeedPage] Failed to save comment to server:', err);
        },
      });
    }
  }

  handleRefresh(event: any) {
    this.loadFeedPosts(event);
  }
}
