import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../shapes';
import { slugify, processTags } from '../utils';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private firebase: FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  async post({ post, isSitePage }: { post: BlogPost, isSitePage: boolean }) {
    await this.firebase.addPost({
      ...post,
      tags: processTags(post.tags),
      slug: post.slug || slugify(post.title)
    }, isSitePage ? 'pages' : undefined);
    this.router.navigate([isSitePage ? '' : 'post', post.slug]);
  }
}
