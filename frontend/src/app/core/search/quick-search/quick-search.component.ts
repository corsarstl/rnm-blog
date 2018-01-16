import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SearchService } from '../../../shared/services/search.service';
import { SearchResult } from '../search-result.model';

@Component({
  selector: 'rnm-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.css']
})
export class QuickSearchComponent implements OnInit {
  quickSearchForm: FormGroup;
  results: SearchResult[] = [];

  constructor(private fb: FormBuilder,
              private searchService: SearchService) { }

  ngOnInit() {
    this.quickSearchForm = this.fb.group({
      'searchTerm': [this.searchService.searchTermFromNavbar, Validators.required]
    });

    this.getResults();
  }

  /**
   * Get posts from db containing search term in their title.
   */
  getResults() {
    const searchTerm = this.quickSearchForm.get('searchTerm').value;

    if (searchTerm !== null && searchTerm.length > 2) {
      searchTerm.trim();
      searchTerm.toLowerCase();

      this.searchService.quickSearch(searchTerm)
        .subscribe(data => {
          this.results = data['data'];
          console.log(this.results);
          this.searchService.searchTermFromNavbar = searchTerm;
        });
    }
  }
}
