import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {
  private apiUrl = 'http://rnmblog.com';
  isLoggedIn = false;
  // redirect url after registration and login
  userRedirectUrl = 'posts';
  // data containing user name, email, id and valid token
  authData = JSON.parse(localStorage.getItem('authData'));

  constructor(private httpClient: HttpClient) { }

  /**
   * Send registration data.
   * If successful, get user name, email, id and valid token and save them.
   *
   * @param data
   * @returns {Observable<any>}
   */
  register(data: any): Observable<any> {
    localStorage.clear();
    const url = `${this.apiUrl}/api/register`;
    return this.httpClient.post(url, data)
      .do(res => {
        this.isLoggedIn = true;
        localStorage.setItem('authData', JSON.stringify(res));
      });
  }

}
