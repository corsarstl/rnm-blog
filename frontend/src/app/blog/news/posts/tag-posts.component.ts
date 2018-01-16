import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PostService } from '../../../shared/services/post.service';
import { PaginatedPosts } from './posts-list/paginated-posts.model';

@Component({
  selector: 'rnm-tag-posts',
  template: `
      <h1 class="text-center">{{ tagUrl.tagSlug | titleCase }}</h1>
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
        this.posts = data['posts'];
        console.log(this.posts);
      });
  }
}
