import { Component, OnInit } from '@angular/core';
import { BandsService } from './bands.service';
import { Band } from './band.model';

@Component({
  selector: 'rnm-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css']
})
export class BandsComponent implements OnInit {
  bands: Band[] = [];

  constructor(private bandsService: BandsService) { }

  ngOnInit() {
    this.showBands();
  }

  showBands() {
    this.bandsService.getBands()
      .subscribe(data => {
        this.bands = data['bands'];
        console.log(this.bands);
      });
  }
}
