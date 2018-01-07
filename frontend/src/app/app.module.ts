import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './blog/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './shared/services/auth.service';
import { NavbarService } from './navbar/navbar.service';
import { TitleCasePipe } from './shared/pipes/title-case.pipe';
import { PostService } from './shared/services/post.service';
import { GenrePostsComponent } from './blog/news/posts/genre-posts.component';
import { KebabCasePipe } from './shared/pipes/kebab-case.pipe';
import { BandPostsComponent } from './blog/news/posts/band-posts.component';
import { PostComponent } from './blog/news/posts/post/post.component';
import { SliderComponent } from './blog/home/slider/slider.component';
import { PopularTagsComponent } from './shared/components/popular-tags/popular-tags.component';
import { HotPostsComponent } from './shared/components/hot-posts/hot-posts.component';
import { TagPostsComponent } from './blog/news/posts/tag-posts.component';
import { PostsListComponent } from './blog/news/posts/posts-list/posts-list.component';
import { ErrorsService } from './shared/services/errors.service';
import { CommentComponent } from './blog/news/posts/post/comments/comment/comment.component';
import { CommentsListComponent } from './blog/news/posts/post/comments/comments-list/comments-list.component';
import { CommentService } from './blog/news/posts/post/comments/comment.service';
import { CommentNewComponent } from './blog/news/posts/post/comments/comment-new/comment-new.component';
import { CommentEditComponent } from './blog/news/posts/post/comments/comment-edit/comment-edit.component';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LatestPostsComponent } from './blog/home/latest-posts/latest-posts.component';
import { NewsletterSubscriptionComponent } from './shared/components/newsletter-subscription/newsletter-subscription.component';
import { BlogComponent } from './blog/blog.component';
import { NewsComponent } from './blog/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    TitleCasePipe,
    GenrePostsComponent,
    KebabCasePipe,
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
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    NavbarService,
    PostService,
    ErrorsService,
    CommentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
