import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { postLengthValidator } from '../../@shared/validators';
import { PostService } from '../post.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService, private authService: AuthService) {
    this.postForm = this.fb.group({
      postContent: ['', [Validators.required, postLengthValidator()]],
    });
  }

  onSubmit() {
    const postContentControl = this.postForm.get('postContent');

    if (postContentControl?.value) {
      const postContent = postContentControl.value;
      const userId = this.authService.user?.id;
      const createdAt = new Date();

      if (userId) {
        this.postService.createPost({
          content: postContent,
          userId: userId,
          createdAt: createdAt.toISOString()
        }).subscribe(
          (response: any) => {
            console.log('Post créé avec succès', response);
            this.postForm.reset();
          },
          (error: any) => {
            console.error('Erreur lors de la création du post', error);
          }
        );
      }
    }
  }
}
