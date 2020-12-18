import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';

// Components
import { AlertComponent } from 'app/shared/components/alert/alert.component';
import { FormForgotPasswordComponent, FormLoginComponent } from './components';
import { ForgotPasswordComponent, LoginComponent } from './pages';

// Layouts
import { DefaultComponent } from './layouts/default/default.component';

// Services
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  imports: [
    AuthenticationRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    // Shared
    AlertComponent,

    // Layouts
    DefaultComponent,

    // Pages
    ForgotPasswordComponent,
    LoginComponent,

    // Forms
    FormForgotPasswordComponent,
    FormLoginComponent,
  ],
  providers: [
    AuthenticationService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationModule { }
