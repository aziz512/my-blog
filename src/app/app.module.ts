import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PostCardComponent } from './post-card/post-card.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { FirebaseService } from './firebase.service';
import { SafeHtmlPipe } from './safe-html.pipe';
import { RelativeTimePipe } from './relative-time.pipe';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCardComponent,
    PostsComponent,
    PostComponent,
    SafeHtmlPipe,
    RelativeTimePipe,
    AddCommentComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    NoopAnimationsModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
