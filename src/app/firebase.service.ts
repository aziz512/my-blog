import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlogPost } from './shapes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {
  }

  getPosts() {
    // TODO only pull some posts depending on pagination
    return this.db.collection<BlogPost>('posts').snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as BlogPost;
      const id = a.payload.doc.id;
      return { ...data, id };
    })));
  }

  getPostById(id: string) {
    return this.getPosts().pipe(map(posts => {
      return posts.filter(post => post.id === id)[0];
    }));
  }

  getCommentsForPost(postId: string) {
    return this.db.collection<Comment>(`posts/${postId}/comments`).snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data()))
    );
  }

  postComment(comment: { name: string, text: string }, postId: string) {
    const dateTime = Date.now();
    return this.db.collection(`posts/${postId}/comments`).add({...comment, dateTime});
  }
}
