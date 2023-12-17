import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl, { params: { _expand: 'user' } });
  }

  getPostById(postId: number): Observable<Post[]> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.get<Post[]>(url);
  }

  createPost(post: any): Observable<Post[]> {
    return this.http.post<Post[]>(this.apiUrl, post);
  }

  updatePost(postId: number, post: any): Observable<Post[]> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.put<Post[]>(url, post);
  }

  deletePost(postId: number): Observable<Post[]> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.delete<Post[]>(url);
  }
}
