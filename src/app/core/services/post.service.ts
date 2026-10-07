import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CreatePostRequest {
  userId: string;
  userName: string;
  userAvatar?: string;
  postLink: string;
  caption?: string;
  location?: string;
}

export interface LikedUser {
  id: string;
  userName: string;
  fullName: string;
  avatar?: string;
  bio?: string;
}

export interface PostCommentItem {
  _id?: string;
  userId?: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: string;
}

export interface ApiPost {
  _id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  postLink: string;
  caption?: string;
  location?: string;
  likesCount: number;
  likedBy?: string[];
  commentsCount: number;
  comments?: PostCommentItem[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = `${environment.apiUrl}/post`;

  constructor(private http: HttpClient) {}

  createPost(payload: CreatePostRequest): Observable<{ message: string; post: ApiPost }> {
    return this.http.post<{ message: string; post: ApiPost }>(`${this.baseUrl}/create`, payload);
  }

  getFeedPosts(limit: number = 30, skip: number = 0): Observable<{ posts: ApiPost[]; total: number }> {
    return this.http.get<{ posts: ApiPost[]; total: number }>(`${this.baseUrl}/feed?limit=${limit}&skip=${skip}`);
  }

  getUserPosts(userId: string): Observable<{ posts: ApiPost[] }> {
    return this.http.get<{ posts: ApiPost[] }>(`${this.baseUrl}/user/${userId}`);
  }

  updatePost(id: string, data: { caption?: string; location?: string }): Observable<{ message: string; post: ApiPost }> {
    return this.http.put<{ message: string; post: ApiPost }>(`${this.baseUrl}/${id}`, data);
  }

  deletePost(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}/${id}`);
  }

  toggleLike(postId: string, userId: string): Observable<{ post: ApiPost; isLiked: boolean; likesCount: number }> {
    return this.http.post<{ post: ApiPost; isLiked: boolean; likesCount: number }>(
      `${this.baseUrl}/${postId}/like`,
      { userId },
    );
  }

  getPostLikes(postId: string): Observable<{ users: LikedUser[]; count: number }> {
    return this.http.get<{ users: LikedUser[]; count: number }>(`${this.baseUrl}/${postId}/likes`);
  }

  getPostComments(postId: string): Observable<{ comments: PostCommentItem[]; count: number }> {
    return this.http.get<{ comments: PostCommentItem[]; count: number }>(`${this.baseUrl}/${postId}/comments`);
  }

  addComment(
    postId: string,
    data: { userId?: string; userName: string; userAvatar?: string; text: string },
  ): Observable<{ success: boolean; comment: PostCommentItem; commentsCount: number }> {
    return this.http.post<{ success: boolean; comment: PostCommentItem; commentsCount: number }>(
      `${this.baseUrl}/${postId}/comment`,
      data,
    );
  }
}
