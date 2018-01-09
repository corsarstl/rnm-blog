import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '../core/core.module';
import { HomeModule } from './home/home.module';
import { NewsModule } from './news/news.module';

import { BlogComponent } from './blog.component';

@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    HomeModule,
    NewsModule
  ]
})
export class BlogModule { }
