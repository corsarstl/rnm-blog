import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PostService } from '../../../../shared/services/post.service';
import { PostDetails } from './post-details.model';

@Component({
  selector: 'rnm-post',
  templateUrl: './post.component.html',
  styles: []
})
export class PostComponent implements OnInit {
  imageUrl = this.postService.imageUrl;

  postUrl: {
    genreSlug: string;
    bandSlug: string;
    postId: number;
    postSlug: string;
  };

  post: PostDetails;

  constructor(private postService: PostService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.postUrl = {
      genreSlug: this.route.snapshot.params['genreSlug'],
      bandSlug: this.route.snapshot.params['bandSlug'],
      postId: this.route.snapshot.params['postId'],
      postSlug: this.route.snapshot.params['postSlug'],
    };

    this.route.params
      .subscribe(
        (params: Params) => {
          this.postUrl.postId = params['postId'];

          this.getSinglePost(this.postUrl.postId);
        }
      );
  }

  /**
   * Get single post.
   *
   * @param postId
   */
  getSinglePost(postId) {
    this.postService.show(postId)
      .subscribe(data => {
        this.post = data['data'];
      });
  }
}
