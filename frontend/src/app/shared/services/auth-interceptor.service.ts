import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  /**
   * If user is logged in, add authorization token to the headers.
   *
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authData = JSON.parse(localStorage.getItem('authData'));

    if (authData !== null) {
      const token = authData.token;

      if (token !== undefined) {
        console.log('Interceptor is working');

        return next.handle(req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + authData.token)
        }));
      }
    } else {
      console.log('Interceptor: no token is needed.');
      return next.handle(req);
    }
  }
}
