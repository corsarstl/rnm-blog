import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../../shared/services/post.service';
import { PaginatedPosts } from './posts-list/paginated-posts.model';

@Component({
  selector: 'rnm-genre-posts',
  template: `
      <h1 class="text-center">{{ genreUrl.genreSlug | titleCase }}</h1>
      <rnm-posts-list [postsToDisplay]="posts"></rnm-posts-list>
  `,
  styles: ['h1 {font-family: \'Varela Round\', sans-serif;}']
})
export class GenrePostsComponent implements OnInit {
  genreUrl: {
    genreSlug: string
  };
  posts: PaginatedPosts[] = [];

  constructor(private postService: PostService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.genreUrl = {
      genreSlug: this.route.snapshot.params['genreSlug']
    };

    this.route.params
      .subscribe(
        (params: Params) => {
          this.genreUrl.genreSlug = params['genreSlug'];
          this.getPostsByGenre(this.genreUrl.genreSlug);
        }
      );
  }

  /**
   * Get all posts for selected genre.
   *
   * @param genreSlug
   */
  getPostsByGenre(genreSlug) {
    this.postService.postsByGenre(genreSlug)
      .subscribe(data => {
        this.posts = data['posts'];
        console.log(this.posts);
      });
  }
}
