import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'rnm-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  posts = [];
  errors = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPostsForSlider();
  }

  /**
   * Get 3 latest posts for slider.
   */
  getPostsForSlider() {
    this.postService.postsForSlider()
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
