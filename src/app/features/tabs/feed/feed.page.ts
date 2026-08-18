import { Component, OnInit } from '@angular/core';

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
      username: 'slex_vibe',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      hasUnseen: true,
    },
    {
      id: '2',
      username: 'neo_pixel',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      hasUnseen: true,
    },
    {
      id: '3',
      username: 'luna.art',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      hasUnseen: true,
    },
    {
      id: '4',
      username: 'travel_joy',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      hasUnseen: false,
    },
    {
      id: '5',
      username: 'rok.joyi',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
      hasUnseen: false,
    },
    {
      id: '6',
      username: 'apex_editor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      hasUnseen: true,
    }
  ];

  posts: Post[] = [
    {
      id: 'p1',
      author: {
        username: 'itz_liveXlife221',
        avatar: 'assets/images/user-profile.jpg',
        location: 'New Delhi, India',
        isVerified: true,
      },
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1080&q=80',
      caption: 'Exploring the boundaries of digital reality today. This light installation in Tokyo is pure magic! ✨',
      hashtags: ['#DigitalArt', '#TokyoVibes', '#CyberAesthetics', '#Creativity'],
      likesCount: 1284,
      isLiked: false,
      isSaved: false,
      timeAgo: '2 hours ago',
      commentsCount: 42,
      comments: [
        { username: 'slex_vibe', text: 'Colors on this are insane 🔥' },
        { username: 'luna.art', text: 'Which lens was used for this shot?' }
      ],
      newCommentText: '',
      showComments: false,
      animatingHeart: false,
    },
    {
      id: 'p2',
      author: {
        username: 'apex_editor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        location: 'Manhattan, New York',
        isVerified: true,
      },
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1080&q=80',
      caption: 'Architectural minimalism hitting different in the golden morning light 🏙️ Lines and shadows in harmony.',
      hashtags: ['#Architecture', '#NYC', '#Minimalism', '#GoldenHour'],
      likesCount: 5291,
      isLiked: true,
      isSaved: true,
      timeAgo: '4 hours ago',
      commentsCount: 88,
      comments: [
        { username: 'neo_pixel', text: 'Pure geometry perfection 👌' },
        { username: 'itz_liveXlife221', text: 'Incredible framing bro!' }
      ],
      newCommentText: '',
      showComments: false,
      animatingHeart: false,
    },
    {
      id: 'p3',
      author: {
        username: 'travel_joy',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        location: 'Amalfi Coast, Italy',
        isVerified: false,
      },
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1080&q=80',
      caption: 'Crystal waters and Mediterranean breeze. Taking a quick reset before the next creative project launches 🌊☀️',
      hashtags: ['#TravelDiaries', '#AmalfiCoast', '#SummerVibes', '#Wanderlust'],
      likesCount: 10420,
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

  constructor() { }

  ngOnInit() { }

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
      post.comments.push({
        username: 'itz_liveXlife221',
        text: post.newCommentText.trim()
      });
      post.commentsCount += 1;
      post.newCommentText = '';
      post.showComments = true;
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 1200);
  }
}
