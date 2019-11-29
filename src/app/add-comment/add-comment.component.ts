import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { User } from 'firebase/app';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

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
    this.currentUser.pipe(take(1)).subscribe(user => {
      const comment = { ...this.commentForm.value, uid: user.uid };
      this.firebase.postComment(comment, this.postId);
      this.commentForm.setValue({ text: '' });
    });
  }

  signIn() {
    this.auth.signIn();
  }
  signOut() {
    this.auth.signOut();
  }
}
