import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'svg-icon-sprite';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'survey-challenge';

  constructor(authService: AuthService, router: Router) {
    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
    }
  }
}
