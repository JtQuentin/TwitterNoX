import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, switchMap } from 'rxjs';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: { id: number; username: string; } | undefined;
  private profileService: ProfileService | undefined;

  constructor(private http: HttpClient,) { }

  addUser(user: { username: string; password: string; }): Observable<any> {
    return this.http.post('http://localhost:3000/users', user).pipe(
      switchMap((response: any) => {
        this.user = response;
        if (this.profileService) {
          return this.profileService.createProfileForUser(response.id);
        } else {
          return of(response);
        }
      })
    );
  }

  login(user: { username: string; password: string; }) {
    return this.http.get('http://localhost:3000/users?username=' + user.username + '&password=' + user.password);
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
  }

  saveUser() {
    localStorage.setItem('user', '' + this.user?.id);
  }

  getSavedUser() {
    return localStorage.getItem('user');
  }

  isUserConnected() {
    if (this.user) {
      this.saveUser();
      return true;
    } else if (this.getSavedUser()) {
      this.getSavedUserInfo().subscribe((user: any) => {
        this.user = user[0];
        return true;
      });
    }
    return false;
  }

  private getSavedUserInfo() {
    return this.http.get('http://localhost:3000/users?id=' + this.getSavedUser());
  }

  setProfileService(profileService: ProfileService) {
    this.profileService = profileService;
  }
}