import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BlogPost } from '../shapes';
import { Observable, BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'blog-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts: Observable<Array<BlogPost>>;
  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute, private meta: Meta,
    // tslint:disable-next-line: ban-types
              @Inject(PLATFORM_ID) private platformId: Object,
              private state: TransferState) {
    const tag = this.route.snapshot.paramMap.get('tag');
    const dataSource = tag ? this.firebaseService.getPostsByTag(tag) : this.firebaseService.getPosts();
    const dataKey = makeStateKey(`posts/${tag}`);

    this.posts = firebaseService.getCachedObservable(dataSource, dataKey);
  }
}
