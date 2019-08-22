import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { BlogPost } from '../shapes';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post$: Observable<BlogPost>;
  comments$: Observable<Comment[]>;

  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.post$ = this.firebaseService.getPostById(id);
    this.comments$ = this.firebaseService.getCommentsForPost(id);
  }

}
