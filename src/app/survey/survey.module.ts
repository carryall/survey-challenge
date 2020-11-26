import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyListComponent } from './pages';

@NgModule({
  declarations: [
    SurveyListComponent
  ],
  imports: [
    SurveyRoutingModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SurveyModule { }
