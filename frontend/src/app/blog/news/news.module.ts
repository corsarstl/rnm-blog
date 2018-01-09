import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';

import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

import { NewsComponent } from './news.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    PostsModule,
    CommentsModule
  ]
})
export class NewsModule { }
