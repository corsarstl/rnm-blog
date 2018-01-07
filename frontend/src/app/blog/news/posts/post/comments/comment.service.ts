import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorsService } from '../../../../../shared/services/errors.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommentService {
  newCommentCreated = new Subject();
  toggleCommentEditMode = new Subject();
  refreshComments = new Subject();
  commentIdToEdit: number;
  commentBodyToEdit: string;
  private apiUrl = 'http://rnmblog.com/api/comments';

  constructor(private httpClient: HttpClient,
              private errorsService: ErrorsService) { }

  /**
   * Get all comments for selected post.
   *
   * @param postId
   * @returns {Observable<Comment[]>}
   */
  getComments(postId): Observable<Comment[]> {
    const url = `${this.apiUrl}/${postId}`;

    return this.httpClient.get(url)
      .map(res => res as Comment[])
        .catch(this.errorsService.handleError);
  }

  /**
   * Add new comment to the post.
   *
   * @param data
   * @returns {Observable<any>}
   */
  addNewComment(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, data)
      .catch(this.errorsService.handleError);
  }

  /**
   * Update the content of the comment in db.
   *
   * @param data
   * @returns {Observable<any>}
   */
  updateComment(data: any): Observable<any> {
    const url = `${this.apiUrl}/${data.commentId}`;

    return this.httpClient.put(url, data)
      .catch(this.errorsService.handleError);
  }

  /**
   * Delete selected comment from db.
   *
   * @param commentId
   * @returns {Observable<any>}
   */
  deleteComment(commentId: any): Observable<any> {
    const url = `${this.apiUrl}/${commentId}`;

    return this.httpClient.delete(url)
      .catch(this.errorsService.handleError);
  }
}
