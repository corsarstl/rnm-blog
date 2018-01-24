import { Component, OnDestroy, OnInit } from '@angular/core';
import { BandsService } from './bands.service';
import { Subscription } from 'rxjs/Subscription';
import { PaginatedBands } from './paginated-bands.model';

@Component({
  selector: 'rnm-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css']
})
export class BandsComponent implements OnInit, OnDestroy {
  bands: PaginatedBands[] = [];
  showBandEditForm = false;
  refreshBands: Subscription;
  // First
  beginNumerationFrom: number;

  constructor(private bandsService: BandsService) { }

  ngOnInit() {
    this.showBands();

    this.refreshBands = this.bandsService.refreshBands
      .subscribe((url: string) => {
        if (url !== undefined) {
          this.updateBands(url);
        } else {
          this.showBands();
        }

        this.showBandEditForm = false;
      });
  }

  /**
   * Get a list of all bands.
   */
  showBands() {
    this.bandsService.showBands()
      .subscribe(data => {
        this.bands = data['bands'];
        this.beginNumerationFrom = this.bands['from'];
        console.log(this.bands);
      });
  }

  /**
   * Update bands after navigation to first, last, prev, next or selected pages.
   *
   * @param {string} url
   */
  updateBands(url: string) {
    this.bandsService.updateBands(url)
      .subscribe(data => {
        this.bands = data['bands'];
        this.beginNumerationFrom = this.bands['from'];
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
