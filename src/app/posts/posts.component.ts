import { Component } from '@angular/core';
import { BlogPost } from '../shapes';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute } from '@angular/router';
import { makeStateKey, Title } from '@angular/platform-browser';

@Component({
  selector: 'blog-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts: Observable<Array<BlogPost>>;
  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle('Aziz Yokubjonov\'s blog');

    const tag = this.route.snapshot.paramMap.get('tag');
    const dataSource = tag ? this.firebaseService.getPostsByTag(tag) : this.firebaseService.getPosts();
    const dataKey = makeStateKey(`posts/${tag}`);

    this.posts = firebaseService.getCachedObservable(dataSource, dataKey);
  }
}
