import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { GenresService } from './genres.service';

import { Genre } from './genre.model';

@Component({
  selector: 'rnm-genres',
  templateUrl: './genres.component.html',
  styles: []
})
export class GenresComponent implements OnInit, OnDestroy {
  genres: Genre[] = [];
  showGenreEditForm = false;
  refreshGenres: Subscription;

  constructor(private genresService: GenresService) { }

  ngOnInit() {
    this.showGenres();

    this.refreshGenres = this.genresService.refreshGenres
      .subscribe(() => {
        this.showGenres();
        this.showGenreEditForm = false;
    });
  }

  /**
   * Get a list of all genres.
   */
  showGenres() {
    this.genresService.getGenres()
      .subscribe(data => {
        this.genres = data['genres'];
      });
  }

  /**
   * Show genreEditForm.
   * Pass initial or updated values to form and update genres list.
   *
   * @param {string} genreName
   * @param {number} genreId
   */
  onEdit(genreName: string, genreId: number) {
    this.showGenreEditForm = true;
    this.genresService.initialGenreNameToEdit = genreName;
    this.genresService.initialGenreIdToEdit = genreId;

    const newEditFormValues = [];
    newEditFormValues['newGenreName'] = genreName;
    newEditFormValues['newGenreId'] = genreId;

    this.genresService.updateEditForm.next(newEditFormValues);
  }

  /**
   * Delete selected genre from db.
   * Update list of genres.
   *
   * @param {number} genreId
   */
  onDelete(genreId: number) {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      this.genresService.deleteGenre(genreId)
        .subscribe(() => {
          this.genresService.refreshGenres.next();
        });
    }
  }

  ngOnDestroy() {
    this.refreshGenres.unsubscribe();
  }
}
