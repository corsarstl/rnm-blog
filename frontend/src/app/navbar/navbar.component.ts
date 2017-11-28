import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rnm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  genres = [
    'Punk Rock',
    'Alternative Rock',
    'Hard Rock',
    'Heavy Metal',
    'Symphonic Metal',
    'Industrial Metal'
  ];

  userName = '';
/*  genresBands = [
  {
    'genre': 'Punk Rock',
    'bands': [ 'Green Day', 'AFI', 'The Offspring', 'Sex Pistols', 'Melvins']
  },
  {
    'genre': 'Alternative Rock',
    'bands': [ 'Green Day', 'AFI', 'The Offspring', 'Sex Pistols', 'Melvins']
  },
  {
    'genre': 'Hard Rock',
    'bands': [ 'Green Day', 'AFI', 'The Offspring', 'Sex Pistols', 'Melvins']
  },
  {
    'genre': 'Heavy Metal',
    'bands': [ 'Green Day', 'AFI', 'The Offspring', 'Sex Pistols', 'Melvins']
  },
  {
    'genre': 'Symphonic Metal',
    'bands': [ 'Green Day', 'AFI', 'The Offspring', 'Sex Pistols', 'Melvins']
  },
  {
    'genre': 'Industrial Metal',
    'bands': [ 'Green Day', 'AFI', 'The Offspring', 'Sex Pistols', 'Melvins']
  }
];*/

  constructor(private authService: AuthService,
              private router: Router) {
    this.userName = this.authService.userName;
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate([this.authService.userRedirectUrl]);
  }
}
