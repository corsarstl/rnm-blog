import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor (private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      'username': ['', [
              Validators.required,
              Validators.pattern(USER_NAME_REGEX),
              Validators.minLength(3),
              Validators.maxLength(255)
            ]],
      'email': ['', [
              Validators.required,
              Validators.pattern(EMAIL_REGEX),
              Validators.maxLength(255)
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

  onSubmit() {
    console.log(this.registerForm);
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
}
