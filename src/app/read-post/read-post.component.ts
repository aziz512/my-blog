import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost, Comment } from '../shapes';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'blog-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.scss']
})
export class ReadPostComponent implements OnInit {
  post$: Observable<BlogPost>;
  comments$: Observable<Comment[]>;
  isSitePage = false;

  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute,
              private titleService: Title, private router: Router) {
  }

  async ngOnInit() {
    const currentRoute = this.route.snapshot;

    let path: string;
    this.isSitePage = currentRoute.url[0].path !== 'post';
    if (this.isSitePage) {
      path = 'pages';
    }

    const slug = currentRoute.paramMap.get('slug');
    this.post$ = this.firebaseService.getPostBySlug(slug, path);
    const post = await this.post$.toPromise();
    if (!post) {
      this.router.navigate(['']);
      return;
    }

    this.titleService.setTitle(post.title + ' - Aziz Yokubjonov');
    this.comments$ = !this.isSitePage ? this.firebaseService.getCommentsForPost(post.id) : null;
  }

}
