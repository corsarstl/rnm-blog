import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { TagsService } from '../tags.service';

@Component({
  selector: 'rnm-tag-edit',
  templateUrl: './tag-edit.component.html',
  styles: []
})
export class TagEditComponent implements OnInit, OnDestroy {
  tagEditForm: FormGroup;
  // Update initial editForm input values on click according to selected tag.
  updateEditForm: Subscription;

  constructor(private tagsService: TagsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.tagEditForm = this.fb.group({
      'newTagName': [
        this.tagsService.initialTagNameToEdit,
        Validators.required
      ],
      'tagId': [
        this.tagsService.initialTagIdToEdit,
        Validators.required
      ]
    });

    this.updateEditForm = this.tagsService.updateEditForm
      .subscribe((newEditFormValues) => {
        this.tagEditForm.patchValue({'newTagName': newEditFormValues['newTagName']});
        this.tagEditForm.patchValue({'tagId': newEditFormValues['newTagId']});
      });
  }

  /**
   * Save updated tag to db.
   * Update list of tags.
   */
  onSave() {
    this.tagsService.updateTag(this.tagEditForm.value)
      .subscribe(() => {
        this.tagsService.refreshTags.next();
        this.tagEditForm.reset();
      });
  }

  /**
   * Reset form inputs.
   * Update list of tags.
   */
  onCancel() {
    this.tagEditForm.reset();
    this.tagsService.refreshTags.next();
  }

  ngOnDestroy() {
    this.updateEditForm.unsubscribe();
  }
}
