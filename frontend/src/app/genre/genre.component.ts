import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'rnm-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genre: {genreSlug: string};
  // Posts fetched from server.
  posts = [];
  errors = [];

  constructor(private postService: PostService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.genre = {
      genreSlug: this.route.snapshot.params['genreSlug']
    };

    this.route.params
      .subscribe(
        (params: Params) => {
          this.genre.genreSlug = params['genreSlug'];
          this.getPostsByGenre(this.genre.genreSlug);
        }
      );
  }

  /**
   * Get all posts for selected genre.
   *
   * @param genreSlug
   */
  getPostsByGenre(genreSlug) {
    this.postService.getPostsByGenre(genreSlug)
      .subscribe(data => {
        this.posts = data['data'][0]['posts'];
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
