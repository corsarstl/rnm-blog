import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogRoutingModule } from './blog/blog-routing.module';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/blog/home', pathMatch: 'full' },
  { path: '404-page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404-page-not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    BlogRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
