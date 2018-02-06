import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { SearchService } from '../../../shared/services/search.service';
import { PaginatedSearchResults } from '../paginated-search-results.model';

@Component({
  selector: 'rnm-quick-search',
  templateUrl: './quick-search.component.html',
  styles: []
})
export class QuickSearchComponent implements OnInit, OnDestroy {
  quickSearchForm: FormGroup;
  // Subscription to update search results after navigation to first, last, prev, next or selected pages.
  refreshResults: Subscription;
  results: PaginatedSearchResults[] = [];

  constructor(private fb: FormBuilder,
              private searchService: SearchService) { }

  ngOnInit() {
    this.quickSearchForm = this.fb.group({
      'searchTerm': [
        this.searchService.searchTermFromNavbar,
        Validators.required
      ]
    });

    this.getResults();

    this.refreshResults = this.searchService.refreshResults.subscribe(
      (url) => {
        this.searchService.updateResults(url).subscribe(
          data => {
            this.results = data['results'];
          });
      }
    );
  }

  /**
   * Get posts from db containing search term in their title.
   */
  getResults() {
    const searchTerm = this.quickSearchForm.get('searchTerm').value;

    if (searchTerm !== null && searchTerm.length > 1) {
      searchTerm.trim();
      searchTerm.toLowerCase();

      return this.searchService.quickSearch(searchTerm)
        .subscribe(data => {
          this.results = data['results'];
        });
    }
  }

  ngOnDestroy() {
    this.refreshResults.unsubscribe();
  }
}
