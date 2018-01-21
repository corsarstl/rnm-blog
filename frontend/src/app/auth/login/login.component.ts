import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';

const EMAIL_REGEX = /\S+@\S+\.\S+/;

@Component({
  selector: 'rnm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  dataInvalid = false;
  formErrors = [];

  constructor(private authService: AuthService,
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

  /**
   * Send login data for verification.
   * Get valid token and save it or display errors.
   */
  login() {
    this.authService.login(this.loginForm.value)
      .subscribe(() => {
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
