import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PostDetails } from './post-details';

@Component({
  selector: 'rnm-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
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
  errors = [];

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

          this.getSinglePost(
            this.postUrl.genreSlug,
            this.postUrl.bandSlug,
            this.postUrl.postId,
            this.postUrl.postSlug);
        }
      );
  }

  /**
   * Get single post.
   *
   * @param genreSlug
   * @param bandSlug
   * @param postId
   * @param postSlug
   */
  getSinglePost(genreSlug, bandSlug, postId, postSlug) {
    this.postService.singlePost(genreSlug, bandSlug, postId, postSlug)
      .subscribe(data => {
        this.post = data['data'];
        console.log(this.post);
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
