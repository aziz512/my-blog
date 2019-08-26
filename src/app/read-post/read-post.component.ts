import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost, Comment } from '../shapes';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'blog-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.scss']
})
export class ReadPostComponent implements OnInit {
  post$: Observable<BlogPost>;
  comments$: Observable<Comment[]>;

  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute, private titleService: Title) {
  }

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.post$ = this.firebaseService.getPostBySlug(slug);
    const { id, title } = await this.post$.toPromise();
    this.comments$ = this.firebaseService.getCommentsForPost(id);
    this.titleService.setTitle(title);
  }

}
