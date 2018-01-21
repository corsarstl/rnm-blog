import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorsService } from '../../../shared/services/errors.service';
import { Observable } from 'rxjs/Observable';
import { Genre } from './genre.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GenresService {
  private apiUrl = 'http://rnmblog.com/api/admin/genres';

  constructor(private httpClient: HttpClient,
              private errorsService: ErrorsService) { }

  /**
   * Get all genres.
   *
   * @returns {Observable<Genre[]>}
   */
  showGenges(): Observable<Genre[]> {
    const url = this.apiUrl;

    return this.httpClient.get(url)
      .map(res => res as Genre[])
      .catch(this.errorsService.handleError);
  }

}
