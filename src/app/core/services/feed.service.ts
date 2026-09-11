import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly feedUrl = 'http://localhost:3000/feed';

  constructor(private http: HttpClient) {}

  getFeed(): Observable<any[]> {
    return this.http.get<any[]>(this.feedUrl);
  }
}


// step 1  create a feed server
// step 2  api call to fetch the feed data from the Feed API ('http://localhost:3000/feed';)
// ste 3 move to controller and create a service to handle the api call