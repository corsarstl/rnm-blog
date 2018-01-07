import { Component, Input } from '@angular/core';
import { PostsListItem } from './posts-list-item';

@Component({
  selector: 'rnm-posts-list',
  templateUrl: './posts-list.component.html',
  styles: []
})
export class PostsListComponent {
  @Input() postsToDisplay: PostsListItem[] = [];
}
