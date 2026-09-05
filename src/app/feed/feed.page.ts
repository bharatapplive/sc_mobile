import { Component, OnInit } from '@angular/core';
import { FeedService } from '../core/services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: false,
})
export class FeedPage implements OnInit {
  feed: unknown;
  isLoading = false;
  errorMessage = '';

  constructor(private feedService: FeedService) {}

  // it calls default on page load
  ngOnInit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.feedService.getFeed().subscribe({
      next: (response) => {
        this.feed = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message || 'Unable to load the feed.';
      },
    });
  }
}
