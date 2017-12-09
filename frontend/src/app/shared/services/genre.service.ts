import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GenreService {
  private apiUrl = 'http://rnmblog.com/api';
  latest5PostsPerGenre = [];

  constructor(private httpClient: HttpClient) {}

  /**
   * Get 5 latest posts for each genre for home page.
   *
   * @returns {Observable<any>}
   */
  getLatest5PostsPerGenre(): Observable<any> {
    const url = `${this.apiUrl}/home`;
    return this.httpClient.get(url)
      .map(res => res as latest5PostsPerGenre);
  }
}
