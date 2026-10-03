import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation, MessageService } from '../core/services/message.service';
import { PostAuthor } from '../core/services/post.service';
import { mediaUrl } from '../core/utils/media-url';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  conversations = signal<Conversation[]>([]);
  loading = signal(false);
  error = signal('');
  mediaUrl = mediaUrl;

  // naya chat: users search
  searchOpen = signal(false);
  searchResults = signal<PostAuthor[]>([]);
  searching = signal(false);

  constructor(private messageService: MessageService, private router: Router) { }

  // har baar tab khulne pe refresh (unread count update ho)
  ionViewWillEnter() {
    this.load();
  }

  load(event?: any) {
    if (!event && !this.conversations().length) this.loading.set(true);
    this.error.set('');
    this.messageService.conversations().subscribe({
      next: (list) => {
        this.conversations.set(list);
        this.loading.set(false);
        event?.target.complete();
      },
      error: () => {
        this.error.set('Could not load chats');
        this.loading.set(false);
        event?.target.complete();
      },
    });
  }

  openChat(userId: string) {
    this.searchOpen.set(false);
    this.router.navigate(['/chat', userId]);
  }

  openSearch() {
    this.searchResults.set([]);
    this.searchOpen.set(true);
    this.runSearch('');
  }

  onSearch(event: any) {
    this.runSearch(event.detail.value ?? '');
  }

  private runSearch(query: string) {
    this.searching.set(true);
    this.messageService.searchUsers(query).subscribe({
      next: (users) => {
        this.searchResults.set(users);
        this.searching.set(false);
      },
      error: () => this.searching.set(false),
    });
  }

  timeAgo(date: string) {
    const m = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (m < 1) return 'now';
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h`;
    return new Date(date).toLocaleDateString();
  }
}