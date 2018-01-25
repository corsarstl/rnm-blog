import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorsService } from '../../../shared/services/errors.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { PaginatedBands } from './paginated-bands.model';
import { Band } from './band.model';

@Injectable()
export class BandsService {
  // Initial input values for the first band selected.
  initialBandNameToEdit: string;
  initialBandIdToEdit: number;
  initialGenreIdToEdit: number;
  // Update initial editForm input values on click according to selected band.
  updateEditForm = new Subject();
  // Update list of bands after creating, updating or deleting of a band.
  refreshBands = new Subject();
  private baseUrl = 'http://rnmblog.com/api/admin';

  constructor(private httpClient: HttpClient,
              private errorsService: ErrorsService) { }

  /**
   * Get a list of bands.
   *
   * @returns {Observable<PaginatedBands[]>}
   */
  showBands(): Observable<PaginatedBands[]> {
    const url = `${this.baseUrl}/bands`;

    return this.getBands(url);
  }

  /**
   * Update bands after navigation to first, last, prev, next or selected pages.
   *
   * @param {string} url
   * @returns {Observable<PaginatedBands[]>}
   */
  updateBands(url: string): Observable<PaginatedBands[]> {
    return this.getBands(url);
  }

  /**
   * Add new band to db.
   *
   * @param data
   * @returns {Observable<any>}
   */
  addNewBand(data: any): Observable<any> {
    const url = `${this.baseUrl}/bands`;

    return this.httpClient.post(url, data)
      .catch(this.errorsService.handleError);
  }

  /**
   * Update selected band.
   *
   * @param data
   * @returns {Observable<any>}
   */
  updateBand(data: any): Observable<any> {
    const url = `${this.baseUrl}/bands/${data.bandId}`;

    return this.httpClient.put(url, data)
      .catch(this.errorsService.handleError);
  }

  /**
   * Delete selected band from db.
   *
   * @param bandId
   * @returns {Observable<any>}
   */
  deleteBand(bandId): Observable<any> {
    const url = `${this.baseUrl}/bands/${bandId}`;

    return this.httpClient.delete(url)
      .catch(this.errorsService.handleError);
  }

  /**
   * Get a list of bands for select field in form to create new post.
   *
   * @returns {Observable<Band[]>}
   */
  getBandsForNewPost(): Observable<Band[]> {
    const url = `${this.baseUrl}/posts/bandsForNewPost`;

    return this.httpClient.get(url)
      .map(res => res as Band[])
      .catch(this.errorsService.handleError);
  }

  /**
   * Get all bands for passed url.
   *
   * @param {string} url
   * @returns {Observable<PaginatedBands[]>}
   */
  private getBands(url: string): Observable<PaginatedBands[]> {
    return this.httpClient.get(url)
      .map(res => res as PaginatedBands[])
      .catch(this.errorsService.handleError);
  }
}
