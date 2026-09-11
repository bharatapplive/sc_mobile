import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//any i dont know- no type safe

// thos is type safe interface for the feed post response
export interface FeedMediaItem {
  id: string;
  type: string;
  url: string;
  thumbnail: string;
  aspectRatio: number;
  width: number;
  height: number;
  altText: string;
}

export interface FeedPostResponse {
  fullName: string;
  userName: string;
  avatar: string;
  location: string;
  media: FeedMediaItem[];
  caption: string;
  likesCount: number;
  isLikedByMe: boolean;
  isBookmarkedByMe: boolean;
  commentsCount: number;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly feedUrl = 'http://localhost:3000/feed';

  constructor(private http: HttpClient) {}

  getFeed(): Observable<FeedPostResponse[]> {
    return this.http.get<FeedPostResponse[]>(this.feedUrl);
  }
}


// step 1  create a feed server
// step 2  api call to fetch the feed data from the Feed API ('http://localhost:3000/feed';)
// ste 3 move to controller and create a service to handle the api call