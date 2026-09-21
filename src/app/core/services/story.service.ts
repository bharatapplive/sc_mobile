import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private readonly storyUrl = 'http://localhost:3000/story';

  constructor(private http: HttpClient) {}

  createStory(story: FormData): Observable<any> {
    return this.http.post<any>(this.storyUrl, story);
  }
}