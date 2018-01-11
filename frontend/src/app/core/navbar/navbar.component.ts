import { Component, OnInit } from '@angular/core';

import { MenuItem } from './menu-item.model';
import { AuthService } from '../../shared/services/auth.service';
import { NavbarService } from './navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rnm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // Genres with bands to display in menu
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService,
              private navbarService: NavbarService,
              private router: Router) { }

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

  onQuickSearch(event: any) {

    if (event.keyCode === 13) {
      event.preventDefault();
      console.log(event.target.value);
      // event.target.value.reset();

      this.router.navigate(['/blog/news/search']);
    }
  }
}
