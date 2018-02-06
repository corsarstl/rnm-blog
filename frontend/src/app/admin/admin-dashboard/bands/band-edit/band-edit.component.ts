import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { BandsService } from '../bands.service';
import { GenresService } from '../../genres/genres.service';

import { Genre } from '../../genres/genre.model';

@Component({
  selector: 'rnm-band-edit',
  templateUrl: './band-edit.component.html',
  styles: []
})
export class BandEditComponent implements OnInit, OnDestroy {
  bandEditForm: FormGroup;
  // Update initial editForm input values on click according to selected band.
  updateEditForm: Subscription;
  // List of genres to display in genre select tag.
  genres: Genre[] = [];

  constructor(private bandsService: BandsService,
              private genresService: GenresService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.showGenres();

    this.bandEditForm = this.fb.group({
      'newBandName': [
        this.bandsService.initialBandNameToEdit,
        Validators.required
      ],
      'bandId': [
        this.bandsService.initialBandIdToEdit,
        Validators.required
      ],
      'genreId': [
        this.bandsService.initialGenreIdToEdit,
        Validators.required
      ]
    });

    this.updateEditForm = this.bandsService.updateEditForm
      .subscribe((newEditFormValues) => {
        this.bandEditForm.patchValue({'newBandName': newEditFormValues['newBandName']});
        this.bandEditForm.patchValue({'bandId': newEditFormValues['newBandId']});
        this.bandEditForm.patchValue({'genreId': newEditFormValues['newGenreId']});
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
   * Save updated band to db.
   * Update list of bands.
   */
  onSave() {
    this.bandsService.updateBand(this.bandEditForm.value)
      .subscribe(() => {
        this.bandsService.refreshBands.next();
        this.bandEditForm.reset();
      });
  }

  /**
   * Reset form inputs.
   * Update list of bands.
   */
  onCancel() {
    this.bandEditForm.reset();
    this.bandsService.refreshBands.next();
  }

  ngOnDestroy() {
    this.updateEditForm.unsubscribe();
  }
}
