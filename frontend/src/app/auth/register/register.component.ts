import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';

declare var $: any;

const USER_NAME_REGEX = /^([a-zA-Z0-9]+)$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
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

  constructor (public authService: AuthService,
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
  }

  /**
   * Check if user confirmed password.
   *
   * @param {FormGroup} group
   * @returns {{[p: string]: boolean}}
   * @constructor
   */
  ValidatePasswordConfirmation(group: FormGroup): {[s: string]: boolean} {
    const pass = group.controls['password'].value;
    const passConf = group.controls['password_confirmation'].value;

    if (pass !== passConf) {
      this.registerForm.get('passwords.password_confirmation').setErrors({passwordNotConfirmed: true});
    }
    return null;
  }

  /**
   * Get registration data.
   * If fail, return errors for handling.
   */
  register() {
    this.authService.register(this.registerForm.value)
      .subscribe(() => {
        $('#myRegisterForm').modal('hide');
        this.registerForm.reset();
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
