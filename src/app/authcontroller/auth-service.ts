import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse, User } from './authInterface';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
private currentUserSubject = new BehaviorSubject<User | null>(null);
  constructor(
    private http: HttpClient,
    private router: Router
  ){}
  
  //1. REGISTER...
  register(userData: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, userData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Server side error during registration:', error);
        return throwError(() => new Error(error.error?.message || 'Server error occurred'));
      })
    );
  }

  // 2. VERIFICATION...
  verifyOtp(payload: { userId: string; otpCode: string }): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/verify-otp`, payload);
  }

  // 3. Upload Image...
  uploadAnImage(userid: string, file: File){
    
    const formData = new FormData();
    formData.append('avatar', file, file.name);

    return this.http.post(`${environment.apiUrl}/auth/${userid}/avatar`, formData)
  }

  // 4. LOGIN DATA AND SET TOKEN AT LOCAL STORAGE...
  login(identity: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, {identity, password}).pipe
      (tap((user)=> 
        {
          if (user && user.jwt) {
            alert(`${user.message} ${user.user.username}`)
            localStorage.setItem('accessToken', user.jwt);
          }
        })
    );
  }

  // 5. GET TOKEN..
  getToken(): string | null {
    const token =  localStorage.getItem('accessToken');
    return token;
  }

  // 6. LogOut
  logout(): void {
    this.http.post(`${environment.apiUrl}/auth/logout`, {}, { withCredentials: true }).pipe(
      finalize(() => {
        // Runs ALWAYS whether the backend request succeeds or fails
        localStorage.removeItem('accessToken');
        sessionStorage.clear();
        this.currentUserSubject.next(null);
        this.router.navigate(['/login'], { replaceUrl: true });
      })
    ).subscribe(); // Trigger the Observable execution
  }

}
