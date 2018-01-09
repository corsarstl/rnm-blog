import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from '../comment/comment.model';
import { CommentService } from '../comment.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rnm-comments-list',
  templateUrl: './comments-list.component.html',
  styles: []
})
export class CommentsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() postId: number;
  comments: Comment[] = [];
  newCommentCreatedSubscription: Subscription;
  refreshCommentsSubscription: Subscription;

  constructor(private commentService: CommentService,
              private authService: AuthService) {
    console.log(`Post id = ${this.postId}`);
  }

  ngOnInit() {
    this.refreshCommentsSubscription = this.commentService.refreshComments
      .subscribe(() => {
        this.getComments(this.postId);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`Post id changed to ${this.postId}`);
    this.getComments(this.postId);

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
  getComments(postId) {
    this.commentService.getComments(postId)
      .subscribe(data => {
        this.comments = data['data'];
        console.log('Comments for the post:');
        console.log(this.comments);
      });
  }

  /**
   * Subscription to refresh comments, if new one is created.
   */
  createNewCommentSubscription() {
    this.newCommentCreatedSubscription = this.commentService.newCommentCreated
      .subscribe(() => {
        console.log(`Listener: Comment was added for post#${this.postId} `);
        this.getComments(this.postId);
      });
  }
}
