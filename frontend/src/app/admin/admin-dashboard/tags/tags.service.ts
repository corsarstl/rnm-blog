import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { ErrorsService } from '../../../shared/services/errors.service';
import { Observable } from 'rxjs/Observable';
import { Tag } from './tag.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TagsService {
  // Initial input values for the first tag selected.
  initialTagNameToEdit: string;
  initialTagIdToEdit: number;
  // Update initial editForm input values on click according to selected tag.
  updateEditForm = new Subject();
  // Update list of tags after creating, updating or deleting of a tag.
  refreshTags = new Subject();
  private apiUrl = 'http://rnmblog.com/api/admin/tags';

  constructor(private httpClient: HttpClient,
              private errorsService: ErrorsService) { }

  /**
   * Get all tags.
   *
   * @returns {Observable<Tag[]>}
   */
  showTags(): Observable<Tag[]> {
    const url = this.apiUrl;

    return this.httpClient.get(url)
      .map(res => res as Tag[])
      .catch(this.errorsService.handleError);
  }

  /**
   * Add new tag to db.
   *
   * @param {string} tagName
   * @returns {Observable<any>}
   */
  addNewTag(tagName: string): Observable<any> {
    return this.httpClient.post(this.apiUrl, tagName)
      .catch(this.errorsService.handleError);
  }

  /**
   * Update selected tag.
   *
   * @param data
   * @returns {Observable<any>}
   */
  updateTag(data: any): Observable<any> {
    const url = `${this.apiUrl}/${data.tagId}`;

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
    const url = `${this.apiUrl}/${tagId}`;

    return this.httpClient.delete(url)
      .catch(this.errorsService.handleError);
  }
}
