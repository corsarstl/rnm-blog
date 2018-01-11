import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { HotPost } from './hot-post.model';

@Component({
  selector: 'rnm-hot-posts',
  templateUrl: './hot-posts.component.html',
  styles: []
})
export class HotPostsComponent implements OnInit {
  hotPosts: HotPost[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getHotPosts();
  }

  /**
   * Get a list of 5 popular posts with most number of comments.
   */
  getHotPosts() {
    this.postService.hotPosts()
      .subscribe(data => {
        this.hotPosts = data['data'];
        console.log(this.hotPosts);
      });
  }
}
