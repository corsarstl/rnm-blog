import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../../../shared/services/auth.service';
import { CommentService } from '../comment.service';
import { PaginatedComments } from './paginated-comments.model';

@Component({
  selector: 'rnm-comments-list',
  templateUrl: './comments-list.component.html',
  styles: []
})
export class CommentsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() postId: number;
  comments: PaginatedComments[] = [];
  newCommentCreatedSubscription: Subscription;
  refreshCommentsSubscription: Subscription;

  constructor(private commentService: CommentService,
              public authService: AuthService) { }

  ngOnInit() {
    this.refreshCommentsSubscription = this.commentService.refreshComments
      .subscribe((url: string) => {
        if (url !== undefined) {
          this.updateComments(url);
        } else {
          this.showComments(this.postId);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.showComments(this.postId);

    if (this.newCommentCreatedSubscription !== undefined) {
      this.newCommentCreatedSubscription.unsubscribe();
      this.createNewCommentSubscription();
    } else {
      this.createNewCommentSubscription();
    }
  }

  ngOnDestroy() {
    this.newCommentCreatedSubscription.unsubscribe();
    this.refreshCommentsSubscription.unsubscribe();
  }

  /**
   * Get all comments for the post.
   *
   * @param postId
   */
  showComments(postId) {
    this.commentService.showComments(postId)
      .subscribe(data => {
        this.comments = data['comments'];
      });
  }

  /**
   * Update comments after navigation to first, last, prev, next or selected pages.
   *
   * @param {string} url
   */
  updateComments(url: string) {
    this.commentService.updateComments(url)
      .subscribe(data => {
        this.comments = data['comments'];
      });
  }

  /**
   * Subscription to refresh comments, if new one is created.
   */
  createNewCommentSubscription() {
    this.newCommentCreatedSubscription = this.commentService.newCommentCreated
      .subscribe(() => {
        this.showComments(this.postId);
      });
  }
}
