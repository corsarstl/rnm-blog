import { Post } from './post.model';

export class PaginatedPosts {
  current_page: number;
  data: Post[];
  from: number;
  last_page: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}
