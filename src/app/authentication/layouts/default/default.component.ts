import { Component, OnInit } from '@angular/core';

import { LoginComponent, ForgotPasswordComponent } from 'app/authentication/pages';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  pageDescription = '';
  displayBackButton = false;

  constructor() {}

  ngOnInit(): void {}

  onActivate(event: LoginComponent | ForgotPasswordComponent): void {
    this.displayBackButton = event instanceof ForgotPasswordComponent;
    this.pageDescription = event.PAGE_DESCRIPTION;
  }
}
