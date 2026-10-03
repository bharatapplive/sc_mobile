import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostAuthor } from './post.service';

export interface ChatMessage {
    _id: string;
    from: string;
    to: string;
    text: string;
    read: boolean;
    createdAt: string;
}

export interface Conversation {
    user: PostAuthor;
    lastMessage: string;
    lastAt: string;
    lastFromMe: boolean;
    unread: number;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
    private api = environment.apiUrl;

    constructor(private http: HttpClient) { }

    conversations(): Observable<Conversation[]> {
        return this.http.get<Conversation[]>(`${this.api}/messages/conversations`);
    }

    chat(userId: string, before?: string): Observable<ChatMessage[]> {
        let params = new HttpParams();
        if (before) params = params.set('before', before);
        return this.http.get<ChatMessage[]>(`${this.api}/messages/${userId}`, { params });
    }

    send(userId: string, text: string): Observable<ChatMessage> {
        return this.http.post<ChatMessage>(`${this.api}/messages/${userId}`, { text });
    }

    searchUsers(query: string): Observable<PostAuthor[]> {
        const params = new HttpParams().set('search', query);
        return this.http.get<PostAuthor[]>(`${this.api}/users`, { params });
    }

    getUser(id: string): Observable<PostAuthor> {
        return this.http.get<PostAuthor>(`${this.api}/users/${id}`);
    }
    markRead(userId: string) {
        return this.http.patch(`${this.api}/messages/${userId}/read`, {});
    }
}