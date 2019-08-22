import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'blog-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input()
  postId: string;

  commentForm = new FormGroup({
    name: new FormControl(''),
    text: new FormControl('')
  });

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
  }

  async onSubmit() {
    const val = this.commentForm.value;
    await this.firebase.postComment(val, this.postId);
    this.commentForm.setValue({name: '', text: ''});
  }

}
