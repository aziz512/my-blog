import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { ReadPostComponent } from './read-post/read-post.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddPostComponent
  },
  {
    path: 'tag/:tag',
    component: PostsComponent
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
