import { Component, OnInit } from '@angular/core';

import { PostService } from '../../../shared/services/post.service';
import { LatestPostsForHomepage } from './latest-posts-for-homepage.model';

@Component({
  selector: 'rnm-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {
  imagePath = this.postService.imageUrl;
  latestPostsForHomepage: LatestPostsForHomepage[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getLatestPostsForHomepage();
  }

  /**
   * Get 4 latest posts per genre for homepage.
   */
  getLatestPostsForHomepage() {
    this.postService.latestPostsForHomepage()
      .subscribe(data => {
        this.latestPostsForHomepage = data['data'];
        console.log(this.latestPostsForHomepage);
      });
  }
}

