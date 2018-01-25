import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorsService } from './errors.service';

import { HotPost } from '../components/hot-posts/hot-post.model';
import { PopularTag } from '../components/popular-tags/popular-tag.model';
import { SliderPost } from '../../blog/home/slider/slider-post.model';
import { LatestPostsForHomepage } from '../../blog/home/latest-posts/latest-posts-for-homepage.model';
import { PaginatedPosts } from '../../blog/news/posts/posts-list/paginated-posts.model';
import { PostDetails } from '../../blog/news/posts/post/post-details.model';

@Injectable()
export class PostService {
  navigatedToNewPage = new Subject();
  private apiUrl = 'http://rnmblog.com/api';
  imageUrl = 'https://d3nkp9h6zk1y70.cloudfront.net/images/posts/';

  constructor(private httpClient: HttpClient,
              private errorsService: ErrorsService) {}

  /**
   * Get 4 latest posts for each genre for home page.
   *
   * @returns {Observable<any>}
   */
  latestPostsForHomepage(): Observable<LatestPostsForHomepage[]> {
    const url = `${this.apiUrl}/home`;

    return this.httpClient.get(url)
      .map(res => res as LatestPostsForHomepage[])
      .catch(this.errorsService.handleError);
  }

  /**
   * Get 3 latest posts for slider.
   *
   * @returns {Observable<SliderPost[]>}
   */
  postsForSlider(): Observable<SliderPost[]> {
    const url = `${this.apiUrl}/slider`;

    return this.httpClient.get(url)
      .map(res => res as SliderPost[])
      .catch(this.errorsService.handleError);
  }

  /**
   * Get all posts for selected genre.
   *
   * @param genreSlug
   * @returns {Observable<PaginatedPosts[]>}
   */
  postsByGenre(genreSlug): Observable<PaginatedPosts[]> {
    const url = `${this.apiUrl}/genres/${genreSlug}`;

    return this.getPosts(url);
  }

  /**
   * Get all posts for selected band.
   *
   * @param genreSlug
   * @param bandSlug
   * @returns {Observable<PaginatedPosts[]>}
   */
  postsByBand(genreSlug, bandSlug): Observable<PaginatedPosts[]> {
    const url = `${this.apiUrl}/posts/${genreSlug}/${bandSlug}`;

    return this.getPosts(url);
  }

  /**
   * Get all posts for selected tag.
   *
   * @param tagId
   * @param tagSlug
   * @returns {Observable<PaginatedPosts[]>}
   */
  postsByTag(tagId, tagSlug): Observable<PaginatedPosts[]> {
    const url = `${this.apiUrl}/tags/${tagId}/${tagSlug}`;

    return this.getPosts(url);
  }

  /**
   * Update posts after navigation to first, last, prev, next or selected pages.
   *
   * @param url
   * @returns {Observable<PaginatedPosts[]>}
   */
  updatePosts(url): Observable<PaginatedPosts[]> {
    return this.getPosts(url);
  }

  /**
   * Get a list of 5 popular posts with most number of comments.
   *
   * @returns {Observable<HotPost[]>}
   */
  hotPosts(): Observable<HotPost[]> {
    const url = `${this.apiUrl}/hotPosts`;

    return this.httpClient.get(url)
      .map(res => res as HotPost[])
      .catch(this.errorsService.handleError);
  }

  /**
   * Get a list of tags with the number of related posts.
   *
   * @returns {Observable<PopularTag[]>}
   */
  getPopularTags(): Observable<PopularTag[]> {
    const url = `${this.apiUrl}/popularTags`;

    return this.httpClient.get(url)
      .map(res => res as PopularTag[])
      .catch(this.errorsService.handleError);
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
  show(genreSlug, bandSlug, postId, postSlug): Observable<any> {
    const url = `${this.apiUrl}/posts/${genreSlug}/${bandSlug}/${postId}/${postSlug}`;

    return this.httpClient.get(url)
      .do(res => res as PostDetails[])
      .catch(this.errorsService.handleError);
  }

  /**
   * Store newly created post to db.
   *
   * @param data
   * @returns {Observable<any>}
   */
  store(data: any): Observable<any> {
    const url = `${this.apiUrl}/admin/posts`;

    return this.httpClient.post(url, data, {observe: 'response'})
      .catch(this.errorsService.handleError);
  }

  /**
   * Get posts for genre, band, tags or when updating components with posts.
   *
   * @param {string} url
   * @returns {Observable<any | any>}
   */
  private getPosts(url: string) {
    return this.httpClient.get(url)
      .map(res => res as PaginatedPosts[])
      .catch(this.errorsService.handleError);
  }
}
