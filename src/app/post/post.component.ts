import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'], // 
})
export class PostComponent {
  @Input() post: any;
  compteur: number = 0;

  constructor() {

  }

  plusOne() {
    this.compteur++;
  }
}
