import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../shapes';

@Component({
  selector: 'blog-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  _post: BlogPost;

  @Input()
  get post() {
    return this._post;
  }
  set post(value: BlogPost) {
    this._post = value;
  }


  constructor() {
  }

  ngOnInit() {
  }

}
