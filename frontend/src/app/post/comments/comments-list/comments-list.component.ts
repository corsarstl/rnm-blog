import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Comment } from './comment.model';
import { CommentService } from '../comment.service';

@Component({
  selector: 'rnm-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnChanges {
  @Input() postId: number;
  comments: Comment[] = [];

  constructor(private commentService: CommentService) {
    console.log(`Post id = ${this.postId}`);
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentPostId = this.postId;
    console.log(`Post id changed to ${currentPostId}`);
    this.getComments(currentPostId);
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
}
