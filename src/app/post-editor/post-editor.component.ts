import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { BlogPost } from '../shapes';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {
  @Output()
  postSubmit: EventEmitter<{ post: BlogPost, isSitePage: boolean }> = new EventEmitter();

  @Input()
  get post() {
    return this.previewPost;
  }
  set post(value: BlogPost) {
    this.postForm.patchValue(value);
  }

  postForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    dateTime: new FormControl(Date.now()),
    tags: new FormControl(''),
    id: new FormControl(''),
    slug: new FormControl('')
  });

  @Input()
  isSitePage = false;

  previewPost: any;

  constructor() { }

  ngOnInit() {
    this.postForm.valueChanges.pipe(debounceTime(100)).subscribe((values: BlogPost) => {
      this.previewPost = values;
    });
  }

  submitPost() {
    // TODO add validation
    this.postSubmit.emit({ post: this.previewPost, isSitePage: this.isSitePage });
  }
}
