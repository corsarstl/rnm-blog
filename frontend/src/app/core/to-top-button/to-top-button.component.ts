import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'rnm-to-top-button',
  template: `
      <div class="scroll-to-top cursor-pointer" [ngClass]="{'show-scroll': navIsFixed}">
          <i class="far fa-arrow-alt-circle-up fa-2x" (click)="scrollToTop()"></i>
      </div>
  `,
  styleUrls: ['./to-top-button.component.css']
})
export class ToTopButtonComponent {
  navIsFixed: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset ||
               document.documentElement.scrollTop ||
               document.body.scrollTop < 10) {
      this.navIsFixed = false;
    }
  }

  scrollToTop() { (function smoothscroll() {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  })();
  }
}
