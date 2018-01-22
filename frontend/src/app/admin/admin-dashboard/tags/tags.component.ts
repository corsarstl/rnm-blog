import { Component, OnInit } from '@angular/core';
import { Tag } from './tag.model';

@Component({
  selector: 'rnm-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];


  constructor() { }

  ngOnInit() {
  }

}
