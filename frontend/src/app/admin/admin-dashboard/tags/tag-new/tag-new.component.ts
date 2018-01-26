import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TagsService } from '../tags.service';

@Component({
  selector: 'rnm-tag-new',
  templateUrl: './tag-new.component.html',
  styles: []
})
export class TagNewComponent implements OnInit {
  tagNewForm: FormGroup;

  constructor(private tagsService: TagsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.tagNewForm = this.fb.group({
      'tagName': ['', Validators.required]
    });
  }

  /**
   * Add new tag to db.
   * Update list of tags.
   */
  onAdd() {
    this.tagsService.addNewTag(this.tagNewForm.value)
      .subscribe(() => {
        console.log('A new genre has been created.');
        this.tagsService.refreshTags.next();
        this.tagNewForm.reset();
      });
  }
}
