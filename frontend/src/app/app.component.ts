import { Component } from '@angular/core';

@Component({
  selector: 'rnm-root',
  template: `
      <ng-progress></ng-progress>
      <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
}
