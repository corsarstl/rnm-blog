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
  @Input() prevPageUrl: string;
  @Input() nextPageUrl: string;

  constructor(private postService: PostService) { }

  /**
   * Get numbers of pages to display between prev and next buttons.
   *
   * @returns {Array}
   */
  getPages() {
    const currentPage = this.currentPage;
    const lastPage = this.lastPage;
    const pages = [];

    if (currentPage === 1) {
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push(currentPage + 2);
    } else if (currentPage === lastPage) {
      pages.push(currentPage - 2);
      pages.push(currentPage - 1);
      pages.push(currentPage);
    } else {
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
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
