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
  refreshBands: Subscription;

  constructor(private bandsService: BandsService) { }

  ngOnInit() {
    this.showBands();

    this.refreshBands = this.bandsService.refreshBands
      .subscribe(() => {
        this.showBands();
      });
  }

  /**
   * Get a list of bands.
   */
  showBands() {
    this.bandsService.getBands()
      .subscribe(data => {
        this.bands = data['bands'];
        console.log(this.bands);
      });
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
