import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SearchResult } from '../../core/search/search-result.model';
import { ErrorsService } from './errors.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  private apiUrl = 'http://rnmblog.com/api/quickSearch';
  searchTermFromNavbar: string;

  constructor(private httpClient: HttpClient,
              private errorService: ErrorsService) { }

  /**
   * Get posts from db containing search term in their title.
   *
   * @param searchTerm
   * @returns {Observable<SearchResult[]>}
   */
  quickSearch(searchTerm): Observable<SearchResult[]> {
    const url = `${this.apiUrl}/${searchTerm}`;

    return this.httpClient.get(url)
      .map(res => res as SearchResult[])
      .catch(this.errorService.handleError);
  }
}
