import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  describe('#setAccessToken', () => {
    it('sets access token and token type to local storage', () => {
      service.setAccessToken('access_token', 'token_type');

      expect(localStorage.getItem(service.USER_ACCESS_TOKEN)).toBe('access_token');
      expect(localStorage.getItem(service.USER_TOKEN_TYPE)).toBe('token_type');
    });
  });
});
