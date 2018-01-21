import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAuthGuard } from './admin-login/admin-auth-guard.service';
import { GenresComponent } from './admin-dashboard/genres/genres.component';
import { BandsComponent } from './admin-dashboard/bands/bands.component';
import { TagsComponent } from './admin-dashboard/tags/tags.component';
import { PostsComponent } from './admin-dashboard/posts/posts.component';

const adminRoutes: Routes = [
  { path: 'admin', redirectTo: '/admin/login', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'login', component: AdminLoginComponent },
    { path: 'dashboard', canActivate: [AdminAuthGuard], component: AdminDashboardComponent, children: [
      { path: 'genres', component: GenresComponent },
      { path: 'bands', component: BandsComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'posts', component: PostsComponent },
    ] }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
