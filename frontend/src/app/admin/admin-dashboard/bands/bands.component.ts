import { Component, OnDestroy, OnInit } from '@angular/core';
import { BandsService } from './bands.service';
import { Band } from './band.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rnm-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css']
})
export class BandsComponent implements OnInit, OnDestroy {
  bands: Band[] = [];
  showBandEditForm = false;
  refreshBands: Subscription;

  constructor(private bandsService: BandsService) { }

  ngOnInit() {
    this.showBands();

    this.refreshBands = this.bandsService.refreshBands
      .subscribe(() => {
        this.showBands();
        this.showBandEditForm = false;
      });
  }

  /**
   * Get a list of all bands.
   */
  showBands() {
    this.bandsService.getBands()
      .subscribe(data => {
        this.bands = data['bands'];
        console.log(this.bands);
      });
  }

  /**
   * Show bandEditForm.
   * Pass initial or updated values to form and update bands list.
   *
   * @param {string} bandName
   * @param {number} bandId
   * @param {number} genreId
   */
  onEdit(bandName: string, bandId: number, genreId: number) {
    this.showBandEditForm = true;
    this.bandsService.initialBandNameToEdit = bandName;
    this.bandsService.initialBandIdToEdit = bandId;
    this.bandsService.initialGenreIdToEdit = genreId;

    const newEditFormValues = [];
    newEditFormValues['newBandName'] = bandName;
    newEditFormValues['newBandId'] = bandId;
    newEditFormValues['newGenreId'] = genreId;

    this.bandsService.updateEditForm.next(newEditFormValues);
  }

  /**
   * Delete selected band from db.
   *
   * @param bandId
   */
  onDelete(bandId) {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      this.bandsService.deleteBand(bandId)
        .subscribe(() => {
          console.log(`Band #${bandId} has been deleted.`);
          this.bandsService.refreshBands.next();
        });
    }
  }

  ngOnDestroy() {
    this.refreshBands.unsubscribe();
  }
}
