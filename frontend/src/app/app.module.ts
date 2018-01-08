import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './blog/home/home.component';
import { GenrePostsComponent } from './blog/news/posts/genre-posts.component';
import { BandPostsComponent } from './blog/news/posts/band-posts.component';
import { PostComponent } from './blog/news/posts/post/post.component';
import { SliderComponent } from './blog/home/slider/slider.component';
import { PopularTagsComponent } from './shared/components/popular-tags/popular-tags.component';
import { HotPostsComponent } from './shared/components/hot-posts/hot-posts.component';
import { TagPostsComponent } from './blog/news/posts/tag-posts.component';
import { PostsListComponent } from './blog/news/posts/posts-list/posts-list.component';
import { CommentComponent } from './blog/news/posts/post/comments/comment/comment.component';
import { CommentsListComponent } from './blog/news/posts/post/comments/comments-list/comments-list.component';
import { CommentNewComponent } from './blog/news/posts/post/comments/comment-new/comment-new.component';
import { CommentEditComponent } from './blog/news/posts/post/comments/comment-edit/comment-edit.component';
import { LatestPostsComponent } from './blog/home/latest-posts/latest-posts.component';
import { BlogComponent } from './blog/blog.component';
import { NewsComponent } from './blog/news/news.component';
import { NewsletterSubscriptionComponent } from './shared/components/newsletter-subscription/newsletter-subscription.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    GenrePostsComponent,
    BandPostsComponent,
    PostComponent,
    SliderComponent,
    HotPostsComponent,
    PopularTagsComponent,
    TagPostsComponent,
    PostsListComponent,
    CommentComponent,
    CommentsListComponent,
    CommentNewComponent,
    CommentEditComponent,
    LatestPostsComponent,
    NewsletterSubscriptionComponent,
    BlogComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // maybe remove later after finishing newsletter subscription, since I'll use reactive forms
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    AuthModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
