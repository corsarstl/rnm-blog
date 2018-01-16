import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../../shared/services/auth.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'rnm-comment-new',
  templateUrl: './comment-new.component.html',
  styles: []
})
export class CommentNewComponent implements OnChanges {
  @Input() postIdForNewComment: number;
  loggedInUserId: number;
  newCommentForm: FormGroup;

  constructor(private authService: AuthService,
              private commentService: CommentService,
              private fb: FormBuilder) {
    this.loggedInUserId = this.authService.userId;
    console.log(this.postIdForNewComment);
    console.log(this.loggedInUserId);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.newCommentForm = this.fb.group({
      'commentBody': ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      'postId': [ this.postIdForNewComment],
      'userId': [ this.loggedInUserId]
    });
  }

  /**
   * Add new comment to the post.
   */
  onAddNewComment() {
    this.commentService.addNewComment(this.newCommentForm.value)
      .subscribe(() => {
        console.log('Your comment was published!');
        this.newCommentForm.patchValue({'commentBody': ''});
        // need to trigger event to reload comments-list to show added comment
        this.commentService.newCommentCreated.next();
      });
  }
}
