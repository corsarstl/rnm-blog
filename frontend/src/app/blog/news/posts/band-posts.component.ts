import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../../shared/services/post.service';
import { PostsListItem } from './posts-list/posts-list-item';

@Component({
  selector: 'rnm-band-posts',
  template: `
      <h2>{{ posts[0]?.bandName }}</h2>
      <rnm-posts-list [postsToDisplay]="posts"></rnm-posts-list>
  `,
  styles: []
})
export class BandPostsComponent implements OnInit {
  bandUrl: {
    genreSlug: string,
    bandSlug: string
  };
  posts: PostsListItem[] = [];

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
        this.posts = data['data'];
        console.log(this.posts);
      });
  }
}
