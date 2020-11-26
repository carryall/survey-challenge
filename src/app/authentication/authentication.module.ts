import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './pages';
import { FormLoginComponent } from './components/form-login/form-login.component';

@NgModule({
  declarations: [
    LoginComponent,
    FormLoginComponent
  ],
  imports: [
    AuthenticationRoutingModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AuthenticationModule { }
