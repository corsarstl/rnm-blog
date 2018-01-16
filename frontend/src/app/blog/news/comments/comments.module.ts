import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

import { CommentComponent } from './comment/comment.component';
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import { CommentNewComponent } from './comment-new/comment-new.component';
import { CommentsListComponent } from './comments-list/comments-list.component';

@NgModule({
  declarations: [
    CommentComponent,
    CommentEditComponent,
    CommentNewComponent,
    CommentsListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    CommentComponent,
    CommentEditComponent,
    CommentNewComponent,
    CommentsListComponent
  ]
})
export class CommentsModule { }
