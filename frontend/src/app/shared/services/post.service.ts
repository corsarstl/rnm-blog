import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HotPost } from '../components/hot-posts/hot-post.model';
import { PopularTag } from '../components/popular-tags/popular-tag.model';
import { PostsListItem } from '../../blog/news/posts/posts-list/posts-list-item.model';
import { SliderPost } from '../../blog/home/slider/slider-post.model';
import { ErrorsService } from './errors.service';
import { LatestPostsForHomepage } from '../../blog/home/latest-posts/latest-posts-for-homepage.model';

@Injectable()
export class PostService {
  private apiUrl = 'http://rnmblog.com/api';
  imageUrl = 'https://d3nkp9h6zk1y70.cloudfront.net/images/posts/';
  posts = [];
  post;

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
   * @returns {Observable<PostsListItem[]>}
   */
  postsByGenre(genreSlug): Observable<PostsListItem[]> {
    const url = `${this.apiUrl}/genres/${genreSlug}`;

    return this.httpClient.get(url)
      .map(res => res as PostsListItem[])
      .catch(this.errorsService.handleError);
  }

  /**
   * Get all posts for selected band.
   *
   * @param genreSlug
   * @param bandSlug
   * @returns {Observable<PostsListItem[]>}
   */
  postsByBand(genreSlug, bandSlug): Observable<PostsListItem[]> {
    const url = `${this.apiUrl}/${genreSlug}/${bandSlug}`;

    return this.httpClient.get(url)
      .map(res => res as PostsListItem[])
      .catch(this.errorsService.handleError);
  }

  /**
   * Get all posts for selected tag.
   *
   * @param tagId
   * @param tagSlug
   * @returns {Observable<PostsListItem[]>}
   */
  postsByTag(tagId, tagSlug): Observable<PostsListItem[]> {
    const url = `${this.apiUrl}/tags/${tagId}/${tagSlug}`;

    return this.httpClient.get(url)
      .map(res => res as PostsListItem[])
      .catch(this.errorsService.handleError);
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
  singlePost(genreSlug, bandSlug, postId, postSlug): Observable<any> {
    const url = `${this.apiUrl}/${genreSlug}/${bandSlug}/${postId}/${postSlug}`;

    return this.httpClient.get(url)
      .do(res => this.post = res)
      .catch(this.errorsService.handleError);
  }
}
