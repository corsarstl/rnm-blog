import { Component, OnInit } from '@angular/core';

import { PostService } from '../../../shared/services/post.service';
import { SliderPost } from './slider-post.model';

@Component({
  selector: 'rnm-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  imageUrl = this.postService.imageUrl;
  posts: SliderPost[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPostsForSlider();
  }

  /**
   * Get 3 latest posts for slider.
   */
  getPostsForSlider() {
    this.postService.postsForSlider()
      .subscribe(data => {
        this.posts = data['data'];
      });
  }
}
