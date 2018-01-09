import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../../app-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { CommentsModule } from '../comments/comments.module';

import { PostComponent } from './post/post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { BandPostsComponent } from './band-posts.component';
import { GenrePostsComponent } from './genre-posts.component';
import { TagPostsComponent } from './tag-posts.component';

@NgModule({
  declarations: [
    PostComponent,
    PostsListComponent,
    BandPostsComponent,
    GenrePostsComponent,
    TagPostsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CommentsModule,
    SharedModule
  ]
})
export class PostsModule { }
