import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  identity: string;
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

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    let res= this.http.post(this.loginUrl, credentials);
    console.log('Login request sent with credentials:', res);
    return res;
  }
}
