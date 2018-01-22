import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tag } from './tag.model';
import { Subscription } from 'rxjs/Subscription';
import { TagsService } from './tags.service';

@Component({
  selector: 'rnm-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {
  tags: Tag[] = [];
  showTagEditForm = false;
  refreshTags: Subscription;

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.showTags();

    this.refreshTags = this.tagsService.refreshTags
      .subscribe(() => {
        this.showTags();
        this.showTagEditForm = false;
      });
  }

  /**
   * Get a list of all tags.
   */
  showTags() {
    this.tagsService.showTags()
      .subscribe(data => {
        this.tags = data['tags'];
        console.log(this.tags);
      });
  }

  /**
   * Show tagEditForm.
   * Pass initial or updated values to form and update tags list.
   *
   * @param tagName
   * @param tagId
   */
  onEdit(tagName, tagId) {
    this.showTagEditForm = true;
    this.tagsService.initialTagNameToEdit = tagName;
    this.tagsService.initialTagIdToEdit = tagId;

    const newEditFormValues = [];
    newEditFormValues['newTagName'] = tagName;
    newEditFormValues['newTagId'] = tagId;

    this.tagsService.updateEditForm.next(newEditFormValues);
  }

  /**
   * Delete selected tag from db.
   * Update list of tags.
   *
   * @param tagId
   */
  onDelete(tagId) {
    const confirmation = confirm('Are you sure?');

    if (confirmation) {
      this.tagsService.deleteTag(tagId)
        .subscribe(() => {
          console.log(`Tag #${tagId} has been deleted.`);
          this.tagsService.refreshTags.next();
        });
    }
  }

  ngOnDestroy() {
    this.refreshTags.unsubscribe();
  }
}
