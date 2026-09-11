import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './authInterface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  
  constructor(
    private http: HttpClient,
    private router: Router
  ){}
  
  // 1. FETCH ALL USERS.....
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

  // 2. FETCH USER BY ID.....
  loadUserDataById(userId: string) {
    return this.http.get<User>(`${environment.apiUrl}/auth/${userId}`).pipe(
      map((user) => {
        if (user) {
          const baseUrl = environment.apiUrl.replace(/\/(auth|post)\/?$/, '') || 'http://localhost:3000';
          
          const formatUrl = (path?: string): string => {
            const trimmed = path?.trim();
            if (!trimmed) return 'assets/images/default-avatar.png';
            if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
            return `${baseUrl}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
          };

          return {
            ...user,
            avatarUrl: formatUrl(user.avatarUrl)
          };
        }
        return user;
      })
    );
  }
}
