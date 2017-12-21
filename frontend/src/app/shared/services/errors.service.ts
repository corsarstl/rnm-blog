import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorsService {

  handleError (error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error.error instanceof HttpErrorResponse) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
