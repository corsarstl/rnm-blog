import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';

@Component({
  selector: 'rnm-comment-edit',
  templateUrl: './comment-edit.component.html',
  styles: []
})
export class CommentEditComponent implements OnInit {
  commentId: number;
  commentBody: string;
  editForm: FormGroup;
  editMode = false;

  constructor(private commentService: CommentService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.commentId = this.commentService.commentIdToEdit;
    this.commentBody = this.commentService.commentBodyToEdit;

    this.editForm = this.fb.group({
      'commentId': [this.commentId, Validators.required],
      'newCommentBody': [this.commentBody, [
        Validators.required,
        Validators.minLength(1)]]
    });
  }

  /**
   * Make available additional buttons for editing.
   * Show edit form.
   */
  onUpdate() {
    this.editMode = true;
    this.commentService.toggleCommentEditMode.next(this.commentId);
    console.log(`Enter edit mode on comment ${this.commentId}. Hiding comment body...`);
  }

  /**
   * Save update comment to db.
   * Updates comments for current post.
   */
  onSave() {
    this.commentService.updateComment(this.editForm.value)
      .subscribe(() => {
        console.log('Your comment was updated!');
        this.editMode = false;
        this.commentService.toggleCommentEditMode.next(this.commentId);
        this.commentService.refreshComments.next();
      });
  }

  /**
   * Clear textarea for editing comment.
   */
  onReset() {
    this.editForm.patchValue({'newCommentBody': ''});
  }

  /**
   * Hide additional buttons for editing.
   * Updates comments for current post.
   */
  onCancel() {
    this.editMode = false;
    this.commentService.refreshComments.next();
  }

  /**
   * Delete selected comment from db.
   * Updates comments for current post.
   */
  onDelete() {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      this.commentService.deleteComment(this.editForm.get('commentId').value)
        .subscribe(() => {
          console.log(`Comment #${this.editForm.get('commentId').value} was deleted.`);
          this.commentService.refreshComments.next();
        });
    }
  }
}
