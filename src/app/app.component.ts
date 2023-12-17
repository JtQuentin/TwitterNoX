import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'TwitterNo𝕏';
  isLoggedIn: boolean = false;
  searchQuery: string = '';
  fb: FormBuilder = new FormBuilder(); 
  searchForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.checkLoginStatus();
    this.searchForm = this.fb.group({
      searchForm: ['']
    });
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isUserConnected();
  }

  login() {
    this.router.navigate(['/login']).then(() => {
      this.checkLoginStatus();
    });
  }

  toProfile() {
    this.router.navigate(['/profile']);
  }

  search() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
  }

}
