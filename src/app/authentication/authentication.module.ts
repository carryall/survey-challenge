import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './pages';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { AuthenticationService } from './service/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
    FormLoginComponent
  ],
  imports: [
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [AuthenticationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AuthenticationModule { }
