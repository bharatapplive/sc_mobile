import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton],
})
export class PostActionsComponent {
  @Input() isLiked: boolean = false;
  @Input() isBookmarked: boolean = false;

  @Output() likeToggle = new EventEmitter<boolean>();
  @Output() commentClick = new EventEmitter<void>();
  @Output() shareClick = new EventEmitter<void>();
  @Output() bookmarkToggle = new EventEmitter<boolean>();

  toggleLike() {
    this.isLiked = !this.isLiked;
    this.likeToggle.emit(this.isLiked);
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.bookmarkToggle.emit(this.isBookmarked);
  }
}
