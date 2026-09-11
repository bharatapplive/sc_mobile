import { Component, OnInit } from '@angular/core';
import {
  FeedMediaItem,
  FeedPostResponse,
  FeedService,
} from '../core/services/feed.service';

export type FeedPost = FeedPostResponse;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: false,
})
export class FeedPage implements OnInit {
  feed: FeedPost[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.feedService.getFeed().subscribe({
      next: (response) => {
        // step 4 feed is the variable wgere we store the data from the API response caoming from service
        // . If the response is null or undefined, we assign an empty array to feed.
         this.feed = response || [];
         // step 5 i need to show all data in frontend
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message || 'Unable to load the feed.';
      },
    });
  }

  getPrimaryMedia(post: FeedPost): FeedMediaItem | undefined {
    return post?.media?.[0];
  }

  formatTimeAgo(dateString: string): string {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffHours = Math.max(1, Math.round(diffMs / (1000 * 60 * 60)));

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }

    const diffDays = Math.max(1, Math.round(diffHours / 24));
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }
}
