import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PostsListItem } from '../posts-list/posts-list-item';

@Component({
  selector: 'rnm-tag-posts',
  templateUrl: './tag-posts.component.html',
  styleUrls: ['./tag-posts.component.css']
})
export class TagPostsComponent implements OnInit {
  tagUrl: {
    tagId: number;
    tagSlug: string;
  };
  posts: PostsListItem[] = [];
  errors = [];

  constructor(private postService: PostService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.tagUrl = {
      tagId: this.route.snapshot.params['tagId'],
      tagSlug: this.route.snapshot.params['tagSlug']
    };

    this.route.params
      .subscribe(
        (params: Params) => {
          this.tagUrl.tagId = params['tagId'];
          this.tagUrl.tagSlug = params['tagSlug'];

          this.getPostsByTag(this.tagUrl.tagId, this.tagUrl.tagSlug);
        }
      );
  }

  /**
   * Get all posts for selected tag.
   *
   * @param tagId
   * @param tagSlug
   */
  getPostsByTag(tagId, tagSlug) {
    this.postService.postsByTag(tagId, tagSlug)
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
