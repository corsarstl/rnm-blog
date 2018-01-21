import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAuthGuard } from './admin-login/admin-auth-guard.service';

const adminRoutes: Routes = [
  { path: 'admin', redirectTo: '/admin/login', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'login', component: AdminLoginComponent },
    { path: 'dashboard', canActivate: [AdminAuthGuard], component: AdminDashboardComponent }
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
