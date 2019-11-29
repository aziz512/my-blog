import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { BlogPost, Comment } from './shapes';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { TransferState } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private postsDir = 'posts';
  // tslint:disable-next-line: ban-types
  constructor(private db: AngularFirestore, private functions: AngularFireFunctions,
              @Inject(PLATFORM_ID) private platformId: any,
              private state: TransferState) {
  }

  getPosts(queryFn: ((q: Query) => Query) = (q: Query) => q, path: string = this.postsDir): Observable<BlogPost[]> {
    // TODO only pull some posts depending on pagination
    return this.db.collection<BlogPost>(path, ref => queryFn(ref.orderBy('dateTime', 'desc'))).snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as BlogPost;
        const id = a.payload.doc.id;
        return { ...data, id };
      })));
  }
  getPostsByTag(tag: string, path: string = this.postsDir) {
    return this.getPosts(ref => ref.where('tags', 'array-contains', tag), path);
  }

  getPostById(id: string, path: string = this.postsDir) {
    return this.getPosts(undefined, path).pipe(map(posts => {
      return posts.find(post => post.id === id);
    }));
  }

  getPostBySlug(slug: string, path: string = this.postsDir): Observable<BlogPost> {
    return this.getPosts((q) => q.where('slug', '==', slug), path).pipe(take(1), map(posts => posts[0]));
  }

  getCommentsForPost(postId: string) {
    return this.db.collection<Comment>(`posts/${postId}/comments`).snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data())),
      map(comments => comments.sort((c1, c2) => c2.dateTime - c1.dateTime))
    );
  }

  postComment(comment: { text: string, uid: string }, postId: string) {
    const dateTime = Date.now();
    const addCommentCloudFunc = this.functions.httpsCallable('addComment');
    return addCommentCloudFunc({ comment: { ...comment, dateTime }, postId });
  }

  addPost(post: BlogPost, path: string = this.postsDir) {
    return this.db.collection(path).add(post);
  }

  async updatePost(post: BlogPost, path: string = this.postsDir) {
    if (post.id) {
      const doc = this.db.doc(`${path}/${post.id}`);
      await doc.update(post);
    }
  }

  async deletePost(postId: string, path: string = this.postsDir) {
    if (postId) {
      const doc = this.db.doc(`${path}/${postId}`);
      await doc.delete();
    }
  }

  getCachedObservable(dataSource, dataKey) {
    if (isPlatformServer(this.platformId)) {
      return dataSource.pipe(map(datum => {
        this.state.set(dataKey, datum);
        return datum;
      }), take(1));
    } else if (isPlatformBrowser(this.platformId)) {
      const SSRedValue = this.state.get(dataKey, null);
      if (SSRedValue === null) {
        return dataSource;
      } else {
        return (new BehaviorSubject<any>(SSRedValue)).pipe(take(1));
      }
    }
  }
}
