import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ErrorsService } from '../../shared/services/errors.service';
import { BackendDomainUrlService } from '../../shared/services/backend-domain-url.service';

import { MenuItem } from './menu-item.model';

@Injectable()
export class NavbarService {
  private apiUrl = `${this.backendDomainUrlService.backendUrl}/api`;

  constructor(private httpClient: HttpClient,
              private errorsService: ErrorsService,
              private backendDomainUrlService: BackendDomainUrlService) { }

  /**
   *Get all genres with corresponding bands for menu.
   *
   * @returns {Observable<MenuItem[]>}
   */
  getMenuItems(): Observable<MenuItem[]> {
    const url = `${this.apiUrl}/navbarMenu`;
    return this.httpClient.get(url)
      .map(res => res as MenuItem[])
      .catch(this.errorsService.handleError);
  }
}
