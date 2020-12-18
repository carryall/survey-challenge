import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@environment/environment';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    describe('Given valid email and password', () => {
      it('returns an Observable<any>', () => {
        const mockResponse = {
          data: {
            id: 10,
            type: 'token',
            attributes: {
              access_token: 'lbxD2K2BjbYtNzz8xjvh2FvSKx838KBCf79q773kq2c',
              token_type: 'Bearer',
              expires_in: 7200,
              refresh_token: '3zJz2oW0njxlj_I3ghyUBF7ZfdQKYXd2n0ODlMkAjHc',
              created_at: 1597169495
            }
          }
        };

        const deserializedResponse = {
          id: 10,
          accessToken: 'lbxD2K2BjbYtNzz8xjvh2FvSKx838KBCf79q773kq2c',
          tokenType: 'Bearer',
          expiresIn: 7200,
          refreshToken: '3zJz2oW0njxlj_I3ghyUBF7ZfdQKYXd2n0ODlMkAjHc',
          createdAt: 1597169495
        };

        service.login('dev@nimblehq.co', '12345678').subscribe(response => {
          expect(response).toEqual(deserializedResponse);
        });

        const request = httpMock.expectOne(`${environment.apiBaseUrl}/api/${environment.apiVersion}/oauth/token`);
        expect(request.request.method).toBe('POST');
        request.flush(mockResponse);
      });
    });

    describe('Given INVALID email and password', () => {
      it('throws an error', () => {
        const mockErrorResponse = {
          errors: [
            {
              source: 'Doorkeeper::OAuth::Error',
              detail: 'The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.',
              code: 'invalid_grant'
            }
          ]
        };

        service.login('invalid_email@nimblehq.co', 'invalid_password').subscribe(
          _ => fail('It should have failed with 400 error'),
          (error: HttpErrorResponse) => {
            expect(error.status).toBe(400);
            expect(error.message).toContain('400');
          }
        );

        const request = httpMock.expectOne(`${environment.apiBaseUrl}/api/${environment.apiVersion}/oauth/token`);
        expect(request.request.method).toBe('POST');

        const mockError = new ErrorEvent('HttpError', {
          error: mockErrorResponse
        });
        request.error(mockError, {status: 400, statusText: 'Bad Request'});
      });
    });
  });

  describe('#requestPasswordReset', () => {
    describe('Given valid email', () => {
      it('returns an Observable<any>', () => {
        const mockResponse = {
          meta: {
            message: 'If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.'
          }
        };

        service.requestPasswordReset('dev@nimblehq.co').subscribe(response => {
          expect(response).toEqual(mockResponse);
        });

        const request = httpMock.expectOne(`${environment.apiBaseUrl}/api/${environment.apiVersion}/password`);
        expect(request.request.method).toBe('POST');
        request.flush(mockResponse);
      });
    });

    describe('Given INVALID email', () => {
      // TODO: update this when the API validate the email format
      it('returns an Observable<any>', () => {
        const mockResponse = {
          meta: {
            message: 'If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.'
          }
        };

        service.requestPasswordReset('invalid email').subscribe(response => {
          expect(response).toEqual(mockResponse);
        });

        const request = httpMock.expectOne(`${environment.apiBaseUrl}/api/${environment.apiVersion}/password`);
        expect(request.request.method).toBe('POST');
        request.flush(mockResponse);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
