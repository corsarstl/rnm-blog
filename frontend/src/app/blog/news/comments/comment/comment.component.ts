import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../../../shared/services/auth.service';
import { CommentService } from '../comment.service';
import { Comment } from './comment.model';

@Component({
  selector: 'rnm-comment',
  templateUrl: './comment.component.html',
  styles: []
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() comment: Comment;
  loggedInUserId: number;
  showCommentBody = true;
  showEditComponent = false;
  hideCommentBody: Subscription;

  constructor(private authService: AuthService,
              private commentService: CommentService) {
    this.loggedInUserId = this.authService.userId;
  }

  ngOnInit() {
    this.hideCommentBody = this.commentService.toggleCommentEditMode
      .subscribe((commentId) => {
        if (commentId === this.comment.commentId) {
          this.showCommentBody = !this.showCommentBody;
        }
      });
  }

  ngOnDestroy() {
    this.hideCommentBody.unsubscribe();
  }

  /**
   * Show form for comment editing.
   * Set values of commentId and commentBody to prepopulate edit form with values of selected comment.
   */
  onCommentSelect() {
    this.loggedInUserId = this.authService.userId;

    if (this.comment.userId === this.loggedInUserId) {
      this.showEditComponent = true;
      this.commentService.commentIdToEdit = this.comment.commentId;
      this.commentService.commentBodyToEdit = this.comment.commentBody;
    }
  }
}
