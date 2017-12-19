import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { PostDetails } from '../../post/post-details';
import { HotPost } from '../../hot-posts/hot-post';
import { PopularTag } from '../../popular-tags/popular-tag';
import { PostsListItem } from '../../posts-list/posts-list-item';

@Injectable()
export class PostService {
  private apiUrl = 'http://rnmblog.com/api';
  posts = [];
  post: PostDetails;

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
   * @returns {Observable<PostsListItem[]>}
   */
  postsByGenre(genreSlug): Observable<PostsListItem[]> {
    const url = `${this.apiUrl}/genres/${genreSlug}`;
    return this.httpClient.get(url)
      .map(res => res as PostsListItem[]);

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
      .map(res => res as PostsListItem[]);

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
      .map(res => res as PostsListItem[]);

  }

  /**
   * Get a list of 5 popular posts with most number of comments.
   *
   * @returns {Observable<HotPost[]>}
   */
  hotPosts(): Observable<HotPost[]> {
    const url = `${this.apiUrl}/hotPosts`;
    return this.httpClient.get(url)
      // .do(res => res = this.posts);
      .map(res => res as HotPost[]);
  }

  /**
   * Get a list of tags with the number of related posts.
   *
   * @returns {Observable<PopularTag[]>}
   */
  getPopularTags(): Observable<PopularTag[]> {
    const url = `${this.apiUrl}/popularTags`;
    return this.httpClient.get(url)
      .map(res => res as PopularTag[]);
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
