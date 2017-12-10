import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'rnm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // 5 latest posts for each genre.
  latest5PostsPerGenre = [];
  errors = [];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.getLatest5PostsPerGenre();
  }

  /**
   * Get 5 latest posts for each genre.
   */
  getLatest5PostsPerGenre() {
    this.postService.getLatest5PostsPerGenre()
      .subscribe(data => {
        this.latest5PostsPerGenre = data['data'];
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
