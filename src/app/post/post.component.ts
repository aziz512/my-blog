import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { BlogPost } from '../shapes';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { textifyHtml } from '../utils';

@Component({
  selector: 'blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PostComponent {
  constructor(private meta: Meta) { }

  // tslint:disable-next-line: variable-name
  private _post: BlogPost;
  @Input()
  set post(value: BlogPost) {
    this._post = value;
    if (value) {
      this.meta.updateTag({ name: 'description', content: textifyHtml(value.content, 200) });
      this.meta.updateTag({ name: 'keywords', content: value.tags.toString() });
      this.meta.updateTag({ name: 'og:description', content: textifyHtml(value.content, 200) });
      this.meta.updateTag({ property: 'og:title', content: value.title });
    }
  }
  get post() {
    return this._post;
  }

  @Input()
  comments: Comment[];
  @Input()
  isSitePage: boolean;

  sharePostOnSM(target: string) {
    let url;
    const pageURL = encodeURIComponent(window.location.href);
    switch (target) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${pageURL}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?href=${pageURL}`;
        break;
      default:
        url = `https://twitter.com/intent/tweet?text=${this.post.title}&url=${pageURL}`;
        break;
    }

    window.open(url, 'Share', 'width=550, height=250');
  }
}
