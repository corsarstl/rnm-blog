import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './blog/home/home.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GenrePostsComponent } from './blog/news/posts/genre-posts.component';
import { BandPostsComponent } from './blog/news/posts/band-posts.component';
import { PostComponent } from './blog/news/posts/post/post.component';
import { TagPostsComponent } from './blog/news/posts/tag-posts.component';
import { PostsListComponent } from './blog/news/posts/posts-list/posts-list.component';
import { CommentComponent } from './blog/news/posts/post/comments/comment/comment.component';
import { CommentsListComponent } from './blog/news/posts/post/comments/comments-list/comments-list.component';
import { CommentNewComponent } from './blog/news/posts/post/comments/comment-new/comment-new.component';
import { CommentEditComponent } from './blog/news/posts/post/comments/comment-edit/comment-edit.component';
import { BlogComponent } from './blog/blog.component';
import { NewsComponent } from './blog/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    GenrePostsComponent,
    BandPostsComponent,
    PostComponent,
    TagPostsComponent,
    PostsListComponent,
    CommentComponent,
    CommentsListComponent,
    CommentNewComponent,
    CommentEditComponent,
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
    SharedModule,
    AuthModule,
    HomeModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
