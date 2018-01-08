import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';
import { AuthModule } from '../auth/auth.module';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthService } from '../shared/services/auth.service';
import { NavbarService } from './navbar/navbar.service';
import { PostService } from '../shared/services/post.service';
import { ErrorsService } from '../shared/services/errors.service';
import { CommentService } from '../blog/news/posts/post/comments/comment.service';
import { AuthInterceptorService } from '../shared/services/auth-interceptor.service';

import { KebabCasePipe } from '../shared/pipes/kebab-case.pipe';
import { TitleCasePipe } from '../shared/pipes/title-case.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    KebabCasePipe,
    TitleCasePipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AuthModule
  ],
  exports: [
    NavbarComponent,
    AppRoutingModule,
    KebabCasePipe,
    TitleCasePipe
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
