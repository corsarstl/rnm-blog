import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { BackendDomainUrlService } from './backend-domain-url.service';

@Injectable()
export class AuthService {
  private apiUrl = `${this.backendDomainUrlService.backendUrl}/api`;
  isLoggedIn = false;
  // Data containing user name, email, id and valid token.
  authData = JSON.parse(localStorage.getItem('authData'));
  // Id of current logged in user.
  userId: number;
  showLoginForm = false;
  showRegisterForm = false;

  constructor(private httpClient: HttpClient,
              private backendDomainUrlService: BackendDomainUrlService) {
    if (this.authData != null) {
      if (this.authData.token) {
        this.isLoggedIn = true;
      }

      if (this.authData.user) {
        this.userId = this.authData.user.id;
      } else if (this.authData.admin) {
        this.userId = this.authData.admin.id;
      }
    }
  }

  /**
   * Send registration data.
   * If successful, get user name, email, id and valid token and save them.
   *
   * @param data
   * @returns {Observable<any>}
   */
  register(data: any): Observable<any> {
    localStorage.clear();
    const url = `${this.apiUrl}/register`;

    return this.httpClient.post(url, data)
      .do(res => {
        this.isLoggedIn = true;
        localStorage.setItem('authData', JSON.stringify(res['data']));
        this.setUserId();
      });
  }

  /**
   * Send login data for verification.
   * If successful, get user name, email, id and valid token and save them.
   *
   * @param data
   * @returns {Observable<any>}
   */
  login(data: any): Observable<any> {
    localStorage.clear();
    const url = `${this.apiUrl}/login`;

    return this.httpClient.post(url, data)
      .do(res => {
        this.isLoggedIn = true;
        localStorage.setItem('authData', JSON.stringify(res['data']));
        this.setUserId();
      });
  }

  /**
   * Log user out. Delete all info about user on client.
   */
  logout(): void {
    const url = `${this.apiUrl}/logout`;
    this.httpClient.post(url, {
      id: this.userId
    }).subscribe(res => {
      this.isLoggedIn = false;
      this.userId = 0;
      localStorage.clear();
    });
  }

  /**
   * Set logged in user id.
   */
  private setUserId() {
    const authData = JSON.parse(localStorage.getItem('authData'));
    this.userId = authData.user.id;
  }
}
