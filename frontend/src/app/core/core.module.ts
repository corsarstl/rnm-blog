import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthService } from '../shared/services/auth.service';
import { NavbarService } from './navbar/navbar.service';
import { PostService } from '../shared/services/post.service';
import { ErrorsService } from '../shared/services/errors.service';
import { CommentService } from '../blog/news/comments/comment.service';
import { AuthInterceptorService } from '../shared/services/auth-interceptor.service';
import { QuickSearchComponent } from './search/quick-search/quick-search.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PageNotFoundComponent,
    QuickSearchComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    AuthModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    AuthService,
    NavbarService,
    PostService,
    ErrorsService,
    CommentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
})
export class CoreModule {}
