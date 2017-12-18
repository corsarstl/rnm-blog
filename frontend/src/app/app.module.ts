import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './shared/services/auth.service';
import { NavbarService } from './navbar/navbar.service';
import { TitleCasePipe } from './shared/pipes/title-case.pipe';
import { PostService } from './shared/services/post.service';
import { GenreComponent } from './genre/genre.component';
import { KebabCasePipe } from './shared/pipes/kebab-case.pipe';
import { BandComponent } from './band/band.component';
import { PostComponent } from './post/post.component';
import { SliderComponent } from './slider/slider.component';
import { PopularPostsComponent } from './hot-posts/hot-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    TitleCasePipe,
    GenreComponent,
    KebabCasePipe,
    BandComponent,
    PostComponent,
    SliderComponent,
    PopularPostsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    NavbarService,
    PostService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
