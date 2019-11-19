import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth) { }

  getCurrentUser(): Observable<User> {
    return this.firebaseAuth.user;
  }

  signIn() {
    this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  signOut() {
    this.firebaseAuth.auth.signOut();
  }
}
