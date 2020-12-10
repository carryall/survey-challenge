import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentUserGuard } from '@guard/current-user.guard';

import { SurveyListComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: SurveyListComponent,
    canActivate: [CurrentUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SurveyRoutingModule { }
