import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { GenrePostsComponent } from './news/posts/genre-posts.component';
import { TagPostsComponent } from './news/posts/tag-posts.component';
import { BandPostsComponent } from './news/posts/band-posts.component';
import { PostComponent } from './news/posts/post/post.component';
import { BlogComponent } from './blog.component';

const blogRoutes: Routes = [
  { path: 'blog', component: BlogComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'news', component: NewsComponent, children: [
      { path: 'genres/:genreSlug', component: GenrePostsComponent },
      { path: 'tags/:tagId/:tagSlug', component: TagPostsComponent },
      { path: ':genreSlug/:bandSlug', component: BandPostsComponent },
      { path: ':genreSlug/:bandSlug/:postId/:postSlug', component: PostComponent },
    ] },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(blogRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BlogRoutingModule { }
