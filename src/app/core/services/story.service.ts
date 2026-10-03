import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostAuthor } from './post.service';

export interface StoryItem {
    _id: string;
    image: string;
    caption: string;
    createdAt: string;
}

// ek user ki saari stories ek group mein
export interface StoryGroup {
    author: PostAuthor;
    stories: StoryItem[];
}

@Injectable({ providedIn: 'root' })
export class StoryService {
    private api = `${environment.apiUrl}/stories`;

    constructor(private http: HttpClient) { }

    getStories(): Observable<StoryGroup[]> {
        return this.http.get<StoryGroup[]>(this.api);
    }

    create(image: File, caption = ''): Observable<unknown> {
        const form = new FormData();
        form.append('image', image);
        form.append('caption', caption);
        return this.http.post(this.api, form);
    }

    delete(storyId: string) {
        return this.http.delete<{ deleted: boolean }>(`${this.api}/${storyId}`);
    }
}