import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BandsService } from '../bands.service';
import { GenresService } from '../../genres/genres.service';

import { Genre } from '../../genres/genre.model';

@Component({
  selector: 'rnm-band-new',
  templateUrl: './band-new.component.html',
  styles: []
})
export class BandNewComponent implements OnInit {
  bandNewForm: FormGroup;
  // List of genres to display in genre select tag.
  genres: Genre[] = [];

  constructor(private bandsService: BandsService,
              private genresService: GenresService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.showGenres();

    this.bandNewForm = this.fb.group({
      'bandName': ['', Validators.required],
      'genreId': ['', Validators.required]
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
   * Add new band to db.
   * Update list of bands.
   */
  onAdd() {
    this.bandsService.addNewBand(this.bandNewForm.value)
      .subscribe(() => {
        this.bandsService.refreshBands.next();
        this.bandNewForm.patchValue({'bandName': '', 'genreId': ''});

        this.bandNewForm.controls['bandName'].markAsUntouched();
        this.bandNewForm.controls['bandName'].markAsPristine();
    });
  }
}
