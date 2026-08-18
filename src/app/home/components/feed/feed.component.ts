import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '../post-card/post-card.component';
import { Post } from '../../models/feed.model';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: true,
  imports: [CommonModule, PostCardComponent],
})
export class FeedComponent {
  posts: Post[] = []

  constructor(private feedService: FeedService){}
  ngOnInit() {
    this.posts = this.feedService.getPosts()
  }

}