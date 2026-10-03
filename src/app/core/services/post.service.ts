import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PostAuthor {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    image: string;
}

export interface Post {
    _id: string;
    author: PostAuthor;
    text: string;
    image: string;
    likes: string[];
    createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class PostService {
    private api = `${environment.apiUrl}/posts`;

    constructor(private http: HttpClient) { }

    getFeed(page = 1, limit = 10): Observable<Post[]> {
        const params = new HttpParams().set('page', page).set('limit', limit);
        return this.http.get<Post[]>(this.api, { params });
    }

    create(text: string, image?: File): Observable<Post> {
        const form = new FormData();
        form.append('text', text);
        if (image) form.append('image', image);
        return this.http.post<Post>(this.api, form);
    }

    toggleLike(postId: string) {
        return this.http.post<{ liked: boolean; likesCount: number }>(`${this.api}/${postId}/like`, {});
    }

    delete(postId: string) {
        return this.http.delete<{ deleted: boolean }>(`${this.api}/${postId}`);
    }
}