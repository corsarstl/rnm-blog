import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PostService } from '../../services/post.service';
import { CommentService } from '../../../blog/news/comments/comment.service';
import { SearchService } from '../../services/search.service';
import { BandsService } from '../../../admin/admin-dashboard/bands/bands.service';
import { TagsService } from '../../../admin/admin-dashboard/tags/tags.service';

@Component({
  selector: 'rnm-pagination',
  templateUrl: './pagination.component.html',
  styles: ['.cursor-pointer { cursor: pointer; }',
           '.cursor-auto { cursor: auto; }']
})
export class PaginationComponent {
  @Input() currentPage: number;
  @Input() path: string;
  @Input() lastPage: number;
  @Input() itemsPerPage: number;
  @Input() totalItems: number;
  @Input() prevPageUrl: string;
  @Input() nextPageUrl: string;

  constructor(private postService: PostService,
              private commentService: CommentService,
              private searchService: SearchService,
              private bandsService: BandsService,
              private tagsService: TagsService,
              private router: Router) { }

  /**
   * Get numbers of pages to display between prev and next buttons.
   *
   * @returns {number[]}
   */
  getPages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    const currentPage = this.currentPage;
    const lastPage = this.lastPage;
    const pages = [];

    if (totalPages < 4) {
      switch (totalPages) {
        case 1:
          pages.push(1);
          return pages;
        case 2:
          pages.push(1, 2);
          return pages;
        case 3:
          pages.push(1, 2, 3);
          return pages;
      }
    }

    if (currentPage === 1) {
      pages.push(currentPage, currentPage + 1, currentPage + 2);
    } else if (currentPage === lastPage) {
      pages.push(currentPage - 2, currentPage - 1, currentPage);
    } else {
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    }

    return pages;
  }

  /**
   * Load posts for the first page.
   */
  onFirst() {
    const url = this.path;

    if (this.currentPage !== 1) {
      this.updateComponent(url);
    }
  }

  /**
   * Load posts for the previous page.
   */
  onPrev() {
    const url = this.prevPageUrl;

    if (this.currentPage !== 1) {
      this.updateComponent(url);
    }
  }

  /**
   * Load posts for the selected page.
   *
   * @param {number} offset
   * @param {string} path
   */
  onPage(offset: number, path = this.path) {
    const url = `${path}?page=${offset}`;

    this.updateComponent(url);
  }

  /**
   * Load posts for the next page.
   */
  onNext() {
    const url = this.nextPageUrl;

    if (this.currentPage !== this.lastPage) {
      this.updateComponent(url);
    }
  }

  /**
   * Load posts for the last page.
   */
  onLast() {
    const offset = this.lastPage;
    const path = this.path;
    const url = `${path}?page=${offset}`;

    if (this.currentPage !== this.lastPage) {
      this.updateComponent(url);
    }
  }

  /**
   * Update loaded component after navigation to new page.
   *
   * @param {string} url
   */
  private updateComponent(url: string) {
    const currentRoute = this.router.url;

    if (currentRoute.includes('/blog/news/search')) {
      this.searchService.refreshResults.next(url);
    } else if (currentRoute.includes('/blog/news')) {
      this.postService.navigatedToNewPage.next(url);
      this.commentService.refreshComments.next(url);
    } else if (currentRoute.includes('/admin/dashboard/bands')) {
      this.bandsService.refreshBands.next(url);
    } else if (currentRoute.includes('/admin/dashboard/tags')) {
      this.tagsService.refreshTags.next(url);
    }
  }
}
