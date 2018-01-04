import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorsService } from '../../shared/services/errors.service';
import { AuthService } from '../../shared/services/auth.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommentService {
  newCommentCreated = new Subject();
  private apiUrl = 'http://rnmblog.com/api/comments';
  token: string;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private errorsService: ErrorsService) {
    this.token = this.authService.userToken;
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
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.httpClient.post(this.apiUrl, data, {headers})
      .catch(this.errorsService.handleError);
  }
}
