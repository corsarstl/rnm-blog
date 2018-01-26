import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { GenresService } from '../genres.service';

@Component({
  selector: 'rnm-genre-edit',
  templateUrl: './genre-edit.component.html',
  styles: []
})
export class GenreEditComponent implements OnInit, OnDestroy {
  genreEditForm: FormGroup;
  // Update initial editForm input values on click according to selected genre.
  updateEditForm: Subscription;

  constructor(private genresService: GenresService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.genreEditForm = this.fb.group({
      'newGenreName': [
        this.genresService.initialGenreNameToEdit,
        Validators.required
      ],
      'genreId': [
        this.genresService.initialGenreIdToEdit,
        Validators.required
      ]
    });

    this.updateEditForm = this.genresService.updateEditForm
      .subscribe((newEditFormValues) => {
        console.log(newEditFormValues['newGenreName']);
        console.log(newEditFormValues['newGenreId']);

        this.genreEditForm.patchValue({'newGenreName': newEditFormValues['newGenreName']});
        this.genreEditForm.patchValue({'genreId': newEditFormValues['newGenreId']});
      });
  }

  /**
   * Save updated genre to db.
   * Update list of genres.
   */
  onSave() {
    this.genresService.updateGenre(this.genreEditForm.value)
      .subscribe(() => {
        console.log('Genre has been updated.');
        this.genresService.refreshGenres.next();
        this.genreEditForm.reset();
      });
  }

  /**
   * Reset form inputs.
   * Update list of genres.
   */
  onCancel() {
    this.genreEditForm.reset();
    this.genresService.refreshGenres.next();
  }

  ngOnDestroy() {
    this.updateEditForm.unsubscribe();
  }
}
