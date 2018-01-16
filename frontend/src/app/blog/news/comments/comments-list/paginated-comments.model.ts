import { Comment } from '../comment/comment.model';

export class PaginatedComments {
  current_page: number;
  data: Comment[];
  from: number;
  last_page: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}
