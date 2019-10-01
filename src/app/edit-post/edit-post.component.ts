import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../shapes';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { processTags } from '../utils';

@Component({
  selector: 'blog-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post: BlogPost | any = {};
  isPage = false;

  constructor(private route: ActivatedRoute, private firebase: FirebaseService, private router: Router) { }

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    this.isPage = !!this.route.snapshot.queryParamMap.get('isPage');
    this.firebase.getPostById(postId, this.isPage ? 'pages' : undefined).subscribe(post => {
      this.post = post;
      if (!post) {
        this.router.navigate(['admin']);
      }
    });
  }

  async save({ isSitePage, post }: { post: BlogPost, isSitePage: boolean }) {
    await this.firebase.updatePost({
      ...this.post,
      content: post.content,
      title: post.title,
      tags: processTags(post.tags),
      slug: post.slug
    }, this.isPage ? 'pages' : undefined);
    this.router.navigate([this.isPage ? '' : 'post', post.slug]);
  }

}
