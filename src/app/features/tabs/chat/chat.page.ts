import { Component, OnInit } from '@angular/core';

export interface StoryNote {
  id: string;
  name: string;
  avatar: string;
  note?: string;
  isOnline: boolean;
  isCurrentUser?: boolean;
}

export interface ChatMessage {
  id: string;
  name: string;
  username: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
  isVerified?: boolean;
  tag: 'Primary' | 'Requests' | 'General';
  hasStory?: boolean;
}

export interface FollowSuggestion {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false
})
export class ChatPage implements OnInit {
  searchQuery: string = '';
  selectedTag: string = 'Primary';
  tags: string[] = ['Primary', 'Requests', 'General'];

  defaultAvatar = 'assets/images/user-profile.jpg';

  // Story Notes (horizontal scroll with thought bubbles)
  notes: StoryNote[] = [
    {
      id: '0',
      name: 'Your note',
      avatar: 'assets/images/user-profile.jpg',
      note: 'Coding mood ☕✨',
      isOnline: true,
      isCurrentUser: true
    },
    {
      id: '1',
      name: 'Ayushi',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      note: 'Weekend vibes 🌴',
      isOnline: true
    },
    {
      id: '2',
      name: 'Ajay Sir',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      note: 'Reviewing PRs 💻',
      isOnline: true
    },
    {
      id: '3',
      name: 'Himanshu_rana',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      note: 'On the road 🚗',
      isOnline: false
    },
    {
      id: '4',
      name: 'Sourabh ali',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      note: 'Gym time 💪',
      isOnline: true
    },
    {
      id: '5',
      name: 'Deepa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      note: 'Art in progress 🎨',
      isOnline: true
    }
  ];

  // Chat conversations list
  chats: ChatMessage[] = [
    {
      id: 'c1',
      name: 'Ajay Sir',
      username: 'ajay_tech',
      avatar: 'https://bharatapp.info/assets/images/team/ajay_shankar.png',
      lastMessage: 'Hey Aman, have you finished the project milestone?',
      time: '02m ago',
      unreadCount: 1,
      isOnline: true,
      isVerified: true,
      tag: 'Primary',
      hasStory: true
    },
    {
      id: 'c2',
      name: 'Himanshu Rana',
      username: 'Himanshu_Rana',
      avatar: 'https://bharatapp.info/assets/images/team/himanshu_rana.png',
      lastMessage: 'Bro u r 2 faster than light?🚀',
      time: '1d ago',
      unreadCount: 0,
      isOnline: false,
      isVerified: true,
      tag: 'Primary'
    },
    {
      id: 'c3',
      name: 'Ayushi Singh',
      username: 'ayushi.singh',
      avatar: 'https://bharatapp.info/assets/images/team/ayushi_singh.png',
      lastMessage: 'hey.. check this out',
      time: '1d ago',
      unreadCount: 0,
      isOnline: true,
      isVerified: true,
      tag: 'Primary',
      hasStory: true
    },
    {
      id: 'c4',
      name: 'Sourabh ali',
      username: 'sourabh_ali',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      lastMessage: 'Let us catch up this weekend for coffee!',
      time: '15m ago',
      unreadCount: 0,
      isOnline: false,
      tag: 'Primary'
    },

    {
      id: 'c5',
      name: 'Deepa mam',
      username: 'Deepa_mam',
      avatar: 'https://bharatapp.info/assets/images/team/deepa.jpg',
      lastMessage: 'Hey Aman, have you finished the project milestone?',
      time: '2d ago',
      unreadCount: 0,
      isOnline: false,
      tag: 'Requests'
    }
  ];

  // Accounts to follow suggestions
  suggestions: FollowSuggestion[] = [
    {
      id: 's1',
      name: 'Rini',
      username: 'rini123',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      isFollowing: false
    },
    {
      id: 's2',
      name: 'harshita',
      username: 'harshita_00',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
      isFollowing: false
    },
    {
      id: 's3',
      name: 'Ravindra',
      username: 'ravindra_00',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      isFollowing: false
    },
    {
      id: 's4',
      name: 'samrat',
      username: 'samrat_99',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      isFollowing: false
    }
  ];

  ngOnInit(): void {
    // Pure frontend initialization
  }

  get filteredChats(): ChatMessage[] {
    return this.chats.filter(chat => {
      const matchesTag = this.selectedTag === 'Primary'
        ? true
        : chat.tag === this.selectedTag;

      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        return matchesTag;
      }
      const matchesSearch = chat.name.toLowerCase().includes(query) ||
        chat.username.toLowerCase().includes(query) ||
        chat.lastMessage.toLowerCase().includes(query);

      return matchesTag && matchesSearch;
    });
  }

  getRequestCount(): number {
    return this.chats.filter(c => c.tag === 'Requests').length;
  }

  selectTag(tag: string): void {
    this.selectedTag = tag;
  }

  toggleFollow(account: FollowSuggestion): void {
    account.isFollowing = !account.isFollowing;
  }

  dismissSuggestion(id: string): void {
    this.suggestions = this.suggestions.filter(s => s.id !== id);
  }

  onImgError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = this.defaultAvatar;
    }
  }

  getUserAvatar(): string {
    return this.defaultAvatar;
  }
}