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

  ngOnDestroy() {
    this.refreshBands.unsubscribe();
  }
}
