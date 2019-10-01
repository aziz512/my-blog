import { Component, OnInit, EventEmitter } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { BlogPost } from '../shapes';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'blog-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  $searchQuery: EventEmitter<string> = new EventEmitter();
  $filteredPosts: EventEmitter<BlogPost[]> = new EventEmitter();
  $pages: Observable<BlogPost[]>;

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    this.firebase.getPosts().subscribe(posts => {
      this.$filteredPosts.emit(posts);
      this.$searchQuery.pipe(debounceTime(200)).subscribe(query => {
        if (query) {
          query = query.toLowerCase();
          const results = posts.filter(post => {
            return post.title.toLowerCase().includes(query)
              || post.content.toLowerCase().includes(query)
              || post.id.toLowerCase().includes(query);
          });
          this.$filteredPosts.emit(results);
        } else {
          this.$filteredPosts.emit(posts);
        }
      });
    });
    this.$pages = this.firebase.getPosts(undefined, 'pages');
  }

  searchFieldValueChange(event) {
    this.$searchQuery.emit(event);
  }

  async deletePost(postId: string, isPage: boolean) {
    if (!confirm('Do you really wanna delete it?')) {
      return;
    }
    await this.firebase.deletePost(postId, isPage ? 'pages' : undefined);
  }
}
