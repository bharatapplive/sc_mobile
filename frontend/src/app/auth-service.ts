import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
  _id?: string;
  email: string;
  phoneNumber: string;
  username: string;
  fullname: string;
  accessToken?: string;

  password?: string;
  avatarUrl?: string;
  postNumber?: number;
  followerNumber?: number;
  followingNumber?: number;
  profileBio?: string;
}

export interface CreatePostPayload {
  userId: string;
  author: string;
  caption?: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  hashtags?: string[];
  likesCount?: number;
  commentsCount?: number;
}

export interface PostResponse extends CreatePostPayload {
  _id: string;
  likes: string[];
  likesCount: number;
  commentsCount: number;
  createdDate: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = signal<boolean>(false);

  currentUser = signal<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // App start hone par saved user check karo
    this.loadSavedUser();
  }

  // =========================================================
  // LOAD SAVED USER
  // =========================================================

  private loadSavedUser(): void {
    const savedUser = localStorage.getItem('currentUser');

    if (savedUser) {
      try {
        const user: User = JSON.parse(savedUser);

        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch (error) {
        console.error('Invalid saved user data');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userID');
      }
    }
  }

  // =========================================================
  // REGISTER
  // =========================================================

  register(userData: User): Observable<User> {


    return this.http.post<User>(`${environment.apiUrl}/auth/create-account`, userData)
      .pipe(

        tap((user) => {
          console.log('Registration successful:', user);
        }),

        catchError((error: HttpErrorResponse) => {

          console.error(
            'Registration error:',
            error
          );

          return throwError(() => error);
        })
      );
  }

  // =========================================================
  // LOGIN
  // =========================================================

  login(
    identity: string,
    password: string
  ): Observable<User> {

    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { identity, password })
      .pipe(

        tap((user: User) => {

          console.log('Login successful:', user);
          console.log('ACCESS TOKEN:', user.accessToken);

          // Global user state
          this.currentUser.set(user);

          // Authentication state
          this.isAuthenticated.set(true);

          // Save complete user
          localStorage.setItem(
            'currentUser',
            JSON.stringify(user)
          );

          // Save user ID separately
          if (user._id) {
            localStorage.setItem(
              'userID',
              user._id
            );
          }

          // Save JWT access token
          if (user.accessToken) {
            localStorage.setItem(
              'accessToken',
              user.accessToken
            );

            console.log(
              'JWT access token saved successfully.'
            );
          } else {
            console.warn(
              'JWT access token was not received from backend.'
            );
          }
        }),

        catchError((error: HttpErrorResponse) => {

          console.error(
            'Login error:',
            error
          );

          return throwError(() => error);
        })
      );
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  logout(): void {

    this.currentUser.set(null);

    this.isAuthenticated.set(false);

    localStorage.removeItem('currentUser');
    localStorage.removeItem('userID');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('uploadPro');

    this.router.navigate(['/login']);
  }

  // =========================================================
  // VERIFY OTP
  // =========================================================

  verifyOtp(
    payload: {
      userId: string;
      otp: string;
    }
  ): Observable<User> {

    return this.http.post<User>(`${environment.apiUrl}/auth/verify-otp`, payload)
      .pipe(

        tap((user) => {
          console.log('OTP verification successful:', user);
        }),

        catchError((error: HttpErrorResponse) => {

          console.error(
            'OTP verification error:',
            error
          );

          return throwError(() => error);
        })
      );
  }

  // =========================================================
  // GET USER PROFILE
  // =========================================================

  loadUserData(): Observable<User> {

    const userId = localStorage.getItem('userID');

    if (!userId) {
      return throwError(
        () => new Error('User ID not found')
      );
    }

    return this.http.get<User>(
      `${environment.apiUrl}/user/${userId}`
    );
  }

  // =========================================================
  // CREATE POST
  // =========================================================

  createNewPost(
    postData: CreatePostPayload
  ): Observable<PostResponse> {

    return this.http
      .post<PostResponse>(
        `${environment.apiUrl}/post`,
        postData
      )
      .pipe(

        catchError((error: HttpErrorResponse) => {

          console.error(
            'Create post error:',
            error
          );

          return throwError(() => error);
        })
      );
  }

  // =========================================================
  // LOAD POSTS
  // =========================================================

  loadPostData(): Observable<PostResponse> {

    const userId = localStorage.getItem('userID');

    if (!userId) {
      return throwError(
        () => new Error('User ID not found')
      );
    }

    return this.http.get<PostResponse>(
      `${environment.apiUrl}/post?userId=${encodeURIComponent(userId)}`
    );
  }
}