import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    mobile: string;
    image: string;
    bio: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface RegisterData {
    firstName: string;
    lastName?: string;
    userName: string;
    email: string;
    mobile: string;
    password: string;
}

const TOKEN_KEY = 'sc_token';
const USER_KEY = 'sc_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private api = `${environment.apiUrl}/auth`;

    // poori app ko pata rahe ki kaun login hai
    private userSubject = new BehaviorSubject<User | null>(this.readUser());
    user$ = this.userSubject.asObservable();

    constructor(private http: HttpClient) { }

    register(data: RegisterData): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.api}/register`, data)
            .pipe(tap((res) => this.saveSession(res)));
    }

    login(identifier: string, password: string): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.api}/login`, { identifier, password })
            .pipe(tap((res) => this.saveSession(res)));
    }

    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        this.userSubject.next(null);
    }
    refreshMe(): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/users/me`).pipe(
            tap((user) => {
                localStorage.setItem(USER_KEY, JSON.stringify(user));
                this.userSubject.next(user);
            }),
        );
    }
    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    get currentUser(): User | null {
        return this.userSubject.value;
    }

    private saveSession(res: AuthResponse): void {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        this.userSubject.next(res.user);
    }

    private readUser(): User | null {
        try {
            return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
        } catch {
            return null;
        }
    }
}