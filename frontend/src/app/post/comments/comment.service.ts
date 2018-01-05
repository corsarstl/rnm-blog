import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorsService } from '../../shared/services/errors.service';
import { AuthService } from '../../shared/services/auth.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommentService {
  newCommentCreated = new Subject();
  toggleCommentEditMode = new Subject();
  refreshComments = new Subject();
  token: string;
  commentIdToEdit: number;
  commentBodyToEdit: string;
  private apiUrl = 'http://rnmblog.com/api/comments';
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private errorsService: ErrorsService) {
    this.token = this.authService.userToken;
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
  }

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
    const headers = this.headers;

    return this.httpClient.post(this.apiUrl, data, {headers})
      .catch(this.errorsService.handleError);
  }

  updateComment(data: any): Observable<any> {
    const url = `${this.apiUrl}/${data.commentId}`;
    const headers = this.headers;

    return this.httpClient.put(url, data, {headers})
      .catch(this.errorsService.handleError);
  }
}
