import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MenuItem } from './menu-item';

@Injectable()
export class NavbarService {
  private apiUrl = 'http://rnmblog.com/api';

  constructor(private httpClient: HttpClient) { }

  /**
   *Get all genres with corresponding bands for menu.
   *
   * @returns {Observable<Genre[]>}
   */
  getMenuItems(): Observable<MenuItem[]> {
    const url = `${this.apiUrl}/navbarMenu`;
    return this.httpClient.get(url)
      .map(res => res as MenuItem[]);
  }

}
