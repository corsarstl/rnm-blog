import { Component, OnDestroy, OnInit } from '@angular/core';
import { Genre } from './genre.model';
import { GenresService } from './genres.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rnm-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
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
    this.genresService.showGenres()
      .subscribe(data => {
        this.genres = data['genres'];
        console.log(this.genres);
      });
  }

  /**
   * Show genreEditForm.
   * Pass initial or updated values to form and update genres list.
   *
   * @param genreName
   * @param genreId
   */
  onEdit(genreName, genreId) {
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
   * @param genreId
   */
  onDelete(genreId) {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      this.genresService.deleteGenre(genreId)
        .subscribe(() => {
          console.log(`Genre #${genreId} has been deleted.`);
          this.genresService.refreshGenres.next();
        });
    }
  }

  ngOnDestroy() {
    this.refreshGenres.unsubscribe();
  }
}
