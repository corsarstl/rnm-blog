import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AdminAuthService {
  private loginApiUrl = 'http://rnmblog.com/api/admin/login';

  constructor(private httpClient: HttpClient) { }

  /**
   * Send admin login data for verification.
   * Get valid token and save it.
   *
   * @param data
   * @returns {Observable<any>}
   */
  login(data: any): Observable<any> {
    localStorage.clear();
    const url = this.loginApiUrl;

    return this.httpClient.post(url, data)
      .do(res => {
        localStorage.setItem('authData', JSON.stringify(res['data']));
      });
  }

}
