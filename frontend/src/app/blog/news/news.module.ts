import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

import { NewsComponent } from './news.component';

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
