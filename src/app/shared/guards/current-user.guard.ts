import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '@service/session.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserGuard implements CanActivate {
  constructor(
    private _sessionService: SessionService,
    private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this._sessionService.isLoggedIn()) {
      return true;
    }

    return this._router.parseUrl('/auth/login');
  }
}
