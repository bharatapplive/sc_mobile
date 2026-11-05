import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeedPost } from './feed-post.model';

@Injectable({ providedIn: 'root' })
export class FeedPostStoreService {
  private readonly createdPostsSubject = new BehaviorSubject<FeedPost[]>([]);
  readonly createdPosts$ = this.createdPostsSubject.asObservable();

  add(post: FeedPost): void {
    this.createdPostsSubject.next([post, ...this.createdPostsSubject.value]);
  }
}
