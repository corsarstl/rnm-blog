import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorsService } from '../../../shared/services/errors.service';
import { Observable } from 'rxjs/Observable';
import { Band } from './band.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BandsService {
  private apiUrl = 'http://rnmblog.com/api/admin/bands';

  constructor(private httpClient: HttpClient,
              private errorsService: ErrorsService) { }

  getBands(): Observable<Band[]> {
    const url = this.apiUrl;

    return this.httpClient.get(url)
      .map(res => res as Band[])
      .catch(this.errorsService.handleError);
  }

}
