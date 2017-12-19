import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  bandName: string;
  posts = [];
  errors = [];
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
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this.errors.push(err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          if (err.status === 0) {
            this.errors.push('Please check your backend server.');
          } else {
            const errors = err.error;
            for (const key in errors) {
              if (errors.hasOwnProperty(key)) {
                this.errors.push(errors[key]);
              }
            }
          }
        }
      });
  }
}
