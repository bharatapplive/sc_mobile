import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { FeedPost } from '../home/feed-post.model';
import { FeedPostStoreService } from '../home/feed-post-store.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class AddPage {
  @ViewChild('mediaPicker') private mediaPicker?: ElementRef<HTMLInputElement>;

  caption = '';
  location = '';
  hashtags = '';
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  mediaName = '';
  errorMessage = '';
  isPublishing = false;

  constructor(
    private readonly postStore: FeedPostStoreService,
    private readonly router: Router,
    private readonly toastController: ToastController,
  ) {}

  get canPublish(): boolean {
    return !!this.mediaUrl && !!this.caption.trim() && !this.isPublishing;
  }

  openMediaPicker(): void {
    this.mediaPicker?.nativeElement.click();
  }

  selectMedia(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      this.errorMessage = 'Choose an image or video file.';
      input.value = '';
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      this.errorMessage = 'Choose a file smaller than 25 MB.';
      input.value = '';
      return;
    }

    if (this.mediaUrl) URL.revokeObjectURL(this.mediaUrl);
    this.mediaUrl = URL.createObjectURL(file);
    this.mediaType = file.type.startsWith('video/') ? 'video' : 'image';
    this.mediaName = file.name;
    this.errorMessage = '';
  }

  removeMedia(): void {
    if (this.mediaUrl) URL.revokeObjectURL(this.mediaUrl);
    this.mediaUrl = undefined;
    this.mediaType = undefined;
    this.mediaName = '';
  }

  async publish(): Promise<void> {
    if (this.isPublishing) return;
    if (!this.mediaUrl || !this.caption.trim()) {
      this.errorMessage = 'Add a photo or video and write a caption before publishing.';
      return;
    }

    this.isPublishing = true;
    this.errorMessage = '';
    const tags = this.hashtags
      .split(/[,\s]+/)
      .map((tag) => tag.trim().replace(/^#/, ''))
      .filter(Boolean)
      .map((tag) => `#${tag}`)
      .join(' ');
    const caption = [this.caption.trim(), tags].filter(Boolean).join(' ');
    const post: FeedPost = {
      id: Date.now(),
      username: 'ayushi.singh',
      name: 'Ayushi Singh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160',
      location: this.location.trim() || 'India',
      image: this.mediaUrl,
      mediaType: this.mediaType,
      caption,
      time: 'Just now',
      likes: 0,
      comments: [],
      liked: false,
      saved: false,
      commentsOpen: false,
      commentDraft: '',
    };

    this.postStore.add(post);
    this.isPublishing = false;
    const toast = await this.toastController.create({
      message: 'Your moment is now in your feed.',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
    await this.router.navigateByUrl('/tabs/home');
  }
}
