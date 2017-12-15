import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class PostService {
  private apiUrl = 'http://rnmblog.com/api';
  // 5 latest posts for each genre.
  latest5PostsPerGenre = [];
  posts = [];

  constructor(private httpClient: HttpClient) {}

  /**
   * Get 5 latest posts for each genre for home page.
   *
   * @returns {Observable<any>}
   */
  getLatest5PostsPerGenre(): Observable<any> {
    const url = `${this.apiUrl}/home`;
    return this.httpClient.get(url)
      .do(res => res = this.latest5PostsPerGenre);
  }

  /**
   * Get all posts for selected genre.
   *
   * @param genreSlug
   * @returns {Observable<any>}
   */
  getPostsByGenre(genreSlug): Observable<any> {
    const url = `${this.apiUrl}/genres/${genreSlug}`;
    return this.httpClient.get(url)
      .do(res => res = this.posts);
  }

  /**
   * Get all posts for selected band.
   *
   * @param bandSlug
   * @returns {Observable<any>}
   */
  getPostsByBand(genreSlug, bandSlug): Observable<any> {
    const url = `${this.apiUrl}/${genreSlug}/${bandSlug}`;
    return this.httpClient.get(url)
      .do(res => res = this.posts);
  }
}
