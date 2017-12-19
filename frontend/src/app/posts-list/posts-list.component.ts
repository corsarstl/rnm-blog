import { Component, Input } from '@angular/core';
import { PostsListItem } from './posts-list-item';

@Component({
  selector: 'rnm-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent {
  @Input() postsToDisplay: PostsListItem[] = [];
}
