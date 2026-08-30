import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatePostPayload, LoginResponse, PostResponse, User } from './authInterface';

//#region media
export type PostType = 'post' | 'story' | 'reel';

export interface OverlayText {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
}

export interface MediaComposerState {
  type: PostType;
  mediaBlob: Blob | null;
  mediaUrl: string | null;
  audioTrackUrl: string | null;
  caption: string;
  overlayTexts: OverlayText[];
  aspectRatio: '1:1' | '9:16' | '4:5';
}

//#endregion

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

//#region Create Login and Registration..
  

  //1. REGISTER
  register(userData: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, userData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Server side error during registration:', error);
        return throwError(() => new Error(error.error?.message || 'Server error occurred'));
      })
    );
  }

  // 2.LOGIN
  login(identity: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`,{identity, password}).pipe(
      tap((user)=>
      {
        if (user && user.accessToken) {
          alert(`${user.message} ${user.user.username}`)
          // Save token and user info locally
          localStorage.setItem('userID', JSON.stringify(user.user._id));
          localStorage.setItem('accessToken', user.accessToken);
        }
      })
    );
  }

  // 3. LOGOUT
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userID');
    this.router.navigate(['/login']);
  }

  // 4. VerifyOtp..
  verifyOtp(payload: { userId: string; otpCode: string }): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/verify-otp`, payload);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  //#endregion

//#region MEDIA DATA
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
  
  // 5. Get User Profile..
  loadUserData() {
    const rawId = localStorage.getItem('userID');
    const userId = rawId ? JSON.parse(rawId) : null;
    return this.http.get<User>(`${environment.apiUrl}/auth/${userId}`);
  }

  // 6. Create the post...
  createNewPost(postData: CreatePostPayload): Observable<PostResponse>{
    return this.http.post<PostResponse>(`${environment.apiUrl}/post`, postData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Server side error during registration:', error);
        return throwError(() => new Error(error.error?.message || 'Server error occurred'));
      })
    );
  }

  // 7. Load the post...
  loadPostData(){
    
    const rawId = localStorage.getItem('userID');
    const userId = rawId ? JSON.parse(rawId) : null;

    return this.http.get<PostResponse>(`${environment.apiUrl}/post/${encodeURIComponent(userId)}`);
  }

  // 8. Load the whole post...
  loadAllPost(){
    return this.http.get<PostResponse>(`${environment.apiUrl}/post`);
  }

  updateLikes(postId: string, userId:string): Observable<any>{

    return this.http.patch(`${environment.apiUrl}/post/${postId}/like`, {userId});
  }
}
