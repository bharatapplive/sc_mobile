import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService, UserData } from '../../../core/services/auth.service';
import { ChatService, ChatUser, ConversationItem, DirectMessage } from '../../../core/services/chat.service';

export interface StoryNote {
  id: string;
  name: string;
  avatar: string;
  note?: string;
  isOnline: boolean;
  isCurrentUser?: boolean;
  user?: ChatUser;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false,
})
export class ChatPage implements OnInit, OnDestroy {
  @ViewChild('messageScroll') messageScroll?: IonContent;
  @ViewChild('messageInput') messageInput?: ElementRef<HTMLInputElement>;

  currentUser: UserData | null = null;
  searchQuery = '';
  selectedTag = 'Primary';
  tags = ['Primary', 'Requests', 'General'];
  defaultAvatar = 'assets/images/default-avatar.png';

  conversations: ConversationItem[] = [];
  allUsers: ChatUser[] = [];

  activeChatUser: ChatUser | null = null;
  messages: DirectMessage[] = [];
  newMessageText = '';
  isSending = false;

  showNewChatModal = false;
  showUserSwitcher = false;
  userSearchQuery = '';

  partnerIsTyping = false;
  private typingTimeout?: any;
  private myTypingTimeout?: any;

  iceBreakers = [
    'Hey there! 👋',
    'How is it going? 😊',
    'Working on something cool? 💻',
    'Let us connect! 🚀',
  ];

  private subs: Subscription[] = [];
  private userSub?: Subscription;

  constructor(private authService: AuthService, private chatService: ChatService) {}

  ngOnInit(): void {
    this.userSub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.loadAvailableUsers();
      if (user) {
        const id = this.currentUserId;
        this.chatService.connectSocket(id);
        this.loadConversations();
      }
    });

    this.setupWebSocketListeners();
  }

  ngOnDestroy(): void {
    this.leaveRoomState();
    this.userSub?.unsubscribe();
    this.subs.forEach((s) => s.unsubscribe());
    this.chatService.disconnectSocket();
  }

  ionViewWillEnter(): void {
    if (this.currentUser) {
      this.chatService.connectSocket(this.currentUserId);
      this.loadConversations();
      this.loadAvailableUsers();
    }
  }

  ionViewWillLeave(): void {
    this.leaveRoomState();
  }

  get currentUserId(): string {
    return this.currentUser?.id || this.currentUser?._id || '';
  }

  private idOf(user: ChatUser): string {
    return user.id || user._id || '';
  }

  private leaveRoomState(): void {
    document.body.classList.remove('in-chat-room');
    this.partnerIsTyping = false;
  }

  // ------------------------------------------
  // WebSocket Listeners
  // ------------------------------------------

  private setupWebSocketListeners(): void {
    // 1. Real-time Incoming & Sent Messages via WebSocket
    this.subs.push(
      this.chatService.newMessage$.subscribe((msg) => {
        const activePartnerId = this.activeChatUser ? this.idOf(this.activeChatUser) : null;

        // If the active conversation is currently open
        if (
          activePartnerId &&
          (msg.senderId === activePartnerId || msg.receiverId === activePartnerId)
        ) {
          // Check if message already exists (e.g. from optimistic update)
          const exists = this.messages.some(
            (m) =>
              (m._id && msg._id && m._id === msg._id) ||
              (m.senderId === msg.senderId &&
                m.receiverId === msg.receiverId &&
                m.text === msg.text &&
                Math.abs(new Date(m.createdAt).getTime() - new Date(msg.createdAt).getTime()) < 3000)
          );

          if (!exists) {
            this.messages.push(msg);
          } else {
            // Update temporary optimistic message with real ID and timestamp
            const target = this.messages.find(
              (m) =>
                m.isSending &&
                m.senderId === msg.senderId &&
                m.receiverId === msg.receiverId &&
                m.text === msg.text
            );
            if (target) {
              target._id = msg._id;
              target.createdAt = msg.createdAt;
              target.isSending = false;
            }
          }

          this.scrollToBottom();

          // If incoming message received while chat is open, immediately mark as read
          if (msg.senderId === activePartnerId && msg.receiverId === this.currentUserId) {
            this.chatService.sendMarkRead(this.currentUserId, activePartnerId);
          }
        }

        // Always update conversation list
        this.loadConversations();
      })
    );

    // 2. Real-time Typing Indicator via WebSocket
    this.subs.push(
      this.chatService.userTyping$.subscribe((data) => {
        if (this.activeChatUser && this.idOf(this.activeChatUser) === data.userId) {
          this.partnerIsTyping = data.isTyping;
          if (data.isTyping) {
            this.scrollToBottom();
            clearTimeout(this.typingTimeout);
            this.typingTimeout = setTimeout(() => {
              this.partnerIsTyping = false;
            }, 3000);
          }
        }
      })
    );

    // 3. Real-time Read Receipts via WebSocket
    this.subs.push(
      this.chatService.messagesRead$.subscribe((data) => {
        if (this.activeChatUser && this.idOf(this.activeChatUser) === data.readBy) {
          this.messages.forEach((m) => {
            if (this.isSender(m)) {
              m.isRead = true;
            }
          });
        }
      })
    );

    // 4. Real-time User Presence (Online / Offline)
    this.subs.push(
      this.chatService.userStatus$.subscribe((data) => {
        const u = this.allUsers.find((user) => this.idOf(user) === data.userId);
        if (u) u.isOnline = data.isOnline;

        const conv = this.conversations.find((c) => c.partnerId === data.userId);
        if (conv?.partner) conv.partner.isOnline = data.isOnline;

        if (this.activeChatUser && this.idOf(this.activeChatUser) === data.userId) {
          this.activeChatUser.isOnline = data.isOnline;
        }
      })
    );

    // 5. Initial Online Users List
    this.subs.push(
      this.chatService.onlineUsers$.subscribe((onlineIds) => {
        const set = new Set(onlineIds);
        this.allUsers.forEach((u) => {
          u.isOnline = set.has(this.idOf(u));
        });
        this.conversations.forEach((c) => {
          if (c.partner) c.partner.isOnline = set.has(c.partnerId);
        });
        if (this.activeChatUser) {
          this.activeChatUser.isOnline = set.has(this.idOf(this.activeChatUser));
        }
      })
    );

    // 6. Real-time Conversation List update
    this.subs.push(
      this.chatService.conversationUpdated$.subscribe(() => {
        this.loadConversations();
      })
    );
  }

  // ------------------------------------------
  // Data Loading
  // ------------------------------------------

  loadConversations(): void {
    if (!this.currentUserId) return;
    this.chatService.getConversations(this.currentUserId).subscribe({
      next: (convs) => (this.conversations = convs || []),
      error: (err) => console.error('Error loading conversations:', err),
    });
  }

  loadAvailableUsers(): void {
    this.chatService.getUsers(this.currentUserId).subscribe({
      next: (users) => (this.allUsers = (users || []).map((u) => ({ ...u, isOnline: true }))),
      error: (err) => console.error('Error loading users:', err),
    });
  }

  // ------------------------------------------
  // Filtered Computed Lists
  // ------------------------------------------

  get filteredConversations(): ConversationItem[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.conversations;

    return this.conversations.filter(({ partner, lastMessage }) =>
      `${partner.firstName} ${partner.lastName}`.toLowerCase().includes(query) ||
      (partner.userName || '').toLowerCase().includes(query) ||
      (lastMessage?.text || '').toLowerCase().includes(query)
    );
  }

  get storyNotes(): StoryNote[] {
    const list: StoryNote[] = [];

    if (this.currentUser) {
      list.push({
        id: this.currentUserId,
        name: 'Your note',
        avatar: this.currentUser.avatar || this.defaultAvatar,
        note: 'Share a thought... 💭',
        isOnline: true,
        isCurrentUser: true,
      });
    }

    for (const u of this.allUsers) {
      list.push({
        id: this.idOf(u),
        name: u.firstName || u.userName,
        avatar: u.avatar || this.defaultAvatar,
        note: u.bio ? u.bio.slice(0, 20) + (u.bio.length > 20 ? '...' : '') : 'Active now ✨',
        isOnline: u.isOnline ?? true,
        user: u,
      });
    }

    return list;
  }

  get suggestionUsers(): ChatUser[] {
    const chatted = new Set(this.conversations.map((c) => c.partnerId));
    return this.allUsers.filter((u) => !chatted.has(this.idOf(u)));
  }

  get modalFilteredUsers(): ChatUser[] {
    const q = this.userSearchQuery.trim().toLowerCase();
    if (!q) return this.allUsers;

    return this.allUsers.filter((u) =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
      (u.userName || '').toLowerCase().includes(q)
    );
  }

  selectTag(tag: string): void {
    this.selectedTag = tag;
  }

  // ------------------------------------------
  // Conversation Room Actions
  // ------------------------------------------

  openChatWithPartner(partner: ChatUser): void {
    this.showNewChatModal = false;
    this.activeChatUser = partner;
    document.body.classList.add('in-chat-room');
    this.loadActiveMessages(this.idOf(partner));
  }

  closeChat(): void {
    this.activeChatUser = null;
    this.messages = [];
    document.body.classList.remove('in-chat-room');
    this.partnerIsTyping = false;
    this.loadConversations();
  }

  loadActiveMessages(partnerId: string): void {
    if (!this.currentUserId || !partnerId) return;
    this.chatService.getMessages(this.currentUserId, partnerId).subscribe({
      next: (msgs) => {
        this.messages = msgs || [];
        this.scrollToBottom();
        this.chatService.sendMarkRead(this.currentUserId, partnerId);
      },
      error: (err) => console.error('Error fetching messages:', err),
    });
  }

  onMessageInputChange(): void {
    if (!this.activeChatUser || !this.currentUserId) return;
    const partnerId = this.idOf(this.activeChatUser);

    // Notify partner that I am typing over WebSocket
    this.chatService.sendTyping(this.currentUserId, partnerId, true);

    clearTimeout(this.myTypingTimeout);
    this.myTypingTimeout = setTimeout(() => {
      this.chatService.sendTyping(this.currentUserId, partnerId, false);
    }, 1500);
  }

  sendMessage(customText?: string): void {
    const text = (customText || this.newMessageText).trim();
    if (!text || !this.activeChatUser || !this.currentUserId) return;

    const partnerId = this.idOf(this.activeChatUser);

    // Cancel typing status immediately when message is sent
    this.chatService.sendTyping(this.currentUserId, partnerId, false);

    // Optimistic UI display
    const tempMessage: DirectMessage = {
      senderId: this.currentUserId,
      receiverId: partnerId,
      text,
      isRead: false,
      createdAt: new Date().toISOString(),
      isSending: true,
    };

    this.messages.push(tempMessage);
    this.newMessageText = '';
    this.scrollToBottom();

    // Send over WebSocket!
    this.chatService.sendSocketMessage(this.currentUserId, partnerId, text);
  }

  sendIceBreaker(text: string): void {
    this.sendMessage(text);
  }

  onInputKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  scrollToBottom(delay = 100): void {
    setTimeout(() => this.messageScroll?.scrollToBottom(250), delay);
  }

  isSender(msg: DirectMessage): boolean {
    return msg.senderId === this.currentUserId;
  }

  formatTime(dateString: string | Date): string {
    const date = new Date(dateString);
    if (!dateString || isNaN(date.getTime())) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatRelativeTime(dateString: string | Date): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const mins = Math.floor((Date.now() - date.getTime()) / 60000);

    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }

  toggleUserSwitcher(): void {
    this.showUserSwitcher = !this.showUserSwitcher;
  }

  switchUser(user: ChatUser): void {
    const id = this.idOf(user);
    this.authService.setCurrentUser({
      id,
      _id: id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      avatar: user.avatar,
      bio: user.bio,
      email: user.email,
    });
    this.showUserSwitcher = false;
    if (this.activeChatUser) this.closeChat();
    this.chatService.connectSocket(id);
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = this.defaultAvatar;
  }
}