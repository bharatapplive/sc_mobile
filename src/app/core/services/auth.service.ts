import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// =========================
// LOGIN
// =========================

export interface LoginRequest {
  mobile: string;
  password: string;
}

export interface LoginUser {
  _id: string;
  mobile: string;
  role: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  user: LoginUser;
}


// =========================
// REGISTRATION
// =========================

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  userName: string;
  mobile: string;
  password: string;
  email?: string;
}

export interface RegisterResponse {
  message: string;
  user?: LoginUser;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly loginUrl =
    'http://localhost:3000/auth/login';

  private readonly registerUrl =
    'http://localhost:3000/auth/create';


  constructor(
    private http: HttpClient
  ) {}


  // =========================
  // LOGIN API
  // =========================

  login(
    credentials: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      this.loginUrl,
      credentials
    );
  }


  // =========================
  // REGISTRATION API
  // =========================

  register(
    credentials: RegisterRequest
  ): Observable<RegisterResponse> {

    return this.http.post<RegisterResponse>(
      this.registerUrl,
      credentials
    );
  }

}