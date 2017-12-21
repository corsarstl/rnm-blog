import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { NavbarService } from './navbar.service';
import { MenuItem } from './menu-item';

@Component({
  selector: 'rnm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // Genres with bands to display in menu
  menuItems: MenuItem[] = [];
  userName = '';

  constructor(private authService: AuthService,
              private navbarService: NavbarService,
              private router: Router) {
    this.userName = this.authService.userName;
  }

  ngOnInit() {
    this.getMenuItems();
  }

  /**
   * Get all genres with corresponding bands for menu.
   */
  getMenuItems() {
    this.navbarService.getMenuItems()
      .subscribe(data => {
        this.menuItems = data['data'];
      });
  }

  /**
   * Log user out. Delete all info about user on client.
   *
   */
  logout() {
    this.authService.logout();
    this.router.navigate([this.authService.userRedirectUrl]);
  }
}
