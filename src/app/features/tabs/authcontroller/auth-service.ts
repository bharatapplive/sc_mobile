import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService as CoreAuthService } from '../../../core/services/auth.service';
import { PostService as CorePostService } from '../../../core/services/post.service';
import { CreatePostPayload } from './authInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private coreAuth: CoreAuthService,
    private postService: CorePostService,
  ) {}

  loadUserData(): Observable<any> {
    const current = this.coreAuth.getCurrentUser();
    if (current) {
      return of({
        _id: current._id || current.id || '',
        username: current.userName || current.username || current.firstName || 'User',
        avatarUrl: current.avatar || current.avatarUrl || 'assets/images/default-avatar.png',
      });
    }

    return this.coreAuth.currentUser$.pipe(
      map(user => ({
        _id: user?._id || user?.id || '',
        username: user?.userName || user?.username || user?.firstName || 'User',
        avatarUrl: user?.avatar || user?.avatarUrl || 'assets/images/default-avatar.png',
      }))
    );
  }

  createNewPost(payload: CreatePostPayload): Observable<any> {
    const current = this.coreAuth.getCurrentUser();
    const userId = payload.author?.userId || current?.id || current?._id || '';
    const userName = payload.author?.authorName || current?.userName || current?.username || payload.username || 'User';
    const userAvatar = payload.author?.avatarUrl || current?.avatar || '';

    return this.postService.createPost({
      userId,
      userName,
      userAvatar,
      postLink: payload.mediaUrl,
      caption: payload.caption,
      location: '',
    });
  }
}
