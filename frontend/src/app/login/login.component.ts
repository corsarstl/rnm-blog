import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'rnm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  dataInvalid = false;
  formErrors = [];

  constructor(public authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
      ]],
      'password': ['', Validators.required]
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(() => {
      this.authService.showLoginForm = false;
    },
      (err: HttpErrorResponse) => {
      this.dataInvalid = true;
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        this.formErrors.push(err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        if (err.status === 0) {
          this.formErrors.push('Please check your backend server.');
        } else {
          const errors = err.error;
          for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
              this.formErrors.push(errors[key]);
            }
          }
        }
      }
    });
  }
}
