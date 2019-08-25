import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'blog-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
    this.postForm.valueChanges.pipe(debounceTime(1000)).subscribe(values => {
      console.log(values);
    });
  }

}
