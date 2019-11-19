import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { User } from 'firebase';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'blog-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input()
  postId: string;

  currentUser: Observable<User>;

  commentForm = new FormGroup({
    text: new FormControl('')
  });

  constructor(private firebase: FirebaseService, private auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
  }

  async onSubmit() {
    const val = this.commentForm.value;
    if (val.text) {

    }
    await this.firebase.postComment(val, this.postId);
    this.commentForm.setValue({ text: '' });
  }

  signIn() {
    this.auth.signIn();
  }
  signOut() {
    this.auth.signOut();
  }
}
