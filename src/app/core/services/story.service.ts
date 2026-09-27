import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private readonly storyUrl = 'http://localhost:3000/story';

  constructor(private http: HttpClient) {}
// step 4 : Create a new story API call in the story service to send the form data to the backend.
  createStory(story: FormData): Observable<any> {
    return this.http.post<any>(this.storyUrl, story);
  }
}