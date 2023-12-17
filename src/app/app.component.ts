import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'TwitterNo𝕏';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.checkLoginStatus();
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

}
