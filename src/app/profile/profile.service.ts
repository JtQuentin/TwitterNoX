// profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.setProfileService(this);
  }

  getProfileByUserId(userId: number): Observable<any> {
    return this.http.get<any[]>(this.apiUrl, { params: { userId: userId.toString() } });
  }

  createProfileForUser(userId: number): Observable<any> {
    const defaultProfile = {
      userId: userId,
      username: this.authService.user?.username || '',
      bio: '',
      birthDay: null,
      birthMonth: null
    };

    return this.http.post<any>(this.apiUrl, defaultProfile);
  }

  updateProfile(profileId: number, updates: any): Observable<any> {
    const url = `${this.apiUrl}/${profileId}`;
    return this.http.put<any>(url, updates);
  }
}
