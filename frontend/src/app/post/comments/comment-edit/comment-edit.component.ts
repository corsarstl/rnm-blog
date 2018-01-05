import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';

@Component({
  selector: 'rnm-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
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
      'newCommentBody': [this.commentBody, [Validators.required, Validators.minLength(1)]]
    });
  }

  onUpdate() {
    this.editMode = true;
    this.commentService.toggleCommentEditMode.next(this.commentId);
    console.log(`Enter edit mode on comment ${this.commentId}. Hiding comment body...`);
  }

  onSave() {
    this.commentService.updateComment(this.editForm.value)
      .subscribe(() => {
      // const editFormData = this.editForm.value;
        console.log('Your comment was updated!');
        // console.log(this.editForm.value);
        // console.log(editFormData);
        this.editMode = false;
        // this.commentService.toggleCommentEditMode.next(editFormData);
        this.commentService.toggleCommentEditMode.next(this.commentId);

        // this.newCommentForm.patchValue({'commentBody': ''});
        // need to trigger event to reload comments-list to show added comment
        // this.commentService.newCommentCreated.next();
      });
  }

  onCancel() {
    this.editMode = false;
  }
}
