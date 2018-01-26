import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { AdminAuthService } from './admin-login/admin-auth.service';
import { AdminAuthGuard } from './admin-login/admin-auth-guard.service';
import { GenresService } from './admin-dashboard/genres/genres.service';
import { TagsService } from './admin-dashboard/tags/tags.service';
import { BandsService } from './admin-dashboard/bands/bands.service';

import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GenresComponent } from './admin-dashboard/genres/genres.component';
import { BandsComponent } from './admin-dashboard/bands/bands.component';
import { TagsComponent } from './admin-dashboard/tags/tags.component';
import { PostsComponent } from './admin-dashboard/posts/posts.component';
import { GenreNewComponent } from './admin-dashboard/genres/genre-new/genre-new.component';
import { GenreEditComponent } from './admin-dashboard/genres/genre-edit/genre-edit.component';
import { TagEditComponent } from './admin-dashboard/tags/tag-edit/tag-edit.component';
import { TagNewComponent } from './admin-dashboard/tags/tag-new/tag-new.component';
import { BandNewComponent } from './admin-dashboard/bands/band-new/band-new.component';
import { BandEditComponent } from './admin-dashboard/bands/band-edit/band-edit.component';
import { PostNewComponent } from './admin-dashboard/posts/post-new/post-new.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    GenresComponent,
    BandsComponent,
    TagsComponent,
    PostsComponent,
    GenreNewComponent,
    GenreEditComponent,
    TagEditComponent,
    TagNewComponent,
    BandNewComponent,
    BandEditComponent,
    PostNewComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    AdminAuthService,
    AdminAuthGuard,
    GenresService,
    TagsService,
    BandsService
  ]
})
export class AdminModule { }
