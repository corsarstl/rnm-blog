import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';

import { HotPostsComponent } from './components/hot-posts/hot-posts.component';
import { NewsletterSubscriptionComponent } from './components/newsletter-subscription/newsletter-subscription.component';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { KebabCasePipe } from './pipes/kebab-case.pipe';
import { TitleCasePipe } from './pipes/title-case.pipe';

@NgModule({
  declarations: [
    HotPostsComponent,
    NewsletterSubscriptionComponent,
    PopularTagsComponent,
    PaginationComponent,
    KebabCasePipe,
    TitleCasePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
    HotPostsComponent,
    NewsletterSubscriptionComponent,
    PopularTagsComponent,
    PaginationComponent,
    KebabCasePipe,
    TitleCasePipe
  ]
})
export class SharedModule { }
