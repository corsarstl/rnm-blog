import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rnm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  dataInvalid = false;
  formErrors = [];

  loginSubscription: Subscription;

  constructor(public authService: AuthService,
              public router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    //
    // if (this.authService.isLoggedIn) {
    //   // Get the redirect URL from auth service
    //   // If no redirect has been set, use the default
    //   const redirect = this.authService.userRedirectUrl ? this.authService.userRedirectUrl : 'home';
    //   // Redirect the user
    //   this.router.navigate([redirect]);
    // }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  login() {
    this.formErrors = [];
    this.loginSubscription = this.authService.login(this.loginForm.value).subscribe(() => {
      this.authService.showLoginForm = false;
      // if (this.authService.isLoggedIn) {
      //   // Get the redirect URL from auth service
      //   // If no redirect has been set, use the default
      //   const redirect = this.authService.userRedirectUrl ? this.authService.userRedirectUrl : 'home';
      //   // Redirect the user
      //   this.router.navigate([redirect]);                         // Use promise and add ".then removeLoader"
      // }
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
