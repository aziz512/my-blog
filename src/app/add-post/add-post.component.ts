import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { BlogPost } from '../shapes';
import { FirebaseService } from '../firebase.service';
import { slugify } from '../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    dateTime: new FormControl(Date.now()),
    tags: new FormControl('')
  });

  previewPost: any;

  constructor(private firebase: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.postForm.valueChanges.pipe(debounceTime(100)).subscribe((values: BlogPost) => {
      this.previewPost = values;
    });
  }

  async submitPost() {
    // TODO add validation
    await this.firebase.addPost({
      ...this.previewPost,
      tags: this.previewPost.tags.split(','),
      slug: slugify(this.previewPost.title)
    });
    this.router.navigate(['/']);
  }
}
