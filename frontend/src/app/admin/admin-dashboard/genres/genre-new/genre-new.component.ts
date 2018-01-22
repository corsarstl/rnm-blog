import { Component, OnInit } from '@angular/core';
import { GenresService } from '../genres.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'rnm-genre-new',
  templateUrl: './genre-new.component.html',
  styleUrls: ['./genre-new.component.css']
})
export class GenreNewComponent implements OnInit {
  genreNewForm: FormGroup;

  constructor(private genresService: GenresService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.genreNewForm = this.fb.group({
      'genreName': ['', Validators.required]
    });
  }

  /**
   * Add new genre to db.
   * Update list of genres.
   */
  onAdd() {
    this.genresService.addNewGenre(this.genreNewForm.value)
      .subscribe(() => {
        console.log('A new genre has been created.');
        this.genresService.refreshGenres.next();
        this.genreNewForm.reset();
      });
  }
}
