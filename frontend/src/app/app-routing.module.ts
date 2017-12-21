import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { GenrePostsComponent } from './genre-posts/genre-posts.component';
import { BandPostsComponent } from './band-posts/band-posts.component';
import { PostComponent } from './post/post.component';
import { TagPostsComponent } from './tag-posts/tag-posts.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'genres/:genreSlug', component: GenrePostsComponent },
  { path: 'tags/:tagId/:tagSlug', component: TagPostsComponent },
  { path: ':genreSlug/:bandSlug', component: BandPostsComponent },
  { path: ':genreSlug/:bandSlug/:postId/:postSlug', component: PostComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
