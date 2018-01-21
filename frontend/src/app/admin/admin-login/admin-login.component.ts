import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from './admin-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'rnm-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm: FormGroup;
  dataInvalid = false;
  formErrors = [];

  mockEmail = 'master@master.com';
  mockPass = '?nn9@n7aV9';

  constructor(private adminAuthService: AdminAuthService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.adminLoginForm = this.fb.group({
      'email': [this.mockEmail, Validators.required],
      'password': [this.mockPass, Validators.required]
    });
  }

  /**
   * Send admin login data for verification.
   * Get valid token and save it or display errors.
   */
  login() {
    this.adminAuthService.login(this.adminLoginForm.value)
      .subscribe(() => {
        this.adminAuthService.adminIsLoggedIn = true;
        this.router.navigate(['../dashboard'], {relativeTo: this.route});
      },
        (err: HttpErrorResponse) => {
          this.adminLoginForm.reset();
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
