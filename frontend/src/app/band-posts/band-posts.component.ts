import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../shared/services/post.service';
import { PostsListItem } from '../posts-list/posts-list-item';

@Component({
  selector: 'rnm-band-posts',
  templateUrl: './band-posts.component.html',
  styleUrls: ['./band-posts.component.css']
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
