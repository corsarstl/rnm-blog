import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostsComponent } from './posts/posts.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SingUpComponent },
  { path: 'posts', component: PostsComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
