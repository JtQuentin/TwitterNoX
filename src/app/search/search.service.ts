import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:3000/searchResults';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    const url = `${this.apiUrl}?q=${query}`;
    return this.http.get<any[]>(url);
  }
}
