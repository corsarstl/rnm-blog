import { Tag } from './tag.model';

export class PaginatedTags {
  current_page: number;
  data: Tag[];
  from: number;
  last_page: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}
