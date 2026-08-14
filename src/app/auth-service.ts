import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

export interface User{
  _id?: string,
  username: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  
  isAuthenticated = signal<boolean>(false);

  private apiUrl = 'http://localhost:3000/user';

  // Signals for managing global user state
  currentUser = signal<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  //1. REGISTER
  register(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Server side error during registration:', error);
        return throwError(() => new Error(error.error?.message || 'Server error occurred'));
      })
    );
  }

  // 2.LOGIN
  login(identity: string, password: string): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/login`,{identity, password}).pipe(
      tap((user)=>
      {
        this.currentUser.set(user);
        localStorage.setItem('userID', JSON.stringify(user._id));
      })
    );
  }

  // 3. LOGOUT
  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  // 4. VerifyOtp
  verifyOtp(payload: { userId: string; otp: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, payload);
  }
}
