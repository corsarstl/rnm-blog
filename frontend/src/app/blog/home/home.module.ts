import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './home.component';
import { LatestPostsComponent } from './latest-posts/latest-posts.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [
    HomeComponent,
    LatestPostsComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
