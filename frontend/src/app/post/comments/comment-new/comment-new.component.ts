import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { CommentService } from '../comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'rnm-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.css']
})
export class CommentNewComponent implements OnInit {
  @Input() postIdForNewComment: number;
  loggedInUserId: number;
  newCommentForm: FormGroup;

  constructor(private authService: AuthService,
              private commentService: CommentService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.loggedInUserId = this.authService.userId;
    console.log(this.postIdForNewComment);
    console.log(this.loggedInUserId);

    this.newCommentForm = this.fb.group({
      'commentBody': ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      'postId': [ this.postIdForNewComment],
      'userId': [ this.loggedInUserId]
    });
  }

  onAddNewComment() {
    this.commentService.addNewComment(this.newCommentForm.value)
      .subscribe(() => {
        console.log('Your comment was published!');
        this.newCommentForm.patchValue({'commentBody': ''});
        // need to trigger event to reload comments-list to show added comment
      });
  }
}
