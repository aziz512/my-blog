import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { ReadPostComponent } from './read-post/read-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAuthGuard } from './admin-auth.guard';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/add',
    component: AddPostComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/edit/:id',
    component: EditPostComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'tag/:tag',
    component: PostsComponent
  },
  {
    path: 'post/:slug',
    component: ReadPostComponent
  },
  {
    path: ':slug',
    component: ReadPostComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: PostsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
