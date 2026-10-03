import { Component, ViewChild, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular/lazy';
import { Subscription } from 'rxjs';
import { ChatMessage, MessageService } from '../core/services/message.service';
import { PostAuthor } from '../core/services/post.service';
import { AuthService } from '../core/services/auth.service';
import { SocketService, IncomingMessage } from '../core/services/socket.service';
import { mediaUrl } from '../core/utils/media-url';

const PAGE_SIZE = 50;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false,
})
export class ChatPage {
  @ViewChild(IonContent) content?: IonContent;

  otherId = '';
  myId = '';
  other = signal<PostAuthor | null>(null);
  messages = signal<ChatMessage[]>([]);
  newText = signal('');
  loading = signal(true);
  sending = signal(false);
  hasOlder = signal(false);
  loadingOlder = signal(false);
  error = signal('');
  mediaUrl = mediaUrl;
  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private auth: AuthService,
    private socket: SocketService,
  ) { }

  ionViewWillEnter() {
    this.myId = this.auth.currentUser?._id ?? '';
    this.otherId = this.route.snapshot.paramMap.get('userId') ?? '';
    this.socket.activeChatUserId = this.otherId; // is chat ke liye popup mat dikhao

    this.messageService.getUser(this.otherId).subscribe({
      next: (u) => this.other.set(u),
      error: () => this.error.set('User not found'),
    });
    this.loadMessages();

    // real-time
    this.subs = new Subscription();
    this.subs.add(this.socket.newMessage$.subscribe((msg) => this.onIncoming(msg)));
    this.subs.add(
      this.socket.read$.subscribe((e) => {
        if (e.by === this.otherId) {
          // saamne wale ne padh liya, toh mere saare messages ✓✓
          this.messages.update((list) => list.map((m) => (this.isMine(m) ? { ...m, read: true } : m)));
        }
      }),
    );
  }

  ionViewWillLeave() {
    this.socket.activeChatUserId = null;
    this.subs.unsubscribe(); // page chhodte waqt sunna band karo
  }

  loadMessages() {
    this.loading.set(true);
    this.messageService.chat(this.otherId).subscribe({
      next: (msgs) => {
        this.messages.set(msgs);
        this.hasOlder.set(msgs.length === PAGE_SIZE);
        this.loading.set(false);
        this.scrollToBottom(0);
        this.socket.refreshUnread(); // backend ne read mark kar diye, badge update karo
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Could not load messages');
      },
    });
  }

  loadOlder() {
    const oldest = this.messages()[0];
    if (!oldest) return;
    this.loadingOlder.set(true);
    this.messageService.chat(this.otherId, oldest.createdAt).subscribe({
      next: (older) => {
        this.messages.update((list) => [...older, ...list]);
        this.hasOlder.set(older.length === PAGE_SIZE);
        this.loadingOlder.set(false);
      },
      error: () => this.loadingOlder.set(false),
    });
  }

  send() {
    const text = this.newText().trim();
    if (!text || this.sending()) return;
    this.sending.set(true);
    this.error.set('');
    this.messageService.send(this.otherId, text).subscribe({
      next: (msg) => {
        this.addMessage(msg);
        this.newText.set('');
        this.sending.set(false);
      },
      error: (err) => {
        this.sending.set(false);
        const m = err?.error?.message;
        this.error.set(Array.isArray(m) ? m[0] : m || 'Could not send');
      },
    });
  }

  isMine(m: ChatMessage) {
    return m.from === this.myId;
  }

  showDay(i: number) {
    if (i === 0) return true;
    const list = this.messages();
    return new Date(list[i - 1].createdAt).toDateString() !== new Date(list[i].createdAt).toDateString();
  }

  dayLabel(date: string) {
    const d = new Date(date).toDateString();
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (d === today.toDateString()) return 'Today';
    if (d === yesterday.toDateString()) return 'Yesterday';
    return new Date(date).toLocaleDateString();
  }

  time(date: string) {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private onIncoming(msg: IncomingMessage) {
    const inThisChat =
      (msg.from === this.otherId && msg.to === this.myId) ||
      (msg.from === this.myId && msg.to === this.otherId);
    if (!inThisChat) return;

    this.addMessage(msg);
    // chat khuli hai, toh aaya hua message turant "read"
    if (msg.from === this.otherId) this.messageService.markRead(this.otherId).subscribe();
  }

  // ek message do baar na jude (HTTP aur socket dono se aata hai)
  private addMessage(msg: ChatMessage) {
    if (this.messages().some((m) => m._id === msg._id)) return;
    this.messages.update((list) => [...list, msg]);
    this.scrollToBottom();
  }

  private scrollToBottom(duration = 300) {
    setTimeout(() => this.content?.scrollToBottom(duration), 50);
  }
}