import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
