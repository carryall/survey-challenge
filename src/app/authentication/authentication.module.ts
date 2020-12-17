import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './pages';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { AuthenticationService } from './services/authentication.service';
import { AlertComponent } from 'app/shared/components/alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ],
  declarations: [
    AlertComponent,
    LoginComponent,
    FormLoginComponent
  ],
  providers: [AuthenticationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationModule { }
