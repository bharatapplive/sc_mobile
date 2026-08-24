import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface UserData {
  fullName?: string;
  UserName?: string;
  username?: string;
  email?: string;
  mobile?: string;
  avatarUrl?: string;
  avatar?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  loadUserData(): Observable<UserData> {
    const raw = localStorage.getItem('currentUser');
    if (raw) {
      try {
        const user: UserData = JSON.parse(raw);
        return of(user);
      } catch (e) {
        console.error('Error parsing currentUser from localStorage:', e);
      }
    }
    return of({} as UserData);
  }

  getCurrentUser(): UserData | null {
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
}
