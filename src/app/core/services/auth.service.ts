import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  mobile?: string;
  identity?: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  user?: unknown;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl = 'http://localhost:3000/auth/login';
  private readonly tokenKey = 'jwt_token';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, credentials);
  }

  setToken(token: string): void {
    // setItem to save in local storage
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
