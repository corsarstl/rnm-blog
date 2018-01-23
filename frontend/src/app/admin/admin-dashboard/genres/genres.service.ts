import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorsService } from '../../../shared/services/errors.service';
import { Observable } from 'rxjs/Observable';
import { Genre } from './genre.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GenresService {
  // Initial input values for the first genre selected.
  initialGenreNameToEdit: string;
  initialGenreIdToEdit: number;
  // Update initial editForm input values on click according to selected genre.
  updateEditForm = new Subject();
  // Update list of genres after creating, updating or deleting of a genre.
  refreshGenres = new Subject();
  private apiUrl = 'http://rnmblog.com/api/admin/genres';

  constructor(private httpClient: HttpClient,
              private errorsService: ErrorsService) { }

  /**
   * Get all genres.
   *
   * @returns {Observable<Genre[]>}
   */
  getGenres(): Observable<Genre[]> {
    return this.httpClient.get(this.apiUrl)
      .map(res => res as Genre[])
      .catch(this.errorsService.handleError);
  }

  /**
   * Add new genre to db.
   *
   * @param {string} genreName
   * @returns {Observable<any>}
   */
  addNewGenre(genreName: string): Observable<any> {
    return this.httpClient.post(this.apiUrl, genreName)
      .catch(this.errorsService.handleError);
  }

  /**
   * Update selected genre.
   *
   * @param data
   * @returns {Observable<any>}
   */
  updateGenre(data: any): Observable<any> {
    const url = `${this.apiUrl}/${data.genreId}`;

    return this.httpClient.put(url, data)
      .catch(this.errorsService.handleError);
  }

  /**
   * Delete selected genre from db.
   *
   * @param genreId
   * @returns {Observable<any>}
   */
  deleteGenre(genreId): Observable<any> {
    const url = `${this.apiUrl}/${genreId}`;

    return this.httpClient.delete(url)
      .catch(this.errorsService.handleError);
  }
}
