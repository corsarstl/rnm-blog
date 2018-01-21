import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AdminAuthService } from './admin-auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private adminAuthService: AdminAuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    const adminState = this.adminAuthService.adminIsLoggedIn;

    if (adminState) {
      return true;
    }
    this.router.navigate(['/']);
  }
}
