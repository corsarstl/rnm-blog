import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorsService } from '../../../shared/services/errors.service';
import { Observable } from 'rxjs/Observable';
import { Band } from './band.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BandsService {
  // Update list of bands after creating, updating or deleting of a band.
  refreshBands = new Subject();
  private apiUrl = 'http://rnmblog.com/api/admin/bands';

  constructor(private httpClient: HttpClient,
              private errorsService: ErrorsService) { }

  /**
   * Get a list of bands.
   *
   * @returns {Observable<Band[]>}
   */
  getBands(): Observable<Band[]> {
    const url = this.apiUrl;

    return this.httpClient.get(url)
      .map(res => res as Band[])
      .catch(this.errorsService.handleError);
  }

  /**
   * Add new band to db.
   *
   * @param data
   * @returns {Observable<any>}
   */
  addNewBand(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, data)
      .catch(this.errorsService.handleError);
  }

}
