import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';
import { auth, User } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
  }

  async canActivate(): Promise<boolean> {
    let user = await this.firebaseAuth.user.pipe(take(1)).toPromise();
    if (!user) {
      await this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
      user = await this.firebaseAuth.user.pipe(take(1)).toPromise();
      if (!user) {
        this.router.navigate(['/']);
        return false;
      } else {
        return this.isAdmin(user);
      }
    } else {
      return this.isAdmin(user);
    }
  }
  async isAdmin(user: User): Promise<boolean> {
    const adminsArray = await this.firestore.collection('admins').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        return { id };
      })), take(1)).toPromise();
    const isAdmin = !!adminsArray.find(x => x.id === user.uid);
    if (!isAdmin) {
      await this.firebaseAuth.auth.signOut();
      this.router.navigate(['/']);
    }
    return isAdmin;
  }
}
