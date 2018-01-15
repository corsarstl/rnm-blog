import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../../shared/services/post.service';
import { PaginatedPosts } from './posts-list/paginated-posts.model';

@Component({
  selector: 'rnm-band-posts',
  template: `
      <h1 class="text-center">{{ posts['data'] && posts['data'][0].bandName }}</h1>
      <rnm-posts-list [postsToDisplay]="posts"></rnm-posts-list>
  `,
  styles: ['h1 {font-family: \'Varela Round\', sans-serif;}']
})
export class BandPostsComponent implements OnInit {
  bandUrl: {
    genreSlug: string,
    bandSlug: string
  };
  posts: PaginatedPosts[] = [];

  constructor(private postService: PostService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.bandUrl = {
      genreSlug: this.route.snapshot.params['genreSlug'],
      bandSlug: this.route.snapshot.params['bandSlug']
    };

    this.route.params
      .subscribe(
        (params: Params) => {
          this.bandUrl.bandSlug = params['bandSlug'];
          this.getPostsByBand(this.bandUrl.genreSlug, this.bandUrl.bandSlug);
        }
      );
  }

  /**
   * Get all posts for selected band.
   *
   * @param bandSlug
   */
  getPostsByBand(genreSlug, bandSlug) {
    this.postService.postsByBand(genreSlug, bandSlug)
      .subscribe(data => {
        this.posts = data['posts'];
        console.log(this.posts);
      });
  }
}
