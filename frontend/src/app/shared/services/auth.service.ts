import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private apiUrl = 'http://rnmblog.com';
  isLoggedIn = false;
  // redirect url after registration and login
  redirectUrl = 'posts';
  // data containing user name, email, id and valid token
  authData = JSON.parse(localStorage.getItem('authData'));






  constructor() { }

}
