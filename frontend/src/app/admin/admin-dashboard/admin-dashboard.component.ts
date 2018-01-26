import { Component } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';
import { AdminAuthService } from '../admin-login/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rnm-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styles: []
})
export class AdminDashboardComponent {

  constructor(private authService: AuthService,
              private adminAuthService: AdminAuthService,
              private router: Router) { }

  /**
   * Log admin out.
   */
  onLogout() {
    this.authService.logout();
    this.adminAuthService.adminIsLoggedIn = false;
    this.router.navigate(['/admin']);
  }
}
