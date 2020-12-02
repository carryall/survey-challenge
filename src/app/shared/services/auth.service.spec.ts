import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])]
    });
    service = TestBed.inject(AuthService);
  });

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  describe('#setAccessToken', () => {
    it('saves access token and token type to local storage', () => {
      service.setAccessToken('access_token', 'token_type');

      expect(localStorage.getItem(service.USER_ACCESS_TOKEN)).toBe('access_token');
      expect(localStorage.getItem(service.USER_TOKEN_TYPE)).toBe('token_type');
    });
  });

  describe('#isLoggedIn', () => {
    describe('Given access token and token in local storage', () => {
      it('returns true', () => {
        localStorage.setItem(service.USER_ACCESS_TOKEN, 'access_token');
        localStorage.setItem(service.USER_TOKEN_TYPE, 'token_type');

        expect(service.isLoggedIn()).toBeTruthy();

        localStorage.clear();
      });
    });

    describe('Given NO access token and token in local storage', () => {
      it('returns false', () => {
        localStorage.clear();

        expect(service.isLoggedIn()).toBeFalsy();
      });
    });
  });
});
