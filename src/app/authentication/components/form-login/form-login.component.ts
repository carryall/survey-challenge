import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  loginForm: any;
  errorMessage = '';

  USER_ACCESS_TOKEN = 'user_access_token';
  USER_TOKEN_TYPE = 'user_token_type';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

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
        localStorage.setItem(this.USER_ACCESS_TOKEN, response.accessToken);
        localStorage.setItem(this.USER_TOKEN_TYPE, response.tokenType);

        this.router.navigate(['/']);
      },
      error => {
        if (error.status === 400) {
          this.errorMessage = 'Invalid email or password';
        }
      }
    );
  }
}
