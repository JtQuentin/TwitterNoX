import { Component } from '@angular/core';
import { PostService } from '../post/post.service';
import { AuthService } from '../auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  posts: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private postService: PostService, private authService: AuthService, private router: Router) {
    this.loadPosts();
    this.checkLoginStatus();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des posts', error);
      }
    );
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isUserConnected();
  }

  login() {
    this.router.navigate(['/login']);
  }
}
