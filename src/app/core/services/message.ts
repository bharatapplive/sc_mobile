import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly messageUrl = 'http://localhost:3000/direct-message';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}
  // mobile will have vinay shankar's mobile number and then we will send it to backend to get all users with whom vinay shankar has chat history
  getUsers(mobile: string): Observable<any[]> {
    if (!this.authService.getSession().isAuthenticated) {
      return of([]);
    }
    // we are calling backend api to get all users
    return this.http.post<any[]>('http://localhost:3000/auth/users', {
      mobile,
    });
  }
  getMessages(): Observable<any[]> {
    if (!this.authService.getSession().isAuthenticated) {
      return of([]);
    }

    return this.http.get<any[]>(this.messageUrl);
  }
}
