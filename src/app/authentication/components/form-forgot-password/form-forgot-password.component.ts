import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/authentication/services/authentication.service';

@Component({
  selector: 'app-form-forgot-password',
  templateUrl: './form-forgot-password.component.html',
  styleUrls: ['./form-forgot-password.component.scss']
})
export class FormForgotPasswordComponent implements OnInit {
  forgotPasswordForm: any;
  alertMessage = '';

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit(): void {
    this.alertMessage = '';

    this.authenticationService.requestPasswordReset(this.forgotPasswordForm.value.email).subscribe(
      response => {
        this.alertMessage = response.meta.message;
      },
      error => {
        this.alertMessage = error.error;
      }
    );
  }
}
