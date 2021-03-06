import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionService } from '@service/session.service';

import { CurrentUserGuard } from './current-user.guard';

describe('CurrentUserGuard', () => {
  let guard: CurrentUserGuard;
  let sessionService: SessionService;

  const routeMock: any = { snapshot: {}};
  const routeStateMock: any = { snapshot: {}, url: '/'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    sessionService = TestBed.inject(SessionService);
    guard = TestBed.inject(CurrentUserGuard);
  });

  it('creates the guard', () => {
    expect(guard).toBeTruthy();
  });

  describe('#canActivate', () => {
    describe('Given the user is logged in', () => {
      it('returns true', () => {
        spyOn(sessionService, 'isLoggedIn').and.returnValue(true);

        expect(guard.canActivate(routeMock, routeStateMock)).toBeTruthy();
      });
    });

    describe('Given the user is NOT logged in', () => {
      it('returns an url tree', () => {
        spyOn(sessionService, 'isLoggedIn').and.returnValue(false);

        expect(guard.canActivate(routeMock, routeStateMock)).toBeInstanceOf(UrlTree);
      });
    });
  });
});
