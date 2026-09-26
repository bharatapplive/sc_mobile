import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse, SessionState, User } from './authInterface';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  
  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  private readonly tokenKey = "access_Token";

  // Session 1.Create session state for whole app..
  private readonly sessionSubject = new BehaviorSubject<SessionState>( this.getInitialState());

  // Session 2.make sessonSubject observable so that other pages can subscribe.. 
  readonly session$ = this.sessionSubject.asObservable();
  
  //1. REGISTER  NEW USER...
  register(userData: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, userData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Server side error during registration:', error);
        return throwError(() => new Error(error.error?.message || 'Server error occurred'));
      })
    );
  }

  // 2. USER VERIFICATION...
  verifyOtp(payload: { userId: string; otpCode: string }): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/verify-otp`, payload);
  }

  // 3. PROFILE PHOTO OF USER...
  uploadAnImage(userid: string, file: File){
    
    const formData = new FormData();
    formData.append('avatar', file, file.name);

    return this.http.post(`${environment.apiUrl}/auth/${userid}/avatar`, formData)
  }

  // 4. LOGIN DATA AND SET TOKEN AT LOCAL STORAGE...
  login(identity: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, {identity, password});
  }

  // 5. LogOut
  logout(): void {
    this.http.post(`${environment.apiUrl}/auth/logout`, {}, { withCredentials: true }).pipe(
      finalize(() => {
        // Runs ALWAYS whether the backend request succeeds or fails
        this.clearSession();
        this.router.navigate(['/login'], { replaceUrl: true });
      })
    ).subscribe(); // Trigger the Observable execution
  }
  
  // 6. Save SESSION..
  saveSession(token: string){
    localStorage.setItem(this.tokenKey, token);

    this.sessionSubject.next({
      token, isAuthenticated: true
    });
  }

  // 7. Session Initialize...
  private getInitialState(): SessionState {
    const token = localStorage.getItem(this.tokenKey);

    return {
      token: token || null,
      isAuthenticated: !!token,
    };
  }

  // 8. Get SESSION..
  // Session 3. Use this method to get the current session state without subscribing...
  // 8. GetSession
  getSession(): SessionState{
    return this.sessionSubject.getValue();
  }

  // 9. Clear the session..
  clearSession(): void {
    localStorage.removeItem(this.tokenKey);

    this.sessionSubject.next({
      token: null,
      isAuthenticated: false,
    });
  }

  // 10. Get All users
  allUsers(): Observable<User[]> {
    const backendUrl = environment.apiUrl.replace(/\/auth\/?$/, '') || 'http://localhost:3000';

    return this.http.get<User[]>(`${environment.apiUrl}/auth`).pipe(
      map((users: User[]) => {
        if (!Array.isArray(users)) return [];

        return users.map((user) => {
          const avatar = user.avatarUrl?.trim();
          let formattedAvatar = 'assets/images/default-avatar.png';

          if (avatar) {
            if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
              formattedAvatar = avatar;
            } else {
              formattedAvatar = `${backendUrl}${avatar.startsWith('/') ? '' : '/'}${avatar}`;
            }
          }

          return {
            ...user,
            avatarUrl: formattedAvatar
          };
        });
      })
    );
  }
}
