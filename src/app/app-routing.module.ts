import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationRoutingModule } from './authentication/authentication-routing.module';
import { SurveyRoutingModule } from './survey/survey-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthenticationRoutingModule,
    SurveyRoutingModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
