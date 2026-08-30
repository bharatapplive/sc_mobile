import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface userData {
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
  private apiUrl = `${environment.apiUrl}/auth/create`;
  constructor(private http: HttpClient) { }


  register(userData: any) {
    return this.http.post(this.apiUrl, userData);
  }

  // getCurrentUser(): userData | null {
  //   const raw = localStorage.getItem('currentUser');
  //   if (raw) {
  //     try {
  //       return JSON.parse(raw);
  //     } catch {
  //       return null;
  //     }
  //   }
  //   return null;
  // }
}
