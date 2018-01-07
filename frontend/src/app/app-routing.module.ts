import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './blog/home/home.component';
import { GenrePostsComponent } from './blog/news/posts/genre-posts.component';
import { BandPostsComponent } from './blog/news/posts/band-posts.component';
import { PostComponent } from './blog/news/posts/post/post.component';
import { TagPostsComponent } from './blog/news/posts/tag-posts.component';
import { BlogComponent } from './blog/blog.component';
import { NewsComponent } from './blog/news/news.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/blog/home', pathMatch: 'full' },
  { path: 'blog', component: BlogComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'news', component: NewsComponent, children: [
      { path: 'genres/:genreSlug', component: GenrePostsComponent },
      { path: 'tags/:tagId/:tagSlug', component: TagPostsComponent },
      { path: ':genreSlug/:bandSlug', component: BandPostsComponent },
      { path: ':genreSlug/:bandSlug/:postId/:postSlug', component: PostComponent },
    ] },
  ] },
 { path: '404-page-not-found', component: PageNotFoundComponent },
 { path: '**', redirectTo: '404-page-not-found' }
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
