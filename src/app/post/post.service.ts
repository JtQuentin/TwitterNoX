import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPostById(postId: number): Observable<any> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.get<any>(url);
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }

  updatePost(postId: number, post: any): Observable<any> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.put<any>(url, post);
  }

  deletePost(postId: number): Observable<any> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.delete<any>(url);
  }
}
