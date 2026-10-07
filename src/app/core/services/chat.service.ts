import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';

export interface ChatUser {
  id: string;
  _id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatar?: string;
  bio?: string;
  email?: string;
  isOnline?: boolean;
}

export interface DirectMessage {
  _id?: string;
  id?: string;
  senderId: string;
  receiverId: string;
  text: string;
  mediaUrl?: string;
  isRead: boolean;
  createdAt: string | Date;
  isSending?: boolean;
}

export interface ConversationItem {
  partnerId: string;
  partner: ChatUser;
  lastMessage: {
    text: string;
    createdAt: string | Date;
    senderId: string;
    isRead: boolean;
  };
  unreadCount: number;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private api = `${environment.apiUrl}/chat`;
  private socket: Socket | null = null;
  private currentConnectedUserId: string | null = null;

  // Real-time WebSocket Event Subjects
  readonly newMessage$ = new Subject<DirectMessage>();
  readonly userTyping$ = new Subject<{ userId: string; isTyping: boolean }>();
  readonly messagesRead$ = new Subject<{ readBy: string }>();
  readonly userStatus$ = new Subject<{ userId: string; isOnline: boolean }>();
  readonly onlineUsers$ = new Subject<string[]>();
  readonly conversationUpdated$ = new Subject<{ partnerId: string; lastMessage: any }>();

  constructor(private http: HttpClient) {}

  // ------------------------------------------
  // WebSocket Connection Management
  // ------------------------------------------

  connectSocket(userId: string): void {
    if (!userId) return;

    if (this.socket && this.currentConnectedUserId === userId && this.socket.connected) {
      return;
    }

    if (this.socket) {
      this.disconnectSocket();
    }

    this.currentConnectedUserId = userId;

    this.socket = io(environment.apiUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      this.socket?.emit('join', { userId });
    });

    this.socket.on('receive_message', (msg: DirectMessage) => {
      this.newMessage$.next(msg);
    });

    this.socket.on('message_sent', (msg: DirectMessage) => {
      this.newMessage$.next(msg);
    });

    this.socket.on('user_typing', (data: { userId: string; isTyping: boolean }) => {
      this.userTyping$.next(data);
    });

    this.socket.on('messages_read', (data: { readBy: string }) => {
      this.messagesRead$.next(data);
    });

    this.socket.on('user_status', (data: { userId: string; isOnline: boolean }) => {
      this.userStatus$.next(data);
    });

    this.socket.on('online_users', (users: string[]) => {
      this.onlineUsers$.next(users);
    });

    this.socket.on('conversation_updated', (data: { partnerId: string; lastMessage: any }) => {
      this.conversationUpdated$.next(data);
    });
  }

  disconnectSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.currentConnectedUserId = null;
    }
  }

  isSocketConnected(): boolean {
    return !!this.socket?.connected;
  }

  // ------------------------------------------
  // Real-time WebSocket Emitters
  // ------------------------------------------

  sendSocketMessage(
    senderId: string,
    receiverId: string,
    text: string,
    mediaUrl?: string
  ): void {
    if (this.socket?.connected) {
      this.socket.emit('send_message', { senderId, receiverId, text, mediaUrl });
    } else {
      // Fallback to HTTP POST if socket temporarily disconnected
      this.sendMessage(senderId, receiverId, text, mediaUrl).subscribe();
    }
  }

  sendTyping(senderId: string, receiverId: string, isTyping: boolean): void {
    if (this.socket?.connected) {
      this.socket.emit('typing', { senderId, receiverId, isTyping });
    }
  }

  sendMarkRead(userId: string, otherUserId: string): void {
    if (this.socket?.connected) {
      this.socket.emit('mark_read', { userId, otherUserId });
    }
    this.markAsRead(userId, otherUserId).subscribe();
  }

  // ------------------------------------------
  // REST API Endpoints (For initial loads)
  // ------------------------------------------

  getConversations(userId: string): Observable<ConversationItem[]> {
    return this.http.get<ConversationItem[]>(`${this.api}/conversations/${userId}`);
  }

  getMessages(userId1: string, userId2: string): Observable<DirectMessage[]> {
    return this.http.get<DirectMessage[]>(`${this.api}/messages/${userId1}/${userId2}`);
  }

  sendMessage(
    senderId: string,
    receiverId: string,
    text: string,
    mediaUrl?: string
  ): Observable<DirectMessage> {
    return this.http.post<DirectMessage>(`${this.api}/send`, {
      senderId,
      receiverId,
      text,
      mediaUrl,
    });
  }

  markAsRead(userId: string, otherUserId: string): Observable<any> {
    return this.http.post<any>(`${this.api}/mark-read`, { userId, otherUserId });
  }

  getUsers(currentUserId?: string, search?: string): Observable<ChatUser[]> {
    const params: Record<string, string> = {};
    if (currentUserId) params['currentUserId'] = currentUserId;
    if (search?.trim()) params['search'] = search.trim();

    return this.http.get<ChatUser[]>(`${this.api}/users`, { params });
  }
}