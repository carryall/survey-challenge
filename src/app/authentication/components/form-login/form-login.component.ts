import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '@service/session.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  ERROR_MESSAGES: { [key: number]: string; } = {
    400: 'Invalid email or password'
  };

  loginForm: any;
  errorMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private sessionService: SessionService,
    private router: Router
  ) {
    if (sessionService.isLoggedIn()) {
      router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      response => {
        this.sessionService.setAccessToken(response.accessToken, response.tokenType);

        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = this.errorMessageFor(error.status);
      }
    );
  }

  private errorMessageFor(status: any): any {
    if (!Object.keys(this.ERROR_MESSAGES).includes(status.toString())) {
      return 'Something went wrong, please try again later';
    }
    return this.ERROR_MESSAGES[status];
  }
}
