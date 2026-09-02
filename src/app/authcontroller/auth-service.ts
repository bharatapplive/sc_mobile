import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatePostPayload, LoginResponse, MediaComposerState, OverlayText, PostResponse, PostType, User } from './authInterface';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
private currentUserSubject = new BehaviorSubject<User | null>(null);
  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  //#region CREATE / REGISTRATION USER DATA...
  
  //1. REGISTER...
  register(userData: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, userData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Server side error during registration:', error);
        return throwError(() => new Error(error.error?.message || 'Server error occurred'));
      })
    );
  }

  // 2. VERIFICATION...
  verifyOtp(payload: { userId: string; otpCode: string }): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/verify-otp`, payload);
  }

  // 3. Upload Image...
  uploadAnImage(userid: string, file: File){
    
    const formData = new FormData();
    formData.append('avatar', file, file.name);

    return this.http.post(`${environment.apiUrl}/auth/${userid}/avatar`, formData)
  }

  // 4. POST CREATION...
  createNewPost(postData: CreatePostPayload): Observable<PostResponse>{
    return this.http.post<PostResponse>(`${environment.apiUrl}/post`, postData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Server side error during registration:', error);
        return throwError(() => new Error(error.error?.message || 'Server error occurred'));
      })
    );
  }

  //#endregion
 
  //#region LOADING DATA FROM API SERVER...............
  
  // 1. LOGIN DATA...
  login(identity: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, {identity, password}).pipe
      (tap((user)=> 
        {
          if (user && user.jwt) {
            alert(`${user.message} ${user.user.username}`)
            localStorage.setItem('accessToken', user.jwt);
          }
        })
    );
  }

  // 2. USER DATA...
  loadUserData(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/user`).pipe(
      map((user) => {
        if (user) {
          const avatar = user.avatarUrl?.trim();
          let formattedAvatar = 'assets/images/default-avatar.png';

          if (avatar) {
            // 1. Keep absolute URLs (e.g. S3, Cloudinary)
            if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
              formattedAvatar = avatar;
            } else {
              // 2. Prepend backend server URL to relative paths
              // Note: If environment.apiUrl contains '/auth', clean it up to get the domain root
              const backendUrl = environment.apiUrl.replace(/\/auth\/?$/, '') || 'http://localhost:3000';
              formattedAvatar = `${backendUrl}${avatar.startsWith('/') ? '' : '/'}${avatar}`;
            }
          }

          // Return updated user object with fully formatted avatarUrl
          return {
            ...user,
            avatarUrl: formattedAvatar
          };
        }
        return user;
      })
    );
  }

  // 2. LOAD ALL POST....
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

  // 3. LOAD SINGLE POST...
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

  // 4. LogOut
  logout(): void {
    this.http.post(`${environment.apiUrl}/auth/logout`, {}, { withCredentials: true }).pipe(
      finalize(() => {
        // Runs ALWAYS whether the backend request succeeds or fails
        localStorage.removeItem('accessToken');
        sessionStorage.clear();
        this.currentUserSubject.next(null);
        this.router.navigate(['/login'], { replaceUrl: true });
      })
    ).subscribe(); // Trigger the Observable execution
  }
  //#endregion

  //#region MEDIA DATA.....

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

  getToken(): string | null {
    const token =  localStorage.getItem('accessToken');
    return token;
  }

  // updateLikes(postId: string, userId:string): Observable<any>{

  //   return this.http.patch(`${environment.apiUrl}/post/${postId}/like`, {userId});
  // }
}
