import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ErrorsService } from './errors.service';
import { PaginatedSearchResults } from '../../core/search/paginated-search-results.model';

@Injectable()
export class SearchService {
  // Update search results after navigation to first, last, prev, next or selected pages.
  refreshResults = new Subject();
  // Term typed in navbar search input used as initial value for quickSearchForm.
  searchTermFromNavbar: string;
  private apiUrl = 'http://rnmblog.com/api/quickSearch';

  constructor(private httpClient: HttpClient,
              private errorService: ErrorsService) { }

  /**
   * Get posts from db containing search term in their title.
   *
   * @param searchTerm
   * @returns {Observable<SearchResult[]>}
   */
  quickSearch(searchTerm): Observable<PaginatedSearchResults[]>  {
    const url = `${this.apiUrl}/${searchTerm}`;

    return this.getResults(url);
  }

  /**
   * Update search results after navigation to first, last, prev, next or selected pages.
   *
   * @param url
   * @returns {Observable<PaginatedSearchResults[]>}
   */
  updateResults(url): Observable<PaginatedSearchResults[]>  {
    return this.getResults(url);
  }

  /**
   * Get search results for passed url.
   *
   * @param url
   * @returns {Observable<PaginatedSearchResults[]>}
   */
  private getResults(url): Observable<PaginatedSearchResults[]> {
    return this.httpClient.get(url)
      .map(res => res as PaginatedSearchResults[])
      .catch(this.errorService.handleError);
  }
}
