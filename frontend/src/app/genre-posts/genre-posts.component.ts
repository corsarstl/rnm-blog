import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../shared/services/post.service';
import { PostsListItem } from '../posts-list/posts-list-item';

@Component({
  selector: 'rnm-genre-posts',
  templateUrl: './genre-posts.component.html',
  styleUrls: ['./genre-posts.component.css']
})
export class GenrePostsComponent implements OnInit {
  genreUrl: {
    genreSlug: string
  };
  posts: PostsListItem[] = [];

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
        this.posts = data['data'];
        console.log(this.posts);
      });
  }
}
