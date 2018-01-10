import { Component, Input } from '@angular/core';
import { PostsListItem } from './posts-list-item';
import { PostService } from '../../../../shared/services/post.service';

@Component({
  selector: 'rnm-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent {
  @Input() postsToDisplay: PostsListItem[] = [];
  imagePath = this.postService.imageUrl;

  constructor(private postService: PostService) { }
}
