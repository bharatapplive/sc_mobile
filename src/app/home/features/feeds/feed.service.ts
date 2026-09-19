import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommentResponse, StoryItem } from "src/app/core/authcontroller/authInterface";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class FeedService {

    constructor(
        private http: HttpClient,
        private router: Router
    ){}

    loadStory(){
        return this.http.get<StoryItem>(`${environment.apiUrl}/story`).pipe(
            
        );
    }

    createNewComment(comments: CommentResponse): Observable<CommentResponse>{
        return this.http.post<CommentResponse>(`${environment.apiUrl}/comments`, comments).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Server side error during registration:', error);
                return throwError(() => new Error(error.error?.message || 'Server error occurred'));
            })
        );
    }

    getCommentsByFeed(id: string): Observable<any[]>{
        return this.http.get<any[]>(`${environment.apiUrl}/comments/${id}`).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Server side error during registration:', error);
                return throwError(() => new Error(error.error?.message || 'Server error occurred'));
            })
        );
    }
}