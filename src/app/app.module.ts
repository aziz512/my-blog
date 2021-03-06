import { BrowserModule, Title, Meta, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/app/firebase-config';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule, FUNCTIONS_ORIGIN } from '@angular/fire/functions';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PostCardComponent } from './post-card/post-card.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { FirebaseService } from './firebase.service';
import { SafeHtmlPipe } from './safe-html.pipe';
import { DateFormatterPipe } from './date-formatter.pipe';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommentComponent } from './comment/comment.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { ReadPostComponent } from './read-post/read-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { AdminComponent } from './admin/admin.component';
import { ExcerptifyPipe } from './excerptify.pipe';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MarkdownRendererPipe } from './markdown-renderer.pipe';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PostCardComponent,
    PostsComponent,
    PostComponent,
    SafeHtmlPipe,
    DateFormatterPipe,
    AddCommentComponent,
    CommentComponent,
    PostEditorComponent,
    ReadPostComponent,
    AddPostComponent,
    EditPostComponent,
    AdminComponent,
    ExcerptifyPipe,
    UploadFileComponent,
    NotFoundComponent,
    MarkdownRendererPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    NoopAnimationsModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule
  ],
  providers: [FirebaseService, Title, Meta, { provide: FUNCTIONS_ORIGIN, useValue: environment.functionsOrigin }],
  bootstrap: [AppComponent]
})
export class AppModule { }
