import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './shared/services/auth.service';
import { NavbarService } from './navbar/navbar.service';
import { TitleCasePipe } from './shared/pipes/title-case.pipe';
import { PostService } from './shared/services/post.service';
import { GenrePostsComponent } from './genre-posts/genre-posts.component';
import { KebabCasePipe } from './shared/pipes/kebab-case.pipe';
import { BandPostsComponent } from './band-posts/band-posts.component';
import { PostComponent } from './post/post.component';
import { SliderComponent } from './slider/slider.component';
import { PopularTagsComponent } from './popular-tags/popular-tags.component';
import { HotPostsComponent } from './hot-posts/hot-posts.component';
import { TagPostsComponent } from './tag-posts/tag-posts.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ErrorsService } from './shared/services/errors.service';
import { CommentComponent } from './post/comments/comment/comment.component';
import { CommentsListComponent } from './post/comments/comments-list/comments-list.component';
import { CommentService } from './post/comments/comment.service';
import { CommentNewComponent } from './post/comments/comment-new/comment-new.component';
import { CommentEditComponent } from './post/comments/comment-edit/comment-edit.component';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
    CommentEditComponent
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
