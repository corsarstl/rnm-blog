import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

const USER_NAME_REGEX = /^([a-zA-Z0-9]+)$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;

@Component({
  selector: 'rnm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  dataInvalid = false;
  formErrors = [];
  // For future loader component
  // formSubmitting = false;

  constructor (public authService: AuthService,
               public router: Router,
               private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      'username': ['', [
              Validators.required,
              Validators.pattern(USER_NAME_REGEX),
              Validators.minLength(3),
              Validators.maxLength(20)
            ]],
      'email': ['', [
              Validators.required,
              Validators.pattern(EMAIL_REGEX),
              Validators.maxLength(30)
            ]],
      'passwords': this.fb.group({
        'password': ['', [
              Validators.required,
              Validators.minLength(8),
              Validators.pattern(PASSWORD_REGEX)
            ]],
        'password_confirmation': ['', Validators.required]},
        {validator: this.ValidatePasswordConfirmation.bind(this)})
    });

    if (this.authService.isLoggedIn) {
      // Get the redirect URL from auth service
      // If no redirect has been set, use the default
      const redirect = this.authService.userRedirectUrl ? this.authService.userRedirectUrl : 'home';
      // Redirect the user
      this.router.navigate([redirect]);
    }
  }

  /**
   * Check if user confirmed password.
   *
   * @param {FormGroup} group
   * @returns {{[p: string]: boolean}}
   * @constructor
   */
  ValidatePasswordConfirmation(group: FormGroup): {[s: string]: boolean} {
    let pass = group.controls['password'].value;
    let passConf = group.controls['password_confirmation'].value;

    if (pass !== passConf) {
      return {'passwordNotConfirmed': true};
    }
    return null;
  }


  /**
   * Get registration data and redirect to home page.
   * If fail, return errors for handling.
   */
  register() {
    this.formErrors = [];
    this.authService.register(this.registerForm.value).subscribe(() => {
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.userRedirectUrl ? this.authService.userRedirectUrl : 'home';
        // Redirect the user
        this.router.navigate([redirect]);                         // Use promise and add ".then removeLoader"
      }
    }, (err: HttpErrorResponse) => {
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
          const items = [];
          for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
              items.push(errors[key]);
            }
          }
          for (const k in items) {
            if (items.hasOwnProperty(k)) {
              this.formErrors.push(items[k][0]);
            }
          }
        }
      }
    });
  }
}
