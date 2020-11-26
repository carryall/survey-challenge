import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  loginForm: any;
  errorMessage = null;

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      response => {
        console.log('response', response);
      },
      error => {
        this.errorMessage = error;
        console.log('error', error);
      }
    );
  }
}
