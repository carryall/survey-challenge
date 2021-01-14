import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/authentication/services/authentication.service';

@Component({
  selector: 'app-form-forgot-password',
  templateUrl: './form-forgot-password.component.html',
  styleUrls: ['./form-forgot-password.component.scss']
})
export class FormForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  alertMessage = '';

  constructor(private _authenticationService: AuthenticationService) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.alertMessage = '';

    this._authenticationService.requestPasswordReset(this.forgotPasswordForm.value.email).subscribe(
      response => {
        this.alertMessage = response.meta.message;
      },
      error => {
        this.alertMessage = error.error;
      }
    );
  }
}
