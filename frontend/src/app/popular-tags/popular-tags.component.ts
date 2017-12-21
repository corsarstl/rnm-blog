import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { PopularTag } from './popular-tag';

@Component({
  selector: 'rnm-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.css']
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
        console.log(this.popularTags);
      });
  }
}
