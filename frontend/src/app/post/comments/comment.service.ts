import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorsService } from '../../shared/services/errors.service';

@Injectable()
export class CommentService {
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
}
