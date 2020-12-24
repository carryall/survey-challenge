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
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private sessionService: SessionService,
    private router: Router
  ) {
    if (sessionService.isLoggedIn()) {
      router.navigate(['/']);
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.errorMessage = '';

    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      response => {
        this.sessionService.setAccessToken(response.accessToken, response.tokenType);

        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = error.error;
      }
    );
  }
}
