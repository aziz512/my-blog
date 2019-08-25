import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './add-post/add-post.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddPostComponent
  },
  {
    path: ':id',
    component: PostComponent
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
