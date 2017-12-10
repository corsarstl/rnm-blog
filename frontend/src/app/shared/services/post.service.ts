import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class PostService {
  private apiUrl = 'http://rnmblog.com/api';
  // 5 latest posts for each genre.
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
      .do(res => res = this.latest5PostsPerGenre);
  }

  getPostsByGenre(): Observable<any> {
    const url = `${this.apiUrl}/genres/`;
  }
}
