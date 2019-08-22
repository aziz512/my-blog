import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'blog-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: any;

  constructor() { }

  ngOnInit() {
  }

}
