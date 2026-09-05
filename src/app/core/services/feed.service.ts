import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class FeedService {
	private readonly feedUrl = 'http://localhost:3000/feed';

	constructor(private http: HttpClient) {}

	getFeed(): Observable<unknown> {
		return this.http.get(this.feedUrl);
	}
}
