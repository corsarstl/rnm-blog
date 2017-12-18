import { Component, OnInit } from '@angular/core';
import { PopularTag } from './popular-tag';
import { PostService } from '../shared/services/post.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'rnm-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.css']
})
export class PopularTagsComponent implements OnInit {
  popularTags: PopularTag[] = [];
  errors = [];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.getPopularTags();
  }

  /**
   * Get a list of tags with the number of related posts.
   */
  getPopularTags() {
    this.postService.getPopularTags()
      .subscribe(data => {
        this.popularTags = data['data'];
        console.log(this.popularTags);
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
