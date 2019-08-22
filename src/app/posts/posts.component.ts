import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../shapes';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'blog-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts: Observable<Array<BlogPost>>;
  constructor(private firebaseService: FirebaseService) {
    this.posts = this.firebaseService.getPosts();
  }
}
