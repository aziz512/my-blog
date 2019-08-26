import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../shapes';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'blog-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts: Observable<Array<BlogPost>>;
  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute) {
    const tag = this.route.snapshot.paramMap.get('tag');
    this.posts = tag ? this.firebaseService.getPostsByTag(tag) : this.firebaseService.getPosts();
  }
}
