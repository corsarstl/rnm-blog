import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {
  private apiUrl = 'http://rnmblog.com/api/quickSearch';

  constructor(private httpClient: HttpClient) { }

}
