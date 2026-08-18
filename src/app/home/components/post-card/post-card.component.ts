import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonAvatar, IonButton } from '@ionic/angular/standalone';
import { Post } from '../../models/feed.model';
import { PostActionsComponent } from '../post-actions/post-actions.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonAvatar, IonButton, PostActionsComponent],
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;

  onLikeToggle(isLiked: boolean) {
    this.post.isLiked = isLiked;
    if (isLiked) {
      this.post.likes += 1;
    } else {
      this.post.likes -= 1;
    }
  }

  onBookmarkToggle(isBookmarked: boolean) {
    this.post.isBookmarked = isBookmarked;
  }
}
