import { SearchResult } from './search-result.model';

export class PaginatedSearchResults {
  current_page: number;
  data: SearchResult[];
  from: number;
  last_page: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}
