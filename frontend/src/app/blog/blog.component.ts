import { Component } from '@angular/core';

@Component({
  selector: 'rnm-blog',
  template: `
      <rnm-navbar></rnm-navbar>
      <router-outlet></router-outlet>
  `,
  styles: []
})
export class BlogComponent {
}
