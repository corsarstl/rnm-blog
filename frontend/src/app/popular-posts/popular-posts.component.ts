import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PopularPost } from './popular-post';

@Component({
  selector: 'rnm-popular-posts',
  templateUrl: './popular-posts.component.html',
  styleUrls: ['./popular-posts.component.css']
})
export class PopularPostsComponent implements OnInit {
  popularPosts: PopularPost[] = [];
  errors = [];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.getPopularPosts();
  }

  /**
   * Get a list of 5 popular posts with most number of comments.
   */
  getPopularPosts() {
    this.postService.popularPosts()
      .subscribe(data => {
        this.popularPosts = data['data'];
        console.log(this.popularPosts);
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
