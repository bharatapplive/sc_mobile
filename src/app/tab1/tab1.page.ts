import { Component, ViewChild, signal } from '@angular/core';
import { AlertController } from '@ionic/angular/lazy';
import { Post, PostService } from '../core/services/post.service';
import { AuthService } from '../core/services/auth.service';
import { mediaUrl } from '../core/utils/media-url';
import { StoriesBarComponent } from '../stories-bar/stories-bar.component';
const PAGE_SIZE = 10;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  posts = signal<Post[]>([]);
  loading = signal(false);
  error = signal('');
  hasMore = signal(true);
  page = 1;
  myId = '';
  mediaUrl = mediaUrl;
  @ViewChild(StoriesBarComponent) storiesBar?: StoriesBarComponent;

  // naya post likhne wali screen
  composerOpen = signal(false);
  newText = '';
  newImage: File | null = null;
  newImagePreview = signal('');
  posting = signal(false);
  postError = signal('');

  constructor(
    private postService: PostService,
    private auth: AuthService,
    private alertCtrl: AlertController,
  ) { }

  ionViewWillEnter() {
    this.myId = this.auth.currentUser?._id ?? '';
    if (!this.posts().length) this.loadFirst();
  }

  loadFirst(event?: any) {
    this.storiesBar?.load();
    this.page = 1;
    this.loading.set(!event);
    this.error.set('');
    this.postService.getFeed(1, PAGE_SIZE).subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.hasMore.set(posts.length === PAGE_SIZE);
        this.loading.set(false);
        event?.target.complete();
      },
      error: () => {
        this.error.set('Could not load feed');
        this.loading.set(false);
        event?.target.complete();
      },
    });
  }

  loadMore(event: any) {
    this.postService.getFeed(this.page + 1, PAGE_SIZE).subscribe({
      next: (posts) => {
        this.page++;
        this.posts.update((list) => [...list, ...posts]);
        this.hasMore.set(posts.length === PAGE_SIZE);
        event.target.complete();
      },
      error: () => event.target.complete(),
    });
  }

  isLiked(post: Post) {
    return post.likes.includes(this.myId);
  }

  toggleLike(post: Post) {
    const liked = this.isLiked(post);
    this.patchPost(post._id, {
      likes: liked ? post.likes.filter((id) => id !== this.myId) : [...post.likes, this.myId],
    });
    this.postService.toggleLike(post._id).subscribe({
      error: () => this.patchPost(post._id, { likes: post.likes }),
    });
  }

  async confirmDelete(post: Post) {
    const alert = await this.alertCtrl.create({
      header: 'Delete post?',
      message: 'This cannot be undone.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Delete', role: 'destructive', handler: () => this.deletePost(post) },
      ],
    });
    await alert.present();
  }

  openComposer() {
    this.newText = '';
    this.clearImage();
    this.postError.set('');
    this.composerOpen.set(true);
  }

  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      this.postError.set('Image must be under 5 MB');
      return;
    }
    this.clearImage();
    this.newImage = file;
    this.newImagePreview.set(URL.createObjectURL(file));
  }

  clearImage() {
    if (this.newImagePreview()) URL.revokeObjectURL(this.newImagePreview());
    this.newImage = null;
    this.newImagePreview.set('');
  }

  submitPost() {
    const text = this.newText.trim();
    if (!text && !this.newImage) {
      this.postError.set('Write something or add a photo');
      return;
    }
    this.posting.set(true);
    this.postError.set('');
    this.postService.create(text, this.newImage ?? undefined).subscribe({
      next: (post) => {
        this.posts.update((list) => [post, ...list]);
        this.posting.set(false);
        this.composerOpen.set(false);
        this.clearImage();
      },
      error: (err) => {
        this.posting.set(false);
        const msg = err?.error?.message;
        this.postError.set(Array.isArray(msg) ? msg[0] : msg || 'Could not post');
      },
    });
  }

  timeAgo(date: string) {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (s < 60) return 'just now';
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d}d`;
    return new Date(date).toLocaleDateString();
  }

  private deletePost(post: Post) {
    this.postService.delete(post._id).subscribe({
      next: () => this.posts.update((list) => list.filter((p) => p._id !== post._id)),
    });
  }

  private patchPost(id: string, changes: Partial<Post>) {
    this.posts.update((list) => list.map((p) => (p._id === id ? { ...p, ...changes } : p)));
  }
}