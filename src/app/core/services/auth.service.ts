import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// Payload sent from the login screen to the backend.
export interface LoginRequest {
  mobile?: string;
  password: string;
}

// Response returned by the backend after successful login.
export interface LoginResponse {
  token?: string;
  user?: any;
  message?: string;
}

// Shared state that all pages/components can read.
export interface SessionState {
  token: string | null;
  user: any;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // API endpoint for login.
  private readonly loginUrl = 'http://localhost:3000/auth/login';
  private readonly profileImageUrl = 'http://localhost:3000/auth/image';

  // Local storage keys.
  private readonly tokenKey = 'jwt_token';
  private readonly userKey = 'auth_user';

  //step 1  create a behaviour subject to hold the current session state for the whole app.
  // BehaviorSubject holds the current session state for the whole app.
  // only once for seesion u create behaviour
  private readonly sessionSubject = new BehaviorSubject<SessionState>({
    token: this.getStoredToken(),
    user: this.getStoredUser(),
    isAuthenticated: !!this.getStoredToken(),
  });

  // step 2 make sessionSubject asObsserable so that other pages/components can subscribe to it and get notified of changes.
  // Observable used by other pages/components to subscribe.
  readonly session$ = this.sessionSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Call backend login API.

  // step 1 login component will call auth service login method 
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, credentials);
  }

  uploadProfileImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<any>(this.profileImageUrl, formData);
  }

  // Save token + user and notify every subscriber.
  saveSession(token: string, user: any): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
// this is ur gate pass
    this.sessionSubject.next({
      token,
      user,
      isAuthenticated: true,
    });
  }

  // step 3 use this method to get the current session state without subscribing. This is useful for synchronous checks, like in route guards.
  // Read current session immediately without subscribing.
  getSession(): SessionState {
    // this is to call ur gate pass
    return this.sessionSubject.getValue();
  }

  // Read token from local storage.
  getToken(): string | null {
    return this.getStoredToken();
  }

  // Clear session and reset all subscribers.
  clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);

    this.sessionSubject.next({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  }

  // Helper for checking whether user is logged in.
  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  // Private helper to read token from local storage.
  private getStoredToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Private helper to read user from local storage.
  private getStoredUser(): any {
    const value = localStorage.getItem(this.userKey);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
}

