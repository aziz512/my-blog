import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { BlogPost, Comment } from './shapes';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {
  }

  getPosts(queryFn: ((q: Query) => Query) = (q: Query) => q) {
    // TODO only pull some posts depending on pagination
    return this.db.collection<BlogPost>('posts', ref => queryFn(ref.orderBy('dateTime', 'desc'))).snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as BlogPost;
        const id = a.payload.doc.id;
        return { ...data, id };
      })));
  }
  getPostsByTag(tag: string) {
    return this.getPosts(ref => ref.where('tags', 'array-contains', tag));
  }

  getPostById(id: string) {
    return this.getPosts().pipe(map(posts => {
      return posts.find(post => post.id === id);
    }));
  }

  getPostBySlug(slug: string): Observable<BlogPost> {
    return this.getPosts((q) => q.where('slug', '==', slug)).pipe(take(1), map(posts => posts[0]));
  }

  getCommentsForPost(postId: string) {
    return this.db.collection<Comment>(`posts/${postId}/comments`).snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data())),
      map(comments => comments.sort((c1, c2) => c2.dateTime - c1.dateTime))
    );
  }

  postComment(comment: { name: string, text: string }, postId: string) {
    const dateTime = Date.now();
    return this.db.collection(`posts/${postId}/comments`).add({ ...comment, dateTime });
  }

  addPost(post: BlogPost) {
    return this.db.collection('posts').add(post);
  }
}
