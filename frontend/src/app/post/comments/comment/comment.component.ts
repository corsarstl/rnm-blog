import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comment } from './comment.model';
import { AuthService } from '../../../shared/services/auth.service';
import { CommentService } from '../comment.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rnm-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
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
      // .subscribe((editFormData) => {
      //   if (editFormData['commentId'] === this.comment.commentId) {
               .subscribe((commentId) => {
        if (commentId === this.comment.commentId) {

          // console.log(`Listener: hiding body for comment #${editFormData['commentId']}`);
          console.log(`Listener: hiding body for comment #${commentId}`);
          this.showCommentBody = !this.showCommentBody;
          this.commentService.refreshComments.next();
          // console.log(`New body for comment#${editFormData['commentId']} is ${editFormData['newCommentBody']}`);
          // console.log(`New body for comment#${editFormData['commentId']} is ${editFormData['newCommentBody']}`);
          // this.setNewCommentBody(editFormData['newCommentBody']);
          // document.getElementById(editFormData['commentId']).innerHTML = editFormData['newCommentBody'];
        }
      });
  }

  ngOnDestroy() {
    this.hideCommentBody.unsubscribe();
  }

  onCommentSelect() {
    if (this.comment.userId === this.loggedInUserId) {
      this.showEditComponent = true;

      if (this.commentService.commentIdToEdit !== this.comment.commentId) {
        this.commentService.commentIdToEdit = this.comment.commentId;
        this.commentService.commentBodyToEdit = this.comment.commentBody;

        console.log(this.commentService.commentIdToEdit);
        console.log(this.commentService.commentBodyToEdit);
      }
    }
  }

  // setNewCommentBody(data: string) {
  //   this.comment.commentBody = data;
  // }
}
