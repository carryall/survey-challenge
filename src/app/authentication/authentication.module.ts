import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';

// Components
import { AlertComponent } from 'app/shared/components/alert/alert.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { LoginComponent } from './pages';

// Services
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  imports: [
    AuthenticationRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AlertComponent,
    FormLoginComponent,
    LoginComponent
  ],
  providers: [AuthenticationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationModule { }
