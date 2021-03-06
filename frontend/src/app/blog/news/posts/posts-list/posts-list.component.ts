import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PostService } from '../../../../shared/services/post.service';
import { PaginatedPosts } from './paginated-posts.model';

@Component({
  selector: 'rnm-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  // Posts loaded for selected genre, band or tag.
  @Input() postsToDisplay: PaginatedPosts[] = [];
  imagePath = this.postService.imageUrl;
  // Update posts after navigation to first, last, prev, next or selected pages.
  updatePosts: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.updatePosts = this.postService.navigatedToNewPage.subscribe(
      (url) => {
        this.postService.updatePosts(url).subscribe(
          (data) => {
            this.postsToDisplay = data['posts'];
          });
      }
    );
  }

  ngOnDestroy() {
    this.updatePosts.unsubscribe();
  }
}
