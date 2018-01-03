import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Comment } from '../comment/comment.model';
import { CommentService } from '../comment.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'rnm-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnChanges {
  @Input() postId: number;
  comments: Comment[] = [];

  constructor(private commentService: CommentService,
              private authService: AuthService) {
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
