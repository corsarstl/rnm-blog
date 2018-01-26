import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorsService } from '../../../shared/services/errors.service';

import { PaginatedTags } from './paginated-tags.model';
import { Tag } from './tag.model';

@Injectable()
export class TagsService {
  // Initial input values for the first tag selected.
  initialTagNameToEdit: string;
  initialTagIdToEdit: number;
  // Update initial editForm input values on click according to selected tag.
  updateEditForm = new Subject();
  // Update list of tags after creating, updating or deleting of a tag.
  refreshTags = new Subject();
  private baseUrl = 'http://rnmblog.com/api/admin';

  constructor(private httpClient: HttpClient,
              private errorsService: ErrorsService) { }

  /**
   * Get all tags.
   *
   * @returns {Observable<PaginatedTags[]>}
   */
  showTags(): Observable<PaginatedTags[]> {
    const url = `${this.baseUrl}/tags`;

    return this.getTags(url);
  }

  /**
   * Update tags after navigation to first, last, prev, next or selected pages.
   *
   * @param {string} url
   * @returns {Observable<PaginatedTags[]>}
   */
  updateTags(url: string): Observable<PaginatedTags[]> {
    return this.getTags(url);
  }

  /**
   * Add new tag to db.
   *
   * @param {string} tagName
   * @returns {Observable<any>}
   */
  addNewTag(tagName: string): Observable<any> {
    const url = `${this.baseUrl}/tags`;

    return this.httpClient.post(url, tagName)
      .catch(this.errorsService.handleError);
  }

  /**
   * Update selected tag.
   *
   * @param data
   * @returns {Observable<any>}
   */
  updateTag(data: any): Observable<any> {
    const url = `${this.baseUrl}/tags/${data.tagId}`;

    return this.httpClient.put(url, data)
      .catch(this.errorsService.handleError);
  }

  /**
   * Delete selected tag from db.
   *
   * @param tagId
   * @returns {Observable<any>}
   */
  deleteTag(tagId): Observable<any> {
    const url = `${this.baseUrl}/tags/${tagId}`;

    return this.httpClient.delete(url)
      .catch(this.errorsService.handleError);
  }

  /**
   * Get a list of tags for select field in form to create new post.
   *
   * @returns {Observable<Tag[]>}
   */
  getTagsForNewPost(): Observable<Tag[]> {
    const url = `${this.baseUrl}/posts/tagsForNewPost`;

    return this.httpClient.get(url)
      .map(res => res as Tag[])
      .catch(this.errorsService.handleError);
  }

  /**
   * Get all tags for passed url.
   *
   * @param {string} url
   * @returns {Observable<PaginatedTags[]>}
   */
  private getTags(url: string): Observable<PaginatedTags[]> {
    return this.httpClient.get(url)
      .map(res => res as PaginatedTags[])
      .catch(this.errorsService.handleError);
  }
}
