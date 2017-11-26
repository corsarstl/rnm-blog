import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'rnm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.string, Validators.maxLength(255)]),
      'email': new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
      'password': new FormControl(),
      'password_confirmation': new FormControl(),
    });
  }

  onSubmit() {
    console.log(this.registerForm);
  }
}
