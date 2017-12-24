import { Component, OnInit } from '@angular/core';
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
              private navbarService: NavbarService) {
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
   * Show modal with login form.
   */
  openLoginForm() {
    this.authService.showLoginForm = true;
  }

  /**
   * Show modal with register form.
   */
  openRegisterForm() {
    this.authService.showRegisterForm = true;
  }

  /**
   * Log user out. Delete all info about user on client.
   */
  logout() {
    this.authService.logout();
  }
}
