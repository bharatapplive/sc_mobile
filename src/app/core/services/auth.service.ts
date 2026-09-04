import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface UserData {
  id?: string;
  _id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  userName?: string;
  username?: string;
  email?: string;
  mobile?: string;
  avatarUrl?: string;
  avatar?: string;
  role?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserData | null>(this.loadUserFromStorage());
  public currentUser$: Observable<UserData | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Clean up legacy mock data key from localStorage
    localStorage.removeItem('users');
  }

  private loadUserFromStorage(): UserData | null {
    const raw = localStorage.getItem('currentUser');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  }

  getCurrentUser(): UserData | null {
    return this.currentUserSubject.value || this.loadUserFromStorage();
  }

  setCurrentUser(user: UserData | null) {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(user);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/create`, userData);
  }

  login(credentials: { identity: string; password: string }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap((res: any) => {
        if (res?.user) {
          this.setCurrentUser(res.user);
        }
      })
    );
  }

  updateAvatar(userId: string, avatar: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/update-avatar`, { userId, avatar }).pipe(
      tap((res: any) => {
        const current = this.getCurrentUser();
        if (current) {
          current.avatar = avatar;
          this.setCurrentUser(current);
        }
      })
    );
  }

  logout() {
    this.setCurrentUser(null);
  }
}
