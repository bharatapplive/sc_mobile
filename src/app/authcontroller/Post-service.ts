import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatePostPayload, MediaComposerState, OverlayText, PostResponse, PostType } from './authInterface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
 
  constructor(
    private readonly http: HttpClient,
    private router: Router
  ){}

  // 1. CREATE THE POST
  createNewPost(postData: CreatePostPayload): Observable<PostResponse>{
    return this.http.post<PostResponse>(`${environment.apiUrl}/post`, postData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Server side error during registration:', error);
        return throwError(() => new Error(error.error?.message || 'Server error occurred'));
      })
    );
  }

  //#region MEDIA FILE...
  private initialState: MediaComposerState = {
    type: 'story',
    mediaBlob: null,
    mediaUrl: null,
    audioTrackUrl: null,
    caption: '',
    overlayTexts: [],
    aspectRatio: '9:16'
  };

  private state$ = new BehaviorSubject<MediaComposerState>(this.initialState);
  public current$ = this.state$.asObservable();

  setType(type: PostType) {
    const ratio = type === 'post' ? '1:1' : '9:16';
    this.state$.next({ ...this.state$.value, type, aspectRatio: ratio });
  }

  setMedia(blob: Blob, url: string) {
    this.state$.next({ ...this.state$.value, mediaBlob: blob, mediaUrl: url });
  }

  setAudio(audioUrl: string) {
    this.state$.next({ ...this.state$.value, audioTrackUrl: audioUrl });
  }

  addTextOverlay(text: string, color = '#ffffff', fontSize = 24) {
    const newText: OverlayText = {
      id: Date.now().toString(),
      text,
      x: 50, // center percentages
      y: 50,
      color,
      fontSize
    };
    const currentOverlays = this.state$.value.overlayTexts;
    this.state$.next({ ...this.state$.value, overlayTexts: [...currentOverlays, newText] });
  }

  updateCaption(caption: string) {
    this.state$.next({ ...this.state$.value, caption });
  }

  reset() {
    this.state$.next(this.initialState);
  }
  //#endregion

  // 2. ALL FEEDS....
  loadAllPost(){
    return this.http.get<PostResponse>(`${environment.apiUrl}/post`).pipe(
      map((user) => {
        if (user) {
          if (!user) return user;

          // Clean base origin URL regardless of trailing paths like /auth or /post
          const baseUrl = environment.apiUrl.replace(/\/(auth|post)\/?$/, '') || 'http://localhost:3000';
          
          const formatUrl = (path?: string): string => {
            const trimmed = path?.trim();
            if (!trimmed) return 'assets/images/default-avatar.png';
            if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
            return `${baseUrl}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
          };

          // Return updated user object with fully formatted avatarUrl
          if (Array.isArray(user)) {
            return user.map((post) => ({
              ...post,
              author: post.author
                ? { ...post.author, avatarUrl: formatUrl(post.author.avatarUrl) }
                : post.author
            }));
          }
        }
        return user;
      })
    );
  }

  // 3. FEEDS DATA....
  loadPostData(){
    return this.http.get<PostResponse>(`${environment.apiUrl}/post/user`).pipe(
      map((user) => {
        if (user) {
          if (!user) return [];
          // Clean base origin URL regardless of trailing paths like /auth or /post
          const baseUrl = environment.apiUrl.replace(/\/(auth|post)\/?$/, '') || 'http://localhost:3000';
          
          const formatUrl = (path?: string): string => {
            const trimmed = path?.trim();
            if (!trimmed) return 'assets/images/default-avatar.png';
            if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
            return `${baseUrl}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
          };

          // Return updated user object with fully formatted avatarUrl
          if (Array.isArray(user)) {
            return user.map((post) => ({
              ...post,
              author: post.author
                ? { ...post.author, avatarUrl: formatUrl(post.author.avatarUrl) }
                : post.author
            }));
          }
        }
        console.log(user);
        return user;
      })
    );
  }

  // 4. UPDATE LIKES
  updateLikes(postId: string): Observable<any>{

    return this.http.patch(`${environment.apiUrl}/post/${postId}/like`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Server side error during like update:', error);
        return throwError(() => new Error(error.error?.message || 'Server error occurred'));
      })
    );
  }
}
