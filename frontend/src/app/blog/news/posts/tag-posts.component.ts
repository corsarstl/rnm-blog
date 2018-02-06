import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PostService } from '../../../shared/services/post.service';
import { PaginatedPosts } from './posts-list/paginated-posts.model';

@Component({
  selector: 'rnm-tag-posts',
  template: `
      <h1 class="text-center mt-3">{{ tagUrl.tagSlug | titleCase }}</h1>
      <rnm-posts-list [postsToDisplay]="posts"></rnm-posts-list>
  `,
  styles: ['h1 {font-family: \'Varela Round\', sans-serif;}']
})
export class TagPostsComponent implements OnInit {
  tagUrl: {
    tagId: number;
    tagSlug: string;
  };
  posts: PaginatedPosts[] = [];

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

          this.getPostsByTag(this.tagUrl.tagId);
        }
      );
  }

  /**
   * Get all posts for selected tag.
   *
   * @param tagId
   */
  getPostsByTag(tagId) {
    this.postService.postsByTag(tagId)
      .subscribe(data => {
        this.posts = data['posts'];
      });
  }
}
