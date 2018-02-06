import { Component, OnInit } from '@angular/core';

import { PostService } from '../../services/post.service';
import { PopularTag } from './popular-tag.model';

@Component({
  selector: 'rnm-popular-tags',
  templateUrl: './popular-tags.component.html',
  styles: []
})
export class PopularTagsComponent implements OnInit {
  popularTags: PopularTag[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.getPopularTags();
  }

  /**
   * Get a list of tags with the number of related posts.
   */
  getPopularTags() {
    this.postService.getPopularTags()
      .subscribe(data => {
        this.popularTags = data['data'];
      });
  }
}
