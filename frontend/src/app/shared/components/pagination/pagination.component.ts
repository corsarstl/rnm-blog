import { Component, Input } from '@angular/core';
import { PostService } from '../../services/post.service';

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

  constructor(private postService: PostService) { }

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
      default:
        break;
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

    this.postService.navigatedToNewPage.next(url);
  }

  /**
   * Load posts for the previous page.
   */
  onPrev() {
    const url = this.prevPageUrl;

    this.postService.navigatedToNewPage.next(url);
  }

  /**
   * Load posts for the selected page.
   *
   * @param {number} offset
   * @param {string} path
   */
  onPage(offset: number, path = this.path) {
    const url = `${path}?page=${offset}`;

    this.postService.navigatedToNewPage.next(url);
  }

  /**
   * Load posts for the next page.
   */
  onNext() {
    const url = this.nextPageUrl;

    this.postService.navigatedToNewPage.next(url);
  }

  /**
   * Load posts for the last page.
   */
  onLast() {
    const offset = this.lastPage;
    const path = this.path;
    const url = `${path}?page=${offset}`;

    this.postService.navigatedToNewPage.next(url);
  }
}
