import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { BlogPost } from '../shapes';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PostComponent {
  @Input()
  post: BlogPost;
  @Input()
  comments: Comment[];
}
