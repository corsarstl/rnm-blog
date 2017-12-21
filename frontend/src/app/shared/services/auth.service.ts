import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {
  private apiUrl = 'http://rnmblog.com/api';
  isLoggedIn = false;
  // Redirect url after registration and login.
  userRedirectUrl = 'home';
  // Data containing user name, email, id and valid token.
  authData = JSON.parse(localStorage.getItem('authData'));
  // Id of current logged in user.
  userId = '';
  // Name of current logged in user.
  userName = '';

  showLoginForm = false;
  showRegisterForm = false;

  constructor(private httpClient: HttpClient) {
    if (this.authData != null) {
      if (this.authData.token) {
        this.isLoggedIn = true;
      }
      this.userId = this.authData.user.id;
      this.userName = this.authData.user.name;
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
        localStorage.setItem('authData', JSON.stringify(res));
        // this.showRegisterForm = false;
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
        localStorage.setItem('authData', JSON.stringify(res));
        // this.showLoginForm = false;
        // this.removeModalBackdrop();
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
      localStorage.clear();
      console.log(res);
    });
  }

  /**
   * Close modal with login form.
   */
  closeLoginForm() {
    this.showLoginForm = false;
    this.showRegisterForm = true;
  }

  // removeModalBackdrop() {
  //   let elem: any = document.getElementsByClassName('modal-backdrop').outerHTML = '';
  //   // elem.parentElement.removeChild(elem);
  // }


  /**
   * Close modal with register form.
   */
  closeRegisterForm() {
    this.showRegisterForm = false;
  }
}
