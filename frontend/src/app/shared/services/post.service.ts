import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Post } from '../../post/post';

@Injectable()
export class PostService {
  private apiUrl = 'http://rnmblog.com/api';
  // 5 latest posts for each genre.
  posts = [];
  post: Post;

  constructor(private httpClient: HttpClient) {}

  /**
   * Get 5 latest posts for each genre for home page.
   *
   * @returns {Observable<any>}
   */
  latest5PostsPerGenre(): Observable<any> {
    const url = `${this.apiUrl}/home`;
    return this.httpClient.get(url)
      .do(res => res = this.posts);
  }

  /**
   * Get 3 latest posts for slider.
   *
   * @returns {Observable<any>}
   */
  postsForSlider(): Observable<any> {
    const url = `${this.apiUrl}/slider`;
    return this.httpClient.get(url)
      .do(res => res = this.posts);
  }

  /**
   * Get all posts for selected genre.
   *
   * @param genreSlug
   * @returns {Observable<any>}
   */
  postsByGenre(genreSlug): Observable<any> {
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
  postsByBand(genreSlug, bandSlug): Observable<any> {
    const url = `${this.apiUrl}/${genreSlug}/${bandSlug}`;
    return this.httpClient.get(url)
      .do(res => res = this.posts);
  }

  /**
   * Get single post.
   *
   * @param genreSlug
   * @param bandSlug
   * @param postId
   * @param postSlug
   * @returns {Observable<any>}
   */
  singlePost(genreSlug, bandSlug, postId, postSlug): Observable<any> {
    const url = `${this.apiUrl}/${genreSlug}/${bandSlug}/${postId}/${postSlug}`;
    return this.httpClient.get(url)
      .do(res => res = this.post);
  }
}
