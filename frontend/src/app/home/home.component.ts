import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'rnm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latest5PostsPerGenre = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getLatest5PostsPerGenre();
  }

  /**
   * Get 5 latest posts for each genre.
   */
  getLatest5PostsPerGenre() {
    this.postService.latest5PostsPerGenre()
      .subscribe(data => {
        this.latest5PostsPerGenre = data['data'];
        console.log(this.latest5PostsPerGenre);
      });
  }
}
