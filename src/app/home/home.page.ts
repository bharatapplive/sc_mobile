import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  IonicModule,
  ToastController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FeedPost, FeedComment } from './feed-post.model';
import { FeedPostStoreService } from './feed-post-store.service';

interface Story {
  id: string;
  username: string;
  avatar: string;
  isOwn?: boolean;
}

interface SuggestedPerson {
  username: string;
  name: string;
  avatar: string;
  followed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
})
export class HomePage implements OnDestroy {
  private readonly createdPostsSubscription: Subscription;

  readonly currentAvatar =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces';

  stories: Story[] = [
    { id: 'you', username: 'Your story', avatar: this.currentAvatar, isOwn: true },
    {
      id: 'riya',
      username: 'riya.sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160',
    },
    {
      id: 'kabir',
      username: 'kabir.creates',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces',
    },
    {
      id: 'sana',
      username: 'sana.travels',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&h=160&fit=crop&crop=faces',
    },
    {
      id: 'arjun',
      username: 'arjun.frames',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=faces',
    },
    {
      id: 'meera',
      username: 'meera.inbloom',
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=160&h=160&fit=crop&crop=faces',
    },
  ];

  posts: FeedPost[] = [
    {
      id: 1,
      username: 'sana.travels',
      name: 'Sana Kapoor',
      avatar: this.stories[3].avatar,
      location: 'Jaipur, Rajasthan',
      image:
        'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&auto=format&fit=crop',
      caption:
        'A little pink-city magic, best enjoyed slowly. Got lost in the old lanes and found my new favourite chai spot. ✨ #JaipurDiaries #IncredibleIndia',
      time: '2 hours ago',
      likes: 1284,
      comments: [
        { username: 'riya.sharma', text: 'Adding this to my weekend list 💜' },
        { username: 'kabir.creates', text: 'The colours are unreal!' },
      ],
      liked: false,
      saved: false,
      commentsOpen: false,
      commentDraft: '',
    },
    {
      id: 2,
      username: 'kabir.creates',
      name: 'Kabir Mehta',
      avatar: this.stories[2].avatar,
      location: 'Marine Drive, Mumbai',
      image:
        'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&auto=format&fit=crop',
      caption:
        'The city slows down for exactly one sunset, then it’s back to its beautiful chaos. 🌇 #MumbaiMoments',
      time: '5 hours ago',
      likes: 863,
      comments: [{ username: 'arjun.frames', text: 'That light! 🔥' }],
      liked: false,
      saved: false,
      commentsOpen: false,
      commentDraft: '',
    },
  ];

  suggestions: SuggestedPerson[] = [
    {
      username: 'arjun.frames',
      name: 'Arjun Mehta',
      avatar: this.stories[4].avatar,
      followed: false,
    },
    {
      username: 'meera.inbloom',
      name: 'Meera Iyer',
      avatar: this.stories[5].avatar,
      followed: false,
    },
    {
      username: 'riya.sharma',
      name: 'Riya Sharma',
      avatar: this.stories[1].avatar,
      followed: false,
    },
  ];

  constructor(
    private readonly actionSheetController: ActionSheetController,
    private readonly alertController: AlertController,
    private readonly toastController: ToastController,
    postStore: FeedPostStoreService,
  ) {
    this.createdPostsSubscription = postStore.createdPosts$.subscribe((createdPosts) => {
      const displayedIds = new Set(this.posts.map((post) => post.id));
      const newPosts = createdPosts.filter((post) => !displayedIds.has(post.id));
      this.posts.unshift(...newPosts);
    });
  }

  ngOnDestroy(): void {
    this.createdPostsSubscription.unsubscribe();
  }

  async openStory(story: Story): Promise<void> {
    if (story.isOwn) {
      document.getElementById('story-picker')?.click();
      return;
    }

    const alert = await this.alertController.create({
      header: story.username,
      message: 'You’re all caught up on this story.',
      buttons: ['Close'],
    });
    await alert.present();
  }

  addStory(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      void this.showToast('Choose an image to add to your story.');
      input.value = '';
      return;
    }

    this.stories[0] = {
      id: `story-${Date.now()}`,
      username: 'Your story',
      avatar: URL.createObjectURL(file),
      isOwn: true,
    };
    void this.showToast('Your story is ready to share.');
    input.value = '';
  }

  toggleLike(post: FeedPost): void {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  }

  toggleSave(post: FeedPost): void {
    post.saved = !post.saved;
    void this.showToast(post.saved ? 'Saved to your collection.' : 'Removed from saved posts.');
  }

  toggleComments(post: FeedPost): void {
    post.commentsOpen = !post.commentsOpen;
  }

  addComment(post: FeedPost): void {
    const text = post.commentDraft.trim();
    if (!text) return;
    post.comments.push({ username: 'ayushi.singh', text });
    post.commentDraft = '';
  }

  async sharePost(post: FeedPost): Promise<void> {
    const shareData = {
      title: `Post by ${post.name} on Social Circle`,
      text: post.caption,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        await this.showToast('Post link copied to clipboard.');
      } else {
        await this.showToast('Sharing is not available in this browser.');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      console.error('Unable to share post', error);
      await this.showToast('Could not share this post. Please try again.');
    }
  }

  async openPostMenu(post: FeedPost): Promise<void> {
    const sheet = await this.actionSheetController.create({
      header: `Post by ${post.username}`,
      buttons: [
        {
          text: 'Not interested',
          icon: 'eye-off-outline',
          handler: () => {
            post.hidden = true;
            void this.showToast('We’ll show you fewer posts like this.');
          },
        },
        {
          text: 'Report post',
          icon: 'flag-outline',
          handler: () => void this.showToast('Thanks. This post has been reported for review.'),
        },
        { text: 'Cancel', role: 'cancel' },
      ],
    });
    await sheet.present();
  }

  toggleFollow(suggestion: SuggestedPerson): void {
    suggestion.followed = !suggestion.followed;
  }

  async loadMore(event: CustomEvent): Promise<void> {
    const morePosts = this.posts.filter((post) => !post.hidden).map((post) => ({
      ...post,
      id: Date.now() + post.id,
      time: 'Just now',
      liked: false,
      saved: false,
      commentsOpen: false,
      commentDraft: '',
      comments: [...post.comments],
    }));
    this.posts.push(...morePosts);
    await (event.target as HTMLIonInfiniteScrollElement).complete();
  }

  trackPost(_: number, post: FeedPost): number {
    return post.id;
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2200,
      position: 'bottom',
    });
    await toast.present();
  }
}
