import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class AdminModule { }
