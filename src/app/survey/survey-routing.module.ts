import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '../user.guard';

import { SurveyListComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: SurveyListComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SurveyRoutingModule { }
