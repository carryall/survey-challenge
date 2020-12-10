import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './shared/services/auth.service';

import { UserGuard } from './user.guard';

describe('UserGuard', () => {
  let guard: UserGuard;
  let authService: AuthService;

  const routeMock: any = { snapshot: {}};
  const routeStateMock: any = { snapshot: {}, url: '/'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    authService = TestBed.inject(AuthService);
    guard = TestBed.inject(UserGuard);
  });

  it('creates the guard', () => {
    expect(guard).toBeTruthy();
  });

  describe('#canActivate', () => {
    describe('Given the user is logged in', () => {
      it('returns true', () => {
        spyOn(authService, 'isLoggedIn').and.returnValue(true);

        expect(guard.canActivate(routeMock, routeStateMock)).toBeTruthy();
      });
    });

    describe('Given the user is NOT logged in', () => {
      it('returns an url tree', () => {
        spyOn(authService, 'isLoggedIn').and.returnValue(false);

        expect(guard.canActivate(routeMock, routeStateMock)).toBeInstanceOf(UrlTree);
      });
    });
  });
});
