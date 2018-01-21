import { Component, OnInit } from '@angular/core';
import { Genre } from './genre.model';
import { GenresService } from './genres.service';

@Component({
  selector: 'rnm-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];

  constructor(private genresService: GenresService) { }

  ngOnInit() {
    this.showGenres();
  }

  /**
   * Get all genres.
   */
  showGenres() {
    this.genresService.showGenges()
      .subscribe(data => {
        this.genres = data['genres'];
        console.log(this.genres);
      });
  }

}
