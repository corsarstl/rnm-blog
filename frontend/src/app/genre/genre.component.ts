import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'rnm-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

}
